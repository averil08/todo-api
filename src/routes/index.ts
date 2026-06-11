import express from "express";
import todoRouter from "./todo.route";

const router = express.Router();

router.get("/v1", (_, res) => {
  res.json({
    message: "Welcome to my API",
  });
});

router.use("/todos", todoRouter);

export default router;
