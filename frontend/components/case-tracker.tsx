"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, Clock, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

type Case = {
  id: string
  receiptNumber: string
  description: string
  status: "pending" | "approved" | "denied" | "rfe" | "unknown"
  lastUpdated: string
  lastChecked: string
}

export function CaseTracker() {
  const [cases, setCases] = useState<Case[]>([
    {
      id: "1",
      receiptNumber: "IOE0123456789",
      description: "I-485 Application to Register Permanent Residence",
      status: "pending",
      lastUpdated: "2025-03-15",
      lastChecked: "2025-03-28",
    },
    {
      id: "2",
      receiptNumber: "IOE9876543210",
      description: "I-765 Application for Employment Authorization",
      status: "approved",
      lastUpdated: "2025-03-20",
      lastChecked: "2025-03-28",
    },
  ])

  const [newCase, setNewCase] = useState({
    receiptNumber: "",
    description: "",
  })

  const handleAddCase = () => {
    if (!newCase.receiptNumber || !newCase.description) return

    const caseToAdd: Case = {
      id: Date.now().toString(),
      receiptNumber: newCase.receiptNumber,
      description: newCase.description,
      status: "unknown",
      lastUpdated: new Date().toISOString().split("T")[0],
      lastChecked: new Date().toISOString().split("T")[0],
    }

    setCases([...cases, caseToAdd])
    setNewCase({ receiptNumber: "", description: "" })
  }

  const handleRefreshAll = () => {
    // In a real implementation, this would call the USCIS API
    console.log("Refreshing all cases...")
  }

  const handleRefreshCase = (id: string) => {
    // In a real implementation, this would call the USCIS API for a specific case
    console.log(`Refreshing case ${id}...`)
  }

  const handleRemoveCase = (id: string) => {
    setCases(cases.filter((c) => c.id !== id))
  }

  const getStatusBadge = (status: Case["status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "denied":
        return <Badge className="bg-red-500">Denied</Badge>
      case "rfe":
        return <Badge className="bg-yellow-500">RFE Issued</Badge>
      case "pending":
        return <Badge className="bg-blue-500">Pending</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Tabs defaultValue="cases" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="cases">My Cases</TabsTrigger>
        <TabsTrigger value="add">Add New Case</TabsTrigger>
      </TabsList>
      <TabsContent value="cases">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>My USCIS Cases</span>
              <Button variant="outline" size="sm" onClick={handleRefreshAll}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh All
              </Button>
            </CardTitle>
            <CardDescription>Track and monitor your USCIS case status updates</CardDescription>
          </CardHeader>
          <CardContent>
            {cases.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No cases added</AlertTitle>
                <AlertDescription>Add your first case by clicking on the "Add New Case" tab.</AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                {cases.map((caseItem) => (
                  <Card key={caseItem.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{caseItem.receiptNumber}</CardTitle>
                          <CardDescription>{caseItem.description}</CardDescription>
                        </div>
                        {getStatusBadge(caseItem.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2 pt-0">
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          Last Updated: {caseItem.lastUpdated}
                        </div>
                        <div className="flex items-center mt-1">
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Last Checked: {caseItem.lastChecked}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={() => handleRefreshCase(caseItem.id)}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Check Status
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveCase(caseItem.id)}>
                        Remove
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="add">
        <Card>
          <CardHeader>
            <CardTitle>Add New Case</CardTitle>
            <CardDescription>Enter your USCIS receipt number and a description to track a new case</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="receipt-number">Receipt Number</Label>
              <Input
                id="receipt-number"
                placeholder="e.g., IOE0123456789"
                value={newCase.receiptNumber}
                onChange={(e) => setNewCase({ ...newCase, receiptNumber: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Enter the 13-character receipt number from your USCIS notice
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="e.g., I-485 Application"
                value={newCase.description}
                onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Add a description to help you identify this case</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddCase}>Add Case</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
