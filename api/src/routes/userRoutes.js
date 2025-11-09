import { Router } from "express";
import { CreateMidwife } from "../controllers/midWifeController.js";
import { loginMidwife } from "../controllers/authController.js";
import { activateUserController as activateUser } from "../controllers/midWifeController.js";
import { invitePatientController as invitePatient } from "../controllers/PatientController.js";
const router = Router();

router.post("/midwife", CreateMidwife);
router.post("/login/midwife", loginMidwife);
router.get("/active/:encodedlink", activateUser);
router.post("/invite/patient", invitePatient);
export default router;
