import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
}

export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-[#003EC7] text-white hover:bg-[#002B7F]",
    outline:
      "border border-[var(--border)] bg-transparent hover:bg-[var(--surface-secondary)]",
    ghost: "hover:bg-slate-100 dark:hover:bg-slate-800",
  };

  return (
    <button
      {...props}
      className={`
      px-5
      py-3
      rounded-lg
      text-sm
      font-semibold
      transition-all
      duration-300
      disabled:opacity-50
      disabled:cursor-not-allowed
      ${variants[variant]}
      ${className}
      `}
    >
      {children}
    </button>
  );
}
