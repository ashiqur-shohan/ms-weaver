"use client";

import { cn } from "@/lib/utils";

interface VariableInserterProps {
  variables: string[];
  onInsert: (variable: string) => void;
  className?: string;
}

export function VariableInserter({ variables, onInsert, className }: VariableInserterProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
        Available variables
      </span>
      <div className="flex flex-wrap gap-1.5">
        {variables.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onInsert(v)}
            className={cn(
              "inline-flex items-center rounded-sm border border-border bg-muted px-1.5 py-0.5",
              "text-[11px] font-mono text-muted-foreground",
              "hover:bg-muted/80 hover:text-foreground hover:border-foreground/30 transition-colors",
            )}
            title={`Insert ${v}`}
          >
            {v}
          </button>
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground/70">
        Click a variable to copy it — paste into the body where needed.
      </p>
    </div>
  );
}
