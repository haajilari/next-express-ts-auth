import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "@/utils/jwt.helpers";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json({ message: "Unauthorized: No token provided or invalid format." });
      return;
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("Server error: JWT secret is not defined.");
      res.status(500).json({ message: "Internal Server Error: Missing configuration." });
      return;
    }

    const decodedPayload = jwt.verify(token, secret) as UserPayload;
    req.user = decodedPayload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid or expired token." });
    return;
  }
};
