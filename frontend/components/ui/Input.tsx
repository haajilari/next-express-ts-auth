import React from "react";
import clsx from "clsx";
import "../../styles/components/input.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const Input = ({ id, label, className, ...props }: InputProps) => {
  return (
    <div className={clsx("input-wrapper", className)}>
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input id={id} className="input-field" {...props} />
    </div>
  );
};

export default Input;
