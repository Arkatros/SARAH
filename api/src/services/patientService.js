import { genericSendMail } from "./mailService.js";
import { findByEmailAndRole } from "../repositories/userRepository.js";
import { generatePatientInviteHtml } from "../templates/mailInvitacionPaciente.js";

export async function sendPatientInviteEmail(toEmail, patientName, inviteUrl) {
  const subject = `Invitación para completar el test`;
  const htmlBody = generatePatientInviteHtml(patientName, inviteUrl);
  const result = await genericSendMail(toEmail, subject, htmlBody);
  return result;
}

export const existsPatientEmail = async (email) => {
  if (await findByEmailAndRole(email, "midwife")) return true;
  else {
    return false;
  }
};
