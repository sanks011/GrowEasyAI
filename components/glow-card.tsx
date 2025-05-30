"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  onClick?: () => void
  disabled?: boolean
}

export function GlowCard({ children, className = "", glowColor = "blue", onClick, disabled = false }: GlowCardProps) {
  const glowVariants = {
    initial: { opacity: 0, scale: 1 },
    hover: {
      opacity: 0.6,
      scale: 1.01,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  }

  const getGlowGradient = (color: string) => {
    const gradients = {
      blue: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
      green: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
      orange: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
      purple: "radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(126,34,206,0.06) 50%, rgba(107,33,168,0) 100%)",
      red: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    }
    return gradients[color as keyof typeof gradients] || gradients.blue
  }

  return (
    <motion.div
      className={`relative ${onClick && !disabled ? "cursor-pointer" : ""} ${className}`}
      initial="initial"
      whileHover={!disabled ? "hover" : "initial"}
      onClick={!disabled ? onClick : undefined}
    >
      <motion.div
        className="absolute -inset-1 rounded-xl z-0 pointer-events-none"
        variants={glowVariants}
        style={{
          background: getGlowGradient(glowColor),
          opacity: 0,
        }}
      />
      <Card className="relative z-10 bg-background/80 backdrop-blur-sm border border-border/40 shadow-lg hover:shadow-xl transition-all duration-300">
        {children}
      </Card>
    </motion.div>
  )
}
