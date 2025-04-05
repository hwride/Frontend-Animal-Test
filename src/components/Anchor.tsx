import type { AnchorHTMLAttributes } from "react";

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "link" | "button";
}

const baseLinkStyles = "font-medium text-green-700 hover:text-blue-900";

const buttonLikeStyles = `flex mt-2.5 rounded-lg border border-transparent bg-green-700 px-5 py-2 text-base font-medium text-white transition-colors duration-300 hover:border-gray-500 hover:bg-green-600 focus:outline focus:outline-4 focus:outline-green-700`;

/**
 * An anchor with our base theme styles.
 */
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
