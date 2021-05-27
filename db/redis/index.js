const redis = require("redis");
const config = require("../../config");
const client = redis.createClient(config.redis);

client.on("connect", function () {
  console.log("### redis connect");
});
client.on("reconnecting", function () {
  console.log("### redis reconnecting");
});
client.on("end", function () {
  console.log("### redis end");
});
client.on("error", function (error) {
  console.error("### redis error", error);
});

client.on("ready", function () {
  console.log("### redis ready");
});

module.exports = client;
