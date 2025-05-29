"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StatusIndicatorProps {
  status: "success" | "warning" | "error" | "info" | "neutral" | "pending"
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
  className?: string
  animated?: boolean
  dot?: boolean
}

export function StatusIndicator({
  status,
  children,
  size = "sm",
  className,
  animated = false,
  dot = false,
}: StatusIndicatorProps) {
  const sizes = {
    sm: dot ? "px-2 py-1 text-xs" : "px-2.5 py-1 text-xs",
    md: dot ? "px-3 py-1.5 text-sm" : "px-3 py-1.5 text-sm",
    lg: dot ? "px-4 py-2 text-base" : "px-4 py-2 text-base",
  }

  const variants = {
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    error: "bg-red-500/10 text-red-400 border border-red-500/20",
    info: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    neutral: "bg-slate-500/10 text-slate-400 border border-slate-500/20",
    pending: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  }

  const dotColors = {
    success: "bg-emerald-400",
    warning: "bg-amber-400",
    error: "bg-red-400",
    info: "bg-blue-400",
    neutral: "bg-slate-400",
    pending: "bg-orange-400",
  }

  return (
    <motion.span
      className={cn(
        "inline-flex items-center rounded-full font-medium backdrop-blur-sm",
        sizes[size],
        variants[status],
        className,
      )}
      initial={animated ? { opacity: 0, scale: 0.8 } : {}}
      animate={animated ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {dot && (
        <motion.span
          className={cn("w-2 h-2 rounded-full mr-2", dotColors[status])}
          animate={status === "pending" ? { opacity: [1, 0.5, 1] } : {}}
          transition={status === "pending" ? { duration: 1.5, repeat: Number.POSITIVE_INFINITY } : {}}
        />
      )}
      {children}
    </motion.span>
  )
}
