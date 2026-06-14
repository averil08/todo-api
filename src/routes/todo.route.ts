import express from "express";
import TodoCtrl from "../controllers/todo.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.use(authMiddleware);

router.get("/", TodoCtrl.getAll);
router.get("/:id", TodoCtrl.getById);
router.post("/", TodoCtrl.createTask);
router.put("/:id", TodoCtrl.update);
router.patch("/:id", TodoCtrl.update);
router.delete("/:id", TodoCtrl.delete);

export default router;