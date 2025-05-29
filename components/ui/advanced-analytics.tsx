"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, MoreHorizontal, Eye, Download } from "lucide-react"
import { SupremeButton } from "./supreme-button"

interface AdvancedAnalyticsProps {
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
  interactive?: boolean
  onViewDetails?: () => void
  onExport?: () => void
}

export function AdvancedAnalytics({
  title,
  value,
  change,
  icon,
  className,
  format = "number",
  subtitle,
  trend,
  loading = false,
  interactive = false,
  onViewDetails,
  onExport,
}: AdvancedAnalyticsProps) {
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
        "bg-slate-900/60 border border-slate-700/40 rounded-2xl p-6 backdrop-blur-md group",
        "hover:bg-slate-900/80 hover:border-slate-600/50 transition-all duration-700",
        "shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20",
        interactive && "cursor-pointer",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={interactive ? { y: -4, scale: 1.02 } : { y: -2 }}
      transition={{ duration: 0.5 }}
      onClick={interactive ? onViewDetails : undefined}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          {icon && (
            <motion.div
              className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700/40 group-hover:bg-slate-700/60 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="text-slate-300 group-hover:text-white transition-colors">{icon}</div>
            </motion.div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider group-hover:text-slate-300 transition-colors">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5 group-hover:text-slate-400 transition-colors">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {onViewDetails && (
            <SupremeButton variant="ghost" size="sm" onClick={onViewDetails} icon={<Eye className="h-3 w-3" />} />
          )}
          {onExport && (
            <SupremeButton variant="ghost" size="sm" onClick={onExport} icon={<Download className="h-3 w-3" />} />
          )}
          <SupremeButton variant="ghost" size="sm" icon={<MoreHorizontal className="h-3 w-3" />} />
        </div>
      </div>

      {/* Value */}
      <div className="space-y-4">
        <div className="text-3xl font-bold text-white tracking-tight group-hover:text-blue-100 transition-colors">
          {loading ? (
            <motion.div
              className="h-8 w-32 bg-slate-800/60 rounded animate-pulse"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          ) : (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {formatValue(value)}
            </motion.span>
          )}
        </div>

        {/* Change indicator */}
        {change && !loading && (
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400 }}>
              {getTrendIcon()}
            </motion.div>
            <span className={cn("text-sm font-semibold", getTrendColor())}>
              {change.value > 0 ? "+" : ""}
              {change.value}%
            </span>
            {change.period && <span className="text-sm text-slate-400">vs {change.period}</span>}
          </motion.div>
        )}

        {/* Enhanced trend chart */}
        {trend && trend.length > 0 && (
          <motion.div
            className="flex items-end space-x-1 h-12 mt-6 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {trend.map((point, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-sm min-w-[4px] relative group/bar"
                style={{ height: `${(point / Math.max(...trend)) * 100}%` }}
                initial={{ height: 0 }}
                animate={{ height: `${(point / Math.max(...trend)) * 100}%` }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                whileHover={{ scale: 1.2, backgroundColor: "#3B82F6" }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                  {point}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Interactive indicator */}
      {interactive && (
        <motion.div
          className="absolute bottom-3 right-3 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      )}
    </motion.div>
  )
}
