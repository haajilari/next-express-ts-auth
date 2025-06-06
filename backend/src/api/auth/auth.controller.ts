import { Request, Response } from "express";
import * as AuthService from "./auth.service";
import { generateToken } from "@/utils/jwt.helpers";

export const registerUserHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required." });
      return; // از یک return خالی برای خروج زودتر از تابع استفاده می‌کنیم
    }

    const existingUser = await AuthService.findUserByEmail(email);
    if (existingUser) {
      // ✅ FIX: `return` حذف شد
      res.status(409).json({ message: "User with this email already exists." });
      return;
    }
    const passwordHash = await AuthService.hashPassword(password);
    const newUser = await AuthService.createUser({ email }, passwordHash);

    const userResponse = {
      id: newUser.id,
      email: newUser.email,
    };
    res.status(201).json(userResponse);
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const loginUserHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required." });
      return;
    }

    const user = await AuthService.findUserByEmail(email);
    if (!user) {
      res.status(401).json({ message: "Invalid email or password." }); // 401 Unauthorized
      return;
    }
    const isPasswordCorrect = await AuthService.comparePasswords(
      password,
      user.passwordHash
    );
    if (isPasswordCorrect) {
      const payload = { userId: user.id, email: user.email };
      const token = generateToken(payload);

      res.cookie("auth_token", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        maxAge: 60 * 60 * 1000, 
        path: "/",
        sameSite: "lax", 
      });

      res.status(200).json({
        message: "Login successful!",
        user: { id: user.id, email: user.email },
      });
      return;
    }
    if (!isPasswordCorrect) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }
    const userResponse = {
      id: user.id,
      email: user.email,
    };

    res.status(200).json({
      message: "Login successful!",
      user: userResponse,
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getMeHandler = (req: Request, res: Response) => {
  if (req.user) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
