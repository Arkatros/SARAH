import { Router } from "express";
import { getQuestions, postScore } from "../controllers/testController.js";

const router = Router();

router.get("/:code/questions", getQuestions);
router.post("/:code/score", postScore);

export default router;


