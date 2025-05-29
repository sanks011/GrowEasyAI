"use client"

import React from "react"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronDown, Search, Filter, Download } from "lucide-react"
import { ExecutiveButton } from "./executive-button"
import { Input } from "@/components/ui/input"

interface Column {
  key: string
  label: string
  width?: string
  align?: "left" | "center" | "right"
  sortable?: boolean
  render?: (value: any, row: any) => ReactNode
}

interface ProfessionalTableProps {
  columns: Column[]
  data: any[]
  className?: string
  onRowClick?: (row: any) => void
  searchable?: boolean
  filterable?: boolean
  exportable?: boolean
  title?: string
  subtitle?: string
}

export function ProfessionalTable({
  columns,
  data,
  className,
  onRowClick,
  searchable = false,
  filterable = false,
  exportable = false,
  title,
  subtitle,
}: ProfessionalTableProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: "asc" | "desc" } | null>(null)

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const filteredData = React.useMemo(() => {
    let filtered = data

    if (searchTerm) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (sortConfig) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [data, searchTerm, sortConfig])

  return (
    <div
      className={cn(
        "bg-slate-900/60 border border-slate-700/40 rounded-2xl overflow-hidden backdrop-blur-md",
        "shadow-xl shadow-black/10",
        className,
      )}
    >
      {/* Header */}
      {(title || searchable || filterable || exportable) && (
        <div className="border-b border-slate-700/40 bg-slate-900/40 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
              {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
            </div>

            <div className="flex items-center space-x-3">
              {filterable && (
                <ExecutiveButton variant="outline" size="sm" icon={<Filter className="h-4 w-4" />}>
                  Filter
                </ExecutiveButton>
              )}
              {exportable && (
                <ExecutiveButton variant="outline" size="sm" icon={<Download className="h-4 w-4" />}>
                  Export
                </ExecutiveButton>
              )}
            </div>
          </div>

          {searchable && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/60 border-slate-700/40 text-white placeholder-slate-400"
              />
            </div>
          )}
        </div>
      )}

      {/* Table Header */}
      <div className="border-b border-slate-700/40 bg-slate-900/20">
        <div
          className="grid gap-6 px-6 py-4"
          style={{ gridTemplateColumns: columns.map((col) => col.width || "1fr").join(" ") }}
        >
          {columns.map((column) => (
            <button
              key={column.key}
              className={cn(
                "text-xs font-semibold text-slate-400 uppercase tracking-wider text-left",
                "flex items-center space-x-1 hover:text-slate-300 transition-colors",
                column.align === "center" && "justify-center text-center",
                column.align === "right" && "justify-end text-right",
                column.sortable && "cursor-pointer",
              )}
              onClick={() => column.sortable && handleSort(column.key)}
            >
              <span>{column.label}</span>
              {column.sortable && (
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform",
                    sortConfig?.key === column.key && sortConfig.direction === "desc" && "rotate-180",
                  )}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-slate-700/30">
        {filteredData.map((row, index) => (
          <motion.div
            key={index}
            className={cn(
              "grid gap-6 px-6 py-4 transition-all duration-300",
              onRowClick && "cursor-pointer hover:bg-slate-800/40",
            )}
            style={{ gridTemplateColumns: columns.map((col) => col.width || "1fr").join(" ") }}
            onClick={() => onRowClick?.(row)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            whileHover={onRowClick ? { backgroundColor: "rgba(51, 65, 85, 0.4)" } : {}}
          >
            {columns.map((column) => (
              <div
                key={column.key}
                className={cn(
                  "text-sm text-slate-200 flex items-center",
                  column.align === "center" && "justify-center text-center",
                  column.align === "right" && "justify-end text-right",
                )}
              >
                {column.render ? column.render(row[column.key], row) : row[column.key]}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 text-sm">No data available</div>
        </div>
      )}
    </div>
  )
}
