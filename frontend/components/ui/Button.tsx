import React from "react";
import clsx from "clsx";
import "@/styles/components/button.scss"; // استایل‌های اختصاصی دکمه

// تعریف پراپ‌های کامپوننت
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Button = ({ children, className, variant = "primary", ...props }: ButtonProps) => {
  // با clsx کلاس‌های مختلف را به صورت هوشمند ترکیب می‌کنیم
  const buttonClasses = clsx(
    "btn", // کلاس پایه
    `btn--${variant}`, // کلاس بر اساس نوع دکمه
    className // کلاس‌های دلخواهی که از بیرون پاس داده می‌شود
  );

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
