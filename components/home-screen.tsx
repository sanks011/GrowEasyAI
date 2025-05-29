"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { UltimateCard } from "@/components/ui/ultimate-card"
import { MasterButton } from "@/components/ui/master-button"
import { PerfectAnalytics } from "@/components/ui/perfect-analytics"
import { StatusIndicator } from "@/components/ui/status-indicator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  MessageSquare,
  FileText,
  BarChart3,
  LogOut,
  Star,
  Target,
  IndianRupee,
  TrendingUp,
  Brain,
  Award,
  ArrowRight,
  Sparkles,
  Users,
  Bell,
  Settings,
  Plus,
  Filter,
  Search,
  Zap,
  Shield,
  Clock,
  Calendar,
  Phone,
  Mail,
  Globe,
  Briefcase,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Lead {
  id: string
  name: string
  product: string
  score: number
  location: string
  status: "hot" | "warm" | "cold"
  lastContact: string
  value: number
  avatar?: string
  phone?: string
  email?: string
}

interface Notification {
  id: string
  type: "lead" | "achievement" | "reminder" | "system"
  title: string
  message: string
  time: string
  read: boolean
}

interface HomeScreenProps {
  onNavigate: (screen: string, data?: any) => void
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { user, logout } = useAuth()
  const [leads, setLeads] = useState<Lead[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [monthlyEarnings, setMonthlyEarnings] = useState(18750)
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate realistic loading with progressive data
        await new Promise((resolve) => setTimeout(resolve, 800))

        const mockLeads: Lead[] = [
          {
            id: "1",
            name: "Ravi Kumar",
            product: "Health Insurance",
            score: 94,
            location: "Lucknow, UP",
            status: "hot",
            lastContact: "2 hours ago",
            value: 65000,
            phone: "+91 98765 43210",
            email: "ravi.kumar@email.com",
          },
          {
            id: "2",
            name: "Priya Sharma",
            product: "Personal Loan",
            score: 89,
            location: "New Delhi",
            status: "hot",
            lastContact: "1 day ago",
            value: 185000,
            phone: "+91 98765 43211",
            email: "priya.sharma@email.com",
          },
          {
            id: "3",
            name: "Amit Singh",
            product: "Credit Card",
            score: 82,
            location: "Mumbai, MH",
            status: "warm",
            lastContact: "2 days ago",
            value: 35000,
            phone: "+91 98765 43212",
            email: "amit.singh@email.com",
          },
          {
            id: "4",
            name: "Sunita Patel",
            product: "Mutual Funds",
            score: 91,
            location: "Ahmedabad, GJ",
            status: "hot",
            lastContact: "4 hours ago",
            value: 125000,
            phone: "+91 98765 43213",
            email: "sunita.patel@email.com",
          },
          {
            id: "5",
            name: "Rajesh Gupta",
            product: "Life Insurance",
            score: 76,
            location: "Pune, MH",
            status: "warm",
            lastContact: "3 days ago",
            value: 95000,
            phone: "+91 98765 43214",
            email: "rajesh.gupta@email.com",
          },
        ]

        const mockNotifications: Notification[] = [
          {
            id: "1",
            type: "lead",
            title: "New High-Value Lead",
            message: "Ravi Kumar (₹65,000) is interested in Health Insurance",
            time: "2 hours ago",
            read: false,
          },
          {
            id: "2",
            type: "achievement",
            title: "Monthly Target 93% Complete",
            message: "You're ₹1,250 away from your ₹20,000 target!",
            time: "1 day ago",
            read: false,
          },
          {
            id: "3",
            type: "reminder",
            title: "Follow-up Reminder",
            message: "Call Priya Sharma about Personal Loan application",
            time: "3 hours ago",
            read: true,
          },
        ]

        setLeads(mockLeads)
        setNotifications(mockNotifications)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const quickStats = [
    {
      title: "Monthly Earnings",
      value: monthlyEarnings,
      format: "currency" as const,
      change: { value: 32, type: "increase" as const, period: "last month" },
      icon: <IndianRupee className="h-5 w-5" />,
      trend: [12000, 13500, 14200, 15800, 16500, 17200, 17900, 18100, 18400, 18600, 18700, 18750],
      interactive: true,
      priority: "high" as const,
    },
    {
      title: "Conversion Rate",
      value: 47,
      format: "percentage" as const,
      change: { value: 18, type: "increase" as const, period: "last week" },
      icon: <Target className="h-5 w-5" />,
      trend: [32, 35, 38, 41, 43, 44, 45, 46, 46, 47, 47, 47],
      interactive: true,
      priority: "medium" as const,
    },
    {
      title: "Active Leads",
      value: leads.length,
      change: { value: 12, type: "increase" as const, period: "yesterday" },
      icon: <Users className="h-5 w-5" />,
      trend: [18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 50, leads.length],
      interactive: true,
      priority: "medium" as const,
    },
    {
      title: "AI Skill Score",
      value: 96,
      format: "percentage" as const,
      change: { value: 15, type: "increase" as const, period: "this week" },
      icon: <Brain className="h-5 w-5" />,
      trend: [78, 82, 85, 88, 90, 92, 93, 94, 95, 95, 96, 96],
      interactive: true,
      priority: "low" as const,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hot":
        return "error"
      case "warm":
        return "warning"
      case "cold":
        return "info"
      default:
        return "neutral"
    }
  }

  const unreadNotifications = notifications.filter((n) => !n.read).length

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <motion.div
          className="text-center text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-24 h-24 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold">Initializing AI Dashboard</h2>
            <div className="space-y-2">
              <motion.p
                className="text-gray-300"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Loading your personalized insights...
              </motion.p>
              <div className="w-64 bg-slate-800 rounded-full h-2 mx-auto overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Enhanced animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-10">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.3, 0.1, 0.3],
              x: [0, -80, 0],
              y: [0, -60, 0],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, delay: 5 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl"
            animate={{
              scale: [1.1, 1.4, 1.1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -50, 0],
              y: [0, 80, 0],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, delay: 10 }}
          />
        </div>
      </div>

