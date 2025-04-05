import type { HTMLAttributes } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2;
}

/**
 * A heading component with our base theme styles.
 */
export function Heading({ level, className = "", ...props }: HeadingProps) {
  if (level === 1) {
    return (
      <h1
        className={`text-center text-5xl text-green-800 ${className}`}
        {...props}
      />
    );
  } else {
    return (
      <h2
        className={`text-center text-3xl text-green-800 ${className}`}
        {...props}
      />
    );
  }
}
