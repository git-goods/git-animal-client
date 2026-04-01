import { cn } from "./utils";

export const Table = ({ className, ...props }: React.ComponentProps<"table">) => {
  return (
    <div className="relative w-full overflow-x-auto">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
};

export const TableHeader = ({ className, ...props }: React.ComponentProps<"thead">) => {
  return (
    <thead
      className={cn("bg-slate-50 border-b border-slate-200 [&_tr]:border-b-0", className)}
      {...props}
    />
  );
};

export const TableBody = ({ className, ...props }: React.ComponentProps<"tbody">) => {
  return <tbody className={cn("divide-y divide-slate-200", className)} {...props} />;
};

export const TableRow = ({ className, ...props }: React.ComponentProps<"tr">) => {
  return <tr className={cn("hover:bg-slate-50 transition-colors", className)} {...props} />;
};

export const TableHead = ({ className, ...props }: React.ComponentProps<"th">) => {
  return (
    <th
      className={cn(
        "h-9 px-3 text-left align-middle text-xs font-medium text-slate-600 whitespace-nowrap",
        className,
      )}
      {...props}
    />
  );
};

export const TableCell = ({ className, ...props }: React.ComponentProps<"td">) => {
  return <td className={cn("px-3 py-2 align-middle whitespace-nowrap", className)} {...props} />;
};
