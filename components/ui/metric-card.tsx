"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: "increase" | "decrease" | "neutral"
    period?: string
  }
  icon?: React.ReactNode
  className?: string
  format?: "currency" | "percentage" | "number"
}

export function MetricCard({ title, value, change, icon, className, format = "number" }: MetricCardProps) {
  const formatValue = (val: string | number) => {
    if (format === "currency" && typeof val === "number") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(val)
    }
    if (format === "percentage" && typeof val === "number") {
      return `${val}%`
    }
    return val.toLocaleString()
  }

  const getTrendIcon = () => {
    if (!change) return null
    switch (change.type) {
      case "increase":
        return <TrendingUp className="h-4 w-4 text-emerald-500" />
      case "decrease":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-slate-400" />
    }
  }

  const getTrendColor = () => {
    if (!change) return "text-slate-400"
    switch (change.type) {
      case "increase":
        return "text-emerald-500"
      case "decrease":
        return "text-red-500"
      default:
        return "text-slate-400"
    }
  }

  return (
    <motion.div
      className={cn(
        "bg-white/[0.02] border border-white/[0.08] rounded-xl p-6 backdrop-blur-sm",
        "hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide">{title}</h3>
        {icon && (
          <div className="p-2 bg-white/[0.05] rounded-lg">
            <div className="text-slate-300">{icon}</div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-3xl font-bold text-white">{formatValue(value)}</div>

        {change && (
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <span className={cn("text-sm font-medium", getTrendColor())}>
              {change.value > 0 ? "+" : ""}
              {change.value}%
            </span>
            {change.period && <span className="text-sm text-slate-400">vs {change.period}</span>}
          </div>
        )}
      </div>
    </motion.div>
  )
}
