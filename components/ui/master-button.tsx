"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface MasterButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "premium" | "executive" | "platinum"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  fullWidth?: boolean
  elevated?: boolean
  glow?: boolean
  magnetic?: boolean
  pulse?: boolean
}

export function MasterButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  elevated = false,
  glow = false,
  magnetic = false,
  pulse = false,
}: MasterButtonProps) {
  const sizes = {
    sm: "px-3 py-2 text-sm h-9",
    md: "px-4 py-2.5 text-sm h-10",
    lg: "px-6 py-3 text-base h-12",
    xl: "px-8 py-4 text-lg h-14",
  }

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 border border-blue-500/20",
    secondary:
      "bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-white shadow-lg shadow-slate-700/25 hover:shadow-xl hover:shadow-slate-700/30 border border-slate-600/20",
    outline:
      "border-2 border-slate-600 hover:border-slate-500 hover:bg-slate-800/50 text-slate-200 hover:text-white backdrop-blur-sm",
    ghost: "hover:bg-slate-800/60 text-slate-300 hover:text-white backdrop-blur-sm",
    destructive:
      "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/30 border border-red-500/20",
    premium:
      "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 border border-blue-400/20",
    executive:
      "bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 hover:from-slate-700 hover:via-slate-600 hover:to-slate-700 text-white shadow-xl shadow-slate-800/40 hover:shadow-2xl hover:shadow-slate-800/50 border border-slate-500/30",
    platinum:
      "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-2xl shadow-purple-600/40 hover:shadow-3xl hover:shadow-purple-600/50 border border-purple-400/30",
  }

  return (
    <motion.button
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-xl font-semibold transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2 focus:ring-offset-slate-900",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        "relative overflow-hidden group",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        elevated && "transform-gpu",
        className,
      )}
      whileHover={
        !disabled
          ? {
              scale: magnetic ? 1.05 : 1.02,
              y: elevated ? -4 : 0,
            }
          : {}
      }
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled || loading}
      transition={
        pulse
          ? { 
              boxShadow: { 
                type: "tween", 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }
            }
          : { type: "spring", stiffness: 400, damping: 25 }
      }
      animate={
        pulse
          ? {
              boxShadow: [
                "0 0 20px rgba(59,130,246,0.3)",
                "0 0 40px rgba(59,130,246,0.6)",
                "0 0 20px rgba(59,130,246,0.3)",
              ],
            }
          : {}
      }
    >
      {/* Multi-layer glow effect */}
      {glow && (
        <>
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-cyan-600/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3), rgba(6,182,212,0.3))",
                "linear-gradient(45deg, rgba(6,182,212,0.3), rgba(59,130,246,0.3), rgba(139,92,246,0.3))",
                "linear-gradient(45deg, rgba(139,92,246,0.3), rgba(6,182,212,0.3), rgba(59,130,246,0.3))",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100"
            animate={{
              background: [
                "linear-gradient(90deg, rgba(96,165,250,0.2), rgba(167,139,250,0.2), rgba(34,211,238,0.2))",
                "linear-gradient(90deg, rgba(34,211,238,0.2), rgba(96,165,250,0.2), rgba(167,139,250,0.2))",
                "linear-gradient(90deg, rgba(167,139,250,0.2), rgba(34,211,238,0.2), rgba(96,165,250,0.2))",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </>
      )}

      {/* Shine effect for premium variants */}
      {(variant === "premium" || variant === "executive" || variant === "platinum") && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.8 }}
        />
      )}

      {/* Particle effects for platinum variant */}
      {variant === "platinum" && (
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/80 rounded-full"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0,
              }}
              animate={{
                x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{
          boxShadow: [
            "inset 0 0 20px rgba(255,255,255,0.05)",
            "inset 0 0 40px rgba(255,255,255,0.1)",
            "inset 0 0 20px rgba(255,255,255,0.05)",
          ],
        }}
        transition={{ 
          boxShadow: { 
            type: "tween", 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }
        }}
      />

      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
