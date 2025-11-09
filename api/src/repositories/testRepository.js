import prisma from "./db.js";

export const findTestQuestions = async (testCode) => {
  if (typeof testCode !== "string" || !["ANRQ", "EPDS", "PASS"].includes(testCode)) {
    throw new Error("Invalid testCode. Use one of: ANRQ | EPDS | PASS");
  }

  return prisma.testQuestion.findMany({
    where: { test: testCode, parentId: null },
    orderBy: [{ number: "asc" }],
    include: {
      responses: {
        include: { response: true },
        orderBy: { value: "asc" },
      },
      children: {
        orderBy: [{ number: "asc" }, { subquestionNumber: "asc" }],
        include: {
          responses: {
            include: { response: true },
            orderBy: { value: "asc" },
          },
        },
      },
    },
  });
};