import prisma from "./db.js";

/**
 * Crea un nuevo paciente con su usuario asociado
 * @param {Object} params - Parámetros de creación
 * @param {Object} params.userData - Datos del usuario
 * @param {Object} params.patientData - Datos específicos del paciente
 * @returns {Promise} Paciente creado con usuario incluido
 */
export const createPatient = async ({ userData, patientData }) => {
  return prisma.patient.create({
    data: {
      dateOfBirth: patientData.dateOfBirth || null,
      ethnicity: patientData.ethnicity || null,
      residentialStatus: patientData.residentialStatus || null,
      partnerName: patientData.partnerName || null,
      partnerDateOfBirth: patientData.partnerDateOfBirth || null,
      partnerAddress: patientData.partnerAddress || null,
      partnerEmail: patientData.partnerEmail || null,
      partnerPhone: patientData.partnerPhone || null,
      GPName: patientData.GPName || null,
      GPEmail: patientData.GPEmail || null,
      GPPhone: patientData.GPPhone || null,
      isActive: true,

      // La midWife debe existir
      midWife: {
        connect: { id: patientData.midWifeId }
      },

      // Crea un usuario nuevo
      user: {
        create: {
          name: userData.name,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          password: null,
          role: "PATIENT",
        },
      },
    },
    include: { 
      user: true,
      midWife: true 
    },
  });
};

/**
 * Obtiene todos los pacientes
 * @returns {Promise} Lista de pacientes con sus usuarios y midwife
 */
export const findAll = async () => {
  return prisma.patient.findMany({
    include: { 
      user: true,
      midWife: true
    },
  });
};

/**
 * Obtiene todos los pacientes activos
 * @returns {Promise} Lista de pacientes activos con sus usuarios y midwife
 */
export const findAllActive = async () => {
  return prisma.patient.findMany({
    where: { isActive: true },
    include: { 
      user: true,
      midWife: true
    },
  });
};

/**
 * Busca un paciente por email
 * @param {string} email - Email a buscar
 * @returns {Promise} Usuario con datos de paciente si existe
 */
export const findByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
    include: {
      patient: true,
    },
  });
};

/**
 * Busca un paciente por ID
 * @param {number} patientId - ID del paciente
 * @returns {Promise} Paciente con usuario y midwife incluidos
 */
export const findById = async (patientId) => {
  return prisma.patient.findUnique({
    where: { id: patientId },
    include: { 
      user: true,
      midWife: true
    },
  });
};

/**
 * Busca un paciente por userId
 * @param {number} userId - ID del usuario
 * @returns {Promise} Paciente encontrado con usuario y midwife
 */
export const findByUserId = async (userId) => {
  return prisma.patient.findUnique({
    where: { userId },
    include: { 
      user: true,
      midWife: true
    },
  });
};

/**
 * Actualiza los datos de un paciente
 * @param {number} patientId - ID del paciente
 * @param {Object} data - Datos a actualizar
 * @returns {Promise} Paciente actualizado con usuario y midwife
 */
export const updatePatient = async (patientId, data) => {
  return prisma.patient.update({
    where: { id: patientId },
    data: data,
    include: { 
      user: true,
      midWife: true
    },
  });
};

/**
 * Actualiza los datos del usuario de un paciente
 * @param {number} userId - ID del usuario
 * @param {Object} data - Datos a actualizar
 * @returns {Promise} Usuario actualizado
 */
export const updatePatientUser = async (userId, data) => {
  return prisma.user.update({
    where: { id: userId },
    data: data,
  });
};

/**
 * Verifica si un email ya está registrado como paciente
 * @param {string} email - Email a verificar
 * @returns {Promise<boolean>} true si existe, false si no existe
 */
export const existsByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { patient: true },
  });
  return user !== null && user.patient !== null;
};

