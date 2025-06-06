import { AuthResponse, LoginCredentials, RegisterData } from "../types/auth";
import apiClient from "./api";

export const registerUser = async (credentials: RegisterData): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/register", credentials);
  return response.data;
};

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/login", credentials);
  return response.data;
};
