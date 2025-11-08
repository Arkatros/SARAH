import {
  createMidwife,
  findByEmail,
} from "../repositories/midwifeRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createMidwifeService = async (data) => {
  try {
    const {
      name,
      lastName,
      email,
      phone,
      APC,
      registrationNumber,
      employerName,
    } = data;
    const salt = await bcrypt.genSalt(10);
    console.log(data);

    const hashedPassword = await bcrypt.hash("password", salt);

    const existingUser = await findByEmail(email);
    if (existingUser) {
      throw new Error("Email ya registrado.");
    }
    const newMidwife = await createMidwife({
      userData: {
        name,
        lastName,
        email,
        password: hashedPassword,
        phone,
      },
      midwifeData: {
        APC,
        registrationNumber,
        employerName,
      },
    });

    return newMidwife;
  } catch (error) {
    console.log("error", error);
  }
};
