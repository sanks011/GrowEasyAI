"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { LandingPage } from "@/components/landing-page"
import { LoginScreen } from "@/components/login-screen"
import { HomeScreen } from "@/components/home-screen"
import { LeadDetails } from "@/components/lead-details"
import { SalesCopilot } from "@/components/sales-copilot"
import { LearningHub } from "@/components/learning-hub"

type Screen =
  | "landing"
  | "login"
  | "home"
  | "lead-details"
  | "sales-copilot"
  | "learning-hub"
  | "post-sale"
  | "growth-playbook"

export default function Page() {
  const { user, loading } = useAuth()
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing")
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [chatMessage, setChatMessage] = useState<string>("")

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading GrowEasy AI...</p>
        </div>
      </div>
    )
  }

  const handleNavigation = (screen: string, data?: any) => {
    if (screen === "lead-details") {
      setSelectedLead(data)
    }
    setCurrentScreen(screen as Screen)
  }

  const handleStartChat = (lead: any, message: string) => {
    setSelectedLead(lead)
    setChatMessage(message)
    setCurrentScreen("sales-copilot")
  }

  const handleBackToHome = () => {
    setCurrentScreen("home")
    setSelectedLead(null)
    setChatMessage("")
  }

  const handleGetStarted = () => {
    setCurrentScreen("login")
  }

  const handleBackToLanding = () => {
    setCurrentScreen("landing")
  }

  // Show landing page if user is not authenticated
  if (!user) {
    switch (currentScreen) {
      case "login":
        return <LoginScreen onBack={handleBackToLanding} />
      case "landing":
      default:
        return <LandingPage onGetStarted={handleGetStarted} />
    }
  }

  // Show authenticated screens
  switch (currentScreen) {
    case "lead-details":
      return <LeadDetails lead={selectedLead} onBack={handleBackToHome} onStartChat={handleStartChat} />
    case "sales-copilot":
      return <SalesCopilot lead={selectedLead} initialMessage={chatMessage} onBack={handleBackToHome} />
    case "learning-hub":
      return <LearningHub onBack={handleBackToHome} />
    case "home":
    default:
      return <HomeScreen onNavigate={handleNavigation} />
  }
}
