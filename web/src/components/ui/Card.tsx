import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  hover?: boolean;
  padding?: "md" | "lg";
};

const pad = { md: "p-6", lg: "p-8" };

export function Card({ children, className = "", hover = false, padding = "md", ...rest }: Props) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-xl shadow-black/30 ${pad[padding]} ${
        hover ? "transition duration-300 hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-2xl hover:shadow-black/40" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
