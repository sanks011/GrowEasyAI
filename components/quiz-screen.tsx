"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { ArrowLeft, CheckCircle, XCircle, Lightbulb, ArrowRight } from "lucide-react"
import { saveQuizResult } from "@/lib/firebase"

interface Question {
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface QuizModule {
  id: string
  title: string
  description: string
  type: string
  duration: number
  difficulty: string
  content: {
    questions: Question[]
  }
}

interface QuizScreenProps {
  module: QuizModule
  gpId: string
  onBack: () => void
  onComplete: (score: number) => void
}

export default function QuizScreen({ module, gpId, onBack, onComplete }: QuizScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(module.duration * 60) // Convert to seconds

  const questions = module.content.questions
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !quizCompleted) {
      handleQuizComplete()
    }
  }, [timeLeft, quizCompleted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (optionIndex: number) => {
    if (showExplanation) return

    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = optionIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (!showExplanation) {
      setShowExplanation(true)
    } else {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setShowExplanation(false)
      } else {
        handleQuizComplete()
      }
    }
  }

  const handleQuizComplete = async () => {
    let correctAnswers = 0
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index]?.correct) {
        correctAnswers++
      }
    })

    const finalScore = Math.round((correctAnswers / questions.length) * 100)
    setScore(finalScore)
    setQuizCompleted(true)

    // Save quiz result
    try {
      await saveQuizResult(gpId, module.id, finalScore)
    } catch (error) {
      console.error("Error saving quiz result:", error)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { text: "Excellent!", variant: "default" as const }
    if (score >= 60) return { text: "Good", variant: "secondary" as const }
    return { text: "Needs Improvement", variant: "destructive" as const }
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                  {score}%
                </div>
                <p className="text-gray-600 mt-2">
                  You scored {selectedAnswers.filter((answer, index) => answer === questions[index]?.correct).length} out of {questions.length} questions correctly
                </p>
              </div>

              <Badge {...getScoreBadge(score)} className="text-lg px-4 py-2">
                {getScoreBadge(score).text}
              </Badge>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Module: {module.title}</h3>
                <p className="text-sm text-gray-600">{module.description}</p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={onBack} className="flex-1">
                  Back to Learning
                </Button>
                <Button onClick={() => onComplete(score)} className="flex-1">
                  Continue Learning
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{module.title}</h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-600">{formatTime(timeLeft)}</div>
            <div className="text-xs text-gray-600">Time remaining</div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === index
                const isCorrect = index === currentQuestion.correct
                const isIncorrect = showExplanation && isSelected && !isCorrect
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      showExplanation
                        ? isCorrect
                          ? "border-green-500 bg-green-50 text-green-800"
                          : isIncorrect
                          ? "border-red-500 bg-red-50 text-red-800"
                          : "border-gray-200 bg-gray-50"
                        : isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {showExplanation && isCorrect && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                      {showExplanation && isIncorrect && (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <span className="flex-1">{option}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Explanation</h4>
                    <p className="text-blue-700 text-sm mt-1">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            <Button 
              onClick={handleNext}
              disabled={!showExplanation && selectedAnswers[currentQuestionIndex] === undefined}
              className="w-full"
            >
              {!showExplanation 
                ? "Show Explanation" 
                : currentQuestionIndex < questions.length - 1 
                ? "Next Question" 
                : "Complete Quiz"
              }
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
