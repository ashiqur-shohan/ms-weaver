"use client";

import { useState, useMemo } from "react";
import {
  CaretUp,
  CaretDown,
  CaretUpDown,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  className?: string;
  headerClassName?: string;
  render: (row: T, index: number) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  getRowId: (row: T) => string;
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  bulkActions?: (selectedIds: string[]) => React.ReactNode;
  emptyState?: React.ReactNode;
  filterSlot?: React.ReactNode;
  pageSize?: number;
  className?: string;
}

type SortDir = "asc" | "desc" | null;

// ─── Component ────────────────────────────────────────────────────────────────

export function DataTable<T>({
  columns,
  data,
  getRowId,
  onRowClick,
  selectable = false,
  onSelectionChange,
  bulkActions,
  emptyState,
  filterSlot,
  pageSize = 20,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(0);

  // ── Sorting ───────────────────────────────────────────────────────────────

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? null : "asc"));
      if (sortDir === "desc") setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDir) return data;
    return [...data].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey];
      const bVal = (b as Record<string, unknown>)[sortKey];
      const aStr = String(aVal ?? "");
      const bStr = String(bVal ?? "");
      const cmp = aStr.localeCompare(bStr, undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  // ── Pagination ────────────────────────────────────────────────────────────

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const pagedData = sortedData.slice(page * pageSize, (page + 1) * pageSize);

  // ── Selection ─────────────────────────────────────────────────────────────

  const allPageIds = pagedData.map(getRowId);
  const allSelected =
    allPageIds.length > 0 && allPageIds.every((id) => selectedIds.has(id));
  const someSelected = allPageIds.some((id) => selectedIds.has(id));

  const toggleAll = () => {
    const next = new Set(selectedIds);
    if (allSelected) {
      allPageIds.forEach((id) => next.delete(id));
    } else {
      allPageIds.forEach((id) => next.add(id));
    }
    setSelectedIds(next);
    onSelectionChange?.([...next]);
  };

  const toggleRow = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
    onSelectionChange?.([...next]);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  const SortIcon = ({ col }: { col: Column<T> }) => {
    if (!col.sortable) return null;
    if (sortKey !== col.key)
      return <CaretUpDown size={12} className="text-muted-foreground/60" />;
    if (sortDir === "asc") return <CaretUp size={12} />;
    if (sortDir === "desc") return <CaretDown size={12} />;
    return <CaretUpDown size={12} className="text-muted-foreground/60" />;
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Filter slot */}
      {filterSlot && <div>{filterSlot}</div>}

      {/* Bulk actions bar */}
      {selectable && selectedIds.size > 0 && bulkActions && (
        <div className="flex items-center gap-3 rounded-sm border border-border bg-muted/40 px-3 py-2">
          <span className="text-[12px] text-muted-foreground">
            {selectedIds.size} selected
          </span>
          <div className="flex items-center gap-2">
            {bulkActions([...selectedIds])}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-sm border border-border overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-border bg-card">
              {selectable && (
                <th className="w-10 px-3 py-2">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={toggleAll}
                    aria-label="Select all"
                    data-state={
                      someSelected && !allSelected ? "indeterminate" : undefined
                    }
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-3 py-2 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground",
                    col.sortable &&
                      "cursor-pointer select-none hover:text-foreground",
                    col.headerClassName,
                  )}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    <SortIcon col={col} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-3 py-12 text-center text-[13px] text-muted-foreground"
                >
                  {emptyState ?? "No results found."}
                </td>
              </tr>
            ) : (
              pagedData.map((row, i) => {
                const id = getRowId(row);
                const isSelected = selectedIds.has(id);
                return (
                  <tr
                    key={id}
                    className={cn(
                      "border-b border-border/60 h-10 transition-colors duration-100",
                      i % 2 === 1 && "bg-muted/30",
                      onRowClick &&
                        "cursor-pointer hover:bg-muted/60",
                      isSelected && "bg-primary/5",
                    )}
                    onClick={
                      onRowClick ? () => onRowClick(row) : undefined
                    }
                  >
                    {selectable && (
                      <td
                        className="w-10 px-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleRow(id)}
                          aria-label={`Select row ${id}`}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn("px-3 py-2", col.className)}
                      >
                        {col.render(row, i)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-[12px] text-muted-foreground">
          <span>
            Showing {page * pageSize + 1}–
            {Math.min((page + 1) * pageSize, sortedData.length)} of{" "}
            {sortedData.length}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="xs"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="px-2">
              {page + 1} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="xs"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
