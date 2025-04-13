import { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';
import logger from './logger';

// Initialize cache with 1 hour standard TTL
const cache = new NodeCache({ stdTTL: 3600 });

// Cache middleware
export const cacheMiddleware = (ttl: number = 3600) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.originalUrl || req.url;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      logger.debug(`Cache hit for ${key}`);
      return res.json({ ...cachedResponse, cached: true });
    }

    const originalJson = res.json;
    res.json = function(body) {
      cache.set(key, body, ttl);
      logger.debug(`Cache miss for ${key}, storing response`);
      return originalJson.call(this, body);
    };

    next();
  };
};

// Cache invalidation middleware
export const invalidateCache = (pattern: string) => {
  return (_req: Request, _res: Response, next: NextFunction) => {
    const keys = cache.keys();
    const regex = new RegExp(pattern);
    
    keys.forEach(key => {
      if (regex.test(key)) {
        cache.del(key);
        logger.debug(`Invalidated cache for ${key}`);
      }
    });

    next();
  };
};

// Get cache stats
export const getCacheStats = () => {
  const stats = cache.getStats();
  return {
    hits: stats.hits,
    misses: stats.misses,
    keys: stats.keys,
    size: stats.vsize
  };
};

export default cache; 