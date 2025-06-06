import React from "react";
import clsx from "clsx";
import "../../styles/components/button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Button = ({ children, className, variant = "primary", ...props }: ButtonProps) => {
  const buttonClasses = clsx("btn", `btn--${variant}`, className);

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
