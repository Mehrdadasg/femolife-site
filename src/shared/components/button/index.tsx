import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  color?:
    | "primary"
    | "light-blue"
    | "light-success"
    | "success"
    | "blue"
    | "light-warning";
  isValid?: boolean;
  size?: "icon" | "md" | "sm" | "lg";
  variant?: "text" | "contained" | "outline" | "link";
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  children,
  className = "",
  color = "primary",
  isValid,
  isLoading,
  variant="contained",
  size = "md",
  ...rest
}: ButtonProps) {
  const variantClasses = {
    primary:
      variant === "contained"
        ? "bg-pink-500 text-white hover:bg-pink-600 border-pink-500"
        : variant === "outline"
        ? "text-pink-500 bg-white border-pink-500"
        : variant === "text" ? "bg-white text-pink-500 border-white" : "bg-white underline text-pink-500 border-white",
      "light-blue":  variant === "contained"
        ? "bg-gray-100 text-lake-blue-600"
        : variant === "outline"
        ? "text-lake-blue-600 bg-white border-pink-gray-100"
        : variant === "text" ? "bg-white text-lake-blue-600 border-white" : "bg-white underline text-lake-blue-600 border-white",
    "light-success": "bg-green-100 text-green-900 hover:bg-green-200",
    success: "bg-green-500 text-white hover:bg-green-600",
    blue: variant === "contained"
        ? "bg-lake-blue-500 text-white hover:bg-lake-blue-600" :"bg-white text-lake-blue-500 hover:bg-lake-blue-500-600 border-lake-blue-500",
    "light-warning": "bg-yellow-100 text-yellow-900 hover:bg-yellow-200",
  };

  const sizeClasses = {
    icon: "size-[52px]",
    sm: "h-9",
    md: "h-12",
    lg: "h-[52px]",
  };

  const btnClass = `flex justify-center border items-center gap-2 px-3 rounded-[50px] ${
    variantClasses[color]
  } ${sizeClasses[size]} ${
    isValid === false ? "opacity-50 cursor-not-allowed" : ""
  } ${className}`;

  return (
    <button className={btnClass} disabled={isValid === false} {...rest}>
      {isLoading ? <span className="loader"></span> : children}
    </button>
  );
}

export default Button;
