"use client";

import { useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import "../../../styles/pages/auth.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <p>Welcome back! Please enter your details.</p>
      <form onSubmit={handleLogin} className="auth-form">
        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}
