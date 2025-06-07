
import { useState } from "react"
import { Bot, X, Lightbulb, TrendingUp, AlertCircle, Send, Minimize2, Maximize2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

interface Suggestion {
  id: number
  type: "tip" | "action" | "alert" | "insight"
  title: string
  description: string
  confidence: number
  urgent?: boolean
}

export function AICopilot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  
  const suggestions: Suggestion[] = [
    {
      id: 1,
      type: "alert",
      title: "Crisis Detection",
      description: "Negative sentiment spike detected on Twitter. Would you like me to draft a response?",
      confidence: 94,
      urgent: true
    },
    {
      id: 2,
      type: "insight",
      title: "Trend Opportunity",
      description: "Your brand is trending positively on Instagram. Consider amplifying this content.",
      confidence: 87
    },
    {
      id: 3,
      type: "action",
      title: "Influencer Outreach",
      description: "3 new high-value influencers are discussing your industry. Should I add them to your watchlist?",
      confidence: 76
    },
    {
      id: 4,
      type: "tip",
      title: "Optimal Posting Time",
      description: "Based on your audience analysis, posting in 2 hours will maximize engagement by 23%.",
      confidence: 82
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "alert": return <AlertCircle className="w-4 h-4 text-red-400" />
      case "insight": return <TrendingUp className="w-4 h-4 text-blue-400" />
      case "action": return <Lightbulb className="w-4 h-4 text-yellow-400" />
      case "tip": return <Bot className="w-4 h-4 text-green-400" />
      default: return <Bot className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "alert": return "border-red-500/30 bg-red-500/10"
      case "insight": return "border-blue-500/30 bg-blue-500/10"
      case "action": return "border-yellow-500/30 bg-yellow-500/10"
      case "tip": return "border-green-500/30 bg-green-500/10"
      default: return "border-border bg-card"
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 gradient-primary text-white shadow-lg z-50 rounded-full p-4"
      >
        <Bot className="w-6 h-6" />
      </Button>
    )
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="gradient-primary text-white shadow-lg rounded-full p-3"
        >
          <Bot className="w-5 h-5" />
        </Button>
      </div>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 z-50 glass border-primary/20 shadow-2xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="p-1 gradient-primary rounded-lg">
              <Bot className="w-4 h-4 text-white" />
            </div>
            AI Copilot
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsMinimized(true)}
            >
              <Minimize2 className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 flex flex-col h-full">
        {/* Suggestions */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className={`p-3 rounded-lg border ${getTypeColor(suggestion.type)} ${
                suggestion.urgent ? 'animate-pulse' : ''
              }`}
            >
              <div className="flex items-start gap-2 mb-2">
                {getTypeIcon(suggestion.type)}
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{suggestion.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{suggestion.description}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {suggestion.confidence}%
                </Badge>
              </div>
              
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline" className="text-xs h-6">
                  Accept
                </Button>
                <Button size="sm" variant="ghost" className="text-xs h-6">
                  Dismiss
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Ask AI anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="text-sm"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                // Handle message send
                setMessage("")
              }
            }}
          />
          <Button size="icon" className="gradient-primary text-white">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
