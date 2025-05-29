"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface ExecutiveButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "premium"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  fullWidth?: boolean
  elevated?: boolean
}

export function ExecutiveButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  elevated = false,
}: ExecutiveButtonProps) {
  const sizes = {
    sm: "px-3 py-2 text-sm h-9",
    md: "px-4 py-2.5 text-sm h-10",
    lg: "px-6 py-3 text-base h-12",
    xl: "px-8 py-4 text-lg h-14",
  }

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 border border-blue-500/20",
    secondary:
      "bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-white shadow-lg shadow-slate-700/25 hover:shadow-xl hover:shadow-slate-700/30 border border-slate-600/20",
    outline:
      "border-2 border-slate-600 hover:border-slate-500 hover:bg-slate-800/50 text-slate-200 hover:text-white backdrop-blur-sm",
    ghost: "hover:bg-slate-800/60 text-slate-300 hover:text-white backdrop-blur-sm",
    destructive:
      "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/30 border border-red-500/20",
    premium:
      "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 border border-blue-400/20",
  }

  return (
    <motion.button
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-xl font-semibold transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2 focus:ring-offset-slate-900",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        "relative overflow-hidden",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        elevated && "transform-gpu",
        className,
      )}
      whileHover={!disabled ? { scale: 1.02, y: elevated ? -2 : 0 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled || loading}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Shine effect for premium variant */}
      {variant === "premium" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.8 }}
        />
      )}

      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
