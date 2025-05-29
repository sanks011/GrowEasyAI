"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface GlowButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  className?: string
  glowColor?: string
  disabled?: boolean
}

export function GlowButton({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  glowColor = "blue",
  disabled = false,
}: GlowButtonProps) {
  const glowVariants = {
    initial: { opacity: 0, scale: 1 },
    hover: {
      opacity: 1,
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  const getGlowColor = (color: string) => {
    const colors = {
      blue: "rgba(59,130,246,0.4)",
      green: "rgba(34,197,94,0.4)",
      orange: "rgba(249,115,22,0.4)",
      purple: "rgba(147,51,234,0.4)",
      red: "rgba(239,68,68,0.4)",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <motion.div
      className="relative"
      initial="initial"
      whileHover={!disabled ? "hover" : "initial"}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      <motion.div
        className="absolute -inset-1 rounded-lg z-0 pointer-events-none blur-sm"
        variants={glowVariants}
        style={{
          background: getGlowColor(glowColor),
          opacity: 0,
        }}
      />
      <Button
        variant={variant}
        size={size}
        onClick={onClick}
        disabled={disabled}
        className={`relative z-10 ${className}`}
      >
        {children}
      </Button>
    </motion.div>
  )
}
