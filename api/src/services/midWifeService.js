import {
  createMidwife,
  findByEmail,
  findByEmailMidwife,
  updateMidwife,
} from "../repositories/midwifeRepository.js";
import bcrypt from "bcryptjs";
import { generatePassword } from "../utils/passgen.js";
import { sendMail } from "./mailService.js";

export const createMidwifeService = async (data) => {
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

  const temporalPass = await generatePassword();
  console.log(data);
  const hashedPassword = await bcrypt.hash(temporalPass, salt);
  const existingUser = await findByEmail(email);
  if (existingUser) {
    throw new Error("Ya existe un usuario registrado con este e-mail");
  }
  data.temporalPass = temporalPass;
  sendMail(data);

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
};

export const activateUserMidwife = async (encoded) => {
  let mail;
  try {
    mail = Buffer.from(encoded, "base64url").toString("utf8");
  } catch (error) {
    throw new Error("Invalid activation code format.");
  }
  const user = await findByEmailMidwife(mail);
  if (!user || !user.midwife) {
    throw new Error("not user found");
  }
  if (user.midwife.isActive === true) {
    throw new Error("User already activated");
  }
  const update = await updateMidwife(user.midwife.id, { isActive: true });
  return update;
};
