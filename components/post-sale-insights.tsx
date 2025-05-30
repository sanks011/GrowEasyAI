"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Progress } from "./ui/progress"
import { 
  ArrowLeft, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  Users, 
  HeartPulse, 
  Clock, 
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  BarChart4,
  Heart,
  MessageSquare,
  DollarSign
} from "lucide-react"

interface PostSaleInsightsProps {
  customerId: string
  customerName: string
  onBack: () => void
  onAction: (actionType: string) => void
}

interface CustomerMetric {
  label: string
  value: number
  target: number
  change: number
  format: string
}

interface CustomerInsight {
  type: string
  title: string
  description: string
  action: string
  urgency: "low" | "medium" | "high"
}

export default function PostSaleInsights({ 
  customerId, 
  customerName, 
  onBack,
  onAction
}: PostSaleInsightsProps) {
  const [loading, setLoading] = useState(true)
  const [customerData, setCustomerData] = useState<any>(null)
  const [insights, setInsights] = useState<CustomerInsight[]>([])

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      // This would normally be a call to fetch data from your backend
      setCustomerData({
        id: customerId,
        name: customerName,
        satisfactionScore: 85,
        retentionProbability: 78,
        lifetimeValue: 45000,
        engagementScore: 68,
        lastRenewal: "2023-04-15",
        nextRenewal: "2025-04-15",
        policyType: "Term Life Insurance",
        premiumAmount: 12500,
        policies: [
          { type: "Term Life", premium: 12500, status: "active" },
          { type: "Health", premium: 8000, status: "active" }
        ],
        support: {
          openQueries: 2,
          resolvedLastMonth: 3,
          averageResolutionTime: 24 // hours
        },
        engagement: {
          emailOpenRate: 65,
          customerPortalLogins: 7,
          documentsUploaded: 3
        },
        recommendations: [
          "Critical Illness Add-on",
          "Accidental Death Benefit",
          "Family Floater Health Plan"
        ]
      })
      
      setInsights([
        {
          type: "renewal",
          title: "Policy Anniversary Coming Up",
          description: "Customer has a renewal coming up in 2 months. Engagement before renewal dates increases retention by 42%.",
          action: "Schedule a policy review call to discuss current coverage and potential new needs.",
          urgency: "high"
        },
        {
          type: "engagement",
          title: "Low App Engagement",
          description: "Customer has not logged into their account portal in the last 60 days. This may indicate decreased engagement.",
          action: "Send a personalized email highlighting new app features and benefits they might find useful.",
          urgency: "medium"
        },
        {
          type: "crosssell",
          title: "Protection Gap Detected",
          description: "Based on their profile, this customer has a 82% match for critical illness coverage they don't currently have.",
          action: "Introduce critical illness benefits during next conversation with personalized scenarios.",
          urgency: "low" 
        }
      ])
      
      setLoading(false)
    }, 1000)
  }, [customerId, customerName])
  
  const customerMetrics: CustomerMetric[] = [
    {
      label: "Customer Satisfaction",
      value: customerData?.satisfactionScore || 0,
      target: 100,
      change: 4,
      format: "percentage"
    },
    {
      label: "Retention Probability",
      value: customerData?.retentionProbability || 0,
      target: 100,
      change: -2,
      format: "percentage"
    },
    {
      label: "Lifetime Value",
      value: customerData?.lifetimeValue || 0,
      target: 100000,
      change: 12,
      format: "currency"
    },
    {
      label: "Engagement Score",
      value: customerData?.engagementScore || 0,
      target: 100,
      change: 6,
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
      case "renewal":
        return <Clock className="h-5 w-5 text-orange-600" />
      case "engagement":
        return <Users className="h-5 w-5 text-blue-600" />
      case "crosssell":
        return <Target className="h-5 w-5 text-green-600" />
      case "risk":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return <Lightbulb className="h-5 w-5 text-purple-600" />
    }
  }

  const getInsightColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Post-Sale Insights</h1>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
            {customerData?.name}
          </Badge>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="retention">Retention</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HeartPulse className="h-5 w-5" />
                    Customer Health Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-4">
                    AI-powered analysis of customer relationship health with personalized recommendations.
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-white/80">Satisfaction</p>
                      <p className="text-2xl font-bold">{customerData?.satisfactionScore}%</p>
                    </div>
                    <div>
                      <p className="text-white/80">Retention Risk</p>
                      <p className="text-2xl font-bold text-green-300">Low</p>
                    </div>
                    <div>
                      <p className="text-white/80">Growth Potential</p>
                      <p className="text-2xl font-bold">₹12,000+</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {insights.map((insight, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow border border-transparent hover:border-blue-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${
                            insight.type === "renewal" ? "bg-orange-100" :
                            insight.type === "engagement" ? "bg-blue-100" :
                            insight.type === "crosssell" ? "bg-green-100" : "bg-red-100"
                          }`}>
                            {getInsightIcon(insight.type)}
                          </div>
                          <CardTitle className="text-lg">{insight.title}</CardTitle>
                        </div>
                        <Badge className={getInsightColor(insight.urgency)}>
                          {insight.urgency.charAt(0).toUpperCase() + insight.urgency.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600">{insight.description}</p>
                      
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="h-3 w-3 text-amber-500" />
                          <p className="text-xs font-medium text-gray-700">Recommended Action:</p>
                        </div>
                        <p className="text-sm font-medium">{insight.action}</p>
                      </div>
                      
                      <div className="flex items-center justify-end">
                        <Button 
                          size="sm" 
                          onClick={() => onAction(insight.type)}
                          className="h-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                        >
                          Take Action
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Retention Tab */}
          <TabsContent value="retention">
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-orange-500 to-amber-600 text-white mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Retention Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-4">
                    AI-powered analysis of customer retention indicators with personalized recommendations.
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-white/80">Renewal Probability</p>
                      <p className="text-2xl font-bold">{customerData?.retentionProbability}%</p>
                    </div>
                    <div>
                      <p className="text-white/80">Days to Renewal</p>
                      <p className="text-2xl font-bold">62</p>
                    </div>
                    <div>
                      <p className="text-white/80">Risk Level</p>
                      <p className="text-2xl font-bold">Medium</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HeartPulse className="h-5 w-5 text-red-500" />
                      Policy Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {customerData?.policies.map((policy: any, index: number) => (
                      <div key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{policy.type} Insurance</h3>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Premium:</span> ₹{policy.premium.toLocaleString()}
                            </p>
                          </div>
                          <Badge variant={policy.status === "active" ? "default" : "secondary"}>
                            {policy.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart4 className="h-5 w-5 text-blue-500" />
                      Retention Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      { label: "Customer Service Satisfaction", value: 92 },
                      { label: "Perceived Value for Money", value: 78 },
                      { label: "Claim Experience", value: 85 },
                      { label: "Product Fit", value: 89 }
                    ].map((factor, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{factor.label}</span>
                          <span className="text-sm text-gray-500">{factor.value}%</span>
                        </div>
                        <Progress value={factor.value} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Engagement Tab */}
          <TabsContent value="engagement">
            <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Engagement Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Analysis of how the customer is engaging with your services, communications and support.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-white/80">Engagement Score</p>
                    <p className="text-2xl font-bold">{customerData?.engagementScore}/100</p>
                  </div>
                  <div>
                    <p className="text-white/80">Recent Activity</p>
                    <p className="text-2xl font-bold">14 days ago</p>
                  </div>
                  <div>
                    <p className="text-white/80">Email Open Rate</p>
                    <p className="text-2xl font-bold">{customerData?.engagement?.emailOpenRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-purple-500" />
                    Support Interactions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-gray-500 text-sm">Open Queries</p>
                      <p className="text-2xl font-bold text-gray-800">{customerData?.support?.openQueries}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-gray-500 text-sm">Resolved Last Month</p>
                      <p className="text-2xl font-bold text-gray-800">{customerData?.support?.resolvedLastMonth}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Average Resolution Time</h3>
                    <div className="flex items-center gap-2">
                      <Progress value={
                        Math.min(100, (customerData?.support?.averageResolutionTime / 48) * 100)
                      } className="flex-1 h-2" />
                      <span className="text-sm font-medium">
                        {customerData?.support?.averageResolutionTime}h
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => onAction('support')}
                  >
                    View Support History
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Channel Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {[
                      { channel: "Mobile App", engagementRate: 42, totalLogins: customerData?.engagement?.customerPortalLogins || 0 },
                      { channel: "Email", engagementRate: 65, totalLogins: 15 },
                      { channel: "Phone Support", engagementRate: 28, totalLogins: 3 },
                    ].map((channel, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{channel.channel}</span>
                          <span className="text-sm text-gray-500">{channel.engagementRate}%</span>
                        </div>
                        <Progress value={channel.engagementRate} className="h-2" />
                        <p className="text-xs text-gray-500">
                          {channel.totalLogins} interactions in the last 90 days
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Opportunities Tab */}
          <TabsContent value="opportunities">
            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Growth Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  AI-identified opportunities to expand customer relationship and increase lifetime value.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-white/80">Upsell Potential</p>
                    <p className="text-2xl font-bold">₹12,500</p>
                  </div>
                  <div>
                    <p className="text-white/80">AI Confidence</p>
                    <p className="text-2xl font-bold">87%</p>
                  </div>
                  <div>
                    <p className="text-white/80">Products Owned</p>
                    <p className="text-2xl font-bold">{customerData?.policies?.length || 0}/5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              {[
                {
                  product: "Critical Illness Cover",
                  matchScore: 92,
                  potentialValue: 8500,
                  description: "Based on age profile and current coverage gaps."
                },
                {
                  product: "Accidental Death Benefit",
                  matchScore: 87,
                  potentialValue: 2500,
                  description: "Complements existing term life policy."
                },
                {
                  product: "Family Floater Health Plan",
                  matchScore: 78,
                  potentialValue: 15000,
                  description: "Customer recently updated family status."
                }
              ].map((opportunity, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border border-transparent hover:border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg ${
                            index === 0 ? "bg-green-100" :
                            index === 1 ? "bg-blue-100" : "bg-purple-100"
                          }`}>
                            <Target className={`h-5 w-5 ${
                              index === 0 ? "text-green-600" :
                              index === 1 ? "text-blue-600" : "text-purple-600"
                            }`} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{opportunity.product}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                                {opportunity.matchScore}% Match
                              </Badge>
                              {index === 0 && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                                  Recommended
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-1">{opportunity.description}</p>
                        
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 my-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Annual Value</p>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3 text-green-600" />
                                <span className="font-medium">₹{opportunity.potentialValue.toLocaleString()}</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Current Coverage</p>
                              <Badge variant="secondary" className="mt-1">
                                Not Covered
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => onAction(`opportunity_${opportunity.product.toLowerCase().replace(/\s+/g, '_')}`)}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                        >
                          View Details
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => onAction('contact')}
                        >
                          Contact Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
