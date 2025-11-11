import { findByEmail } from "../repositories/midwifeRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET_KEY;

export const loginMidwife = async (data) => {
  try {
    const filteredUser = await findByEmail(data.email);
    await bcrypt.compare(data.password, filteredUser.password);

    if (!filteredUser.email) {
      throw new Error("No se encuentra ningun usuario con esos datos");
    }
    const payload = {
      userid: filteredUser.id,
      mail: data.email,
      role: filteredUser.role,
    };
    console.log(payload);
    const token = jwt.sign(payload, secret);
    return token;
  } catch (error) {
    console.log("error en servicio de login", error);
  }
};
