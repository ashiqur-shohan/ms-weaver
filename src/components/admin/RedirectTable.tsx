"use client";

import { useState } from "react";
import { Plus, Trash } from "@phosphor-icons/react";
import type { SeoRedirect } from "@/lib/store/admin/seo";
import { AdminInput, AdminSelect } from "./AdminFormPrimitives";
import { Button } from "@/components/ui/button";

interface RedirectTableProps {
  redirects: SeoRedirect[];
  onAdd: (redirect: SeoRedirect) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<SeoRedirect>) => void;
}

const statusCodeOptions = [
  { value: "301", label: "301 — Permanent" },
  { value: "302", label: "302 — Temporary" },
];

export function RedirectTable({ redirects, onAdd, onDelete, onUpdate }: RedirectTableProps) {
  const [newFrom, setNewFrom] = useState("");
  const [newTo, setNewTo] = useState("");
  const [newCode, setNewCode] = useState<"301" | "302">("301");

  const handleAdd = () => {
    if (!newFrom || !newTo) return;
    onAdd({
      id: `redir_${Date.now()}`,
      from: newFrom,
      to: newTo,
      statusCode: Number(newCode) as 301 | 302,
    });
    setNewFrom("");
    setNewTo("");
    setNewCode("301");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-sm border border-border overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-border bg-card">
              <th className="px-3 py-2 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                From
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                To
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                Code
              </th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {redirects.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-8 text-center text-[13px] text-muted-foreground">
                  No redirects configured.
                </td>
              </tr>
            )}
            {redirects.map((r) => (
              <tr key={r.id} className="border-b border-border/60 h-10">
                <td className="px-3 py-1.5">
                  <AdminInput
                    value={r.from}
                    onChange={(e) => onUpdate(r.id, { from: e.target.value })}
                    className="font-mono text-[12px]"
                  />
                </td>
                <td className="px-3 py-1.5">
                  <AdminInput
                    value={r.to}
                    onChange={(e) => onUpdate(r.id, { to: e.target.value })}
                    className="font-mono text-[12px]"
                  />
                </td>
                <td className="px-3 py-1.5 w-40">
                  <AdminSelect
                    value={String(r.statusCode)}
                    onChange={(e) =>
                      onUpdate(r.id, {
                        statusCode: Number(e.target.value) as 301 | 302,
                      })
                    }
                    options={statusCodeOptions}
                  />
                </td>
                <td className="px-3 py-1.5">
                  <button
                    type="button"
                    onClick={() => onDelete(r.id)}
                    className="text-muted-foreground/60 hover:text-destructive transition-colors"
                    aria-label="Delete redirect"
                  >
                    <Trash size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add row */}
      <div className="flex items-end gap-2 pt-1">
        <div className="flex-1">
          <AdminInput
            value={newFrom}
            onChange={(e) => setNewFrom(e.target.value)}
            placeholder="/old-path"
            className="font-mono text-[12px]"
          />
        </div>
        <div className="flex-1">
          <AdminInput
            value={newTo}
            onChange={(e) => setNewTo(e.target.value)}
            placeholder="/new-path"
            className="font-mono text-[12px]"
          />
        </div>
        <div className="w-44">
          <AdminSelect
            value={newCode}
            onChange={(e) => setNewCode(e.target.value as "301" | "302")}
            options={statusCodeOptions}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
          className="gap-1.5 rounded-sm text-[12px] h-8 shrink-0"
        >
          <Plus size={13} />
          Add
        </Button>
      </div>
    </div>
  );
}
