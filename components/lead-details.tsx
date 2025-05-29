"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GlowButton } from "@/components/glow-button"
import { GlowCard } from "@/components/glow-card"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MessageSquare, Phone, MapPin, Star, User, Calendar, Loader2 } from "lucide-react"
import { generateLeadMessage } from "@/lib/gemini"

interface Lead {
  id: string
  name: string
  product: string
  score: number
  location: string
  age?: number
  income?: string
  lastContact?: string
  interests?: string[]
}

interface LeadDetailsProps {
  lead: Lead
  onBack: () => void
  onStartChat: (lead: Lead, message: string) => void
}

export function LeadDetails({ lead, onBack, onStartChat }: LeadDetailsProps) {
  const [aiMessage, setAiMessage] = useState<string>("")
  const [loading, setLoading] = useState(false)

  // Enhanced lead data
  const enhancedLead = {
    ...lead,
    age: lead.age || 35,
    income: lead.income || "₹8-12 LPA",
    lastContact: lead.lastContact || "2 days ago",
    interests: lead.interests || ["Family Protection", "Tax Savings", "Cashless Treatment"],
  }

  useEffect(() => {
    generateAIMessage()
  }, [])

  const generateAIMessage = async () => {
    setLoading(true)
    try {
      const message = await generateLeadMessage(enhancedLead.name, enhancedLead.product, enhancedLead.location)
      setAiMessage(message)
    } catch (error) {
      console.error("Error generating AI message:", error)
      setAiMessage(
        `Hi ${enhancedLead.name}! I hope you're doing well. I wanted to share some exciting ${enhancedLead.product} options that could be perfect for you and your family. Would you like to know more?`,
      )
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = () => {
    if (aiMessage) {
      onStartChat(enhancedLead, aiMessage)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <GlowButton variant="ghost" size="sm" onClick={onBack} glowColor="blue" className="mr-3">
            <ArrowLeft className="h-4 w-4" />
          </GlowButton>
          <div>
            <h1 className="text-lg font-semibold text-white">Lead Details</h1>
            <p className="text-sm text-gray-300">High-potential customer</p>
          </div>
        </div>
      </div>

      <motion.div
        className="relative z-10 max-w-md mx-auto p-4 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Lead Profile */}
        <motion.div variants={itemVariants}>
          <GlowCard glowColor="blue">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <User className="h-6 w-6 text-blue-400" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-xl text-white">{enhancedLead.name}</CardTitle>
                    <CardDescription className="flex items-center text-gray-300">
                      <MapPin className="h-4 w-4 mr-1" />
                      {enhancedLead.location}
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {enhancedLead.score}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Age</div>
                  <div className="font-medium text-white">{enhancedLead.age} years</div>
                </div>
                <div>
                  <div className="text-gray-400">Income</div>
                  <div className="font-medium text-white">{enhancedLead.income}</div>
                </div>
                <div>
                  <div className="text-gray-400">Product Interest</div>
                  <div className="font-medium text-white">{enhancedLead.product}</div>
                </div>
                <div>
                  <div className="text-gray-400">Last Contact</div>
                  <div className="font-medium text-white">{enhancedLead.lastContact}</div>
                </div>
              </div>

              <Separator className="border-slate-600" />

              <div>
                <div className="text-gray-400 text-sm mb-2">Interests</div>
                <div className="flex flex-wrap gap-2">
                  {enhancedLead.interests.map((interest, index) => (
                    <Badge key={index} className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </GlowCard>
        </motion.div>

        {/* AI-Generated Message */}
        <motion.div variants={itemVariants}>
          <GlowCard glowColor="green">
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-white">
                <MessageSquare className="h-5 w-5 mr-2 text-green-400" />
                AI-Crafted Message
              </CardTitle>
              <CardDescription className="text-gray-300">Personalized outreach message</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center p-6">
                  <Loader2 className="h-6 w-6 animate-spin text-green-400 mr-2" />
                  <span className="text-gray-300">Generating personalized message...</span>
                </div>
              ) : (
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-400/20 mb-4">
                  <p className="text-sm text-gray-200">{aiMessage}</p>
                </div>
              )}

              <div className="flex space-x-3">
                <GlowButton
                  onClick={handleSendMessage}
                  disabled={loading || !aiMessage}
                  glowColor="green"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </GlowButton>
                <GlowButton
                  variant="outline"
                  onClick={generateAIMessage}
                  disabled={loading}
                  glowColor="blue"
                  className="border-blue-400/30 text-blue-300 hover:text-white hover:border-blue-400"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Regenerate"}
                </GlowButton>
              </div>
            </CardContent>
          </GlowCard>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 gap-4">
            <GlowCard glowColor="blue" className="cursor-pointer">
              <CardContent className="p-4 text-center">
                <Phone className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                <div className="font-medium text-sm text-white">Call</div>
              </CardContent>
            </GlowCard>
            <GlowCard glowColor="purple" className="cursor-pointer">
              <CardContent className="p-4 text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-purple-400" />
                <div className="font-medium text-sm text-white">Schedule</div>
              </CardContent>
            </GlowCard>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
