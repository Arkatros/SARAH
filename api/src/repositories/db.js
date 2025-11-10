import { PrismaClient } from "../../generated/prisma/index.js";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Carga explícita del .env desde SARAH/api/.env, independientemente del cwd
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.resolve(__dirname, "../../.env") });
let prisma = new PrismaClient({
  errorFormat: "pretty",
});


export default prisma;
