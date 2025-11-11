import { findByEmail } from "../repositories/userRepository.js";
import { findByEmailMidwife, isActiveMidwife } from "../repositories/midwifeRepository.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import SarahError from "../utils/sarahError.js";

const secret = process.env.SECRET_KEY;

export const loginMidwife = async (data) => {
  const filteredUser = await findByEmail(data.email);

  if (!filteredUser) {
    throw new SarahError("No se encuentra ningun usuario con esos datos");
  }
  if (filteredUser.role === 'MIDWIFE') {
    const isActive = await isActiveMidwife(data.email)
    if (!isActive) {
      return null;
    }
  }

  await bcrypt.compare(data.password, filteredUser.password);

  const payload = {
    userid: filteredUser.id,
    mail: data.email,
    role: filteredUser.role,
    name: filteredUser.name,
    lastName: filteredUser.lastName
  };

  console.log(payload);
  const token = jwt.sign(payload, secret);
  return token;
};
