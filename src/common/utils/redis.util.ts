import redisClient from "../../config/redis";
import logger from "../../utils/logger";

export const setCache = async (
  key: string,
  value: unknown,
  expiryInSeconds?: number,
) => {
  try {
    const serializedValue = JSON.stringify(value);

    if (expiryInSeconds) {
      await redisClient.set(key, serializedValue, {
        EX: expiryInSeconds,
      });
    } else {
      await redisClient.set(key, serializedValue);
    }
  } catch (error) {
    logger.error(`Redis SET Error: ${error}`);

    throw error;
  }
};

export const getCache = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await redisClient.get(key);
    if (!data) {
      return null;
    }
    return JSON.parse(data) as T;
  } catch (error) {
    logger.error(`Redis GET Error: ${error}`);
    throw error;
  }
};

export const deleteCache = async (key: string) => {
  try {
    await redisClient.del(key);
  } catch (error) {
    logger.error(`Redis DELETE Error: ${error}`);
    throw error;
  }
};
