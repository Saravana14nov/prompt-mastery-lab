import promClient from 'prom-client';
import expressPromMiddleware from 'express-prometheus-middleware';
import logger from './logger';

// Initialize the Prometheus registry
const register = new promClient.Registry();

// Add default metrics (CPU, memory, etc.)
promClient.collectDefaultMetrics({
  register,
  prefix: 'prompt_mastery_',
  labels: {
    app: 'prompt-mastery-lab',
    environment: process.env.NODE_ENV || 'development'
  }
});

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

// Create middleware for Express
const promMiddleware = expressPromMiddleware({
  metricsPath: '/metrics',
  collectDefaultMetrics: false, // We're using our own default metrics
  requestDurationBuckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
  requestDurationLabels: true,
  customLabels: {
    app: 'prompt-mastery-lab',
    environment: process.env.NODE_ENV || 'development'
  }
});

// Middleware to track AI request metrics
const aiMetricsMiddleware = (req: any, res: any, next: any) => {
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
const cacheMetricsMiddleware = (req: any, res: any, next: any) => {
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