/**
 * Template HTML para email de invitación a pacientes
 */

/**
 * Genera el HTML del email de invitación para un paciente
 * @param {string} patientName - Nombre del paciente
 * @param {string} inviteUrl - URL de invitación
 * @returns {string} HTML del email
 */
export function generatePatientInviteHtml(patientName, inviteUrl) {
  // seguridad básica: si vienen undefined/null convertimos a string vacía
  const safeName = String(patientName ?? "");
  const safeUrl = String(inviteUrl ?? "#");

  // HTML + CSS embebido. Incluye un "banner" SVG clickable que redirige a safeUrl.
  return `
  <!doctype html>
  <html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Invitación</title>
    <style>
      /* Tipografía y reset ligero */
      :root{
        --bg: #f6f9fc;
        --card: #ffffff;
        --accent: #0066cc;
        --accent-dark: #0052a3;
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
        max-width:700px;
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
        padding:20px;
        text-align:center;
        background: linear-gradient(90deg, rgba(0,102,204,0.06), rgba(0,82,163,0.03));
      }
      .greeting {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
      }
      .name {
        display:block;
        margin-top:6px;
        font-size:28px;
        color: var(--accent);
      }
      .banner-wrap{
        padding: 18px 20px 0 20px;
        display:flex;
        justify-content:center;
      }
      .content{
        padding: 22px;
        line-height:1.6;
        font-size:15px;
        color: #10203a;
      }
      .cta{
        display:block;
        width: fit-content;
        margin: 18px auto 0;
        text-decoration:none;
        background: linear-gradient(180deg,var(--accent),var(--accent-dark));
        color: #fff;
        padding: 12px 20px;
        border-radius: 10px;
        font-weight:600;
        box-shadow: 0 6px 18px rgba(0,102,204,0.18);
      }
      .note{
        margin-top:14px;
        font-size:13px;
        color: var(--muted);
        text-align:center;
      }
      .footer{
        padding: 14px 22px;
        font-size:13px;
        color: #445566;
        border-top:1px solid rgba(15,30,50,0.03);
        background: rgba(250,252,255,0.6);
      }
      /* Responsivo */
      @media (max-width:520px){
        .container{ padding: 12px; }
        .name { font-size:22px; }
        .greeting { font-size:18px; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="card" role="article" aria-label="Invitación a completar test">
        <div class="header">
          <p class="greeting">Hola,</p>
          <strong class="name">${escapeHtml(safeName)}</strong>
        </div>

        <div class="banner-wrap">
          <!-- Banner SVG clickable; sirve como "imagen" que redirige a la invitación -->
          <a href="${escapeAttr(
            safeUrl
          )}" target="_blank" rel="noopener noreferrer" aria-label="Ir a la invitación">
            <svg width="640" height="140" viewBox="0 0 640 140" xmlns="http://www.w3.org/2000/svg" style="border-radius:10px; display:block;">
              <defs>
                <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stop-color="#e6f0ff"/>
                  <stop offset="1" stop-color="#ffffff"/>
                </linearGradient>
              </defs>
              <rect rx="10" width="100%" height="100%" fill="url(#g1)"/>
              <g font-family="Arial, Helvetica, sans-serif">
                <text x="30" y="48" font-size="20" fill="#003a6b" font-weight="700">Te invitamos a realizar</text>
                <text x="30" y="86" font-size="26" fill="#0052a3" font-weight="800">tu test de salud</text>
                <rect x="480" y="40" width="130" height="50" rx="8" fill="#0066cc"/>
                <text x="545" y="73" font-size="14" fill="#fff" font-weight="700" text-anchor="middle">Comenzar</text>
              </g>
            </svg>
          </a>
        </div>

        <div class="content">
          <p>
            Hola <strong>${escapeHtml(safeName)}</strong>,<br/>
            Te queremos invitar a realizar el test y a completar tus datos. Esto nos ayudará a brindarte un mejor seguimiento y recomendaciones personalizadas.
          </p>

          <p style="text-align:center;">
            <a class="cta" href="${escapeAttr(
              safeUrl
            )}" target="_blank" rel="noopener noreferrer">
              Completar el test ahora
            </a>
          </p>

          <p class="note">
            Si el botón anterior no funciona, copia y pega el siguiente enlace en tu navegador:<br/>
            <span style="word-break:break-all;">${escapeHtml(safeUrl)}</span>
          </p>
        </div>

        <div class="footer">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
            <div>
              <strong>Equipo de Salud</strong><br/>
              Si necesitas ayuda responde este correo.
            </div>
            <div style="text-align:right; font-size:12px; color:var(--muted);">
              © ${new Date().getFullYear()} Clínica
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
}

/* ---------------------------
   Helpers (internos)
   ---------------------------
   escapeHtml y escapeAttr son funciones simples para evitar inyección de HTML/atributos
   y asegurar que nombres o URLs con caracteres especiales no rompan el HTML.
*/
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(str) {
  // además de escapar HTML, también re-encodifica comillas
  return escapeHtml(str).replace(/"/g, "&quot;");
}

