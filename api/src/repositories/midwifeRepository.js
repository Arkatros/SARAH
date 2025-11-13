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
          role: "MIDWIFE",
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

export const isActiveMidwife = async (email) => {
  const userWithMidwife = await prisma.user.findUnique({
    where: { email },
    include: {
      midwife: true,
    },
  });
  if (userWithMidwife.midwife.isActive) {
    return true;
  }
  return false;
};
export const findByEmailMidwife = async (email) => {
  const userWithMidwife = await prisma.user.findUnique({
    where: { email },
    include: {
      midwife: true,
    },
  });
  return userWithMidwife;
};

export const findMidwifeByUserId = async (id) => {
  const userWithMidwife = await prisma.midwife.findFirst({
    where: { userId: id },
  });
  return userWithMidwife;
};

export const updateMidwife = async (midwifeId, data) => {
  return prisma.midwife.update({
    where: { id: midwifeId },
    data: data,
  });
};
