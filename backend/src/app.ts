import express from "express";
import cors from "cors";
import authRouter from "@/api/auth/auth.routes";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
export default app;
