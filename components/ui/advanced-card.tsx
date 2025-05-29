"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AdvancedCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: "default" | "elevated" | "bordered" | "glass" | "premium"
  hover?: boolean
  padding?: "none" | "sm" | "md" | "lg" | "xl"
}

export function AdvancedCard({
  children,
  className,
  onClick,
  variant = "default",
  hover = true,
  padding = "md",
}: AdvancedCardProps) {
  const variants = {
    default: "bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm",
    elevated: "bg-slate-900/60 border border-slate-700/40 backdrop-blur-md shadow-xl shadow-black/10",
    bordered: "bg-slate-900/20 border-2 border-slate-700/60 backdrop-blur-sm",
    glass: "bg-gradient-to-br from-slate-900/30 to-slate-800/20 border border-slate-700/30 backdrop-blur-xl",
    premium:
      "bg-gradient-to-br from-slate-900/80 to-slate-800/60 border border-slate-600/40 backdrop-blur-xl shadow-2xl shadow-black/20",
  }

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  }

  return (
    <motion.div
      className={cn(
        "rounded-2xl transition-all duration-500 ease-out relative overflow-hidden",
        variants[variant],
        paddings[padding],
        hover && "hover:bg-slate-900/70 hover:border-slate-600/50 hover:shadow-2xl hover:shadow-black/20",
        onClick && "cursor-pointer",
        className,
      )}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      whileTap={onClick ? { scale: 0.99 } : {}}
      onClick={onClick}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
