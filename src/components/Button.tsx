import type { ButtonHTMLAttributes } from "react";

export function Button({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`mt-2.5 cursor-pointer rounded-lg border border-transparent bg-green-700 px-5 py-2 text-base font-medium text-white transition-colors duration-300 hover:bg-green-600 focus:outline-4 focus:outline-green-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
