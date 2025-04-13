import promClient from 'prom-client';
import expressPromMiddleware from 'express-prometheus-middleware';
import { Request, Response, NextFunction } from 'express';
import logger from './logger';

// Initialize Prometheus client
export const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

// Custom metrics
const aiRequestDuration = new promClient.Histogram({
  name: 'ai_request_duration_seconds',
  help: 'Duration of AI API requests',
  labelNames: ['endpoint', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

const cacheHits = new promClient.Counter({
  name: 'cache_hits_total',
  help: 'Total number of cache hits',
  labelNames: ['cache']
});

const cacheMisses = new promClient.Counter({
  name: 'cache_misses_total',
  help: 'Total number of cache misses',
  labelNames: ['cache']
});

register.registerMetric(aiRequestDuration);
register.registerMetric(cacheHits);
register.registerMetric(cacheMisses);

// Prometheus middleware
export const promMiddleware = expressPromMiddleware({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  requestDurationBuckets: [0.1, 0.5, 1, 2, 5],
  requestLengthBuckets: [512, 1024, 5120, 10240, 51200],
  responseLengthBuckets: [512, 1024, 5120, 10240, 51200]
});

// AI metrics middleware
export const aiMetricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith('/api/ai/')) {
    const end = aiRequestDuration.startTimer();
    res.on('finish', () => {
      end({ endpoint: req.path, status: res.statusCode.toString() });
    });
  }
  next();
};

// Cache metrics middleware
export const cacheMetricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;
  res.json = function(body) {
    if (body && body.cached) {
      cacheHits.inc({ cache: 'api' });
    } else {
      cacheMisses.inc({ cache: 'api' });
    }
    return originalJson.call(this, body);
  };
  next();
};

// Custom metrics
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const aiRequestsTotal = new promClient.Counter({
  name: 'ai_requests_total',
  help: 'Total number of AI requests',
  labelNames: ['endpoint', 'status']
});

const aiRequestDurationSeconds = new promClient.Histogram({
  name: 'ai_request_duration_seconds',
  help: 'Duration of AI requests in seconds',
  labelNames: ['endpoint'],
  buckets: [0.5, 1, 2, 5, 10, 30, 60]
});

const cacheHitsTotal = new promClient.Counter({
  name: 'cache_hits_total',
  help: 'Total number of cache hits',
  labelNames: ['route']
});

const cacheMissesTotal = new promClient.Counter({
  name: 'cache_misses_total',
  help: 'Total number of cache misses',
  labelNames: ['route']
});

// Register custom metrics
register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(httpRequestsTotal);
register.registerMetric(aiRequestsTotal);
register.registerMetric(aiRequestDurationSeconds);
register.registerMetric(cacheHitsTotal);
register.registerMetric(cacheMissesTotal);

// Middleware to track AI request metrics
const aiMetricsMiddlewareOld = (req: any, res: any, next: any) => {
  const start = Date.now();
  
  // Only track AI routes
  if (req.path.startsWith('/api/ai')) {
    const endpoint = req.path.split('/').pop() || 'unknown';
    
    // Track request completion
    res.on('finish', () => {
      const duration = (Date.now() - start) / 1000;
      
      // Increment request counter
      aiRequestsTotal.inc({
        endpoint,
        status: res.statusCode < 400 ? 'success' : 'error'
      });
      
      // Record duration
      aiRequestDurationSeconds.observe({ endpoint }, duration);
      
      logger.debug(`AI request to ${endpoint} completed in ${duration}s with status ${res.statusCode}`);
    });
  }
  
  next();
};

// Middleware to track cache metrics
const cacheMetricsMiddlewareOld = (req: any, res: any, next: any) => {
  const originalJson = res.json;
  const route = req.originalUrl || req.url;
  
  res.json = function(body: any) {
    // Check if this is a cached response
    if (req.cached) {
      cacheHitsTotal.inc({ route });
      logger.debug(`Cache hit for ${route}`);
    } else {
      cacheMissesTotal.inc({ route });
      logger.debug(`Cache miss for ${route}`);
    }
    
    return originalJson.call(this, body);
  };
  
  next();
};

// HTTP metrics middleware
export const httpMetricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    httpRequestDurationMicroseconds
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .observe(duration / 1000);
    httpRequestsTotal
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .inc();
  });
  next();
};

// Export metrics endpoint
export const metricsEndpoint = async (req: Request, res: Response) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    logger.error('Error generating metrics:', err);
    res.status(500).end();
  }
};

export {
  register,
  promMiddleware,
  aiMetricsMiddleware,
  cacheMetricsMiddleware,
  httpRequestDurationMicroseconds,
  httpRequestsTotal,
  aiRequestsTotal,
  aiRequestDurationSeconds,
  cacheHitsTotal,
  cacheMissesTotal
}; 