import * as userService from "../services/authService.js";

export const loginMidwife = async (req, res) => {
  const tokengen = await userService.loginMidwife(req.body);

  if (tokengen) {
    res.json({
      message: "Succesfull authentication",
      data: tokengen,
    });
  } else if (tokengen = null) {
    res.status(401).json({ mensaje: "Midwife is not active", data: null });

  }
  else {
    res.status(401).json({ mensaje: "Credenciales inválidas", data: null });
  }
};

//lOGIN ADMIN, QUIZA?
