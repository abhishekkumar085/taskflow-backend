import express from "express";
import { StatusCodes } from "http-status-codes";
import morgan from "morgan";
import logger from "./utils/logger";
import errorMiddleware from "./middlewares/error.middleware";
import { authRoutes } from "./modules/auth";
import { projectRoutes } from "./modules/project";

const app = express();
const stream = {
  write: (message: string) => logger.info(message.trim()),
};
app.use(morgan("dev", { stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);

app.get("/ping", (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Server is up and running!",
  });
});

app.use(errorMiddleware);

export default app;
