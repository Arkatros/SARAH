/// <reference types="node" />
import bcrypt from "bcryptjs";
import { promises as fs } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

type SeedResponse = {
  description: string;
  value: number;
};
  
type SeedSubquestion = {
  description: string;
  subquestionNumber: number;
  responses: SeedResponse[];
};

type SeedQuestion = {
  number: number;
  description: string;
  subquestions?: SeedSubquestion[];
  responses?: SeedResponse[];
};

type SeedFile = {
  testCode: "ANRQ" | "EPDS" | "PASS";
  defaultResponses?: SeedResponse[];
  questions: SeedQuestion[];
};

const prisma = new PrismaClient();

const TEST_CODE_TO_STRING: Record<string, string> = {
  ANRQ: "ANRQ",
  EPDS: "EPDS",
  PASS: "PASS",
};

async function ensureResponse(description: string) {
  return prisma.response.upsert({
    where: {
      id:
        (await prisma.response.findFirst({ where: { description } }))?.id ?? 0,
    },
    update: {},
    create: { description },
  });
}

async function ensureQuestion(params: {
  test: string;
  number: number;
  description: string;
  subquestionNumber?: number | null;
  parentId?: number | null;
}) {
  const existing = await prisma.testQuestion.findFirst({
    where: {
      test: params.test,
      number: params.number,
      subquestionNumber: params.subquestionNumber ?? null,
      parentId: params.parentId ?? null,
      description: params.description,
    },
  });
  if (existing) return existing;
  return prisma.testQuestion.create({
    data: {
      test: params.test,
      number: params.number,
      description: params.description,
      subquestionNumber: params.subquestionNumber ?? null,
      parentId: params.parentId ?? null,
    },
  });
}

async function upsertQuestionResponses(
  questionId: number,
  responses: SeedResponse[]
) {
  for (const r of responses) {
    const resp = await ensureResponse(r.description);
    await prisma.questionResponse.upsert({
      where: { questionId_responseId: { questionId, responseId: resp.id } },
      update: { value: r.value },
      create: { questionId, responseId: resp.id, value: r.value },
    });
  }
}

async function seedFromFile(jsonPath: string) {
  const raw = await fs.readFile(jsonPath, "utf8");
  const data: SeedFile = JSON.parse(raw);
  const test = TEST_CODE_TO_STRING[data.testCode];
  if (!test) {
    throw new Error(`Test code inválido en ${jsonPath}: ${data.testCode}`);
  }

  const defaultResponses = data.defaultResponses ?? [];

  for (const q of data.questions) {
    const parent = await ensureQuestion({
      test,
      number: q.number,
      description: q.description,
    });
    const parentResponses =
      q.responses && q.responses.length > 0 ? q.responses : defaultResponses;
    if (parentResponses.length === 0) {
      console.warn(
        `Question ${data.testCode}#${q.number} has no responses and no defaultResponses; skipping responses.`
      );
    } else {
      await upsertQuestionResponses(parent.id, parentResponses);
    }

    if (q.subquestions?.length) {
      for (const sq of q.subquestions) {
        const child = await ensureQuestion({
          test,
          number: q.number,
          description: sq.description,
          subquestionNumber: sq.subquestionNumber,
          parentId: parent.id,
        });
        const childResponses =
          sq.responses && sq.responses.length > 0
            ? sq.responses
            : defaultResponses;
        if (childResponses.length === 0) {
          console.warn(
            `Subquestion ${data.testCode}#${q.number}.${sq.subquestionNumber} has no responses and no defaultResponses; skipping responses.`
          );
        } else {
          await upsertQuestionResponses(child.id, childResponses);
        }
      }
    }
  }
}

async function ensureAdminUser() {
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash("admin", salt);
  const existingAdmin = await prisma.user.findFirst({
    where: { email: "admin@mail.com" },
  });
  if (existingAdmin) {
    return;
  }
  await prisma.user.create({
    data: {
      email: "admin@mail.com",
      name: "Admin",
      role: "ADMIN",
      lastName: "",
      phone: "",
      password: hashedPassword,
    },
  });
}

async function ensureUser(params: {
  email: string;
  name: string;
  lastName?: string;
  phone?: string;
  role?: string;
  password?: string;
}) {
  const existing = await prisma.user.findUnique({ where: { email: params.email } });
  if (existing) return existing;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(params.password ?? "password", salt);
  return prisma.user.create({
    data: {
      email: params.email,
      name: params.name,
      lastName: params.lastName ?? "",
      phone: params.phone ?? "",
      role: params.role ?? "USER",
      password: hashedPassword,
    },
  });
}

async function ensureMidwifeWithUser() {
  const user = await ensureUser({
    email: "midwife@mail.com",
    name: "Martha",
    lastName: "Midwife",
    phone: "555-0001",
    role: "MIDWIFE",
  });

  const existing = await prisma.midwife.findFirst({ where: { userId: user.id } });
  if (existing) return existing;

  return prisma.midwife.create({
    data: {
      APC: "APC-12345",
      registrationNumber: "REG-67890",
      employerName: "Community Clinic",
      isActive: true,
      userId: user.id,
    },
  });
}

async function ensurePatientWithUser(midwifeId: number) {
  const user = await ensureUser({
    email: "patient@mail.com",
    name: "Paula",
    lastName: "Patient",
    phone: "555-0002",
    role: "PATIENT",
  });

  const existing = await prisma.patient.findFirst({ where: { userId: user.id } });
  if (existing) return existing;

  return prisma.patient.create({
    data: {
      isActive: true,
      userId: user.id,
      midWifeId: midwifeId,
      // opcionales pueden quedar null
    },
  });
}

async function main() {
  const testsDir = path.resolve(process.cwd(), "tests");
  const entries = await fs.readdir(testsDir, { withFileTypes: true });
  const jsonFiles = entries
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".json"))
    .map((e) => path.join(testsDir, e.name));

  if (jsonFiles.length === 0) {
    console.warn(
      `No JSON files found in ${testsDir}. Create ANRQ.json / EPDS.json / PASS.json`
    );
    return;
  }

  for (const file of jsonFiles) {
    console.log(`Seeding from: ${path.basename(file)}`);
    await seedFromFile(file);
  }

  await ensureAdminUser();

  // Midwife + Patient de ejemplo
  const midwife = await ensureMidwifeWithUser();
  await ensurePatientWithUser(midwife.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
