export type RegisterData = {
  email: string;
  password: string;
};

export type LoginCredentials = RegisterData;

export type AuthResponse = {
  message: string;
  token?: string;
  user: {
    id: number;
    email: string;
  };
};
