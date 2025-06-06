import { User } from "@/models/user.model"; // ما از alias برای مسیرها استفاده خواهیم کرد
import bcrypt from "bcrypt";

const users: User[] = [];
let currentId = 1;
export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  return users.find((user) => user.email === email);
};

export const createUser = async (
  userData: Omit<User, "id" | "passwordHash">,
  passwordHash: string
): Promise<User> => {
  const newUser: User = {
    id: currentId++,
    email: userData.email,
    passwordHash,
  };
  users.push(newUser);
  console.log("Current users in DB:", users);
  return newUser;
};
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
export const comparePasswords = async (
  plainTextPassword: string,
  hash: string
): Promise<boolean> => {
  const areSame = await bcrypt.compare(plainTextPassword, hash);
  return areSame;
};
