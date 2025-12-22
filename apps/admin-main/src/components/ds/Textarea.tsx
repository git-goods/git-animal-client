export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Textarea = ({
  label,
  error,
  helperText,
  fullWidth = false,
  className = "",
  id,
  ...props
}: TextareaProps) => {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <label htmlFor={textareaId} className="block text-sm text-slate-700 mb-1.5">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        className={`
          ${fullWidth ? "w-full" : ""}
          px-4 py-2.5 border rounded-lg text-sm resize-none
          ${error ? "border-red-500 focus:ring-red-500" : "border-slate-300 focus:ring-blue-500"}
          focus:outline-none focus:ring-2 focus:border-transparent transition-all
          disabled:bg-slate-50 disabled:cursor-not-allowed
          placeholder:text-slate-400
          ${className}
        `}
        {...props}
      />

      {(error || helperText) && (
        <p className={`text-xs mt-1 ${error ? "text-red-500" : "text-slate-500"}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};
