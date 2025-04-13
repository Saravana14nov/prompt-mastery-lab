import NodeCache from 'node-cache';
import logger from './logger';

// Create cache instance with default TTL of 1 hour
const cache = new NodeCache({
  stdTTL: 3600,
  checkperiod: 600,
  useClones: false
});

// Cache middleware factory
export const cacheMiddleware = (ttl: number = 3600) => {
  return (req: any, res: any, next: any) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = `${req.originalUrl || req.url}`;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      logger.debug(`Cache hit for ${key}`);
      // Mark request as cached for metrics
      req.cached = true;
      return res.json(cachedResponse);
    }

    // Mark request as not cached for metrics
    req.cached = false;

    // Store original res.json method
    const originalJson = res.json;

    // Override res.json method
    res.json = function(body: any) {
      // Store response in cache
      cache.set(key, body, ttl);
      logger.debug(`Cached response for ${key}`);
      
      // Call original method
      return originalJson.call(this, body);
    };

    next();
  };
};

// Cache invalidation middleware
export const invalidateCache = (pattern: string) => {
  return (req: any, res: any, next: any) => {
    const keys = cache.keys();
    const regex = new RegExp(pattern);
    let invalidatedCount = 0;
    
    keys.forEach(key => {
      if (regex.test(key)) {
        cache.del(key);
        invalidatedCount++;
        logger.debug(`Invalidated cache for ${key}`);
      }
    });
    
    if (invalidatedCount > 0) {
      logger.info(`Invalidated ${invalidatedCount} cache entries matching pattern ${pattern}`);
    }
    
    next();
  };
};

// Clear all cache
export const clearCache = () => {
  const count = cache.keys().length;
  cache.flushAll();
  logger.info(`Cache cleared: ${count} entries removed`);
  return count;
};

// Get cache stats
export const getCacheStats = () => {
  const stats = cache.getStats();
  return {
    hits: stats.hits,
    misses: stats.misses,
    keys: cache.keys().length,
    ksize: stats.kbytes,
    vsize: stats.vbytes
  };
};

export default cache; 