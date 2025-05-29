"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HolographicDisplayProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "accent"
  glow?: boolean
  scanlines?: boolean
}

export function HolographicDisplay({
  children,
  className,
  variant = "primary",
  glow = true,
  scanlines = true,
}: HolographicDisplayProps) {
  const variants = {
    primary: "from-cyan-500/20 to-blue-500/20 border-cyan-400/30",
    secondary: "from-purple-500/20 to-pink-500/20 border-purple-400/30",
    accent: "from-emerald-500/20 to-teal-500/20 border-emerald-400/30",
  }

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl backdrop-blur-xl",
        "bg-gradient-to-br border shadow-2xl",
        variants[variant],
        className,
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Holographic glow */}
      {glow && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-cyan-600/30 via-blue-600/30 to-purple-600/30 rounded-2xl blur-sm"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
      )}

      {/* Scanlines effect */}
      {scanlines && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)",
            }}
          />
        </div>
      )}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Corner accents */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/50" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400/50" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400/50" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400/50" />
    </motion.div>
  )
}
