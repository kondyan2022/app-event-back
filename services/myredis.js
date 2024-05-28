const redis = require("redis");

// const getRedisClient = async () => {
//   return await createClient()
//     .on("error", (err) => console.log("Redis Client Error", err))
//     .connect();
// };

const redisClient = redis.createClient();
redisClient.on("error", (err) => {
  console.log("error", err);
  console.log(redisClient.isReady);
  redisClient.disconnect();
});
redisClient.on("connect", function () {
  console.log("You are now connected to Redis");
});

redisClient.connect();

module.exports = redisClient;
