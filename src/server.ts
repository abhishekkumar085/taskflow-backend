import app from "./app";
import connectDB from "./config/connectDB";
import { connectRedis } from "./config/redis";
import logger from "./utils/logger";

const PORT = process.env.PORT || 7100;

const startServer = async () => {
  await connectDB();
  await connectRedis();

  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

startServer();
