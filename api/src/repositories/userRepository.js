import prisma from "./db.js";

export const create = async (userData) => {
  return prisma.user.create({ data: userDdata });
};

export const findAll = async () => {
  return prisma.user.findMany();
};

export const findByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } });
};
