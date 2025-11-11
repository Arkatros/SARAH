import { Router } from "express";
import {
  registerPatientController,
  getAllPatientsController,
  getActivePatientsController,
  getPatientByIdController,
  getPatientByEmailController,
  updatePatientController,
  invitePatientController,
} from "../controllers/patientController.js";

const router = Router();

// Rutas públicas
router.post("/register", registerPatientController);
router.post("/invite", invitePatientController);

// Rutas para obtener pacientes
router.get("/", getAllPatientsController);
router.get("/active", getActivePatientsController);
router.get("/:id", getPatientByIdController);
router.get("/email/:email", getPatientByEmailController);

// Ruta para actualizar pacientes (incluye activar/desactivar con isActive)
router.put("/:id", updatePatientController);

export default router;

