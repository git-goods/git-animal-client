import * as React from "react";

import { cn } from "./utils";

function Input({
  className,
  type,
  error,
  ...props
}: React.ComponentProps<"input"> & { error?: string }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "py-2.5 border rounded-lg text-sm w-full px-4 ",
        error ? "border-red-500 focus:ring-red-500" : "border-slate-300 focus:ring-blue-500",
        "focus:outline-none focus:ring-2 focus:border-transparent transition-all",
        "disabled:bg-slate-50 disabled:cursor-not-allowed",
        "placeholder:text-slate-400",
        // "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        // "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        // "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
