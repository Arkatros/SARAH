import * as userService from "../services/authService.js";
import SarahError from "../utils/sarahError.js";

export const loginMidwife = async (req, res) => {
  try {
    const tokengen = await userService.loginMidwife(req.body);
    if (tokengen) {
      res.json({
        message: "Succesfull authentication",
        data: tokengen,
      });
    } else if (tokengen === null) {
      res.status(401).json({ mensaje: "Midwife is not active", data: null });
    }
  }
  catch (error) {
    if (error instanceof SarahError) {
      res.status(401).json({ mensaje: "Credenciales inválidas", data: null });
    }
    res.status(500).json({ message: "Internal server error", error: error.message });
  }

};

//lOGIN ADMIN, QUIZA?
