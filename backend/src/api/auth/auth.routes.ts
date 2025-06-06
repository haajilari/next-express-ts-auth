import { Router } from "express";
import { registerUserHandler, loginUserHandler, getMeHandler } from "./auth.controller";
import { isAuthenticated } from "@/core/middlewares/isAuthenticated";

const router = Router();
router.post("/register", registerUserHandler);
router.post("/login", loginUserHandler);
router.get("/me", isAuthenticated, getMeHandler);

export default router;
