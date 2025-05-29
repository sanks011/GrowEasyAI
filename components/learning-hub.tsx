"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GlowButton } from "@/components/glow-button"
import { GlowCard } from "@/components/glow-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, BookOpen, Award, Clock, CheckCircle, X } from "lucide-react"
import { generateQuizQuestion } from "@/lib/gemini"

interface Module {
  id: string
  title: string
  type: "video" | "quiz" | "article"
  duration: string
  completed: boolean
  difficulty: "beginner" | "intermediate" | "advanced"
  category: string
}

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

interface LearningHubProps {
  onBack: () => void
}

export function LearningHub({ onBack }: LearningHubProps) {
  const [modules, setModules] = useState<Module[]>([])
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [overallProgress, setOverallProgress] = useState(65)

  useEffect(() => {
    // Initialize modules
    setModules([
      {
        id: "1",
        title: "Credit Card Sales Mastery",
        type: "quiz",
        duration: "3 min",
        completed: true,
        difficulty: "intermediate",
        category: "Credit Cards",
      },
      {
        id: "2",
        title: "Health Insurance Objection Handling",
        type: "video",
        duration: "5 min",
        completed: false,
        difficulty: "beginner",
        category: "Health Insurance",
      },
      {
        id: "3",
        title: "Personal Loan Customer Profiling",
        type: "article",
        duration: "4 min",
        completed: false,
        difficulty: "advanced",
        category: "Personal Loans",
      },
      {
        id: "4",
        title: "Digital Payment Solutions",
        type: "quiz",
        duration: "2 min",
        completed: true,
        difficulty: "beginner",
        category: "Digital Payments",
      },
    ])
  }, [])

  const startQuiz = async (moduleTitle: string) => {
    setLoading(true)
    try {
      const question = await generateQuizQuestion(moduleTitle)
      setCurrentQuiz(question)
      setSelectedAnswer("")
      setShowResult(false)
    } catch (error) {
      console.error("Error generating quiz:", error)
      // Fallback question
      setCurrentQuiz({
        question: "What is the most important factor when selling insurance?",
        options: ["A) Price", "B) Customer needs", "C) Commission", "D) Brand name"],
        correctAnswer: "B",
        explanation: "Understanding customer needs helps provide the right solution and builds trust.",
      })
    } finally {
      setLoading(false)
    }
  }

  const submitAnswer = () => {
    setShowResult(true)
    if (selectedAnswer === currentQuiz?.correctAnswer) {
      // Update progress
      setOverallProgress((prev) => Math.min(prev + 5, 100))
    }
  }

  const closeQuiz = () => {
    setCurrentQuiz(null)
    setSelectedAnswer("")
    setShowResult(false)
    // Mark module as completed
    if (currentQuiz) {
      setModules((prev) =>
        prev.map((module) =>
          module.title.includes("Credit Card") || module.title.includes("Health Insurance")
            ? { ...module, completed: true }
            : module,
        ),
      )
    }
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
      case "article":
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
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
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
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="text-green-400 font-bold">2</div>
                    <div className="text-gray-400">Completed</div>
                  </div>
                  <div>
                    <div className="text-orange-400 font-bold">2</div>
                    <div className="text-gray-400">In Progress</div>
                  </div>
                  <div>
                    <div className="text-blue-400 font-bold">4</div>
                    <div className="text-gray-400">Total</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </GlowCard>
        </motion.div>

        {/* Learning Modules */}
        <motion.div variants={itemVariants}>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">Recommended for You</h2>
            {modules.map((module, index) => (
              <motion.div key={module.id} variants={itemVariants} custom={index}>
                <GlowCard
                  glowColor={module.completed ? "green" : getDifficultyColor(module.difficulty)}
                  onClick={() => !module.completed && module.type === "quiz" && startQuiz(module.title)}
                  className={!module.completed && module.type === "quiz" ? "cursor-pointer" : ""}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg bg-${getDifficultyColor(module.difficulty)}-500/20`}>
                          <div className={`text-${getDifficultyColor(module.difficulty)}-400`}>
                            {getTypeIcon(module.type)}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{module.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-300">
                            <Clock className="h-3 w-3" />
                            <span>{module.duration}</span>
                            <span>•</span>
                            <span className="capitalize">{module.type}</span>
                          </div>
                        </div>
                      </div>
                      {module.completed && <CheckCircle className="h-5 w-5 text-green-400" />}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Badge
                          className={`bg-${getDifficultyColor(module.difficulty)}-500/20 text-${getDifficultyColor(module.difficulty)}-300 border-${getDifficultyColor(module.difficulty)}-400/30 text-xs`}
                        >
                          {module.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                          {module.category}
                        </Badge>
                      </div>

                      {!module.completed && module.type === "quiz" && (
                        <GlowButton
                          size="sm"
                          glowColor={getDifficultyColor(module.difficulty)}
                          onClick={() => startQuiz(module.title)}
                          className={`bg-${getDifficultyColor(module.difficulty)}-600 hover:bg-${getDifficultyColor(module.difficulty)}-700`}
                        >
                          Start
                        </GlowButton>
                      )}
                    </div>
                  </CardContent>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {currentQuiz && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <GlowCard glowColor="blue">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white">Quiz Question</CardTitle>
                    <GlowButton variant="ghost" size="sm" onClick={closeQuiz} glowColor="red">
                      <X className="h-4 w-4" />
                    </GlowButton>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-200">{currentQuiz.question}</p>

                  <div className="space-y-2">
                    {currentQuiz.options.map((option, index) => (
                      <GlowCard
                        key={index}
                        glowColor={
                          showResult
                            ? option.charAt(0) === currentQuiz.correctAnswer
                              ? "green"
                              : option.charAt(0) === selectedAnswer
                                ? "red"
                                : "blue"
                            : selectedAnswer === option.charAt(0)
                              ? "blue"
                              : "purple"
                        }
                        onClick={() => !showResult && setSelectedAnswer(option.charAt(0))}
                        className={!showResult ? "cursor-pointer" : ""}
                      >
                        <CardContent className="p-3">
                          <p className="text-sm text-gray-200">{option}</p>
                        </CardContent>
                      </GlowCard>
                    ))}
                  </div>

                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/20"
                    >
                      <p className="text-sm text-gray-200 mb-2">
                        <strong>Explanation:</strong> {currentQuiz.explanation}
                      </p>
                      {selectedAnswer === currentQuiz.correctAnswer ? (
                        <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Correct!
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/20 text-red-300 border-red-400/30">
                          <X className="h-3 w-3 mr-1" />
                          Incorrect
                        </Badge>
                      )}
                    </motion.div>
                  )}

                  <div className="flex space-x-2">
                    {!showResult ? (
                      <GlowButton
                        onClick={submitAnswer}
                        disabled={!selectedAnswer}
                        glowColor="blue"
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        Submit Answer
                      </GlowButton>
                    ) : (
                      <GlowButton
                        onClick={closeQuiz}
                        glowColor="green"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        Continue Learning
                      </GlowButton>
                    )}
                  </div>
                </CardContent>
              </GlowCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
