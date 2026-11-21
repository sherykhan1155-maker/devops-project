const { createClient } = require('redis');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || 'redis://redis:6379';

const redis = createClient({ url: REDIS_URL });

redis.on('error', (err) => {
  console.log('Redis client error:', err.message);
});

app.get('/visits', async (req, res) => {
  try {
    if (!redis.isOpen) {
      return res.status(503).json({ error: 'Redis is not connected' });
    }
    const count = await redis.incr('visits');
    res.json({ visits: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

(async () => {
  try {
    await redis.connect();
    console.log('Connected to Redis successfully');
  } catch (err) {
    console.log('Initial Redis connection failed, running without cache:', err.message);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})();
