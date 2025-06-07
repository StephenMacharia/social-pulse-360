
import { useState } from "react"
import { Plus, X, ArrowRight, Save, Play, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface WorkflowStep {
  id: string
  type: "trigger" | "condition" | "action"
  title: string
  config: Record<string, any>
}

interface Workflow {
  id: string
  name: string
  active: boolean
  steps: WorkflowStep[]
}

export function WorkflowBuilder() {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: "1",
      name: "Crisis Alert System",
      active: true,
      steps: [
        { id: "t1", type: "trigger", title: "Negative sentiment spike", config: { threshold: 80 } },
        { id: "c1", type: "condition", title: "More than 5 mentions", config: { count: 5 } },
        { id: "a1", type: "action", title: "Send Slack alert", config: { channel: "#crisis" } }
      ]
    }
  ])
  
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(workflows[0])
  const [newWorkflowName, setNewWorkflowName] = useState("")
  const [showNewWorkflow, setShowNewWorkflow] = useState(false)

  const triggerTypes = [
    { value: "sentiment_spike", label: "Sentiment Spike" },
    { value: "mention_volume", label: "Mention Volume Change" },
    { value: "keyword_detected", label: "Keyword Detected" },
    { value: "influencer_post", label: "Influencer Posted" }
  ]

  const actionTypes = [
    { value: "slack_alert", label: "Send Slack Alert" },
    { value: "email_notify", label: "Email Notification" },
    { value: "crm_update", label: "Update CRM" },
    { value: "auto_reply", label: "Auto Reply" }
  ]

  const addStep = (type: "trigger" | "condition" | "action") => {
    if (!selectedWorkflow) return
    
    const newStep: WorkflowStep = {
      id: `${type}_${Date.now()}`,
      type,
      title: `New ${type}`,
      config: {}
    }
    
    const updatedWorkflow = {
      ...selectedWorkflow,
      steps: [...selectedWorkflow.steps, newStep]
    }
    
    setSelectedWorkflow(updatedWorkflow)
    setWorkflows(prev => prev.map(w => w.id === updatedWorkflow.id ? updatedWorkflow : w))
  }

  const removeStep = (stepId: string) => {
    if (!selectedWorkflow) return
    
    const updatedWorkflow = {
      ...selectedWorkflow,
      steps: selectedWorkflow.steps.filter(s => s.id !== stepId)
    }
    
    setSelectedWorkflow(updatedWorkflow)
    setWorkflows(prev => prev.map(w => w.id === updatedWorkflow.id ? updatedWorkflow : w))
  }

  const createNewWorkflow = () => {
    if (!newWorkflowName.trim()) return
    
    const newWorkflow: Workflow = {
      id: Date.now().toString(),
      name: newWorkflowName,
      active: false,
      steps: []
    }
    
    setWorkflows(prev => [...prev, newWorkflow])
    setSelectedWorkflow(newWorkflow)
    setNewWorkflowName("")
    setShowNewWorkflow(false)
  }

  const getStepColor = (type: string) => {
    switch (type) {
      case "trigger": return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "condition": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "action": return "bg-green-500/20 text-green-400 border-green-500/30"
      default: return "bg-muted"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Workflow List */}
      <Card className="glass">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Workflows</CardTitle>
            <Button 
              size="sm" 
              onClick={() => setShowNewWorkflow(true)}
              className="gradient-primary text-white"
            >
              <Plus className="w-4 h-4 mr-1" />
              New
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {showNewWorkflow && (
            <div className="p-3 bg-card/50 rounded-lg border border-border/50">
              <Input
                placeholder="Workflow name..."
                value={newWorkflowName}
                onChange={(e) => setNewWorkflowName(e.target.value)}
                className="mb-2"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={createNewWorkflow}>Create</Button>
                <Button size="sm" variant="ghost" onClick={() => setShowNewWorkflow(false)}>Cancel</Button>
              </div>
            </div>
          )}
          
          {workflows.map((workflow) => (
            <div
              key={workflow.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedWorkflow?.id === workflow.id 
                  ? "bg-primary/20 border-primary/30" 
                  : "bg-card/50 border-border/50 hover:bg-card/70"
              }`}
              onClick={() => setSelectedWorkflow(workflow)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{workflow.name}</span>
                <Badge className={workflow.active ? "bg-green-500/20 text-green-400" : "bg-muted"}>
                  {workflow.active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{workflow.steps.length} steps</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Workflow Builder */}
      <Card className="glass lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {selectedWorkflow ? `Edit: ${selectedWorkflow.name}` : "Select a Workflow"}
            </CardTitle>
            {selectedWorkflow && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Play className="w-4 h-4 mr-1" />
                  Test
                </Button>
                <Button size="sm" className="gradient-primary text-white">
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {selectedWorkflow ? (
            <div className="space-y-4">
              {/* Add Step Buttons */}
              <div className="flex gap-2 mb-6">
                <Button size="sm" variant="outline" onClick={() => addStep("trigger")}>
                  <Plus className="w-3 h-3 mr-1" />
                  Trigger
                </Button>
                <Button size="sm" variant="outline" onClick={() => addStep("condition")}>
                  <Plus className="w-3 h-3 mr-1" />
                  Condition
                </Button>
                <Button size="sm" variant="outline" onClick={() => addStep("action")}>
                  <Plus className="w-3 h-3 mr-1" />
                  Action
                </Button>
              </div>

              {/* Workflow Steps */}
              <div className="space-y-3">
                {selectedWorkflow.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg border flex-1 ${getStepColor(step.type)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-background/50">
                          {step.type}
                        </Badge>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          onClick={() => removeStep(step.id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Input
                          placeholder="Step name..."
                          value={step.title}
                          className="text-sm"
                        />
                        
                        {step.type === "trigger" && (
                          <Select>
                            <SelectTrigger className="text-sm">
                              <SelectValue placeholder="Select trigger type" />
                            </SelectTrigger>
                            <SelectContent>
                              {triggerTypes.map(type => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        
                        {step.type === "action" && (
                          <Select>
                            <SelectTrigger className="text-sm">
                              <SelectValue placeholder="Select action type" />
                            </SelectTrigger>
                            <SelectContent>
                              {actionTypes.map(type => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>
                    
                    {index < selectedWorkflow.steps.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                ))}
                
                {selectedWorkflow.steps.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No steps added yet. Start building your workflow!</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Select a workflow to start editing</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
