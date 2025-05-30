"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ArrowLeft, TrendingUp, TrendingDown, Target, Lightbulb, Award, ArrowRight, DollarSign, Calendar, CheckCircle } from "lucide-react"
import { generateGrowthInsights, getGPProfile } from "@/lib/firebase"
import { GlowCard } from "./glow-card"
import { GlowButton } from "./glow-button"

interface GrowthPlaybookProps {
  gpId: string
  onBack: () => void
  onActOnTip: (tipType: string) => void
}

interface Insight {
  type: string
  title: string
  description: string
  action: string
  potential: string
}

interface PerformanceMetric {
  label: string
  value: number
  target: number
  change: number
  format: string
}

export default function GrowthPlaybook({ gpId, onBack, onActOnTip }: GrowthPlaybookProps) {
  const [gpProfile, setGpProfile] = useState<any>(null)
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGrowthData()
  }, [gpId])

  const loadGrowthData = async () => {
    try {
      const profile = await getGPProfile(gpId)
      if (profile) {
        setGpProfile(profile)
        const growthInsights = generateGrowthInsights(profile)
        setInsights(growthInsights)
      }
    } catch (error) {
      console.error("Error loading growth data:", error)
    } finally {
      setLoading(false)
    }
  }

  const performanceMetrics: PerformanceMetric[] = [
    {
      label: "Monthly Earnings",
      value: gpProfile?.monthlyEarnings || 0,
      target: 20000,
      change: 12,
      format: "currency"
    },
    {
      label: "Conversion Rate",
      value: (gpProfile?.conversionRate || 0) * 100,
      target: 30,
      change: 5,
      format: "percentage"
    },
    {
      label: "Total Sales",
      value: gpProfile?.totalSales || 0,
      target: 100,
      change: 8,
      format: "number"
    },
    {
      label: "Performance Score",
      value: gpProfile?.performanceScore || 0,
      target: 100,
      change: 3,
      format: "score"
    }
  ]

  const formatValue = (value: number, format: string) => {
    switch (format) {
      case "currency":
        return `₹${value.toLocaleString()}`
      case "percentage":
        return `${value.toFixed(1)}%`
      case "score":
        return `${value}/100`
      default:
        return value.toString()
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "performance":
        return <TrendingUp className="h-5 w-5 text-blue-600" />
      case "expansion":
        return <Target className="h-5 w-5 text-green-600" />
      case "efficiency":
        return <Lightbulb className="h-5 w-5 text-orange-600" />
      default:
        return <Award className="h-5 w-5 text-purple-600" />
    }
  }

  const categoryOpportunities = [
    {
      category: "Mutual Funds",
      potential: "₹3,000",
      demand: "High",
      difficulty: "Medium",
      timeToStart: "2 days",
      description: "Growing trend in your area. Perfect entry point."
    },
    {
      category: "Credit Cards",
      potential: "₹2,500",
      demand: "Medium",
      difficulty: "Easy",
      timeToStart: "1 day",
      description: "Leverage your existing customer base."
    },
    {
      category: "Term Insurance",
      potential: "₹4,000",
      demand: "High",
      difficulty: "Hard",
      timeToStart: "1 week",
      description: "High-value product with good commissions."
    }
  ]

  const weeklyGoals = [
    {
      goal: "Contact 10 warm leads",
      progress: 60,
      status: "in-progress",
      reward: "₹500 bonus"
    },
    {
      goal: "Complete 2 training modules",
      progress: 100,
      status: "completed",
      reward: "Skill badge"
    },
    {
      goal: "Upload 5 KYC documents",
      progress: 80,
      status: "in-progress", 
      reward: "Process faster"
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-300 hover:text-white hover:bg-slate-800">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Growth Playbook
            </h1>
          </div>
          <Badge className="bg-purple-900/60 text-purple-300 border border-purple-500/50">
            {gpProfile?.name}
          </Badge>
        </div>

        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700">
            <TabsTrigger 
              value="insights"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-400"
            >
              Insights
            </TabsTrigger>
            <TabsTrigger 
              value="performance"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-400"
            >
              Performance
            </TabsTrigger>
            <TabsTrigger 
              value="opportunities"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-400"
            >
              Opportunities
            </TabsTrigger>
            <TabsTrigger 
              value="goals"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-400"
            >
              Goals
            </TabsTrigger>
          </TabsList>

          {/* Insights Tab */}
          <TabsContent value="insights">
            <div className="space-y-6">              <GlowCard glowColor="blue" className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    Weekly Growth Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-blue-300">This Week</p>
                      <p className="text-2xl font-bold text-white">₹{gpProfile?.monthlyEarnings?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-blue-300">Growth Potential</p>
                      <p className="text-2xl font-bold text-white">₹5,000</p>
                    </div>
                  </div>
                </CardContent>
              </GlowCard>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {insights.map((insight, index) => (
                  <GlowCard 
                    key={index} 
                    glowColor={
                      insight.type === "performance" ? "blue" :
                      insight.type === "expansion" ? "green" : "orange"
                    }
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${
                          insight.type === "performance" ? "bg-blue-900/30 border border-blue-500/30" :
                          insight.type === "expansion" ? "bg-green-900/30 border border-green-500/30" : 
                          "bg-orange-900/30 border border-orange-500/30"
                        }`}>
                          {getInsightIcon(insight.type)}
                        </div>
                        <CardTitle className="text-lg text-white">{insight.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-300">{insight.description}</p>
                      
                      <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="h-3 w-3 text-amber-400" />
                          <p className="text-xs font-medium text-gray-300">Recommended Action:</p>
                        </div>
                        <p className="text-sm font-medium text-gray-200">{insight.action}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-gray-400">Potential Impact</span>
                          <p className="text-green-400 font-medium">{insight.potential}</p>
                        </div>
                        <GlowButton 
                          size="sm" 
                          onClick={() => onActOnTip(insight.type)}
                          className="h-8"
                          glowColor={
                            insight.type === "performance" ? "blue" :
                            insight.type === "expansion" ? "green" : "orange"
                          }
                        >
                          Act On Tip
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </GlowButton>
                      </div>
                    </CardContent>
                  </GlowCard>
                ))}
              </div>
            </div>
          </TabsContent>          {/* Performance Tab */}
          <TabsContent value="performance">
            <GlowCard glowColor="blue" className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  Performance Analysis
                </CardTitle>
                <CardDescription className="text-gray-300">
                  AI-powered analysis of your sales performance with personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Our intelligent system has analyzed your recent sales activity and identified key growth opportunities.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gradient-to-b from-blue-900/40 to-purple-900/40 p-4 rounded-lg border border-blue-500/30">
                    <p className="text-gray-300 text-xs mb-2">AI Confidence</p>
                    <p className="text-2xl font-bold text-blue-300">94%</p>
                  </div>
                  <div className="bg-gradient-to-b from-green-900/40 to-emerald-900/40 p-4 rounded-lg border border-green-500/30">
                    <p className="text-gray-300 text-xs mb-2">Growth Rate</p>
                    <p className="text-2xl font-bold text-green-300">+32%</p>
                  </div>
                  <div className="bg-gradient-to-b from-purple-900/40 to-indigo-900/40 p-4 rounded-lg border border-purple-500/30">
                    <p className="text-gray-300 text-xs mb-2">Analysis Points</p>
                    <p className="text-2xl font-bold text-purple-300">14</p>
                  </div>
                </div>
              </CardContent>
            </GlowCard>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {performanceMetrics.map((metric, index) => (
                <GlowCard 
                  key={index} 
                  glowColor={
                    index === 0 ? "green" : 
                    index === 1 ? "blue" : 
                    index === 2 ? "purple" : "orange"
                  }
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        index === 0 ? "bg-green-900/30 border border-green-500/30" :
                        index === 1 ? "bg-blue-900/30 border border-blue-500/30" : 
                        index === 2 ? "bg-purple-900/30 border border-purple-500/30" : 
                        "bg-orange-900/30 border border-orange-500/30"
                      }`}>
                        {index === 0 ? <DollarSign className="h-5 w-5 text-green-400" /> :
                         index === 1 ? <TrendingUp className="h-5 w-5 text-blue-400" /> :
                         index === 2 ? <Target className="h-5 w-5 text-purple-400" /> :
                         <Award className="h-5 w-5 text-orange-400" />}
                      </div>
                      <CardTitle className="text-lg text-white">{metric.label}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-end gap-2 text-gray-100">
                      <span className="text-3xl font-bold">
                        {formatValue(metric.value, metric.format)}
                      </span>
                      <span className="text-sm text-gray-400">
                        / {formatValue(metric.target, metric.format)}
                      </span>
                    </div>
                    <Progress 
                      value={(metric.value / metric.target) * 100} 
                      className={`h-3 ${
                        index === 0 ? "bg-green-950/50" :
                        index === 1 ? "bg-blue-950/50" : 
                        index === 2 ? "bg-purple-950/50" : 
                        "bg-orange-950/50"
                      }`}
                    />
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <span>Progress to Target</span>
                      <span className={`flex items-center gap-1 ${
                        metric.change > 0 ? 'text-green-400' : 'text-red-400'
                      } font-medium`}>
                        {metric.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {metric.change > 0 ? '+' : ''}{metric.change}% {metric.change > 0 ? 'growth' : 'decline'}
                      </span>
                    </div>
                    
                    <div className="pt-3 mt-3 border-t border-gray-800">
                      <GlowButton 
                        variant="outline" 
                        className="w-full border border-gray-700 text-white hover:text-blue-300" 
                        glowColor={
                          index === 0 ? "green" : 
                          index === 1 ? "blue" : 
                          index === 2 ? "purple" : "orange"
                        }
                      >
                        View Detailed Analysis
                      </GlowButton>
                    </div>
                  </CardContent>
                </GlowCard>
              ))}
            </div>
          </TabsContent>          {/* Opportunities Tab */}
          <TabsContent value="opportunities">
            <div className="space-y-6">
              <GlowCard glowColor="green" className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Target className="h-5 w-5 text-green-400" />
                    Product Expansion Opportunities
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    AI-identified high-potential product categories aligned with your skills and market
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Our AI analysis has identified these high-potential product categories based on your skills, customer base, and market trends.
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-gradient-to-b from-green-900/40 to-emerald-900/40 p-4 rounded-lg border border-green-500/30">
                      <p className="text-gray-300 text-xs mb-2">Potential Monthly</p>
                      <p className="text-2xl font-bold text-green-300">₹9,500+</p>
                    </div>
                    <div className="bg-gradient-to-b from-purple-900/40 to-indigo-900/40 p-4 rounded-lg border border-purple-500/30">
                      <p className="text-gray-300 text-xs mb-2">AI Confidence</p>
                      <p className="text-2xl font-bold text-purple-300">94%</p>
                    </div>
                    <div className="bg-gradient-to-b from-blue-900/40 to-cyan-900/40 p-4 rounded-lg border border-blue-500/30">
                      <p className="text-gray-300 text-xs mb-2">Top Category</p>
                      <p className="text-2xl font-bold text-blue-300">Mutual Funds</p>
                    </div>
                  </div>
                </CardContent>
              </GlowCard>
              
              <div className="space-y-4">
                {categoryOpportunities.map((opportunity, index) => (
                  <GlowCard 
                    key={index} 
                    glowColor={
                      index === 0 ? "green" : 
                      index === 1 ? "blue" : "purple"
                    }
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-lg ${
                              index === 0 ? "bg-green-900/30 border border-green-500/30" :
                              index === 1 ? "bg-blue-900/30 border border-blue-500/30" : 
                              "bg-purple-900/30 border border-purple-500/30"
                            }`}>
                              <Target className={`h-5 w-5 ${
                                index === 0 ? "text-green-400" :
                                index === 1 ? "text-blue-400" : "text-purple-400"
                              }`} />
                            </div>
                            <h3 className="text-lg font-semibold text-white">{opportunity.category}</h3>
                            {index === 0 && (
                              <Badge className="bg-green-900/60 text-green-300 border border-green-500/50">
                                Recommended
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-300 mt-1 mb-3">{opportunity.description}</p>
                          
                          <div className="bg-slate-800/50 p-4 rounded-lg border border-gray-700/50 my-3">
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <p className="text-xs text-gray-400">Potential</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <DollarSign className="h-3 w-3 text-green-400" />
                                  <span className="font-medium text-green-300">{opportunity.potential}</span>
                                </div>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">Market Demand</p>
                                <Badge 
                                  className={
                                    opportunity.demand === "High" 
                                      ? "bg-blue-900/60 text-blue-300 border border-blue-500/50 mt-1" 
                                      : "bg-purple-900/60 text-purple-300 border border-purple-500/50 mt-1"
                                  }
                                >
                                  {opportunity.demand}
                                </Badge>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">Difficulty</p>
                                <Badge 
                                  className={
                                    opportunity.difficulty === "Easy" 
                                      ? "bg-green-900/60 text-green-300 border border-green-500/50 mt-1" 
                                      : opportunity.difficulty === "Medium"
                                        ? "bg-orange-900/60 text-orange-300 border border-orange-500/50 mt-1"
                                        : "bg-red-900/60 text-red-300 border border-red-500/50 mt-1"
                                  }
                                >
                                  {opportunity.difficulty}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <GlowButton 
                            onClick={() => onActOnTip(opportunity.category.toLowerCase())}
                            glowColor={
                              index === 0 ? "green" : 
                              index === 1 ? "blue" : "purple"
                            }
                          >
                            View Strategy
                          </GlowButton>
                          <GlowButton 
                            variant="outline" 
                            onClick={() => onActOnTip(opportunity.category.toLowerCase())}
                            glowColor={
                              index === 0 ? "green" : 
                              index === 1 ? "blue" : "purple"
                            }
                            className="border-gray-700 text-white hover:text-blue-300"
                          >
                            Find Leads
                          </GlowButton>
                        </div>
                      </div>
                    </CardContent>
                  </GlowCard>
                ))}
              </div>
            </div>
          </TabsContent>{/* Goals Tab */}
          <TabsContent value="goals">
            <GlowCard className="mb-6" glowColor="purple">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Target className="h-5 w-5 text-purple-400" />
                  Weekly Achievement Goals
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Track your progress and earn rewards by completing strategic tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">
                  Complete these tasks to boost your performance metrics and unlock special rewards. 
                  Your progress is automatically tracked and updated daily.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
                  <div className="bg-gradient-to-b from-purple-900/40 to-indigo-900/40 p-4 rounded-lg border border-purple-500/30">
                    <p className="text-gray-300 text-xs mb-2">Current Score</p>
                    <p className="text-2xl font-bold text-purple-300">76/100</p>
                  </div>
                  <div className="bg-gradient-to-b from-blue-900/40 to-cyan-900/40 p-4 rounded-lg border border-blue-500/30">
                    <p className="text-gray-300 text-xs mb-2">Tasks Completed</p>
                    <p className="text-2xl font-bold text-blue-300">2/5</p>
                  </div>
                  <div className="bg-gradient-to-b from-green-900/40 to-emerald-900/40 p-4 rounded-lg border border-green-500/30">
                    <p className="text-gray-300 text-xs mb-2">Rewards Earned</p>
                    <p className="text-2xl font-bold text-green-300">₹500</p>
                  </div>
                </div>
                
                <div className="space-y-6 mt-6">
                  {weeklyGoals.map((goal, index) => (
                    <div key={index} className="bg-gradient-to-r from-slate-900/50 to-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            goal.status === "completed" ? "bg-green-900/30 border border-green-500/30" : 
                            "bg-blue-900/30 border border-blue-500/30"
                          }`}>
                            {goal.status === "completed" ? 
                              <CheckCircle className="h-5 w-5 text-green-400" /> :
                              <Calendar className="h-5 w-5 text-blue-400" />
                            }
                          </div>
                          <span className="font-medium text-white">{goal.goal}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            className={goal.status === "completed" 
                              ? "bg-green-900/60 text-green-300 border border-green-500/50" 
                              : "bg-blue-900/60 text-blue-300 border border-blue-500/50"}
                          >
                            {goal.status === "completed" ? "✓ Completed" : "In Progress"}
                          </Badge>
                        </div>
                      </div>
                      <Progress 
                        value={goal.progress} 
                        className={`h-2 mb-2 ${
                          goal.status === "completed" ? "bg-green-950/50" : "bg-blue-950/50"
                        }`} 
                      />
                      <div className="flex justify-between text-sm text-gray-400 mt-2">
                        <span>{goal.progress}% complete</span>
                        <div className="flex items-center gap-1">
                          <Award className="h-3 w-3 text-amber-400" />
                          <span className="text-amber-300">{goal.reward}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <GlowButton className="w-full mt-4" glowColor="purple">
                    View All Achievement Goals
                  </GlowButton>
                </div>
              </CardContent>
            </GlowCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
