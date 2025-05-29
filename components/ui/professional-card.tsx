"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProfessionalCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: "default" | "elevated" | "bordered" | "glass"
  hover?: boolean
}

export function ProfessionalCard({
  children,
  className,
  onClick,
  variant = "default",
  hover = true,
}: ProfessionalCardProps) {
  const variants = {
    default: "bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm",
    elevated: "bg-white/[0.03] border border-white/[0.12] backdrop-blur-md shadow-2xl shadow-black/20",
    bordered: "bg-white/[0.01] border-2 border-white/[0.15] backdrop-blur-sm",
    glass: "bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.1] backdrop-blur-xl",
  }

  return (
    <motion.div
      className={cn(
        "rounded-xl transition-all duration-300 ease-out",
        variants[variant],
        hover && "hover:bg-white/[0.04] hover:border-white/[0.15] hover:shadow-xl hover:shadow-black/10",
        onClick && "cursor-pointer",
        className,
      )}
      whileHover={hover ? { y: -2 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}
