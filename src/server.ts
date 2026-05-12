import app from "./app";
import logger from "./utils/logger";

const PORT = process.env.PORT || 7100;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  logger.info(`Server started on port ${PORT}`);
});
