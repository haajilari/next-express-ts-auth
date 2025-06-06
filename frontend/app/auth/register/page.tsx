"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../../styles/pages/auth.scss";
import { registerUser } from "../../../lib/auth.service";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await registerUser({ email, password });
      console.log("Registration successful!", response);

      // بهترین تجربه کاربری این است که بعد از ثبت‌نام موفق، کاربر را به صفحه ورود هدایت کنیم
      alert("Registration successful! You will now be redirected to the login page.");
      router.push("/auth/login");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "An unexpected error occurred during registration.";
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1>Create an Account</h1>
      <p>Start your journey with us today.</p>
      <form onSubmit={handleRegister} className="auth-form">
        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={isLoading}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          required
          disabled={isLoading}
        />
        {error && <p className="error-message">{error}</p>}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </div>
  );
}
