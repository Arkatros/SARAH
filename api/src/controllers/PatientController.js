import * as service from "../services/patientService.js";
import SarahError from "../utils/sarahError.js";

const urlToRegisterPatient = "http://localhost:4200/patient/register/";
/**
 * Registra un nuevo paciente en el sistema
 * POST /api/patients/register
 */
export const registerPatientController = async (req, res) => {
  try {
    const { name, lastName, email, phone, midWifeId, ...patientData } =
      req.body;

    // Validaciones de campos obligatorios
    if (!name || !lastName || !email || !phone) {
      return res.status(400).json({
        message: "Faltan campos obligatorios: name, lastName, email, phone",
        data: null,
      });
    }

    if (!midWifeId) {
      return res.status(400).json({
        message: "El campo midWifeId es obligatorio",
        data: null,
      });
    }

    const userData = { name, lastName, email, phone };
    const patientDataComplete = {
      ...patientData,
      midWifeId: parseInt(midWifeId),
    };
    console.log(patientData);
    const patient = await service.registerPatient(
      userData,
      patientDataComplete
    );

    return res.status(201).json({
      message: "Paciente registrado con éxito",
      data: {
        id: patient.id,
        userId: patient.userId,
        midWifeId: patient.midWifeId,
        user: {
          name: patient.user.name,
          lastName: patient.user.lastName,
          email: patient.user.email,
          phone: patient.user.phone,
        },
        midWife: patient.midWife
          ? {
              id: patient.midWife.id,
              APC: patient.midWife.APC,
            }
          : null,
      },
    });
  } catch (error) {
    if (error instanceof SarahError) {
      return res.status(error.statusCode || 400).json({
        message: error.message,
        data: null,
      });
    }
    console.error("Error en registerPatientController:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      data: null,
    });
  }
};

/**
 * Obtiene todos los pacientes
 * GET /api/patients
 */
export const getAllPatientsController = async (req, res) => {
  try {
    const patients = await service.getAllPatients();
    return res.status(200).json({
      message: "Pacientes obtenidos exitosamente",
      data: patients,
    });
  } catch (error) {
    console.error("Error en getAllPatientsController:", error);
    return res.status(500).json({
      message: "Error al obtener pacientes",
      data: null,
    });
  }
};

/**
 * Obtiene todos los pacientes activos
 * GET /api/patients/active
 */
export const getActivePatientsController = async (req, res) => {
  try {
    const patients = await service.getActivePatients();
    return res.status(200).json({
      message: "Pacientes activos obtenidos exitosamente",
      data: patients,
    });
  } catch (error) {
    console.error("Error en getActivePatientsController:", error);
    return res.status(500).json({
      message: "Error al obtener pacientes activos",
      data: null,
    });
  }
};

/**
 * Obtiene un paciente por ID
 * GET /api/patients/:id
 */
export const getPatientByIdController = async (req, res) => {
  try {
    const patientId = parseInt(req.params.id);
    if (isNaN(patientId)) {
      return res.status(400).json({
        message: "ID de paciente inválido",
        data: null,
      });
    }

    const patient = await service.getPatientById(patientId);
    return res.status(200).json({
      message: "Paciente obtenido exitosamente",
      data: patient,
    });
  } catch (error) {
    if (error instanceof SarahError) {
      return res.status(error.statusCode || 400).json({
        message: error.message,
        data: null,
      });
    }
    console.error("Error en getPatientByIdController:", error);
    return res.status(500).json({
      message: "Error al obtener paciente",
      data: null,
    });
  }
};

/**
 * Obtiene un paciente por email
 * GET /api/patients/email/:email
 */
export const getPatientByEmailController = async (req, res) => {
  try {
    const email = req.params.email;
    const patient = await service.getPatientByEmail(email);
    return res.status(200).json({
      message: "Paciente obtenido exitosamente",
      data: patient,
    });
  } catch (error) {
    if (error instanceof SarahError) {
      return res.status(error.statusCode || 400).json({
        message: error.message,
        data: null,
      });
    }
    console.error("Error en getPatientByEmailController:", error);
    return res.status(500).json({
      message: "Error al obtener paciente",
      data: null,
    });
  }
};

/**
 * Actualiza los datos de un paciente
 * PUT /api/patients/:id
 * Para desactivar: envía { "isActive": false }
 * Para activar: envía { "isActive": true }
 */
export const updatePatientController = async (req, res) => {
  try {
    const patientId = parseInt(req.params.id);
    if (isNaN(patientId)) {
      return res.status(400).json({
        message: "ID de paciente inválido",
        data: null,
      });
    }

    const patientData = req.body;
    const updatedPatient = await service.updatePatient(patientId, patientData);

    return res.status(200).json({
      message: "Paciente actualizado exitosamente",
      data: updatedPatient,
    });
  } catch (error) {
    if (error instanceof SarahError) {
      return res.status(error.statusCode || 400).json({
        message: error.message,
        data: null,
      });
    }
    console.error("Error en updatePatientController:", error);
    return res.status(500).json({
      message: "Error al actualizar paciente",
      data: null,
    });
  }
};

/**
 * Envía email de invitación a un paciente
 * POST /api/patients/invite
 */
export const invitePatientController = async (req, res) => {
  const request = req.body;
  try {
    // Validaciones
    if (!request.email || !request.name) {
      return res.status(400).json({
        message: "Faltan campos obligatorios: email, name",
        data: null,
      });
    }

    // Verificar si el email ya está registrado
    const emailExists = await service.existsPatientEmail(request.email);

    if (emailExists) {
      return res.status(409).json({
        message: "El email ya está registrado en el sistema",
        data: null,
      });
    }

    // Enviar email de invitación
    await service.sendPatientInviteEmail(
      request.email,
      request.name,
      urlToRegisterPatient || "URL AL FORMULARIO",
      req.user.id
    );

    return res.status(200).json({
      message: "Email enviado exitosamente al paciente",
      data: null,
    });
  } catch (error) {
    if (error instanceof SarahError) {
      return res.status(error.statusCode || 400).json({
        message: error.message,
        data: null,
      });
    }
    console.error("Error en invitePatientController:", error);
    return res.status(500).json({
      message: "Error al enviar invitación",
      data: null,
    });
  }
};
