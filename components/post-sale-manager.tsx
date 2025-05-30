"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { ArrowLeft, MessageCircle, Upload, Bell, Clock, CheckCircle } from "lucide-react"
import { getCustomerQueries, updateLeadStatus } from "@/lib/firebase"

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Post-Sale Manager</h1>
          </div>
          <Badge variant="secondary">{customerName}</Badge>
        </div>

        <Tabs defaultValue="queries" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="queries" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Queries
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="renewals" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Renewals
            </TabsTrigger>
          </TabsList>

          {/* Queries Tab */}
          <TabsContent value="queries">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Query List */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Queries</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {queries.map((query) => (
                    <Card 
                      key={query.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedQuery(query)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{query.question}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge 
                                variant={query.priority === "high" ? "destructive" : "secondary"}
                                className="text-xs"
                              >
                                {query.priority}
                              </Badge>
                              <Badge 
                                variant={query.status === "resolved" ? "default" : "outline"}
                                className="text-xs"
                              >
                                {query.status}
                              </Badge>
                            </div>
                          </div>
                          {query.status === "resolved" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Query Details */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedQuery ? "Query Response" : "Select a Query"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedQuery ? (
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">{selectedQuery.question}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Category: {selectedQuery.category}
                        </p>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">AI Response:</p>
                        <p className="text-sm text-blue-700 mt-1">
                          {selectedQuery.aiResponse}
                        </p>
                      </div>

                      {selectedQuery.status === "pending" && (
                        <div className="space-y-3">
                          <Textarea
                            placeholder="Add custom response..."
                            value={newResponse}
                            onChange={(e) => setNewResponse(e.target.value)}
                          />
                          <Button 
                            onClick={() => handleQueryResponse(selectedQuery.id, newResponse || selectedQuery.aiResponse)}
                            className="w-full"
                          >
                            Send Response
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      Select a query to view details and respond
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Document Processing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload KYC/Claim Documents</h3>
                  <p className="text-gray-600 mb-4">
                    Upload documents for automatic data extraction
                  </p>
                  <Input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="max-w-xs mx-auto"
                  />
                </div>

                {uploadedFile && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Processing: {uploadedFile}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {extractedData ? (
                        <div className="space-y-3">
                          <h4 className="font-medium text-green-600">✓ Extraction Complete</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Name:</span> {extractedData.name}
                            </div>
                            <div>
                              <span className="font-medium">ID:</span> {extractedData.id}
                            </div>
                            <div>
                              <span className="font-medium">Phone:</span> {extractedData.phone}
                            </div>
                            <div>
                              <span className="font-medium">Policy:</span> {extractedData.policyNumber}
                            </div>
                          </div>
                          <Button className="w-full mt-4">
                            Save Extracted Data
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                          <p className="text-sm text-gray-600">Processing document...</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Renewals Tab */}
          <TabsContent value="renewals">
            <Card>
              <CardHeader>
                <CardTitle>Renewal Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {renewalAlerts.map((alert) => (
                  <Card key={alert.id} className="border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{alert.customerName}</h4>
                          <p className="text-sm text-gray-600">{alert.policyType}</p>
                          <p className="text-sm">
                            <span className="font-medium">Renewal:</span> {alert.renewalDate}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Premium:</span> {alert.premium}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge 
                            variant={alert.status === "due" ? "destructive" : "secondary"}
                          >
                            {alert.status}
                          </Badge>
                          <Button 
                            size="sm" 
                            onClick={() => onContact(alert.customerName)}
                          >
                            Contact
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
