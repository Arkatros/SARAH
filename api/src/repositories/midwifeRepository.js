import prisma from "./db.js";

export const createMidwife = async ({ userData, midwifeData }) => {
  return prisma.midwife.create({
    data: {
      APC: midwifeData.APC,
      registrationNumber: midwifeData.registrationNumber,
      employerName: midwifeData.employerName,
      isActive: false,

      user: {
        create: {
          name: userData.name,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          password: userData.password,
          role: "midwife",
        },
      },
    },
    include: { user: true },
  });
};

export const findAll = async () => {
  return prisma.midwife.findMany();
};

export const findByEmail = async (email) => {
  console.log(prisma.user.findUnique({ where: { email } }));
  return prisma.user.findUnique({ where: { email } });
};
