import { LucideIcon } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  color?: "blue" | "cyan" | "indigo" | "sky" | "green" | "red" | "amber";
  trend?: string;
}

export const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  color = "blue",
  trend,
}: StatCardProps) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "text-blue-600",
      badge: "bg-blue-100 text-blue-700",
    },
    cyan: {
      bg: "bg-cyan-50",
      border: "border-cyan-200",
      icon: "text-cyan-600",
      badge: "bg-cyan-100 text-cyan-700",
    },
    indigo: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      icon: "text-indigo-600",
      badge: "bg-indigo-100 text-indigo-700",
    },
    sky: {
      bg: "bg-sky-50",
      border: "border-sky-200",
      icon: "text-sky-600",
      badge: "bg-sky-100 text-sky-700",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      icon: "text-green-600",
      badge: "bg-green-100 text-green-700",
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: "text-red-600",
      badge: "bg-red-100 text-red-700",
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      icon: "text-amber-600",
      badge: "bg-amber-100 text-amber-700",
    },
  };

  const colors = colorClasses[color];

  return (
    <div
      className={`${colors.bg} border ${colors.border} rounded-lg p-3 hover:shadow-md transition-all`}
    >
      <div className="flex items-center justify-between mb-2">
        <div
          className={`w-9 h-9 bg-white rounded-lg flex items-center justify-center ${colors.icon} shadow-sm`}
        >
          <Icon className="w-4 h-4" />
        </div>
        {trend && (
          <span className={`${colors.badge} px-1.5 py-0.5 rounded text-[10px]`}>{trend}</span>
        )}
      </div>
      <div className="text-slate-600 text-[10px] mb-0.5">{title}</div>
      <div className="text-slate-900 text-sm mb-0.5">{value}</div>
      {description && <div className="text-slate-600 text-[10px]">{description}</div>}
    </div>
  );
};
