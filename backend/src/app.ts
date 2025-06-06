import express from "express";
import cors from "cors";
import authRouter from "@/api/auth/auth.routes"; // استفاده از path alias

const app = express();

// Middlewares
app.use(cors()); // اجازه دسترسی از دامنه‌های دیگر
app.use(express.json()); // این خط بسیار مهم است! به Express اجازه می‌دهد تا body درخواست‌های JSON را بخواند

// Routes
app.use("/api/auth", authRouter); // تمام مسیرهای تعریف شده در authRouter با پیشوند /api/auth در دسترس خواهند بود

export default app;
