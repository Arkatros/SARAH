import * as Service from "../services/midWifeService.js";
import SaraError from "../utils/sarahError.js";
export const CreateMidwife = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // o lista de orígenes
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  try {
    const newUser = await Service.createMidwifeService(req.body);

    return res.status(201).json({
      message: "Usuario registrado con éxito",
      data: newUser,
    });
  } catch (error) {
    if (error instanceof SaraError) {
      return res.status(409).json({ message: error.message, data: error });
    }
    return res.status(500).json({ message: error.message, data: error });
  }
};


export const activateUserController = async (req, res) => {
  const encoded = req.params.encodedlink;

  if (!encoded) {
    return res.status(400).json({ message: "Falta el código de activación." });
  }

  try {
    const updatedMidwife = await Service.activateUserMidwife(encoded);

    return res.status(200).json({
      message: "Your account had been veriffied succesfully",
      data: updatedMidwife,
    });
  } catch (error) {
    if (error.message.includes("not user found")) {
      return res.status(404).json({
        message: error.message,
        data: error,
      });
    }

    console.error("Error activando usuario", error);
    return res.status(500).json({
      message: error.message,
      data: error,
    });
  }
};
