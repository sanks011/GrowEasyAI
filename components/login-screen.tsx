"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { ProfessionalCard } from "@/components/ui/professional-card"
import { PremiumButton } from "@/components/ui/premium-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Mail, Smartphone, Shield, Brain, CheckCircle } from "lucide-react"

interface LoginScreenProps {
  onBack: () => void
}

export function LoginScreen({ onBack }: LoginScreenProps) {
  const { signInWithGoogle } = useAuth()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneLogin = () => {
    console.log("Phone login with:", phoneNumber)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Back button */}
          <motion.div className="mb-8">
            <PremiumButton onClick={onBack} variant="ghost" size="sm" icon={<ArrowLeft className="h-4 w-4" />}>
              Back to Home
            </PremiumButton>
          </motion.div>

          <ProfessionalCard variant="elevated" className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>

              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-slate-400">Sign in to access your AI dashboard</p>
            </div>

            {/* Login Options */}
            <div className="space-y-6">
              <PremiumButton
                onClick={handleGoogleLogin}
                disabled={loading}
                variant="primary"
                icon={<Mail className="h-5 w-5" />}
                fullWidth
                loading={loading}
                size="lg"
              >
                Continue with Google
              </PremiumButton>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-4 text-slate-400">Or continue with</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-300 text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20 h-12"
                  />
                </div>

                <PremiumButton
                  onClick={handlePhoneLogin}
                  variant="outline"
                  icon={<Smartphone className="h-5 w-5" />}
                  fullWidth
                  size="lg"
                >
                  Continue with Phone
                </PremiumButton>
              </div>

              {/* Security Notice */}
              <ProfessionalCard variant="bordered" className="p-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  <div>
                    <div className="text-white font-medium text-sm">Enterprise Security</div>
                    <div className="text-slate-400 text-xs">Your data is protected with bank-grade encryption</div>
                  </div>
                </div>
              </ProfessionalCard>

              <div className="text-center text-xs text-slate-500">
                By signing in, you agree to our{" "}
                <span className="text-blue-400 hover:text-blue-300 cursor-pointer">Terms of Service</span> and{" "}
                <span className="text-blue-400 hover:text-blue-300 cursor-pointer">Privacy Policy</span>
              </div>
            </div>
          </ProfessionalCard>

          {/* Features Preview */}
          <motion.div
            className="mt-8 grid grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ProfessionalCard className="p-4 text-center">
              <CheckCircle className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
              <div className="text-xs text-slate-300">AI Learning</div>
            </ProfessionalCard>
            <ProfessionalCard className="p-4 text-center">
              <CheckCircle className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-xs text-slate-300">Smart Leads</div>
            </ProfessionalCard>
            <ProfessionalCard className="p-4 text-center">
              <CheckCircle className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-xs text-slate-300">Sales AI</div>
            </ProfessionalCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
