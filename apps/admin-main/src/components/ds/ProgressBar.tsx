import { cn } from "./utils";

export interface ProgressBarProps {
  value: number;
  color?: "blue" | "cyan" | "green" | "red" | "amber" | "indigo";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  maxWidth?: string;
  className?: string;
}

const barColorClasses = {
  blue: "bg-blue-500",
  cyan: "bg-cyan-500",
  green: "bg-green-500",
  red: "bg-red-500",
  amber: "bg-amber-500",
  indigo: "bg-indigo-500",
};

const sizeClasses = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
};

export const ProgressBar = ({
  value,
  color = "blue",
  size = "sm",
  showLabel = true,
  maxWidth,
  className,
}: ProgressBarProps) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div
        className={cn("flex-1 bg-slate-200 rounded-full", sizeClasses[size])}
        style={maxWidth ? { maxWidth } : undefined}
      >
        <div
          className={cn("rounded-full transition-all", sizeClasses[size], barColorClasses[color])}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-slate-600 text-[10px] min-w-[30px]">{clampedValue}%</span>
      )}
    </div>
  );
};
