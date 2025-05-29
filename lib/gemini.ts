import { GoogleGenerativeAI } from "@google/generative-ai"

const API_KEY = "AIzaSyBUreDq4nkfHM9oycP_WzJYKhYAEU0_YFY"
const genAI = new GoogleGenerativeAI(API_KEY)

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" })

export async function generateTrainingContent(topic: string, skillLevel: string) {
  const prompt = `Create a personalized training module for a GroMo Partner on "${topic}" for ${skillLevel} level. Include:
  1. A brief explanation (2-3 sentences)
  2. 3 key tips
  3. A practical example
  Keep it concise and actionable for micro-entrepreneurs selling financial products.`

  try {
    const result = await geminiModel.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.error("Error generating training content:", error)
    return "Training content will be available soon. Please try again later."
  }
}

export async function generateLeadMessage(customerName: string, product: string, location: string) {
  const prompt = `Generate a personalized WhatsApp message for a GroMo Partner to reach out to a potential customer:
  Customer: ${customerName}
  Product: ${product}
  Location: ${location}
  
  Make it friendly, localized, and compelling. Keep it under 50 words.`

  try {
    const result = await geminiModel.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.error("Error generating lead message:", error)
    return `Hi ${customerName}! I hope you're doing well. I wanted to share some exciting ${product} options that could be perfect for you. Would you like to know more?`
  }
}

export async function generateSalesPrompt(customerMessage: string, product: string) {
  const prompt = `A customer said: "${customerMessage}" about ${product}. 
  Provide a helpful response suggestion for the GroMo Partner. Keep it professional and persuasive.`

  try {
    const result = await geminiModel.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.error("Error generating sales prompt:", error)
    return "I understand your concern. Let me provide you with more details that might help."
  }
}

export async function generateGrowthInsights(salesData: any) {
  const prompt = `Based on this sales performance data: ${JSON.stringify(salesData)}
  Provide 3 actionable growth insights for a GroMo Partner to increase their income. Focus on:
  1. Product recommendations
  2. Customer targeting
  3. Sales strategies`

  try {
    const result = await geminiModel.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.error("Error generating growth insights:", error)
    return "Growth insights will be available soon. Please check back later."
  }
}

export async function generateQuizQuestion(topic: string) {
  const prompt = `Create a multiple-choice quiz question about ${topic} for GroMo Partners. Include:
  1. A practical scenario-based question
  2. 4 options (A, B, C, D)
  3. The correct answer
  4. A brief explanation
  Format as JSON with fields: question, options, correctAnswer, explanation`

  try {
    const result = await geminiModel.generateContent(prompt)
    return JSON.parse(result.response.text())
  } catch (error) {
    console.error("Error generating quiz question:", error)
    return {
      question: "What is the most important factor when selling insurance?",
      options: ["A) Price", "B) Customer needs", "C) Commission", "D) Brand name"],
      correctAnswer: "B",
      explanation: "Understanding customer needs helps provide the right solution.",
    }
  }
}
