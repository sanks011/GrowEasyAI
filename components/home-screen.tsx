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
  getGPProfile, 
  getTopLeads, 
  getTrainingModules, 
  generateGrowthInsights,
  initializeDummyData 
} from "@/lib/firebase"
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
  lastContact: string | Date
  value: number
  avatar?: string
  phone?: string
  email?: string
  interests?: string[]
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
  const [monthlyEarnings, setMonthlyEarnings] = useState(0)
  const [gpProfile, setGpProfile] = useState<any>(null)
  const [trainingModules, setTrainingModules] = useState<any[]>([])
  const [growthInsights, setGrowthInsights] = useState<any[]>([])
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        
        // Initialize dummy data first time
        await initializeDummyData()
        
        // Use default GP ID for demo
        const gpId = "gp_001"
        
        // Load GP Profile
        const profile = await getGPProfile(gpId)
        if (profile) {
          setGpProfile(profile)
          setMonthlyEarnings((profile as any).monthlyEarnings || 0)
        }

        // Load Top Leads
        const topLeads = await getTopLeads(gpId, 5)
        const formattedLeads = topLeads.map((lead: any) => ({
          id: lead.id,
          name: lead.name,
          product: lead.interests?.[0] || "General",
          score: lead.score,
          location: lead.location,
          status: lead.status,
          lastContact: formatLastContact(lead.lastContact),
          value: lead.income || 50000,
          phone: lead.phone,
          email: `${lead.name.toLowerCase().replace(' ', '.')}@email.com`
        }))
        setLeads(formattedLeads)

        // Load Training Modules
        const modules = await getTrainingModules(gpId)
        setTrainingModules(modules)

        // Generate Growth Insights
        if (profile) {
          const insights = generateGrowthInsights(profile)
          setGrowthInsights(insights)
        }

        // Generate notifications based on data
        const mockNotifications: Notification[] = [
          {
            id: "1",
            type: "lead",
            title: "New High-Value Lead",
            message: `${(topLeads[0] as any)?.name || 'New customer'} is interested in ${(topLeads[0] as any)?.interests?.[0] || 'Insurance'}`,
            time: "2 hours ago",
            read: false,
          },
          {
            id: "2",
            type: "achievement",
            title: "Monthly Target Progress",
            message: `You've earned ₹${(profile as any)?.monthlyEarnings || 0} this month. Keep going!`,
            time: "1 day ago",
            read: false,
          },
          {
            id: "3",
            type: "reminder",
            title: "Training Module Available",
            message: `Complete "${(modules[0] as any)?.title || 'Training'}" to improve your skills`,
            time: "3 hours ago",
            read: true,
          },
        ]
        setNotifications(mockNotifications)

      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const formatLastContact = (date: any) => {
    if (!date) return "Never"
    const now = new Date()
    const contactDate = date.toDate ? date.toDate() : new Date(date)
    const diffMs = now.getTime() - contactDate.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)
    
    if (diffHours < 1) return "Just now"
    if (diffHours < 24) return `${diffHours} hours ago`
    if (diffDays === 1) return "1 day ago"
    return `${diffDays} days ago`
  }

  const quickStats = [
    {
      title: "Monthly Earnings",
      value: monthlyEarnings,
      format: "currency" as const,
      change: { value: gpProfile?.conversionRate ? Math.round(gpProfile.conversionRate * 100) : 32, type: "increase" as const, period: "last month" },
      icon: <IndianRupee className="h-5 w-5" />,
      trend: [12000, 13500, 14200, 15800, 16500, 17200, 17900, 18100, 18400, 18600, 18700, monthlyEarnings],
      interactive: true,
      priority: "high" as const,
    },
    {
      title: "Conversion Rate",
      value: gpProfile ? Math.round(gpProfile.conversionRate * 100) : 47,
      format: "percentage" as const,
      change: { value: 18, type: "increase" as const, period: "last week" },
      icon: <Target className="h-5 w-5" />,
      trend: [32, 35, 38, 41, 43, 44, 45, 46, 46, 47, 47, gpProfile ? Math.round(gpProfile.conversionRate * 100) : 47],
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
      value: gpProfile?.performanceScore || 96,
      format: "percentage" as const,
      change: { value: 15, type: "increase" as const, period: "this week" },
      icon: <Brain className="h-5 w-5" />,
      trend: [78, 82, 85, 88, 90, 92, 93, 94, 95, 95, 96, gpProfile?.performanceScore || 96],
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold">Loading Dashboard...</h2>
            <div className="space-y-2">
              <p className="text-gray-300">Getting your data ready...</p>
              <div className="w-48 bg-slate-800 rounded-full h-2 mx-auto overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
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


      {/* Premium Header */}
      <div className="relative z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl flex items-center justify-center shadow-xl border border-blue-500/30">
                  <Brain className="h-8 w-8 text-white" />
                </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  GrowEasy AI
                </h1>
                <p className="text-slate-300 flex items-center space-x-2">
                  <span>Welcome back, {user?.displayName?.split(" ")[0]}</span>
                  <span>✨</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MasterButton variant="ghost" size="sm" icon={<Search className="h-4 w-4" />}>
                Search
              </MasterButton>
              <div className="relative">
                <MasterButton
                  variant="ghost"
                  size="sm"
                  icon={<Bell className="h-4 w-4" />}
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  Notifications
                </MasterButton>
                {unreadNotifications > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                    {unreadNotifications}
                  </div>
                )}
              </div>
              <MasterButton
                variant="ghost"
                size="sm"
                icon={<Settings className="h-4 w-4" />}
                onClick={() => onNavigate("settings")}
              >
                Settings
              </MasterButton>
              <MasterButton
                variant="outline"
                size="sm"
                onClick={logout}
                icon={<LogOut className="h-4 w-4" />}
                className="text-gray-400 hover:text-red-400 border-gray-600 hover:border-red-400"
              >
                Logout
              </MasterButton>
            </div>
          </div>
        </div>

        {/* Notifications Dropdown */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              className="fixed top-24 right-6 w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl"
              style={{ zIndex: 9999 }}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "p-3 rounded-xl border transition-all duration-200",
                          notification.read ? "bg-slate-800/40 border-slate-700/30" : "bg-blue-500/10 border-blue-500/30",
                        )}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-white text-sm">{notification.title}</h4>
                            <p className="text-slate-300 text-xs mt-1">{notification.message}</p>
                            <p className="text-slate-500 text-xs mt-2">{notification.time}</p>
                          </div>
                          {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />}
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-10">
        {/* Performance Overview */}
        <section>
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
              <MasterButton variant="outline" size="sm" icon={<Filter className="h-4 w-4" />}>
                Filter
              </MasterButton>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <div key={stat.title}>
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
              </div>
            ))}
          </div>
        </section>

        {/* Training Nudge Section */}
        {trainingModules.length > 0 && (
          <section>
            <UltimateCard variant="executive">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-orange-500/20 rounded-2xl border border-orange-400/30">
                    <Brain className="h-8 w-8 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">🎯 Skill Boost Recommended</h3>
                    <p className="text-slate-300">2-minute training to improve your conversion rate</p>
                  </div>
                </div>
                <StatusIndicator status="warning" animated dot>
                  Skill Gap Detected
                </StatusIndicator>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <UltimateCard variant="elevated" className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        📚
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-lg mb-2">
                          {trainingModules[0]?.title || "Credit Card Sales Mastery"}
                        </h4>
                        <p className="text-slate-300 text-sm mb-4">
                          {trainingModules[0]?.description || "Learn to pitch credit cards effectively and handle objections"}
                        </p>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-400">
                              {trainingModules[0]?.duration || 2} min
                            </span>
                          </div>
                          <Badge variant="secondary">
                            {trainingModules[0]?.difficulty || "beginner"}
                          </Badge>
                          <Badge className="bg-orange-500/20 text-orange-300 border-orange-400/30">
                            {trainingModules[0]?.type || "quiz"}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MasterButton
                            variant="premium"
                            icon={<ArrowRight className="h-4 w-4" />}
                            onClick={() => onNavigate("learning-hub")}
                          >
                            Start Training
                          </MasterButton>
                          <MasterButton
                            variant="ghost"
                            size="sm"
                            onClick={() => onNavigate("learning-hub")}
                          >
                            View All Modules
                          </MasterButton>
                        </div>
                      </div>
                    </div>
                  </UltimateCard>
                </div>
                
                <div className="space-y-4">
                  <UltimateCard variant="elevated" className="p-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-400 mb-2">Completion Rate</div>
                      <div className="text-2xl font-bold text-orange-400 mb-2">
                        {Math.round((trainingModules[0]?.completionRate || 0.78) * 100)}%
                      </div>
                      <Progress value={(trainingModules[0]?.completionRate || 0.78) * 100} className="h-2" />
                    </div>
                  </UltimateCard>
                  
                  <UltimateCard variant="elevated" className="p-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-400 mb-2">Average Score</div>
                      <div className="text-2xl font-bold text-white mb-1">
                        {trainingModules[0]?.averageScore || 82}%
                      </div>
                      <div className="text-xs text-emerald-400">Above average</div>
                    </div>
                  </UltimateCard>

                  <UltimateCard variant="elevated" className="p-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-400 mb-2">Potential Impact</div>
                      <div className="text-lg font-bold text-emerald-400">+₹2,000</div>
                      <div className="text-xs text-slate-400">extra this month</div>
                    </div>
                  </UltimateCard>
                </div>
              </div>
            </UltimateCard>
          </section>
        )}

        {/* Enhanced Income Tracker */}
        <section>
          <UltimateCard variant="platinum">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-emerald-500/20 rounded-2xl border border-emerald-400/30">
                  <IndianRupee className="h-8 w-8 text-emerald-400" />
                </div>
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
                <MasterButton variant="premium" size="sm" icon={<Plus className="h-4 w-4" />}>
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
        </section>

        {/* Enhanced Priority Leads */}
        <section>
          <UltimateCard variant="executive">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-blue-500/20 rounded-2xl border border-blue-400/30">
                  <Target className="h-8 w-8 text-blue-400" />
                </div>
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
                >
                  View All
                </MasterButton>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {leads.slice(0, 4).map((lead, index) => (
                <div key={lead.id}>
                  <UltimateCard
                    variant="premium"
                    onClick={() => onNavigate("lead-details", lead)}
                    className="cursor-pointer group"
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
                          <div className="text-xs text-gray-400">{typeof lead.lastContact === 'string' ? lead.lastContact : formatLastContact(lead.lastContact)}</div>
                        </div>

                        <div className="flex items-center space-x-2 pt-2 border-t border-slate-700/30">
                          <MasterButton
                            variant="ghost"
                            size="sm"
                            icon={<Phone className="h-3 w-3" />}
                            onClick={() => {
                              window.open(`tel:${lead.phone}`)
                            }}
                          >
                            Call
                          </MasterButton>
                          <MasterButton
                            variant="ghost"
                            size="sm"
                            icon={<Mail className="h-3 w-3" />}
                            onClick={() => {
                              window.open(`mailto:${lead.email}`)
                            }}
                          >
                            Email
                          </MasterButton>
                          <MasterButton
                            variant="ghost"
                            size="sm"
                            icon={<Calendar className="h-3 w-3" />}
                            onClick={() => {
                              console.log("Schedule meeting with", lead.name)
                            }}
                          >
                            Schedule
                          </MasterButton>
                          <div className="flex-1" />
                          <MasterButton
                            variant="premium"
                            size="sm"
                            icon={<MessageSquare className="h-3 w-3" />}
                            onClick={() => {
                              onNavigate("sales-copilot", lead)
                            }}
                          >
                            Chat
                          </MasterButton>
                        </div>
                      </div>
                    </UltimateCard>
                  </div>
                ))}
            </div>
          </UltimateCard>
        </section>

        {/* Enhanced Quick Actions */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Sales Co-Pilot",
                description: "AI-powered sales assistance",
                icon: <MessageSquare className="h-8 w-8" />,
                color: "purple",
                action: () => onNavigate("sales-copilot", leads[0] || {}),
                badge: "Live AI",
              },
              {
                title: "Learning Hub",
                description: "Personalized training modules",
                icon: <Brain className="h-8 w-8" />,
                color: "orange",
                action: () => onNavigate("learning-hub"),
                badge: trainingModules.length > 0 ? "New Content" : "Ready",
              },
              {
                title: "Post-Sale Manager",
                description: "Customer service automation",
                icon: <FileText className="h-8 w-8" />,
                color: "cyan",
                action: () => onNavigate("post-sale", { customerId: leads[0]?.id || "cust_001", customerName: leads[0]?.name || "Customer" }),
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
              <div key={action.title}>
                <UltimateCard
                  variant="elevated"
                  onClick={action.action}
                  className="text-center cursor-pointer group relative"
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

                  <div className={`p-5 bg-${action.color}-500/20 rounded-2xl w-fit mx-auto mb-6 border border-${action.color}-400/30 group-hover:bg-${action.color}-500/30 transition-all duration-300`}>
                    <div className={`text-${action.color}-400 group-hover:text-${action.color}-300 transition-colors`}>
                      {action.icon}
                    </div>
                  </div>
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
                    onClick={() => {
                      action.action()
                    }}
                  >
                    Launch
                  </MasterButton>
                </UltimateCard>
              </div>
            ))}
          </div>
        </section>

        {/* AI Insights Section */}
        <section>
          <UltimateCard variant="platinum">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-400/30">
                  <Sparkles className="h-8 w-8 text-purple-400" />
                </div>
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
                <MasterButton variant="premium" size="sm" icon={<Zap className="h-4 w-4" />}>
                  Upgrade
                </MasterButton>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {growthInsights.map((insight, index) => (
                  <UltimateCard key={insight.type} variant="elevated" className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        {insight.type === "performance" && <Target className="h-5 w-5 text-white" />}
                        {insight.type === "expansion" && <TrendingUp className="h-5 w-5 text-white" />}
                        {insight.type === "efficiency" && <Zap className="h-5 w-5 text-white" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{insight.title}</h4>
                        <p className="text-xs text-slate-400">AI Confidence: 94%</p>
                      </div>
                    </div>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      {insight.description}
                    </p>
                    <div className="bg-slate-800/40 rounded-lg p-3 mb-4">
                      <div className="text-xs text-slate-400 mb-1">Recommended Action</div>
                      <div className="text-sm font-medium text-white">{insight.action}</div>
                      <div className="text-xs text-emerald-400 mt-1">Potential: {insight.potential}</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MasterButton variant="premium" size="sm" icon={<ArrowRight className="h-4 w-4" />}>
                        Take Action
                      </MasterButton>
                      <MasterButton variant="outline" size="sm" icon={<Calendar className="h-4 w-4" />}>
                        Schedule Review
                      </MasterButton>
                    </div>
                  </UltimateCard>
                ))}
                
                {growthInsights.length === 0 && (
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
                      <MasterButton variant="premium" size="sm" icon={<ArrowRight className="h-4 w-4" />}>
                        View Strategy
                      </MasterButton>
                      <MasterButton variant="outline" size="sm" icon={<Calendar className="h-4 w-4" />}>
                        Schedule Review
                      </MasterButton>
                    </div>
                  </UltimateCard>
                )}
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
        </section>
      </div>
    </div>
  )
}
