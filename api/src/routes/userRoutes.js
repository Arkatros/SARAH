import { Router } from "express";
import { CreateMidwife } from "../controllers/midWifeController.js";
import { loginMidwife } from "../controllers/authController.js";
const router = Router();

router.post("/midwife", CreateMidwife);
router.post("/login/midwife", loginMidwife);

export default router;
