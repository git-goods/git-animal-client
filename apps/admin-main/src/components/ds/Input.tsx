import { LucideIcon } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: LucideIcon;
  fullWidth?: boolean;
}

export const Input = ({
  label,
  error,
  helperText,
  icon: Icon,
  fullWidth = false,
  className = "",
  id,
  ...props
}: InputProps) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <label htmlFor={inputId} className="block text-sm text-slate-700 mb-1.5">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        )}
        <input
          id={inputId}
          className={`
            ${fullWidth ? "w-full" : ""}
            ${Icon ? "pl-10 pr-4" : "px-4"}
            py-2.5 border rounded-lg text-sm
            ${error ? "border-red-500 focus:ring-red-500" : "border-slate-300 focus:ring-blue-500"}
            focus:outline-none focus:ring-2 focus:border-transparent transition-all
            disabled:bg-slate-50 disabled:cursor-not-allowed
            placeholder:text-slate-400
            ${className}
          `}
          {...props}
        />
      </div>

      {(error || helperText) && (
        <p className={`text-xs mt-1 ${error ? "text-red-500" : "text-slate-500"}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};
