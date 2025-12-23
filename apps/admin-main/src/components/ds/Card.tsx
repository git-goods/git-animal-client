import { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card = ({ children, title, subtitle, className = "", padding = "md" }: CardProps) => {
  const paddingStyles = {
    none: "",
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-slate-200 ${className}`}>
      {(title || subtitle) && (
        <div className={`border-b border-slate-200 ${paddingStyles[padding]}`}>
          {title && <h2 className="text-slate-900 text-base mb-0.5">{title}</h2>}
          {subtitle && <p className="text-slate-600 text-xs">{subtitle}</p>}
        </div>
      )}
      <div className={paddingStyles[padding]}>{children}</div>
    </div>
  );
};
