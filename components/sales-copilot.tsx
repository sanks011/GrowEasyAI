"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GlowButton } from "@/components/glow-button"
import { GlowCard } from "@/components/glow-card"
import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, Bot, User, Lightbulb, CheckCircle } from "lucide-react"
import { generateSalesPrompt } from "@/lib/gemini"
import { saveChatMessage } from "@/lib/firebase"

interface Message {
  id: string
  text: string
  sender: "user" | "customer" | "ai"
  timestamp: number
}

interface SalesCopilotProps {
  lead: any
  initialMessage: string
  onBack: () => void
}

export function SalesCopilot({ lead, initialMessage, onBack }: SalesCopilotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [saleConfirmed, setSaleConfirmed] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatId = `chat_${lead.id}_${Date.now()}`

  const useSuggestion = (suggestion: string) => {
    sendMessage(suggestion)
  }

  useEffect(() => {
    // Initialize chat with the lead message
    const initialMessages: Message[] = [
      {
        id: "1",
        text: initialMessage,
        sender: "user",
        timestamp: Date.now() - 1000,
      },
      {
        id: "2",
        text: "Hi! Thanks for reaching out. I'm interested but have some questions about the pricing.",
        sender: "customer",
        timestamp: Date.now(),
      },
    ]
    setMessages(initialMessages)
    generateAISuggestions("I'm interested but have some questions about the pricing.")
  }, [initialMessage])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const generateAISuggestions = async (customerMessage: string) => {
    setLoading(true)
    try {
      const suggestion = await generateSalesPrompt(customerMessage, lead.product)
      setAiSuggestions([
        suggestion,
        "I understand your concern. Let me provide you with more details.",
        "Would you like to schedule a call to discuss this further?",
      ])
    } catch (error) {
      console.error("Error generating AI suggestions:", error)
      setAiSuggestions([
        "I understand your concern. Let me provide you with more details.",
        "Would you like to schedule a call to discuss this further?",
        "Let me explain the benefits that would be most relevant to you.",
      ])
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = (text: string, sender: "user" | "customer" = "user") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, newMessage])

    // Save to Firebase
    saveChatMessage(chatId, newMessage)

    if (sender === "user") {
      setInputMessage("")
      // Simulate customer response after user message
      setTimeout(() => {
        const responses = [
          "That sounds good. What about the claim process?",
          "I need to think about it. Can you send me more details?",
          "Okay, I'm convinced. How do we proceed?",
          "The price seems reasonable. What's the next step?",
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        sendMessage(randomResponse, "customer")
        generateAISuggestions(randomResponse)
      }, 2000)
    }
  }

  const confirmSale = () => {
    setSaleConfirmed(true)
    sendMessage("Great! I'll process your application right away. You'll receive a confirmation shortly.", "user")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <GlowButton variant="ghost" size="sm" onClick={onBack} glowColor="blue" className="mr-3">
            <ArrowLeft className="h-4 w-4" />
          </GlowButton>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-white">Sales Co-Pilot</h1>
            <p className="text-sm text-gray-300">Chatting with {lead.name}</p>
          </div>
          {saleConfirmed && (
            <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
              <CheckCircle className="h-3 w-3 mr-1" />
              Sale Confirmed
            </Badge>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 max-w-md mx-auto w-full p-4 overflow-y-auto">
        <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : message.sender === "customer"
                        ? "bg-slate-700 text-gray-200"
                        : "bg-green-600 text-white"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === "customer" && <User className="h-4 w-4 mt-0.5 text-gray-400" />}
                    {message.sender === "ai" && <Bot className="h-4 w-4 mt-0.5 text-green-300" />}
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </motion.div>
      </div>

      {/* AI Suggestions */}
      {aiSuggestions.length > 0 && !saleConfirmed && (
        <div className="max-w-md mx-auto w-full p-4 border-t border-slate-700">
          <div className="mb-3">
            <div className="flex items-center text-sm text-gray-300 mb-2">
              <Lightbulb className="h-4 w-4 mr-1 text-yellow-400" />
              AI Suggestions
            </div>
            <div className="space-y-2">
              {aiSuggestions.map((suggestion, index) => (
                <GlowCard
                  key={index}
                  glowColor="purple"
                  onClick={() => useSuggestion(suggestion)}
                  className="cursor-pointer"
                >
                  <CardContent className="p-3">
                    <p className="text-sm text-gray-200">{suggestion}</p>
                  </CardContent>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="max-w-md mx-auto w-full p-4 border-t border-slate-700">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-slate-800/50 border-slate-600 text-white placeholder-gray-400 focus:border-blue-400"
            onKeyPress={(e) => {
              if (e.key === "Enter" && inputMessage.trim()) {
                sendMessage(inputMessage.trim())
              }
            }}
          />
          <GlowButton
            onClick={() => inputMessage.trim() && sendMessage(inputMessage.trim())}
            disabled={!inputMessage.trim()}
            glowColor="blue"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </GlowButton>
        </div>

        {!saleConfirmed && (
          <div className="mt-3">
            <GlowButton onClick={confirmSale} glowColor="green" className="w-full bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirm Sale
            </GlowButton>
          </div>
        )}
      </div>
    </div>
  )
}
