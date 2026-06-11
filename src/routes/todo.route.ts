import express from "express";
import TodoCtrl from "../controllers/todo.controller";

const router = express.Router();

router.post("/", TodoCtrl.createTask);
router.put("/:id", TodoCtrl.update);
router.patch("/:id", TodoCtrl.update);
router.delete("/:id", TodoCtrl.delete);

export default router;