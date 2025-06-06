import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: number;
  email: string;
}
export interface UserPayload {
  userId: number;
  email: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: UserPayload; // ما پراپرتی user را به صورت آپشنال به Request اضافه می‌کنیم
    }
  }
}
export const generateToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT secret key is not defined in environment variables.");
  }

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  return token;
};
