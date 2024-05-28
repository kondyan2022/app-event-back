const { Event } = require("../models");
const redisClient = require("./myredis");

const getAll = async (field, direction, page, limit) => {
  const redisKey = JSON.stringify({ field, direction, page, limit });
  if (redisClient.isReady) {
    const value = await redisClient.get(redisKey);
    if (value) {
      console.log("Using cache 🥯");
      return JSON.parse(value);
    }
  }
  const skip = (page - 1) * limit;
  const data = await Event.find()
    .limit(limit)
    .skip(skip)
    .sort({ [field]: direction });
  const itemCount = await Event.countDocuments();
  const totalPage = Math.ceil(itemCount / limit);
  if (redisClient.isReady) {
    console.log("Saving cache 🍪");
    await redisClient.set(
      redisKey,
      JSON.stringify({
        sort: { field, direction },
        page,
        limit,
        itemCount,
        totalPage,
        data,
      }),
      { EX: 60 }
    );
  }
  return {
    sort: { field, direction },
    page,
    limit,
    itemCount,
    totalPage,
    data,
  };
};

module.exports = { getAll };
