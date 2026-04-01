import { cn } from "./utils";

export interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  color?: "blue" | "cyan" | "green" | "red" | "indigo" | "sky" | "amber" | "slate";
  showName?: boolean;
  className?: string;
}

const bgColorClasses = {
  blue: "bg-blue-500",
  cyan: "bg-cyan-500",
  green: "bg-green-500",
  red: "bg-red-500",
  indigo: "bg-indigo-500",
  sky: "bg-sky-500",
  amber: "bg-amber-500",
  slate: "bg-slate-500",
};

const sizeClasses = {
  sm: "w-5 h-5 text-[8px]",
  md: "w-6 h-6 text-[10px]",
  lg: "w-8 h-8 text-xs",
};

export const Avatar = ({
  name,
  size = "md",
  color = "blue",
  showName = false,
  className,
}: AvatarProps) => {
  const initials = name.substring(0, 2);

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center text-white",
          bgColorClasses[color],
          sizeClasses[size],
        )}
      >
        {initials}
      </div>
      {showName && <span className="text-slate-600 text-xs">{name}</span>}
    </div>
  );
};
