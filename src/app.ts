import { isDev } from "./config";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import router from "./routes";
import setup from "./setup";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { prisma } from "./prisma";

const app = express();

app.set("trust proxy", 1);

app.use(cors({ 
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], 
  allowedHeaders: ["Content-Type"],
  credentials: true 
}));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

if (!isDev) app.use(limiter);

app.use(helmet());
app.disable("x-powered-by");
app.use("/api", router);

const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

import events from "./events";
events(io);

prisma.$connect()
  .then(() => {
    console.log("Successfully connected to PostgreSQL via Prisma");
    setup();
  })
  .catch((err: any) => {
    console.error("Failed to connect to the database:", err);
  });

export default server;