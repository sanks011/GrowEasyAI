"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ArrowLeft, TrendingUp, Target, Lightbulb, Award, ArrowRight, DollarSign } from "lucide-react"
import { generateGrowthInsights, getGPProfile } from "@/lib/firebase"

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Growth Playbook</h1>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            {gpProfile?.name}
          </Badge>
        </div>

        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          {/* Insights Tab */}
          <TabsContent value="insights">
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Weekly Growth Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-blue-100">This Week</p>
                      <p className="text-2xl font-bold">₹{gpProfile?.monthlyEarnings?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-blue-100">Growth Potential</p>
                      <p className="text-2xl font-bold">₹5,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {insights.map((insight, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        {getInsightIcon(insight.type)}
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600">{insight.description}</p>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs font-medium text-gray-700">Action:</p>
                        <p className="text-sm">{insight.action}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-600 font-medium">{insight.potential}</span>
                        <Button 
                          size="sm" 
                          onClick={() => onActOnTip(insight.type)}
                          className="h-8"
                        >
                          Act Now
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {performanceMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{metric.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">
                        {formatValue(metric.value, metric.format)}
                      </span>
                      <span className="text-sm text-gray-600">
                        / {formatValue(metric.target, metric.format)}
                      </span>
                    </div>
                    <Progress 
                      value={(metric.value / metric.target) * 100} 
                      className="h-2"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className={`flex items-center gap-1 ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <TrendingUp className="h-3 w-3" />
                        {metric.change > 0 ? '+' : ''}{metric.change}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities">
            <div className="space-y-4">
              {categoryOpportunities.map((opportunity, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{opportunity.category}</h3>
                        <p className="text-sm text-gray-600 mt-1">{opportunity.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-green-600" />
                            <span className="font-medium">{opportunity.potential}</span>
                          </div>
                          <Badge variant={opportunity.demand === "High" ? "default" : "secondary"}>
                            {opportunity.demand} Demand
                          </Badge>
                          <Badge variant="outline">
                            {opportunity.difficulty}
                          </Badge>
                          <span className="text-gray-500">{opportunity.timeToStart}</span>
                        </div>
                      </div>
                      <Button onClick={() => onActOnTip(opportunity.category.toLowerCase())}>
                        Start Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {weeklyGoals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{goal.goal}</span>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={goal.status === "completed" ? "default" : "secondary"}
                        >
                          {goal.status === "completed" ? "✓ Completed" : "In Progress"}
                        </Badge>
                        <span className="text-sm text-gray-600">{goal.reward}</span>
                      </div>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="text-right text-sm text-gray-600">
                      {goal.progress}% complete
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
