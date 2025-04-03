import type { AnchorHTMLAttributes } from "react";

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "link" | "button";
}

const baseLinkStyles = "font-medium text-blue-600 hover:text-blue-900";

const buttonLikeStyles = `mt-2.5 cursor-pointer rounded-lg border border-transparent bg-blue-600 px-5 py-2 text-base font-medium text-white transition-colors duration-300 hover:border-gray-500 hover:bg-blue-700 focus:outline focus:outline-4 focus:outline-blue-600`;

export function Anchor({
  children,
  className = "",
  variant = "link",
  ...props
}: AnchorProps) {
  return (
    <a
      className={`${variant === "button" ? buttonLikeStyles : baseLinkStyles} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
