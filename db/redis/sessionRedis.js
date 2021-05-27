const redis = require('./index');
const { promisify } = require("util");

const getAsync = promisify(redis.get).bind(redis);
const setAsync = promisify(redis.set).bind(redis);
const delAsync = promisify(redis.del).bind(redis);
const ONE_DAY = 1000 * 60 * 60 * 24;
class SessionRedis {
  async get(key) {
    const res = await getAsync(key);
    console.log('get redis: ', res);
    if (!res) return null;
    return JSON.parse(res);
  }

  async set(key, value, maxAge) {
    maxAge = typeof maxAge === "number" ? maxAge : ONE_DAY;
    value = JSON.stringify(value);
    await setAsync(key, value, "PX", maxAge);
  }

  async destroy(key) {
    await delAsync(key);
  }
}
module.exports = SessionRedis;