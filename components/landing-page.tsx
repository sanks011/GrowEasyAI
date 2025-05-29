"use client"

import { motion } from "framer-motion"
import { AdvancedCard } from "@/components/ui/advanced-card"
import { ExecutiveButton } from "@/components/ui/executive-button"
import { AnalyticsCard } from "@/components/ui/analytics-card"
import { StatusIndicator } from "@/components/ui/status-indicator"
import {
  Brain,
  Target,
  MessageSquare,
  FileText,
  BarChart3,
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Learning Engine",
      description:
        "Advanced machine learning algorithms analyze your performance patterns and create personalized training modules that adapt to your learning style and skill gaps.",
      metrics: "60% faster skill acquisition",
      category: "Learning & Development",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Intelligent Lead Management",
      description:
        "Proprietary lead scoring algorithm with predictive analytics, automated qualification, and dynamic prioritization to maximize conversion rates.",
      metrics: "35% higher conversion",
      category: "Sales Optimization",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Real-Time Sales Co-Pilot",
      description:
        "AI-powered sales assistant providing contextual recommendations, objection handling strategies, and real-time conversation analysis.",
      metrics: "50% faster deal closure",
      category: "Sales Assistance",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Automated Post-Sale Management",
      description:
        "Intelligent customer service automation with advanced NLP, document processing, and automated query resolution capabilities.",
      metrics: "80% reduction in manual work",
      category: "Customer Success",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Predictive Growth Analytics",
      description:
        "Comprehensive performance insights with predictive modeling, market trend analysis, and strategic growth recommendations.",
      metrics: "₹8K+ monthly income boost",
      category: "Business Intelligence",
    },
  ]

  const stats = [
    {
      title: "Average Income Increase",
      value: 15750,
      format: "currency" as const,
      change: { value: 28, type: "increase" as const, period: "last quarter" },
      icon: <TrendingUp className="h-5 w-5" />,
      trend: [45, 52, 48, 61, 55, 67, 72, 69, 78, 82, 88, 95],
    },
    {
      title: "Success Rate",
      value: 96.8,
      format: "percentage" as const,
      change: { value: 12, type: "increase" as const, period: "last quarter" },
      icon: <Target className="h-5 w-5" />,
      trend: [78, 82, 85, 88, 91, 93, 94, 95, 96, 96.2, 96.5, 96.8],
    },
    {
      title: "Active Partners",
      value: 18500,
      change: { value: 15, type: "increase" as const, period: "last month" },
      icon: <Users className="h-5 w-5" />,
      trend: [12000, 13200, 14100, 15300, 16200, 17100, 17800, 18100, 18300, 18400, 18450, 18500],
    },
    {
      title: "Platform Rating",
      value: 4.9,
      change: { value: 8, type: "increase" as const, period: "last quarter" },
      icon: <Star className="h-5 w-5" />,
      trend: [4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.75, 4.8, 4.85, 4.87, 4.89, 4.9],
    },
  ]

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Senior GroMo Partner",
      location: "Mumbai, Maharashtra",
      income: "₹48,500/month",
      quote:
        "GrowEasy AI completely transformed my approach to customer engagement. The lead scoring accuracy is phenomenal, and I've seen a 45% increase in my conversion rates.",
      rating: 5,
      verified: true,
      growth: "+185%",
    },
    {
      name: "Priya Sharma",
      role: "Regional Team Leader",
      location: "New Delhi",
      income: "₹42,000/month",
      quote:
        "The AI training modules are incredibly sophisticated. They identified gaps in my knowledge I didn't even know existed and helped me improve systematically.",
      rating: 5,
      verified: true,
      growth: "+156%",
    },
    {
      name: "Amit Singh",
      role: "Top Performer",
      location: "Bangalore, Karnataka",
      income: "₹55,200/month",
      quote:
        "This platform is a game-changer. The predictive analytics help me identify opportunities before my competitors, giving me a significant advantage.",
      rating: 5,
      verified: true,
      growth: "+220%",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <motion.nav
          className="flex items-center justify-between py-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold">GrowEasy AI</span>
              <div className="text-xs text-slate-400 font-medium">Enterprise Platform</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ExecutiveButton variant="outline" size="md">
              Schedule Demo
            </ExecutiveButton>
            <ExecutiveButton
              onClick={onGetStarted}
              variant="premium"
              size="md"
              icon={<ArrowRight className="h-4 w-4" />}
              elevated
            >
              Get Started
            </ExecutiveButton>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.section
          className="py-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center mb-8">
              <StatusIndicator status="success" size="md" animated dot>
                <Award className="h-4 w-4 mr-2" />
                Trusted by 18,500+ Elite GroMo Partners
              </StatusIndicator>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
              The Enterprise AI Platform for{" "}
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                GroMo Excellence
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Leverage cutting-edge artificial intelligence to optimize your sales process, enhance customer
              relationships, and accelerate income growth with enterprise-grade tools designed exclusively for GroMo
              Partners.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <ExecutiveButton
                onClick={onGetStarted}
                variant="premium"
                size="xl"
                icon={<Zap className="h-5 w-5" />}
                elevated
              >
                Start Free Trial
              </ExecutiveButton>

              <div className="flex items-center space-x-3 text-slate-400">
                <Shield className="h-6 w-6 text-emerald-400" />
                <span className="text-lg">Enterprise-grade security & compliance</span>
              </div>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <AnalyticsCard
                    title={stat.title}
                    value={stat.value}
                    format={stat.format}
                    change={stat.change}
                    icon={stat.icon}
                    trend={stat.trend}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-20">
            <StatusIndicator status="info" size="md" className="mb-6">
              <Brain className="h-4 w-4 mr-2" />
              Five AI-Powered Modules
            </StatusIndicator>
            <h2 className="text-5xl font-bold mb-6">Comprehensive AI Solutions</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Integrated modules designed to optimize every aspect of your GroMo business with enterprise-grade AI
              technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <AdvancedCard variant="premium" className="h-full" hover>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="p-3 bg-blue-600/10 rounded-xl border border-blue-600/20 backdrop-blur-sm">
                      <div className="text-blue-400">{feature.icon}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                      </div>
                      <StatusIndicator status="success" size="sm" className="mb-3">
                        {feature.metrics}
                      </StatusIndicator>
                      <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                        {feature.category}
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed mb-6 text-sm">{feature.description}</p>

                  <ExecutiveButton variant="outline" size="sm" icon={<ArrowRight className="h-4 w-4" />} fullWidth>
                    Explore Module
                  </ExecutiveButton>
                </AdvancedCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced Testimonials */}
        <motion.section
          className="py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center mb-20">
            <StatusIndicator status="success" size="md" className="mb-6">
              <Star className="h-4 w-4 mr-2" />
              4.9/5 Platform Rating
            </StatusIndicator>
            <h2 className="text-5xl font-bold mb-6">Trusted by Industry Leaders</h2>
            <p className="text-xl text-slate-400">Real results from top-performing GroMo Partners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <AdvancedCard variant="glass" className="h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-slate-400">
                          {testimonial.role} • {testimonial.location}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <StatusIndicator status="success" size="sm">
                            {testimonial.income}
                          </StatusIndicator>
                          {testimonial.verified && (
                            <StatusIndicator status="info" size="sm">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </StatusIndicator>
                          )}
                        </div>
                      </div>
                    </div>
                    <StatusIndicator status="success" size="sm">
                      {testimonial.growth}
                    </StatusIndicator>
                  </div>

                  <p className="text-slate-300 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">Verified Review</span>
                  </div>
                </AdvancedCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Enhanced CTA Section */}
        <motion.section
          className="py-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <AdvancedCard variant="premium" className="max-w-5xl mx-auto text-center">
            <div className="mb-8">
              <StatusIndicator status="info" size="lg" className="mb-6">
                <Zap className="h-5 w-5 mr-2" />
                Limited Time: Enterprise Features Included
              </StatusIndicator>
              <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Join the elite tier of GroMo Partners who are leveraging AI to achieve unprecedented growth and success.
                Start your transformation today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <ExecutiveButton
                onClick={onGetStarted}
                variant="premium"
                size="xl"
                icon={<ArrowRight className="h-6 w-6" />}
                elevated
              >
                Start Your Free Trial
              </ExecutiveButton>
              <ExecutiveButton variant="outline" size="xl" icon={<MessageSquare className="h-5 w-5" />}>
                Schedule Consultation
              </ExecutiveButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-400">
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span>14-day free trial with full access</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span>24/7 enterprise support</span>
              </div>
            </div>
          </AdvancedCard>
        </motion.section>
      </div>
    </div>
  )
}
