import { genericSendMail } from "./mailService.js";
import { generatePatientInviteHtml } from "../templates/mailInvitacionPaciente.js";
import * as patientRepository from "../repositories/patientRepository.js";
import { findMidwifeByUserId } from "../repositories/midwifeRepository.js";

import bcrypt from "bcryptjs";
import SarahError from "../utils/sarahError.js";

/**
 * Registra un nuevo paciente en el sistema
 * @param {Object} userData - Datos del usuario (name, lastName, email, phone)
 * @param {Object} patientData - Datos específicos del paciente
 * @param {number} patientData.midWifeId - ID de la midwife asignada
 * @returns {Promise} Paciente creado
 */
export const registerPatient = async (userData, patientData = {}) => {
  // Validar que midWifeId esté presente
  if (!patientData.midWifeId) {
    throw new SarahError("El campo midWifeId es obligatorio", 400);
  }

  // Verificar si el email ya existe
  const existingPatient = await patientRepository.findByEmail(userData.email);
  if (existingPatient) {
    throw new SarahError("El email ya está registrado en el sistema", 400);
  }
  patientData.midWifeId = (await findMidwifeByUserId(patientData.midWifeId)).id;
  const patient = await patientRepository.createPatient({
    userData,
    patientData,
  });

  return patient;
};

/**
 * Obtiene todos los pacientes
 * @returns {Promise} Lista de pacientes
 */
export const getAllPatients = async () => {
  return await patientRepository.findAll();
};

/**
 * Obtiene todos los pacientes activos
 * @returns {Promise} Lista de pacientes activos
 */
export const getActivePatients = async () => {
  return await patientRepository.findAllActive();
};

/**
 * Obtiene un paciente por su ID
 * @param {number} patientId - ID del paciente
 * @returns {Promise} Paciente encontrado
 */
export const getPatientById = async (patientId) => {
  const patient = await patientRepository.findById(patientId);
  if (!patient) {
    throw new SarahError("Paciente no encontrado", 404);
  }
  return patient;
};

/**
 * Obtiene un paciente por email
 * @param {string} email - Email del paciente
 * @returns {Promise} Paciente encontrado
 */
export const getPatientByEmail = async (email) => {
  const user = await patientRepository.findByEmail(email);
  if (!user || !user.patient) {
    throw new SarahError("Paciente no encontrado", 404);
  }
  return user;
};

/**
 * Actualiza los datos de un paciente
 * @param {number} patientId - ID del paciente
 * @param {Object} patientData - Datos a actualizar
 * @returns {Promise} Paciente actualizado
 */
export const updatePatient = async (patientId, patientData) => {
  const patient = await patientRepository.findById(patientId);
  if (!patient) {
    throw new SarahError("Paciente no encontrado", 404);
  }

  return await patientRepository.updatePatient(patientId, patientData);
};

/**
 * Actualiza los datos del usuario de un paciente
 * @param {number} userId - ID del usuario
 * @param {Object} userData - Datos a actualizar
 * @returns {Promise} Usuario actualizado
 */
export const updatePatientUser = async (userId, userData) => {
  return await patientRepository.updatePatientUser(userId, userData);
};

/**
 * Verifica si un email ya está registrado como paciente
 * @param {string} email - Email a verificar
 * @returns {Promise<boolean>} true si existe, false si no existe
 */
export const existsPatientEmail = async (email) => {
  return await patientRepository.existsByEmail(email);
};

/**
 * Envía email de invitación a un paciente
 * @param {string} toEmail - Email del destinatario
 * @param {string} patientName - Nombre del paciente
 * @param {string} inviteUrl - URL de invitación
 * @returns {Promise} Resultado del envío
 */
export async function sendPatientInviteEmail(
  toEmail,
  patientName,
  inviteUrl,
  midWifeId
) {
  const subject = `Invitación para completar el test`;
  const htmlBody = generatePatientInviteHtml(
    patientName,
    inviteUrl,
    midWifeId,
    toEmail
  );
  const result = await genericSendMail(toEmail, subject, htmlBody);
  return result;
}
