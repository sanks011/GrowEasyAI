"use client"

import type React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface UltimateCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: "default" | "elevated" | "premium" | "executive" | "platinum"
  hover?: boolean
  padding?: "none" | "sm" | "md" | "lg" | "xl"
  glow?: boolean
  tilt?: boolean
  magnetic?: boolean
  shimmer?: boolean
}

export function UltimateCard({
  children,
  className,
  onClick,
  variant = "default",
  hover = true,
  padding = "md",
  glow = false,
  tilt = false,
  magnetic = false,
  shimmer = false,
}: UltimateCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]))
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]))
  const magneticX = useSpring(useTransform(x, [-100, 100], [-5, 5]))
  const magneticY = useSpring(useTransform(y, [-100, 100], [-5, 5]))

  const variants = {
    default: "bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm",
    elevated: "bg-slate-900/60 border border-slate-700/40 backdrop-blur-md shadow-xl shadow-black/10",
    premium:
      "bg-gradient-to-br from-slate-900/80 to-slate-800/60 border border-slate-600/40 backdrop-blur-xl shadow-2xl shadow-black/20",
    executive:
      "bg-gradient-to-br from-slate-900/90 to-slate-800/70 border border-slate-500/30 backdrop-blur-2xl shadow-2xl shadow-black/30",
    platinum:
      "bg-gradient-to-br from-slate-900/95 to-slate-800/80 border border-slate-400/20 backdrop-blur-3xl shadow-3xl shadow-black/40",
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
        hover && "hover:bg-slate-900/70 hover:border-slate-600/50 hover:shadow-3xl hover:shadow-black/30",
        onClick && "cursor-pointer",
        className,
      )}
      onMouseMove={(e) => {
        if (tilt || magnetic) {
          const rect = e.currentTarget.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          x.set((e.clientX - centerX) / (tilt ? 10 : 20))
          y.set((e.clientY - centerY) / (tilt ? 10 : 20))
        }
      }}
      onMouseLeave={() => {
        if (tilt || magnetic) {
          x.set(0)
          y.set(0)
        }
      }}
      style={
        tilt
          ? {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
          : magnetic
            ? {
                x: magneticX,
                y: magneticY,
              }
            : {}
      }
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Multi-layer glow effect */}
      {glow && (
        <>
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2), rgba(6,182,212,0.2))",
                "linear-gradient(45deg, rgba(6,182,212,0.2), rgba(59,130,246,0.2), rgba(139,92,246,0.2))",
                "linear-gradient(45deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2), rgba(59,130,246,0.2))",
              ],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-cyan-400/10 rounded-2xl blur-sm opacity-0 group-hover:opacity-100"
            animate={{
              background: [
                "linear-gradient(90deg, rgba(96,165,250,0.1), rgba(167,139,250,0.1), rgba(34,211,238,0.1))",
                "linear-gradient(90deg, rgba(34,211,238,0.1), rgba(96,165,250,0.1), rgba(167,139,250,0.1))",
                "linear-gradient(90deg, rgba(167,139,250,0.1), rgba(34,211,238,0.1), rgba(96,165,250,0.1))",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
        </>
      )}

      {/* Shimmer effect */}
      {shimmer && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      )}

      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/[0.02] via-transparent to-purple-500/[0.02] pointer-events-none" />

      {/* Border highlight */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          borderColor: [
            "rgba(255,255,255,0.05)",
            "rgba(59,130,246,0.1)",
            "rgba(139,92,246,0.1)",
            "rgba(255,255,255,0.05)",
          ],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Corner accents for premium variants */}
      {(variant === "executive" || variant === "platinum") && (
        <>
          <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-blue-400/30 rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-blue-400/30 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-blue-400/30 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-blue-400/30 rounded-br-lg" />
        </>
      )}
    </motion.div>
  )
}
