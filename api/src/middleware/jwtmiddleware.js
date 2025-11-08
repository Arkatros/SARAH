const jwt = require("jsonwebtoken");

const SECRET_KEY = env("SECRET_KEY");

const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(403)
      .json({ mensaje: "Token no proporcionado o formato incorrecto." });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Error de verificación de JWT:", err.message);
      return res.status(401).json({ mensaje: "Token inválido o expirado." });
    }

    req.user = decoded;

    next();
  });
};

module.exports = verificarToken;
