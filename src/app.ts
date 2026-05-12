import express from "express";
import { StatusCodes } from "http-status-codes";
import morgan from "morgan";
import logger from "./utils/logger";
import errorMiddleware from "./middlewares/error.middleware";
import { authRoutes } from "./modules/auth";

const app = express();
const stream = {
  write: (message: string) => logger.info(message.trim()),
};
app.use(morgan("dev", { stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);

app.use("/api/v1/auth", authRoutes);

app.get("/ping", (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Server is up and running!",
  });
});

export default app;
