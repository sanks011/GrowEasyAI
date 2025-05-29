"use client"

import type React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface EnhancedCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: "default" | "elevated" | "bordered" | "glass" | "premium" | "executive"
  hover?: boolean
  padding?: "none" | "sm" | "md" | "lg" | "xl"
  glow?: boolean
  tilt?: boolean
}

export function EnhancedCard({
  children,
  className,
  onClick,
  variant = "default",
  hover = true,
  padding = "md",
  glow = false,
  tilt = false,
}: EnhancedCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]))
  const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]))

  const variants = {
    default: "bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm",
    elevated: "bg-slate-900/60 border border-slate-700/40 backdrop-blur-md shadow-xl shadow-black/10",
    bordered: "bg-slate-900/20 border-2 border-slate-700/60 backdrop-blur-sm",
    glass: "bg-gradient-to-br from-slate-900/30 to-slate-800/20 border border-slate-700/30 backdrop-blur-xl",
    premium:
      "bg-gradient-to-br from-slate-900/80 to-slate-800/60 border border-slate-600/40 backdrop-blur-xl shadow-2xl shadow-black/20",
    executive:
      "bg-gradient-to-br from-slate-900/90 to-slate-800/70 border border-slate-500/30 backdrop-blur-2xl shadow-2xl shadow-black/30",
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
        "rounded-2xl transition-all duration-700 ease-out relative overflow-hidden group",
        variants[variant],
        paddings[padding],
        hover && "hover:bg-slate-900/70 hover:border-slate-600/50 hover:shadow-2xl hover:shadow-black/20",
        onClick && "cursor-pointer",
        className,
      )}
      onMouseMove={
        tilt
          ? (e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const centerX = rect.left + rect.width / 2
              const centerY = rect.top + rect.height / 2
              x.set((e.clientX - centerX) / 10)
              y.set((e.clientY - centerY) / 10)
            }
          : undefined
      }
      onMouseLeave={
        tilt
          ? () => {
              x.set(0)
              y.set(0)
            }
          : undefined
      }
      style={
        tilt
          ? {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
          : {}
      }
      whileHover={hover ? { y: -6, scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Glow effect */}
      {glow && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2), rgba(6,182,212,0.2))",
              "linear-gradient(45deg, rgba(6,182,212,0.2), rgba(59,130,246,0.2), rgba(139,92,246,0.2))",
              "linear-gradient(45deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2), rgba(59,130,246,0.2))",
            ],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
      )}

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent pointer-events-none" />

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 1.2 }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
