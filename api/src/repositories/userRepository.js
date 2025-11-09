import prisma from "./db.js";

export const create = async (userData) => {
  return prisma.user.create({ data: userDdata });
};

export const findAll = async () => {
  return prisma.user.findMany();
};

export async function findByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}
export async function findByEmailAndRole(email, role) {
  return prisma.user.findUnique({ where: { email, role } });
}
