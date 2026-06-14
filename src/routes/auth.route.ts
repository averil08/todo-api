import express from "express";
import AuthCtrl from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", AuthCtrl.signup);
router.post("/login", AuthCtrl.login);

export default router;