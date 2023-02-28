const redis = require('redis');
const { REDIS_CACHE_URL } = require('./env');

const { log } = console;

const client = redis.createClient({ url: REDIS_CACHE_URL });
client.on('error', (err) => log('Redis Client Error', err));

module.exports = {
  connect: () => new Promise((resolve, reject) => {
    client.on('connect', resolve);
    client.on('error', reject);
  }),
  disconnect: () => new Promise((resolve, reject) => {
    client.quit((err) => {
      if (err) reject(err);
      resolve();
    });
  }),
  get: (key) => new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if (err) reject(err);
      resolve(reply);
    });
  }),
  setex: (key, ttl, value) => new Promise((resolve, reject) => {
    client.setex(key, ttl, value, (err, reply) => {
      if (err) reject(err);
      resolve(reply);
    });
  }),
};
