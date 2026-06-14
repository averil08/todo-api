import express from "express";
import todoRouter from "./todo.route";
import authRouter from "./auth.route";
import {Router} from "express";

const router = express.Router();

router.get("/v1", (_, res) => {
  res.json({
    message: "Welcome to my API",
  });
});

router.use("/auth", authRouter);
router.use("/todos", todoRouter);

export default router;
