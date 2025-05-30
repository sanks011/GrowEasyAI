"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GlowButton } from "@/components/glow-button"
import { GlowCard } from "@/components/glow-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, BookOpen, Award, Clock, CheckCircle, X } from "lucide-react"
import { getTrainingModules } from "@/lib/firebase"

interface Module {
  id: string
  title: string
  description: string
  type: "video" | "quiz" | "interactive" | "practical"
  duration: number
  difficulty: "beginner" | "intermediate" | "advanced"
  category: string
  completionRate: number
  averageScore: number
  content: any
}

interface LearningHubProps {
  onBack: () => void
  onNavigate?: (screen: string, data?: any) => void
}

export function LearningHub({ onBack, onNavigate }: LearningHubProps) {
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)
  const [overallProgress, setOverallProgress] = useState(0)

  useEffect(() => {
    loadModules()
  }, [])

  const loadModules = async () => {
    try {
      const fetchedModules = await getTrainingModules("gp_001")
      setModules(fetchedModules)
      
      // Calculate overall progress based on completion rates
      const avgCompletion = fetchedModules.reduce((sum: number, module: Module) => 
        sum + module.completionRate, 0) / fetchedModules.length
      setOverallProgress(Math.round(avgCompletion * 100))
    } catch (error) {
      console.error("Error loading modules:", error)
    } finally {
      setLoading(false)
    }
  }

  const startModule = (module: Module) => {
    // Navigate to the quiz screen with module data
    onNavigate?.("quiz", { module })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "green"
      case "intermediate":
        return "orange"
      case "advanced":
        return "red"
      default:
        return "blue"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />
      case "quiz":
        return <BookOpen className="h-4 w-4" />
      case "interactive":
        return <BookOpen className="h-4 w-4" />
      case "practical":
        return <BookOpen className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading modules...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">      {/* Subtle background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <GlowButton variant="ghost" size="sm" onClick={onBack} glowColor="orange" className="mr-3">
            <ArrowLeft className="h-4 w-4" />
          </GlowButton>
          <div>
            <h1 className="text-lg font-semibold text-white">Learning Hub</h1>
            <p className="text-sm text-gray-300">Boost your skills with AI</p>
          </div>
        </div>
      </div>

      <motion.div
        className="relative z-10 max-w-md mx-auto p-4 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Progress Overview */}
        <motion.div variants={itemVariants}>
          <GlowCard glowColor="orange">
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-white">
                <Award className="h-5 w-5 mr-2 text-orange-400" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Overall Completion</span>
                  <span className="text-orange-400 font-medium">{overallProgress}%</span>
                </div>
                <Progress value={overallProgress} className="h-2" />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{modules.filter(m => m.completionRate > 0.8).length} completed</span>
                  <span>{modules.length} total modules</span>
                </div>
              </div>
            </CardContent>
          </GlowCard>
        </motion.div>

        {/* Learning Modules */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Available Modules</h3>
          {modules.map((module) => (
            <motion.div key={module.id} variants={itemVariants}>
              <GlowCard glowColor="blue" className="hover:glow-blue-400">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getTypeIcon(module.type)}
                        <h4 className="font-semibold text-white">{module.title}</h4>
                        {module.completionRate > 0.8 && (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        )}
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{module.description}</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className={`text-${getDifficultyColor(module.difficulty)}-400 border-${getDifficultyColor(module.difficulty)}-400`}>
                          {module.difficulty}
                        </Badge>
                        <div className="flex items-center text-gray-400 text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {module.duration} min
                        </div>
                        <div className="text-gray-400 text-xs">
                          {Math.round(module.completionRate * 100)}% completed
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-400">
                          Category: {module.category}
                        </div>
                        <GlowButton
                          size="sm"
                          glowColor="orange"
                          onClick={() => startModule(module)}
                        >
                          {module.completionRate > 0.8 ? "Review" : "Start"}
                        </GlowButton>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Learning Stats */}
        <motion.div variants={itemVariants}>
          <GlowCard glowColor="purple">
            <CardHeader>
              <CardTitle className="text-lg text-white">Learning Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {Math.round(modules.reduce((sum, m) => sum + m.averageScore, 0) / modules.length)}%
                  </div>
                  <div className="text-xs text-gray-300">Avg Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {modules.reduce((sum, m) => sum + m.duration, 0)}
                  </div>
                  <div className="text-xs text-gray-300">Total Minutes</div>
                </div>
              </div>
            </CardContent>
          </GlowCard>
        </motion.div>
      </motion.div>
    </div>
  )
}
