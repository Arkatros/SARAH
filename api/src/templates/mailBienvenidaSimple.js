/**
 * Template simple de texto para email de bienvenida a midwives
 */

/**
 * Genera el subject del email de bienvenida
 * @returns {string} Subject del email
 */
export function getMidwifeWelcomeSubject() {
  return "Midwife Password setting";
}

/**
 * Genera el texto del email de bienvenida
 * @param {string} name - Nombre del midwife
 * @param {string} temporalPass - Contraseña temporal
 * @param {string} activationLink - Link de activación
 * @returns {string} Texto del email
 */
export function getMidwifeWelcomeText(name, temporalPass, activationLink) {
  return `Hi ${name} your temporal password is ${temporalPass}
      go to this link to active your account ${activationLink}
          `;
}

