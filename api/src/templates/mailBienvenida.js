/**
 * Template HTML para email de bienvenida a midwives (parteras/obstetras)
 */

/**
 * Genera el HTML del email de bienvenida para un midwife
 * @param {string} name - Nombre del midwife
 * @param {string} temporalPass - Contraseña temporal
 * @param {string} activationLink - Link de activación de cuenta
 * @returns {string} HTML del email
 */
export function generateMidwifeBienvenidaHtml(name, temporalPass, activationLink) {
  const safeName = String(name ?? "");
  const safePassword = String(temporalPass ?? "");
  const safeLink = String(activationLink ?? "#");

  return `
  <!doctype html>
  <html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Bienvenida al Sistema</title>
    <style>
      :root{
        --bg: #f6f9fc;
        --card: #ffffff;
        --accent: #10b981;
        --accent-dark: #059669;
        --muted: #6b7280;
        --radius: 12px;
      }
      html,body{
        margin:0;
        padding:0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        background: var(--bg);
        color: #0f172a;
        -webkit-font-smoothing:antialiased;
      }
      .container{
        max-width:600px;
        margin:28px auto;
        padding:20px;
      }
      .card{
        background: linear-gradient(180deg, rgba(255,255,255,0.98), var(--card));
        border-radius: var(--radius);
        box-shadow: 0 8px 30px rgba(12, 20, 30, 0.08);
        overflow: hidden;
        border: 1px solid rgba(10,20,40,0.04);
      }
      .header{
        padding:30px 20px;
        text-align:center;
        background: linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,150,105,0.04));
      }
      .title {
        margin: 0;
        font-size: 26px;
        font-weight: 700;
        color: var(--accent-dark);
      }
      .subtitle {
        margin: 8px 0 0;
        font-size: 16px;
        color: var(--muted);
      }
      .content{
        padding: 30px 24px;
        line-height:1.7;
        font-size:15px;
        color: #10203a;
      }
      .info-box{
        background: rgba(16,185,129,0.05);
        border-left: 4px solid var(--accent);
        padding: 16px 20px;
        margin: 20px 0;
        border-radius: 8px;
      }
      .info-label{
        font-size: 13px;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 6px;
      }
      .info-value{
        font-size: 18px;
        font-weight: 600;
        color: var(--accent-dark);
        font-family: 'Courier New', monospace;
      }
      .cta{
        display:block;
        width: fit-content;
        margin: 24px auto 0;
        text-decoration:none;
        background: linear-gradient(180deg,var(--accent),var(--accent-dark));
        color: #fff;
        padding: 14px 28px;
        border-radius: 10px;
        font-weight:600;
        box-shadow: 0 6px 18px rgba(16,185,129,0.22);
        transition: all 0.3s ease;
      }
      .note{
        margin-top:20px;
        padding-top:20px;
        border-top: 1px solid rgba(15,30,50,0.06);
        font-size:13px;
        color: var(--muted);
      }
      .footer{
        padding: 18px 24px;
        font-size:13px;
        color: #445566;
        text-align:center;
        border-top:1px solid rgba(15,30,50,0.03);
        background: rgba(250,252,255,0.6);
      }
      /* Responsivo */
      @media (max-width:520px){
        .container{ padding: 12px; }
        .title { font-size:22px; }
        .subtitle { font-size:14px; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="card">
        <div class="header">
          <h1 class="title">¡Bienvenida al Sistema!</h1>
          <p class="subtitle">Tu cuenta ha sido creada exitosamente</p>
        </div>

        <div class="content">
          <p>Hola <strong>${escapeHtml(safeName)}</strong>,</p>
          
          <p>
            Nos complace darte la bienvenida a nuestra plataforma de gestión de salud materno-infantil. 
            Tu cuenta ha sido creada y está lista para ser activada.
          </p>

          <div class="info-box">
            <div class="info-label">Tu contraseña temporal es:</div>
            <div class="info-value">${escapeHtml(safePassword)}</div>
          </div>

          <p>
            <strong>Importante:</strong> Esta es una contraseña temporal. Por razones de seguridad, 
            te recomendamos cambiarla inmediatamente después de activar tu cuenta.
          </p>

          <p style="text-align:center;">
            <a class="cta" href="${escapeAttr(safeLink)}" target="_blank" rel="noopener noreferrer">
              Activar mi cuenta
            </a>
          </p>

          <div class="note">
            <strong>¿No funciona el botón?</strong><br/>
            Copia y pega el siguiente enlace en tu navegador:<br/>
            <span style="word-break:break-all; font-family: 'Courier New', monospace; font-size:12px;">
              ${escapeHtml(safeLink)}
            </span>
          </div>

          <div class="note" style="margin-top:24px; padding-top:20px;">
            <strong>Próximos pasos:</strong>
            <ol style="margin:10px 0; padding-left:20px; text-align:left;">
              <li>Activa tu cuenta haciendo clic en el botón de arriba</li>
              <li>Inicia sesión con tu contraseña temporal</li>
              <li>Cambia tu contraseña por una segura</li>
              <li>Completa tu perfil</li>
            </ol>
          </div>
        </div>

        <div class="footer">
          <strong>Equipo de Desarrollo SARAH</strong><br/>
          Si necesitas ayuda, por favor responde este correo.<br/>
          <small style="color:var(--muted);">© ${new Date().getFullYear()} Sistema SARAH</small>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
}

/**
 * Genera el texto plano del email de bienvenida (fallback para clientes sin HTML)
 * @param {string} name - Nombre del midwife
 * @param {string} temporalPass - Contraseña temporal
 * @param {string} activationLink - Link de activación de cuenta
 * @returns {string} Texto plano del email
 */
export function generateMidwifeBienvenidaText(name, temporalPass, activationLink) {
  return `Hola ${name},

Bienvenida al Sistema SARAH de gestión de salud materno-infantil.

Tu contraseña temporal es: ${temporalPass}

Para activar tu cuenta, visita el siguiente enlace:
${activationLink}

Importante: Por razones de seguridad, te recomendamos cambiar tu contraseña temporal inmediatamente después de activar tu cuenta.

Próximos pasos:
1. Activa tu cuenta visitando el enlace de arriba
2. Inicia sesión con tu contraseña temporal
3. Cambia tu contraseña por una segura
4. Completa tu perfil

Si necesitas ayuda, por favor responde este correo.

Equipo de Desarrollo SARAH
© ${new Date().getFullYear()} Sistema SARAH`;
}

/* ---------------------------
   Helpers (internos)
   --------------------------- */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, "&quot;");
}