      {/* Premium Header */}
      <div className="relative z-10 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                className="w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl flex items-center justify-center shadow-xl border border-blue-500/30"
                whileHover={{ scale: 1.1, rotate: 8 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Brain className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  GrowEasy AI
                </h1>
                <p className="text-slate-300 flex items-center space-x-2">
                  <span>Welcome back, {user?.displayName?.split(" ")[0]}</span>
                  <motion.span
                    animate={{ rotate: [0, 20, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    ✨
                  </motion.span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MasterButton variant="ghost" size="sm" icon={<Search className="h-4 w-4" />} magnetic />
              <div className="relative">
                <MasterButton
                  variant="ghost"
                  size="sm"
                  icon={<Bell className="h-4 w-4" />}
                  onClick={() => setShowNotifications(!showNotifications)}
                  magnetic
                />
                {unreadNotifications > 0 && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {unreadNotifications}
                  </motion.div>
                )}
              </div>
              <MasterButton
                variant="ghost"
                size="sm"
                icon={<Settings className="h-4 w-4" />}
                onClick={() => onNavigate("settings")}
                magnetic
              />
              <MasterButton
                variant="outline"
                size="sm"
                onClick={logout}
                icon={<LogOut className="h-4 w-4" />}
                className="text-gray-400 hover:text-red-400 border-gray-600 hover:border-red-400"
              />
            </div>
          </div>
        </div>

        {/* Notifications Dropdown */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              className="absolute top-full right-6 w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl z-50"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      className={cn(
                        "p-3 rounded-xl border transition-all duration-200",
                        notification.read ? "bg-slate-800/40 border-slate-700/30" : "bg-blue-500/10 border-blue-500/30",
                      )}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-sm">{notification.title}</h4>
                          <p className="text-slate-300 text-xs mt-1">{notification.message}</p>
                          <p className="text-slate-500 text-xs mt-2">{notification.time}</p>
                        </div>
                        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-10">
        {/* Performance Overview */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Performance Overview</h2>
              <p className="text-slate-400 text-lg">Real-time insights powered by AI</p>
            </div>
            <div className="flex items-center space-x-3">
              <StatusIndicator status="success" animated dot>
                <Shield className="h-4 w-4 mr-1" />
                All Systems Operational
              </StatusIndicator>
              <MasterButton variant="outline" size="sm" icon={<Filter className="h-4 w-4" />} magnetic>
                Filter
              </MasterButton>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <PerfectAnalytics
                  title={stat.title}
                  value={stat.value}
                  format={stat.format}
                  change={stat.change}
                  icon={stat.icon}
                  trend={stat.trend}
                  interactive={stat.interactive}
                  priority={stat.priority}
                  onViewDetails={() => onNavigate("analytics", { metric: stat.title })}
                  onShare={() => console.log("Share", stat.title)}
                  loading={loading}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Income Tracker */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <UltimateCard variant="platinum" glow tilt shimmer>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <motion.div
                  className="p-4 bg-emerald-500/20 rounded-2xl border border-emerald-400/30"
                  whileHover={{ scale: 1.1, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <IndianRupee className="h-8 w-8 text-emerald-400" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">Monthly Earnings Tracker</h3>
                  <p className="text-slate-300 flex items-center space-x-2">
                    <span>Target: ₹20,000</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />6 days left
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <StatusIndicator status="success" animated dot>
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +32% growth
                </StatusIndicator>
                <MasterButton variant="premium" size="sm" icon={<Plus className="h-4 w-4" />} glow magnetic>
                  Add Sale
                </MasterButton>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="text-5xl font-bold text-emerald-400 mb-4">₹{monthlyEarnings.toLocaleString()}</div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Progress to target</span>
                    <span className="text-emerald-400 font-semibold">
                      {((monthlyEarnings / 20000) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={(monthlyEarnings / 20000) * 100} className="h-4" />
                  <p className="text-sm text-gray-400">
                    ₹{(20000 - monthlyEarnings).toLocaleString()} more to reach target
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <UltimateCard variant="elevated" className="p-4">
                  <div className="text-sm text-gray-400">This Week</div>
                  <div className="text-2xl font-bold text-white">₹5,250</div>
                  <div className="text-xs text-emerald-400">+15% vs last week</div>
                </UltimateCard>
                <UltimateCard variant="elevated" className="p-4">
                  <div className="text-sm text-gray-400">Daily Average</div>
                  <div className="text-2xl font-bold text-white">₹750</div>
                  <div className="text-xs text-blue-400">Above target</div>
                </UltimateCard>
                <UltimateCard variant="elevated" className="p-4">
                  <div className="text-sm text-gray-400">Best Day</div>
                  <div className="text-2xl font-semibold text-white">₹2,100</div>
                  <div className="text-xs text-purple-400">Yesterday</div>
                </UltimateCard>
              </div>
            </div>
          </UltimateCard>
        </motion.section>

        {/* Enhanced Priority Leads */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <UltimateCard variant="executive" glow magnetic>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <motion.div
                  className="p-4 bg-blue-500/20 rounded-2xl border border-blue-400/30"
                  whileHover={{ scale: 1.1, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Target className="h-8 w-8 text-blue-400" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">Priority Leads</h3>
                  <p className="text-slate-300">AI-scored high-value opportunities</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <StatusIndicator status="error" animated dot>
                  🔥 {leads.filter((l) => l.status === "hot").length} Hot Leads
                </StatusIndicator>
                <MasterButton
                  variant="premium"
                  size="sm"
                  icon={<ArrowRight className="h-4 w-4" />}
                  onClick={() => onNavigate("leads")}
                  glow
                  magnetic
                >
                  View All
                </MasterButton>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatePresence>
                {leads.slice(0, 4).map((lead, index) => (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <UltimateCard
                      variant="premium"
                      onClick={() => onNavigate("lead-details", lead)}
                      className="cursor-pointer group"
                      hover
                      tilt
                      shimmer
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                            {lead.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-white text-lg group-hover:text-blue-100 transition-colors">
                              {lead.name}
                            </div>
                            <div className="text-sm text-gray-300 space-y-1">
                              <div className="flex items-center space-x-2">
                                <Briefcase className="h-3 w-3" />
                                <span>{lead.product}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Globe className="h-3 w-3" />
                                <span>{lead.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <StatusIndicator status={getStatusColor(lead.status) as any} size="sm" dot animated>
                            {lead.status.toUpperCase()}
                          </StatusIndicator>
                          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            {lead.score}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-emerald-400 font-medium">
                            Value: ₹{lead.value.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-400">{lead.lastContact}</div>
                        </div>

                        <div className="flex items-center space-x-2 pt-2 border-t border-slate-700/30">
                          <MasterButton
                            variant="ghost"
                            size="sm"
                            icon={<Phone className="h-3 w-3" />}
                            onClick={(e) => {
                              e?.stopPropagation()
                              window.open(`tel:${lead.phone}`)
                            }}
                          />
                          <MasterButton
                            variant="ghost"
                            size="sm"
                            icon={<Mail className="h-3 w-3" />}
                            onClick={(e) => {
                              e?.stopPropagation()
                              window.open(`mailto:${lead.email}`)
                            }}
                          />
                          <MasterButton
                            variant="ghost"
                            size="sm"
                            icon={<Calendar className="h-3 w-3" />}
                            onClick={(e) => {
                              e?.stopPropagation()
                              console.log("Schedule meeting with", lead.name)
                            }}
                          />
                          <div className="flex-1" />
                          <MasterButton
                            variant="premium"
                            size="sm"
                            icon={<MessageSquare className="h-3 w-3" />}
                            onClick={(e) => {
                              e?.stopPropagation()
                              onNavigate("sales-copilot", lead)
                            }}
                          >
                            Chat
                          </MasterButton>
                        </div>
                      </div>
                    </UltimateCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </UltimateCard>
        </motion.section>

        {/* Enhanced Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Sales Co-Pilot",
                description: "AI-powered sales assistance",
                icon: <MessageSquare className="h-8 w-8" />,
                color: "purple",
                action: () => onNavigate("sales-copilot"),
                badge: "Live AI",
              },
              {
                title: "Learning Hub",
                description: "Personalized training modules",
                icon: <Brain className="h-8 w-8" />,
                color: "orange",
                action: () => onNavigate("learning-hub"),
                badge: "New Content",
              },
              {
                title: "Post-Sale Manager",
                description: "Customer service automation",
                icon: <FileText className="h-8 w-8" />,
                color: "cyan",
                action: () => onNavigate("post-sale"),
                badge: "3 Pending",
              },
              {
                title: "Growth Analytics",
                description: "Business intelligence insights",
                icon: <BarChart3 className="h-8 w-8" />,
                color: "pink",
                action: () => onNavigate("growth-playbook"),
                badge: "Premium",
              },
            ].map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <UltimateCard
                  variant="elevated"
                  onClick={action.action}
                  className="text-center cursor-pointer group relative"
                  hover
                  tilt
                  magnetic
                  shimmer
                >
                  {action.badge && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <StatusIndicator
                        status={
                          action.badge === "Premium" ? "info" : action.badge === "Live AI" ? "success" : "warning"
                        }
                        size="sm"
                        animated
                      >
                        {action.badge}
                      </StatusIndicator>
                    </div>
                  )}

                  <motion.div
                    className={`p-5 bg-${action.color}-500/20 rounded-2xl w-fit mx-auto mb-6 border border-${action.color}-400/30 group-hover:bg-${action.color}-500/30 transition-all duration-300`}
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className={`text-${action.color}-400 group-hover:text-${action.color}-300 transition-colors`}>
                      {action.icon}
                    </div>
                  </motion.div>
                  <div className="font-semibold text-white mb-3 text-lg group-hover:text-blue-100 transition-colors">
                    {action.title}
                  </div>
                  <div className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors mb-4">
                    {action.description}
                  </div>
                  <MasterButton
                    variant="outline"
                    size="sm"
                    icon={<ArrowRight className="h-4 w-4" />}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e?.stopPropagation()
                      action.action()
                    }}
                  >
                    Launch
                  </MasterButton>
                </UltimateCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* AI Insights Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <UltimateCard variant="platinum" glow tilt shimmer>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <motion.div
                  className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-400/30"
                  whileHover={{ scale: 1.1, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Sparkles className="h-8 w-8 text-purple-400" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">AI Growth Insights</h3>
                  <p className="text-slate-300">Personalized recommendations powered by machine learning</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <StatusIndicator status="info" animated dot>
                  <Award className="h-4 w-4 mr-1" />
                  Premium Feature
                </StatusIndicator>
                <MasterButton variant="premium" size="sm" icon={<Zap className="h-4 w-4" />} glow pulse>
                  Upgrade
                </MasterButton>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <UltimateCard variant="elevated" className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">🎯 This Week's Golden Opportunity</h4>
                      <p className="text-xs text-slate-400">AI Confidence: 94%</p>
                    </div>
                  </div>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Focus on <span className="text-purple-400 font-semibold">mutual fund customers aged 28-35</span> in
                    your area. Our AI predicts{" "}
                    <span className="text-emerald-400 font-semibold">68% higher conversion rates</span> and
                    <span className="text-blue-400 font-semibold"> 45% larger deal sizes</span> for this segment this
                    week.
                  </p>
                  <div className="flex items-center space-x-3">
                    <MasterButton variant="premium" size="sm" icon={<ArrowRight className="h-4 w-4" />} glow>
                      View Strategy
                    </MasterButton>
                    <MasterButton variant="outline" size="sm" icon={<Calendar className="h-4 w-4" />}>
                      Schedule Review
                    </MasterButton>
                  </div>
                </UltimateCard>

                <UltimateCard variant="elevated" className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">📈 Performance Insight</h4>
                      <p className="text-xs text-slate-400">Based on 30-day analysis</p>
                    </div>
                  </div>
                  <p className="text-slate-300 mb-4">
                    Your conversion rate is <span className="text-emerald-400 font-semibold">32% above average</span>.
                    Consider increasing your lead volume by 25% to maximize earnings potential.
                  </p>
                  <div className="bg-slate-800/40 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Projected Monthly Impact</div>
                    <div className="text-lg font-bold text-emerald-400">+₹4,200 additional earnings</div>
                  </div>
                </UltimateCard>
              </div>

              <div className="space-y-6">
                <UltimateCard variant="elevated" className="p-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-2">AI Confidence Score</div>
                    <div className="text-4xl font-bold text-emerald-400 mb-3">96%</div>
                    <Progress value={96} className="h-3 mb-3" />
                    <div className="text-xs text-slate-500">Exceptionally High</div>
                  </div>
                </UltimateCard>

                <UltimateCard variant="elevated" className="p-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-2">Next AI Review</div>
                    <div className="text-2xl font-semibold text-white mb-1">Tomorrow</div>
                    <div className="text-sm text-blue-400 mb-3">2:00 PM IST</div>
                    <MasterButton variant="outline" size="sm" fullWidth icon={<Bell className="h-3 w-3" />}>
                      Set Reminder
                    </MasterButton>
                  </div>
                </UltimateCard>

                <UltimateCard variant="elevated" className="p-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-2">Weekly Goal Progress</div>
                    <div className="text-2xl font-semibold text-white mb-1">87%</div>
                    <Progress value={87} className="h-2 mb-3" />
                    <div className="text-xs text-slate-500">2 days ahead of schedule</div>
                  </div>
                </UltimateCard>
              </div>
            </div>
          </UltimateCard>
        </motion.section>
      </div>
    </div>
  )
}
