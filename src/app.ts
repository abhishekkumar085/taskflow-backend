import e from "express";
import express from "express";
import { StatusCodes } from "http-status-codes";

const app = express();

app.get("/ping", (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Server is up and running!",
  });
});

export default app;
