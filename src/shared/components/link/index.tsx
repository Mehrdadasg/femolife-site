import Link from "next/link";
import React, { AnchorHTMLAttributes } from "react";

type LinkProps = {
  children: React.ReactNode;
  className?: string;
  color?:
    | "primary"
    | "light-blue"
    | "light-success"
    | "success"
    | "white"
    | "default"
    | "blue"
    | "light-warning";
  variant?: "text" | "contained" | "outline" | "link";
  href: string;
  size?: "icon" | "sm-icon" | "md" | "sm" | "lg";
} & AnchorHTMLAttributes<HTMLAnchorElement>;

function LinkCM({
  children,
  className = "",
  color = "primary",
  variant = "contained",
  href = "/",
  size = "md",
  ...rest
}: LinkProps) {
  const variantClasses = {
    primary:
      variant === "contained"
        ? "bg-pink-500 text-white hover:bg-pink-600 border-pink-500"
        : variant === "outline"
        ? "text-pink-500 bg-white border-pink-500"
        : variant === "text"
        ? "bg-white text-pink-500 border-white"
        : "bg-white underline text-pink-500 border-white",
    "light-blue":
      variant === "contained"
        ? "bg-gray-100 text-lake-blue-600 hover:bg-blue-200"
        : variant === "outline"
        ? "text-lake-blue-600 bg-white border-pink-gray-100"
        : variant === "text"
        ? "bg-white text-lake-blue-600 border-white"
        : "bg-white underline text-lake-blue-600 border-white",
    "light-success": "bg-green-100 text-green-900 hover:bg-green-200",
    success: "bg-green-500 text-white hover:bg-green-600",
    "light-warning": "bg-yellow-100 text-yellow-900 hover:bg-yellow-200",
    default: "bg-white border-gray-200 text-gray-900",
    blue:
      variant === "contained"
        ? "bg-lake-blue-500 text-white hover:bg-lake-blue-600 border-blue-500"
        : variant === "outline"
        ? "text-blue-500 bg-white border-blue-500"
        : variant === "text"
        ? "bg-white text-blue-500 border-white"
        : "bg-white underline text-blue-500 border-white",
    white:
      variant === "contained"
        ? "bg-white text-gray-800"
        : variant === "outline"
        ? "text-pink-500 bg-white border-pink-500"
        : variant === "text"
        ? "bg-white text-pink-500 border-white"
        : "bg-white underline text-pink-500 border-white",
  };

  const sizeClasses = {
    icon: "size-[52px]",
    "sm-icon": "size-8",
    sm: "h-9",
    md: "h-12",
    lg: "h-[52px]",
  };

  const btnClass = `flex justify-center border items-center gap-2 ${size === "sm-icon" ? "p-2":"px-3"} rounded-[50px] ${variantClasses[color]} ${sizeClasses[size]} ${className}`;

  return (
    <Link href={href} className={btnClass} {...rest}>
      {children}
    </Link>
  );
}

export default LinkCM;
