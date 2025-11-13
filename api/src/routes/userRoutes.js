import { Router } from "express";
import { CreateMidwife } from "../controllers/midWifeController.js";
import { loginMidwife } from "../controllers/authController.js";
import { activateUserController as activateUser } from "../controllers/midWifeController.js";
import { invitePatientController as invitePatient } from "../controllers/PatientController.js";
import { verificarToken } from "../middleware/jwtmiddleware.js";
const router = Router();

router.post("/midwife", verificarToken("ADMIN"), CreateMidwife);
router.post("/login", loginMidwife);
router.get("/active/:encodedlink", activateUser);
router.post("/patient/invite", verificarToken("MIDWIFE"),invitePatient);
export default router;
