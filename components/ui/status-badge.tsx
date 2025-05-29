"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "success" | "warning" | "error" | "info" | "neutral"
  children: React.ReactNode
  size?: "sm" | "md"
  className?: string
}

export function StatusBadge({ status, children, size = "sm", className }: StatusBadgeProps) {
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  }

  const variants = {
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    error: "bg-red-500/10 text-red-400 border border-red-500/20",
    info: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    neutral: "bg-slate-500/10 text-slate-400 border border-slate-500/20",
  }

  return (
    <span className={cn("inline-flex items-center rounded-full font-medium", sizes[size], variants[status], className)}>
      {children}
    </span>
  )
}
