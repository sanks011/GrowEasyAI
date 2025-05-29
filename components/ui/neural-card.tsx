"use client"

import type React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface NeuralCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  gradient?: "neural" | "quantum" | "cosmic" | "aurora" | "plasma"
  intensity?: "low" | "medium" | "high"
}

export function NeuralCard({
  children,
  className,
  onClick,
  gradient = "neural",
  intensity = "medium",
}: NeuralCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]))
  const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]))

  const gradients = {
    neural: "from-blue-600/20 via-purple-600/10 to-cyan-600/20",
    quantum: "from-purple-600/20 via-pink-600/10 to-purple-600/20",
    cosmic: "from-indigo-600/20 via-blue-600/10 to-teal-600/20",
    aurora: "from-green-600/20 via-emerald-600/10 to-cyan-600/20",
    plasma: "from-orange-600/20 via-red-600/10 to-pink-600/20",
  }

  const intensityLevels = {
    low: "opacity-50",
    medium: "opacity-75",
    high: "opacity-100",
  }

  return (
    <motion.div
      className={cn("relative group perspective-1000", onClick && "cursor-pointer", className)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        x.set(e.clientX - centerX)
        y.set(e.clientY - centerY)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02, z: 50 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Neural network background */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            gradients[gradient],
            intensityLevels[intensity],
          )}
        />

        {/* Animated neural connections */}
        <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-30 transition-opacity duration-500">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Neural network lines */}
          <motion.path
            d="M0,50 Q50,20 100,50 T200,50"
            stroke="url(#neuralGradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          <motion.path
            d="M0,100 Q100,70 200,100"
            stroke="url(#neuralGradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.5 }}
          />
        </svg>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2), rgba(6,182,212,0.2))",
            "linear-gradient(45deg, rgba(6,182,212,0.2), rgba(59,130,246,0.2), rgba(139,92,246,0.2))",
            "linear-gradient(45deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2), rgba(59,130,246,0.2))",
          ],
        }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      />

      {/* Main card */}
      <div className="relative backdrop-blur-xl bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Holographic shine */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            background: [
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
              "linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.1) 100%)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />

        {children}
      </div>
    </motion.div>
  )
}
