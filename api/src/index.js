import express from "express";
import userRoutes from "./routes/userRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import { config } from "dotenv";
config();
const secret = process.env.SECRET_KEY;
const app = express();

const PORT = 3000;
const HOST = "127.0.0.1";
import cors from "cors";

const corsOptions = {
  origin: "*", // permite todos (cualquier cliente)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions)); //No termina funcionando el cors,puede ser retirado esto.

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.listen(PORT, HOST, () => {
  console.log(`Escuchando en http://${HOST}:${PORT}`);
});
