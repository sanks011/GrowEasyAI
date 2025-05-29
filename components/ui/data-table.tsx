"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Column {
  key: string
  label: string
  width?: string
  align?: "left" | "center" | "right"
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  className?: string
  onRowClick?: (row: any) => void
}

export function DataTable({ columns, data, className, onRowClick }: DataTableProps) {
  return (
    <div
      className={cn(
        "bg-white/[0.02] border border-white/[0.08] rounded-xl overflow-hidden backdrop-blur-sm",
        className,
      )}
    >
      {/* Header */}
      <div className="border-b border-white/[0.08] bg-white/[0.02]">
        <div
          className="grid gap-4 px-6 py-4"
          style={{ gridTemplateColumns: columns.map((col) => col.width || "1fr").join(" ") }}
        >
          {columns.map((column) => (
            <div
              key={column.key}
              className={cn(
                "text-xs font-semibold text-slate-400 uppercase tracking-wider",
                column.align === "center" && "text-center",
                column.align === "right" && "text-right",
              )}
            >
              {column.label}
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="divide-y divide-white/[0.05]">
        {data.map((row, index) => (
          <motion.div
            key={index}
            className={cn(
              "grid gap-4 px-6 py-4 transition-colors duration-200",
              onRowClick && "cursor-pointer hover:bg-white/[0.02]",
            )}
            style={{ gridTemplateColumns: columns.map((col) => col.width || "1fr").join(" ") }}
            onClick={() => onRowClick?.(row)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {columns.map((column) => (
              <div
                key={column.key}
                className={cn(
                  "text-sm text-slate-200",
                  column.align === "center" && "text-center",
                  column.align === "right" && "text-right",
                )}
              >
                {column.render ? column.render(row[column.key], row) : row[column.key]}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
