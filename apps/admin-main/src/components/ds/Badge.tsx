import { cn } from "./utils";

export interface BadgeProps {
  children: React.ReactNode;
  color?:
    | "blue"
    | "cyan"
    | "yellow"
    | "red"
    | "orange"
    | "slate"
    | "green"
    | "indigo"
    | "sky"
    | "amber"
    | "purple";
  size?: "sm" | "md";
  className?: string;
}

const colorClasses = {
  blue: "bg-blue-100 text-blue-700",
  cyan: "bg-cyan-100 text-cyan-700",
  yellow: "bg-yellow-100 text-yellow-700",
  red: "bg-red-100 text-red-700",
  orange: "bg-orange-100 text-orange-700",
  slate: "bg-slate-100 text-slate-700",
  green: "bg-green-100 text-green-700",
  indigo: "bg-indigo-100 text-indigo-700",
  sky: "bg-sky-100 text-sky-700",
  amber: "bg-amber-100 text-amber-700",
  purple: "bg-purple-100 text-purple-700",
};

const sizeClasses = {
  sm: "px-1.5 py-0.5 text-[10px]",
  md: "px-2 py-0.5 text-xs",
};

export const Badge = ({ children, color = "blue", size = "sm", className }: BadgeProps) => {
  return (
    <span
      className={cn("inline-flex rounded-full", colorClasses[color], sizeClasses[size], className)}
    >
      {children}
    </span>
  );
};
