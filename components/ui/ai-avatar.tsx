"use client"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Brain, Zap, Sparkles } from "lucide-react"

interface AIAvatarProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "neural" | "quantum" | "cosmic"
  animated?: boolean
  className?: string
}

export function AIAvatar({ size = "md", variant = "neural", animated = true, className }: AIAvatarProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  }

  const variants = {
    neural: {
      gradient: "from-blue-500 via-cyan-500 to-blue-600",
      icon: Brain,
      particles: "#3B82F6",
    },
    quantum: {
      gradient: "from-purple-500 via-pink-500 to-purple-600",
      icon: Zap,
      particles: "#8B5CF6",
    },
    cosmic: {
      gradient: "from-indigo-500 via-purple-500 to-pink-600",
      icon: Sparkles,
      particles: "#6366F1",
    },
  }

  const currentVariant = variants[variant]
  const IconComponent = currentVariant.icon

  return (
    <motion.div
      className={cn("relative", sizes[size], className)}
      animate={animated ? { rotate: 360 } : {}}
      transition={animated ? { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" } : {}}
    >
      {/* Outer glow */}
      <motion.div
        className={cn("absolute inset-0 rounded-full bg-gradient-to-r blur-md", currentVariant.gradient)}
        animate={
          animated
            ? {
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }
            : {}
        }
        transition={animated ? { duration: 2, repeat: Number.POSITIVE_INFINITY } : {}}
      />

      {/* Main avatar */}
      <motion.div
        className={cn(
          "relative rounded-full bg-gradient-to-r border-2 border-white/20 backdrop-blur-sm",
          "flex items-center justify-center shadow-2xl",
          currentVariant.gradient,
          sizes[size],
        )}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Neural network pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="neuralGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="0.2" />
            </radialGradient>
          </defs>

          {/* Neural connections */}
          <motion.circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="url(#neuralGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="url(#neuralGradient)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.5 }}
          />
        </svg>

        {/* Icon */}
        <IconComponent className={cn("text-white relative z-10", iconSizes[size])} />

        {/* Floating particles */}
        {animated &&
          [...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/80 rounded-full"
              initial={{
                x: "50%",
                y: "50%",
                opacity: 0,
              }}
              animate={{
                x: ["50%", `${50 + Math.cos((i * 120 * Math.PI) / 180) * 40}%`, "50%"],
                y: ["50%", `${50 + Math.sin((i * 120 * Math.PI) / 180) * 40}%`, "50%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              }}
            />
          ))}
      </motion.div>

      {/* Pulse rings */}
      {animated && (
        <motion.div
          className={cn("absolute inset-0 rounded-full border-2 border-white/30", sizes[size])}
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.8, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
        />
      )}
    </motion.div>
  )
}
