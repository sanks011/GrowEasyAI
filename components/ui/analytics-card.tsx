"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, MoreHorizontal } from "lucide-react"

interface AnalyticsCardProps {
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
  subtitle?: string
  trend?: number[]
  loading?: boolean
}

export function AnalyticsCard({
  title,
  value,
  change,
  icon,
  className,
  format = "number",
  subtitle,
  trend,
  loading = false,
}: AnalyticsCardProps) {
  const formatValue = (val: string | number) => {
    if (loading) return "---"
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
    return typeof val === "number" ? val.toLocaleString() : val
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
        "bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6 backdrop-blur-md",
        "hover:bg-slate-900/80 hover:border-slate-600/50 transition-all duration-500",
        "shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700/40">
              <div className="text-slate-300">{icon}</div>
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{title}</h3>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>

        <button className="p-1.5 hover:bg-slate-800/60 rounded-lg transition-colors">
          <MoreHorizontal className="h-4 w-4 text-slate-400" />
        </button>
      </div>

      {/* Value */}
      <div className="space-y-3">
        <div className="text-3xl font-bold text-white tracking-tight">
          {loading ? <div className="h-8 w-24 bg-slate-800/60 rounded animate-pulse" /> : formatValue(value)}
        </div>

        {/* Change indicator */}
        {change && !loading && (
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <span className={cn("text-sm font-semibold", getTrendColor())}>
              {change.value > 0 ? "+" : ""}
              {change.value}%
            </span>
            {change.period && <span className="text-sm text-slate-400">vs {change.period}</span>}
          </div>
        )}

        {/* Mini trend chart */}
        {trend && trend.length > 0 && (
          <div className="flex items-end space-x-1 h-8 mt-4">
            {trend.map((point, index) => (
              <motion.div
                key={index}
                className="bg-blue-500/60 rounded-sm min-w-[3px]"
                style={{ height: `${(point / Math.max(...trend)) * 100}%` }}
                initial={{ height: 0 }}
                animate={{ height: `${(point / Math.max(...trend)) * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
