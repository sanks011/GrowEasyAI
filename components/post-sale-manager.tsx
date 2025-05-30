"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { ArrowLeft, MessageCircle, Upload, Bell, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { getCustomerQueries, updateLeadStatus } from "@/lib/firebase"
import { GlowCard } from "./glow-card"
import { GlowButton } from "./glow-button"
import { motion } from "framer-motion"

interface Query {
  id: string
  customerId: string
  question: string
  category: string
  priority: string
  status: string
  aiResponse: string
  createdAt: Date
  resolvedAt?: Date
}

interface PostSaleManagerProps {
  customerId: string
  customerName: string
  onBack: () => void
  onContact: (customerId: string) => void
}

export default function PostSaleManager({ 
  customerId, 
  customerName, 
  onBack, 
  onContact 
}: PostSaleManagerProps) {
  const [queries, setQueries] = useState<Query[]>([])
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null)
  const [uploadedFile, setUploadedFile] = useState<string>("")
  const [extractedData, setExtractedData] = useState<any>(null)
  const [newResponse, setNewResponse] = useState("")

  useEffect(() => {
    loadQueries()
  }, [customerId])

  const loadQueries = async () => {
    try {
      const customerQueries = await getCustomerQueries(customerId)
      setQueries(customerQueries)
    } catch (error) {
      console.error("Error loading queries:", error)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file.name)
      // Simulate OCR extraction
      setTimeout(() => {
        setExtractedData({
          name: customerName,
          id: "AADHAAR123456789",
          phone: "+91-9876543210",
          address: "123 Main Street, Mumbai",
          policyNumber: "POL001234567"
        })
      }, 2000)
    }
  }

  const handleQueryResponse = async (queryId: string, response: string) => {
    try {
      // Update query status to resolved
      const updatedQueries = queries.map(q => 
        q.id === queryId 
          ? { ...q, status: "resolved", aiResponse: response, resolvedAt: new Date() }
          : q
      )
      setQueries(updatedQueries)
      setSelectedQuery(null)
    } catch (error) {
      console.error("Error updating query:", error)
    }
  }

  const renewalAlerts = [
    {
      id: "1",
      customerName: customerName,
      policyType: "Health Insurance",
      renewalDate: "June 5, 2025",
      premium: "₹8,500",
      status: "due"
    },
    {
      id: "2", 
      customerName: "Priya Sharma",
      policyType: "Life Insurance",
      renewalDate: "June 12, 2025",
      premium: "₹15,000",
      status: "upcoming"
    }
  ]
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4 rounded-t-lg">
          <div className="flex items-center gap-3">
            <GlowButton variant="ghost" size="sm" onClick={onBack} glowColor="blue" className="text-gray-300 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
            </GlowButton>
            <h1 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Post-Sale Manager</h1>
          </div>
          <Badge className="bg-blue-900/60 text-blue-300 border border-blue-500/50">{customerName}</Badge>
        </div>

        <Tabs defaultValue="queries" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
            <TabsTrigger 
              value="queries" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-400"
            >
              <MessageCircle className="h-4 w-4" />
              Queries
            </TabsTrigger>
            <TabsTrigger 
              value="documents" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-400"
            >
              <Upload className="h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger 
              value="renewals" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-400"
            >
              <Bell className="h-4 w-4" />
              Renewals
            </TabsTrigger>
          </TabsList>          {/* Queries Tab */}
          <TabsContent value="queries">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Query List */}
              <motion.div variants={itemVariants}>
                <GlowCard glowColor="blue">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-blue-400" />
                      Customer Queries
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Manage and respond to customer inquiries
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {queries.length > 0 ? queries.map((query) => (
                      <Card 
                        key={query.id} 
                        className={`cursor-pointer hover:shadow-md transition-shadow bg-slate-800/50 border ${
                          selectedQuery?.id === query.id 
                            ? 'border-blue-500/50' 
                            : 'border-gray-700/50'
                        }`}
                        onClick={() => setSelectedQuery(query)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <p className="font-medium text-sm text-white">{query.question}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge 
                                  className={`text-xs ${
                                    query.priority === "high" 
                                      ? "bg-red-900/60 text-red-300 border border-red-500/50" 
                                      : "bg-blue-900/60 text-blue-300 border border-blue-500/50"
                                  }`}
                                >
                                  {query.priority}
                                </Badge>
                                <Badge 
                                  className={`text-xs ${
                                    query.status === "resolved" 
                                      ? "bg-green-900/60 text-green-300 border border-green-500/50" 
                                      : "bg-orange-900/60 text-orange-300 border border-orange-500/50"
                                  }`}
                                >
                                  {query.status}
                                </Badge>
                              </div>
                            </div>
                            {query.status === "resolved" ? (
                              <CheckCircle className="h-4 w-4 text-green-400" />
                            ) : (
                              <Clock className="h-4 w-4 text-orange-400" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <AlertCircle className="h-8 w-8 text-blue-400 mb-2" />
                        <p className="text-gray-300">No queries available</p>
                      </div>
                    )}
                  </CardContent>
                </GlowCard>
              </motion.div>

              {/* Query Details */}
              <motion.div variants={itemVariants}>
                <GlowCard glowColor={selectedQuery ? "green" : "blue"}>
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      {selectedQuery ? (
                        <MessageCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <MessageCircle className="h-5 w-5 text-blue-400" />
                      )}
                      {selectedQuery ? "Query Response" : "Select a Query"}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {selectedQuery ? "Provide a helpful response to the customer" : "Choose a query from the list to respond"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedQuery ? (
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium text-white">{selectedQuery.question}</p>
                          <p className="text-sm text-gray-400 mt-1">
                            Category: {selectedQuery.category}
                          </p>
                        </div>
                        
                        <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                          <p className="text-sm font-medium text-blue-300">AI Response:</p>
                          <p className="text-sm text-blue-100 mt-1">
                            {selectedQuery.aiResponse}
                          </p>
                        </div>

                        {selectedQuery.status === "pending" && (
                          <div className="space-y-3">
                            <Textarea
                              placeholder="Add custom response..."
                              value={newResponse}
                              onChange={(e) => setNewResponse(e.target.value)}
                              className="bg-slate-800 border-gray-700 text-white placeholder:text-gray-400"
                            />
                            <GlowButton 
                              onClick={() => handleQueryResponse(selectedQuery.id, newResponse || selectedQuery.aiResponse)}
                              className="w-full"
                              glowColor="green"
                            >
                              Send Response
                            </GlowButton>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <MessageCircle className="h-12 w-12 text-gray-600 mb-3 opacity-30" />
                        <p className="text-gray-400">
                          Select a query to view details and respond
                        </p>
                      </div>
                    )}
                  </CardContent>
                </GlowCard>
              </motion.div>
            </motion.div>
          </TabsContent>          {/* Documents Tab */}
          <TabsContent value="documents">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <GlowCard glowColor="purple">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Upload className="h-5 w-5 text-purple-400" />
                      Document Processing
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Upload and process customer documents with AI extraction
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-slate-800/30">
                      <Upload className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2 text-white">Upload KYC/Claim Documents</h3>
                      <p className="text-gray-400 mb-4">
                        Upload documents for automatic AI-powered data extraction
                      </p>
                      <div className="bg-slate-800/70 p-4 rounded-lg border border-gray-700 max-w-xs mx-auto">
                        <Input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileUpload}
                          className="bg-transparent border-gray-700 text-white"
                        />
                      </div>
                    </div>

                    {uploadedFile && (
                      <motion.div 
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <GlowCard glowColor="blue">
                          <CardHeader>
                            <CardTitle className="text-lg text-white flex items-center gap-2">
                              <Upload className="h-5 w-5 text-blue-400" />
                              Processing: {uploadedFile}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {extractedData ? (
                              <div className="space-y-4">
                                <div className="flex items-center gap-2 text-green-400">
                                  <CheckCircle className="h-5 w-5" />
                                  <h4 className="font-medium">Extraction Complete</h4>
                                </div>
                                <div className="bg-slate-800/50 p-4 rounded-lg border border-gray-700/50">
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="p-2">
                                      <span className="block text-xs text-gray-400 mb-1">Name</span>
                                      <span className="text-white">{extractedData.name}</span>
                                    </div>
                                    <div className="p-2">
                                      <span className="block text-xs text-gray-400 mb-1">ID</span>
                                      <span className="text-white">{extractedData.id}</span>
                                    </div>
                                    <div className="p-2">
                                      <span className="block text-xs text-gray-400 mb-1">Phone</span>
                                      <span className="text-white">{extractedData.phone}</span>
                                    </div>
                                    <div className="p-2">
                                      <span className="block text-xs text-gray-400 mb-1">Policy</span>
                                      <span className="text-white">{extractedData.policyNumber}</span>
                                    </div>
                                  </div>
                                </div>
                                <GlowButton className="w-full mt-4" glowColor="green">
                                  Save Extracted Data
                                </GlowButton>
                              </div>
                            ) : (
                              <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-400 mx-auto mb-3"></div>
                                <p className="text-gray-300">Processing document with AI extraction...</p>
                              </div>
                            )}
                          </CardContent>
                        </GlowCard>
                      </motion.div>
                    )}
                  </CardContent>
                </GlowCard>
              </motion.div>
            </motion.div>
          </TabsContent>          {/* Renewals Tab */}
          <TabsContent value="renewals">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <GlowCard glowColor="orange">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Bell className="h-5 w-5 text-orange-400" />
                      Renewal Alerts
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Upcoming policy renewals requiring your attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {renewalAlerts.map((alert, index) => (
                      <motion.div variants={itemVariants} key={alert.id}>
                        <GlowCard 
                          className={`border-l-4 ${
                            alert.status === "due" ? "border-l-red-500" : "border-l-orange-500"
                          }`}
                          glowColor={alert.status === "due" ? "red" : "orange"}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-white">{alert.customerName}</h4>
                                <p className="text-sm text-gray-300">{alert.policyType}</p>
                                <div className="bg-slate-800/50 p-2 rounded mt-2 grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <span className="block text-xs text-gray-400 mb-1">Renewal Date</span>
                                    <span className="text-white">{alert.renewalDate}</span>
                                  </div>
                                  <div>
                                    <span className="block text-xs text-gray-400 mb-1">Premium</span>
                                    <span className="text-white">{alert.premium}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-3">
                                <Badge 
                                  className={
                                    alert.status === "due" 
                                      ? "bg-red-900/60 text-red-300 border border-red-500/50" 
                                      : "bg-orange-900/60 text-orange-300 border border-orange-500/50"
                                  }
                                >
                                  {alert.status === "due" ? "Due Now" : "Upcoming"}
                                </Badge>
                                <GlowButton 
                                  size="sm" 
                                  onClick={() => onContact(alert.customerName)}
                                  glowColor={alert.status === "due" ? "red" : "orange"}
                                >
                                  Contact
                                </GlowButton>
                              </div>
                            </div>
                          </CardContent>
                        </GlowCard>
                      </motion.div>
                    ))}
                    
                    <div className="pt-4">
                      <GlowButton 
                        variant="outline" 
                        className="w-full border border-gray-700 text-white hover:text-orange-300"
                        glowColor="orange" 
                      >
                        Schedule Automated Reminders
                      </GlowButton>
                    </div>
                  </CardContent>
                </GlowCard>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
