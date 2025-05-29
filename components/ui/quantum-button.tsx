"use client"

import type React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface QuantumButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost" | "quantum"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  disabled?: boolean
  loading?: boolean
  quantum?: "blue" | "purple" | "green" | "orange" | "pink" | "cosmic"
  icon?: React.ReactNode
  pulse?: boolean
}

export function QuantumButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  loading = false,
  quantum = "blue",
  icon,
  pulse = false,
}: QuantumButtonProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]))
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]))

  const quantumGradients = {
    blue: "from-blue-600 via-blue-500 to-cyan-500",
    purple: "from-purple-600 via-purple-500 to-pink-500",
    green: "from-emerald-600 via-green-500 to-teal-500",
    orange: "from-orange-600 via-orange-500 to-red-500",
    pink: "from-pink-600 via-rose-500 to-purple-500",
    cosmic: "from-indigo-600 via-purple-500 to-pink-500",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-12 py-6 text-xl",
  }

  const variants = {
    primary: cn(
      "bg-gradient-to-r text-white shadow-2xl shadow-black/50",
      "hover:shadow-3xl hover:shadow-black/60",
      quantumGradients[quantum],
    ),
    secondary: "bg-slate-800/80 text-white border border-white/20 hover:bg-slate-700/80 backdrop-blur-sm",
    ghost: "text-white hover:bg-white/10 backdrop-blur-sm",
    quantum: cn(
      "bg-gradient-to-r text-white shadow-2xl border border-white/20",
      "hover:shadow-3xl backdrop-blur-sm",
      quantumGradients[quantum],
    ),
  }

  return (
    <motion.button
      className={cn(
        "relative overflow-hidden rounded-2xl font-semibold transition-all duration-300",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "flex items-center justify-center gap-3 group",
        "transform-gpu perspective-1000",
        variants[variant],
        sizes[size],
        className,
      )}
      onMouseMove={(e) => {
        if (disabled) return
        const rect = e.currentTarget.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        x.set((e.clientX - centerX) / 10)
        y.set((e.clientY - centerY) / 10)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={!disabled ? { scale: 1.05, z: 20 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled || loading}
      animate={
        pulse
          ? {
              boxShadow: [
                "0 0 20px rgba(59,130,246,0.5)",
                "0 0 40px rgba(59,130,246,0.8)",
                "0 0 20px rgba(59,130,246,0.5)",
              ],
            }
          : {}
      }
      transition={
        pulse ? { duration: 2, repeat: Number.POSITIVE_INFINITY } : { type: "spring", stiffness: 300, damping: 30 }
      }
    >
      {/* Quantum particles */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
            }}
            animate={{
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Holographic shine */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.8 }}
      />

      {/* Energy waves */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: [
            "inset 0 0 20px rgba(255,255,255,0.1)",
            "inset 0 0 40px rgba(255,255,255,0.2)",
            "inset 0 0 20px rgba(255,255,255,0.1)",
          ],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />

      {loading && <Loader2 className="h-5 w-5 animate-spin" />}
      {icon && !loading && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
