import app from "./app";
import connectDB from "./config/connectDB";
import logger from "./utils/logger";

const PORT = process.env.PORT || 7100;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

startServer();
