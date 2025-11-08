import { PrismaClient } from "../../generated/prisma/client.ts";
import "dotenv/config";
let prisma = new PrismaClient({
  errorFormat: "pretty",
});


export default prisma;
