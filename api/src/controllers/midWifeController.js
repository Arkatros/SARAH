import * as userService from "../services/midWifeService.js";

export const CreateMidwife = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // o lista de orígenes
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  try {
    const newUser = await userService.createMidwifeService(req.body);

    return res.status(201).json({
      message: "Usuario registrado con éxito",
      data: newUser,
    });
  } catch (error) {
    if (error.message.includes("email ya está registrado")) {
      return res.status(409).json({ message:"Email registrado",data:error });
    }
    return res
      .status(500)
      .json({ message: "Error interno del servidor.", data: error });
  }
};
