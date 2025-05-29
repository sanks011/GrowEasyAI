"use client"

import type React from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, MoreHorizontal, Eye, Download, Share, Bookmark } from "lucide-react"
import { MasterButton } from "./master-button"
import { useRef, useState } from "react"

interface PerfectAnalyticsProps {
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
  onShare?: () => void
  priority?: "low" | "medium" | "high" | "critical"
}

export function PerfectAnalytics({
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
  onShare,
  priority = "medium",
}: PerfectAnalyticsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [isBookmarked, setIsBookmarked] = useState(false)

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

  const getPriorityColor = () => {
    switch (priority) {
      case "critical":
        return "border-red-500/30 bg-red-500/5"
      case "high":
        return "border-orange-500/30 bg-orange-500/5"
      case "medium":
        return "border-blue-500/30 bg-blue-500/5"
      case "low":
        return "border-slate-500/30 bg-slate-500/5"
      default:
        return "border-slate-700/40"
    }
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        "bg-slate-900/60 border rounded-2xl p-6 backdrop-blur-md group relative overflow-hidden",
        "hover:bg-slate-900/80 hover:border-slate-600/50 transition-all duration-700",
        "shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20",
        getPriorityColor(),
        interactive && "cursor-pointer",
        className,
      )}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      whileHover={interactive ? { y: -6, scale: 1.02 } : { y: -3 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      onClick={interactive ? onViewDetails : undefined}
    >
      {/* Priority indicator */}
      {priority === "critical" && (
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          {icon && (
            <motion.div
              className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/40 group-hover:bg-slate-700/60 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 8 }}
              transition={{ type: "spring", stiffness: 400 }}
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

        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <MasterButton
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e?.stopPropagation()
              setIsBookmarked(!isBookmarked)
            }}
            icon={<Bookmark className={cn("h-3 w-3", isBookmarked && "fill-current text-yellow-400")} />}
          />
          {onShare && (
            <MasterButton
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e?.stopPropagation()
                onShare()
              }}
              icon={<Share className="h-3 w-3" />}
            />
          )}
          {onViewDetails && (
            <MasterButton
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e?.stopPropagation()
                onViewDetails()
              }}
              icon={<Eye className="h-3 w-3" />}
            />
          )}
          {onExport && (
            <MasterButton
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e?.stopPropagation()
                onExport()
              }}
              icon={<Download className="h-3 w-3" />}
            />
          )}
          <MasterButton variant="ghost" size="sm" icon={<MoreHorizontal className="h-3 w-3" />} />
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
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {formatValue(value)}
            </motion.span>
          )}
        </div>

        {/* Change indicator */}
        {change && !loading && (
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="flex items-center gap-1"
            >
              {getTrendIcon()}
              <span className={cn("text-sm font-semibold", getTrendColor())}>
                {change.value > 0 ? "+" : ""}
                {change.value}%
              </span>
            </motion.div>
            {change.period && (
              <span className="text-sm text-slate-400 bg-slate-800/40 px-2 py-1 rounded-full">vs {change.period}</span>
            )}
          </motion.div>
        )}

        {/* Enhanced trend chart */}
        {trend && trend.length > 0 && (
          <motion.div
            className="mt-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Background grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-12 h-full">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="border-r border-slate-600 last:border-r-0" />
                ))}
              </div>
            </div>

            <div className="flex items-end justify-between space-x-1 h-16 relative">
              {trend.map((point, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-sm min-w-[6px] relative group/bar flex-1 max-w-[20px]"
                  style={{ height: `${(point / Math.max(...trend)) * 100}%` }}
                  initial={{ height: 0 }}
                  animate={isInView ? { height: `${(point / Math.max(...trend)) * 100}%` } : {}}
                  transition={{ duration: 1, delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.1, backgroundColor: "#3B82F6" }}
                >
                  {/* Tooltip */}
                  <motion.div
                    className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10"
                    initial={{ y: 5 }}
                    whileHover={{ y: 0 }}
                  >
                    {format === "currency" ? `₹${point.toLocaleString()}` : point}
                  </motion.div>

                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-blue-400 rounded-sm opacity-0 group-hover/bar:opacity-30 blur-sm"
                    whileHover={{ scale: 1.2 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Trend line overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.path
                d={`M ${trend
                  .map(
                    (point, index) =>
                      `${(index / (trend.length - 1)) * 100}% ${100 - (point / Math.max(...trend)) * 80}%`,
                  )
                  .join(" L ")}`}
                stroke="rgba(59, 130, 246, 0.6)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: 1 }}
              />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Interactive indicator */}
      {interactive && (
        <motion.div
          className="absolute bottom-4 right-4 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      )}

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(59,130,246,0.05), rgba(139,92,246,0.05), rgba(6,182,212,0.05))",
            "linear-gradient(45deg, rgba(6,182,212,0.05), rgba(59,130,246,0.05), rgba(139,92,246,0.05))",
            "linear-gradient(45deg, rgba(139,92,246,0.05), rgba(6,182,212,0.05), rgba(59,130,246,0.05))",
          ],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />
    </motion.div>
  )
}
