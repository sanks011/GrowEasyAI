"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  gradient?: "blue" | "purple" | "green" | "orange" | "pink" | "cyan"
}

export function GlassCard({ children, className, hover = true, onClick, gradient = "blue" }: GlassCardProps) {
  const gradients = {
    blue: "from-blue-500/10 via-blue-600/5 to-transparent",
    purple: "from-purple-500/10 via-purple-600/5 to-transparent",
    green: "from-emerald-500/10 via-emerald-600/5 to-transparent",
    orange: "from-orange-500/10 via-orange-600/5 to-transparent",
    pink: "from-pink-500/10 via-pink-600/5 to-transparent",
    cyan: "from-cyan-500/10 via-cyan-600/5 to-transparent",
  }

  const borderGradients = {
    blue: "from-blue-500/20 via-blue-400/10 to-transparent",
    purple: "from-purple-500/20 via-purple-400/10 to-transparent",
    green: "from-emerald-500/20 via-emerald-400/10 to-transparent",
    orange: "from-orange-500/20 via-orange-400/10 to-transparent",
    pink: "from-pink-500/20 via-pink-400/10 to-transparent",
    cyan: "from-cyan-500/20 via-cyan-400/10 to-transparent",
  }

  return (
    <motion.div
      className={cn("relative group", onClick && "cursor-pointer", className)}
      whileHover={hover ? { y: -2, scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={onClick}
    >
      {/* Glow effect */}
      <div
        className={cn(
          "absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-2xl blur transition-opacity duration-500",
          borderGradients[gradient],
        )}
      />

      {/* Main card */}
      <div
        className={cn(
          "relative backdrop-blur-xl bg-gradient-to-br border border-white/10 rounded-2xl overflow-hidden",
          "shadow-2xl shadow-black/20",
          gradients[gradient],
        )}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />

        {children}
      </div>
    </motion.div>
  )
}
