import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";
import { ReactNode } from "react";

export interface AlertProps {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Alert = ({ variant = "info", title, children, className = "" }: AlertProps) => {
  const variants = {
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: Info,
      iconColor: "text-blue-600",
      textColor: "text-blue-800",
    },
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      icon: CheckCircle,
      iconColor: "text-green-600",
      textColor: "text-green-800",
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      icon: AlertCircle,
      iconColor: "text-amber-600",
      textColor: "text-amber-800",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: XCircle,
      iconColor: "text-red-600",
      textColor: "text-red-800",
    },
  };

  const style = variants[variant];
  const Icon = style.icon;

  return (
    <div className={`${style.bg} border ${style.border} rounded-lg p-3 flex gap-3 ${className}`}>
      <Icon className={`w-5 h-5 ${style.iconColor} flex-shrink-0 mt-0.5`} />
      <div className={`text-sm ${style.textColor}`}>
        {title && <p className="font-medium mb-1">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
};
