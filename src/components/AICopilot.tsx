
import { useState } from "react"
import {
  Bot, X, Lightbulb, TrendingUp, AlertCircle,
  Send, Minimize2
} from "lucide-react"
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Suggestion {
  id: number
  type: "tip" | "action" | "alert" | "insight"
  title: string
  description: string
  confidence: number
  urgent?: boolean
}

interface Message {
  id: number
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

export function AICopilot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content: "Hello! 👋 I'm your Social Pulse 360 AI assistant. I can help you understand the platform features, explain analytics, or answer questions about your social media monitoring. What would you like to know?",
      timestamp: new Date()
    }
  ])

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
      description: "Posting in 2 hours will maximize engagement by 23%.",
      confidence: 82
    }
  ]

  const handleSendMessage = () => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    
    // Generate AI response based on message content
    const aiResponse = generateAIResponse(message)
    const assistantMessage: Message = {
      id: messages.length + 2,
      type: "assistant",
      content: aiResponse,
      timestamp: new Date()
    }

    setTimeout(() => {
      setMessages(prev => [...prev, assistantMessage])
    }, 500)

    setMessage("")
  }

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Greetings
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! 😊 Great to see you here! I'm your Social Pulse 360 assistant. I can help you navigate the platform, explain features, or answer questions about your social media analytics. What would you like to explore?"
    }
    
    if (lowerMessage.includes("good morning")) {
      return "Good morning! ☀️ Ready to dive into your social media insights? Your current sentiment score is at 84% - that's excellent! What would you like to focus on today?"
    }
    
    if (lowerMessage.includes("good afternoon") || lowerMessage.includes("good evening")) {
      return "Good afternoon! 🌅 Hope you're having a productive day! Your brand mentions are up 12.5% this week. Is there anything specific you'd like to know about your social media performance?"
    }
    
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return "You're very welcome! 😊 I'm always here to help you get the most out of Social Pulse 360. Feel free to ask me anything else!"
    }
    
    if (lowerMessage.includes("bye") || lowerMessage.includes("goodbye")) {
      return "Goodbye! 👋 Have a great day managing your social media presence. Remember, I'm always here when you need assistance with Social Pulse 360!"
    }

    // Current dashboard insights
    if (lowerMessage.includes("current") || lowerMessage.includes("today") || lowerMessage.includes("now") || lowerMessage.includes("latest")) {
      return "Here are your current insights:\n• Total Mentions: 24,891 (+12.5% from last week)\n• Sentiment Score: 84% (excellent!)\n• Influencer Reach: 2.3M (+15.8% growth)\n• Campaign ROI: 340% (+24% this month)\n\nAll metrics are trending positively! 📈"
    }
    
    if (lowerMessage.includes("dashboard") || lowerMessage.includes("overview")) {
      return "The Social Pulse 360 dashboard shows key metrics like Total Mentions (24,891), Sentiment Score (84%), Influencer Reach (2.3M), and Campaign ROI (340%). You can view real-time sentiment analysis, platform feeds, and AI predictions here."
    }
    
    if (lowerMessage.includes("crisis") || lowerMessage.includes("alert")) {
      return "The Crisis Room monitors negative sentiment spikes and potential PR issues. It provides real-time alerts, suggested responses, and escalation protocols to help you manage brand reputation effectively."
    }
    
    if (lowerMessage.includes("analytics") || lowerMessage.includes("metrics")) {
      return "Analytics section provides deep insights into your social media performance, including engagement trends, audience demographics, competitor analysis, and custom reporting features."
    }
    
    if (lowerMessage.includes("automation") || lowerMessage.includes("workflow")) {
      return "Automation tools help you create workflows for posting, responding to mentions, and managing your social media presence. You can set up triggers based on sentiment, keywords, or engagement levels."
    }
    
    if (lowerMessage.includes("business") || lowerMessage.includes("crm") || lowerMessage.includes("nps")) {
      return "Business Development section includes CRM for managing contacts and opportunities, plus NPS surveys to measure customer satisfaction. Track your sales pipeline and gather valuable feedback."
    }
    
    if (lowerMessage.includes("sentiment") || lowerMessage.includes("mood")) {
      return "Sentiment analysis tracks how people feel about your brand across platforms. We analyze mentions in real-time and categorize them as positive, negative, or neutral, helping you understand public perception."
    }
    
    if (lowerMessage.includes("influencer")) {
      return "The Influencer Hub helps you discover, track, and collaborate with key influencers in your industry. View their reach, engagement rates, and recent activity to make informed partnership decisions."
    }
    
    if (lowerMessage.includes("help") || lowerMessage.includes("how")) {
      return "I can help you with:\n• Understanding dashboard metrics\n• Navigating different sections\n• Explaining analytics features\n• Crisis management tools\n• Automation workflows\n• Business development features\n\nWhat specific area would you like to explore?"
    }
    
    // Simple responses
    if (lowerMessage.includes("what") && lowerMessage.includes("do")) {
      return "Social Pulse 360 helps you monitor social media mentions, analyze sentiment, track influencers, manage potential crises, automate workflows, and handle business development with CRM and NPS tools. What specific feature interests you most?"
    }
    
    if (lowerMessage.includes("how are you") || lowerMessage.includes("how's it going")) {
      return "I'm doing great, thank you for asking! 😊 I'm here and ready to help you make the most of Social Pulse 360. Your social media metrics are looking strong today!"
    }
    
    return "I understand you're asking about Social Pulse 360. This platform helps you monitor social media mentions, analyze sentiment, track influencers, manage crises, and automate your social media workflows. Could you be more specific about what you'd like to know?"
  }

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

  // Closed state (floating icon button)
  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg z-50 rounded-full p-4 animate-pulse"
        title="Open AI Assistant"
      >
        <Bot className="w-6 h-6" />
      </Button>
    )
  }

  // Minimized state
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg rounded-full p-3"
          title="Expand AI Assistant"
        >
          <Bot className="w-5 h-5" />
        </Button>
      </div>
    )
  }

  // Expanded chat
  return (
    <Card className="fixed bottom-6 left-6 w-80 h-96 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-300 dark:border-gray-700 shadow-2xl rounded-xl overflow-hidden flex flex-col">
      <CardHeader className="pb-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-100">
            <div className="p-1 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-md">
              <Bot className="w-4 h-4 text-white" />
            </div>
            Social Pulse AI
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsMinimized(true)}
              title="Minimize"
            >
              <Minimize2 className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsOpen(false)}
              title="Close"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-2 flex flex-col h-full">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded-lg text-xs ${
                msg.type === "user"
                  ? "bg-blue-500 text-white ml-4"
                  : "bg-gray-100 dark:bg-gray-800 mr-4"
              }`}
            >
              {msg.content}
            </div>
          ))}
          
          {/* Suggestions */}
          {messages.length <= 1 && suggestions.map((s) => (
            <div
              key={s.id}
              className={`p-3 rounded-md border text-sm ${getTypeColor(s.type)} ${s.urgent ? 'animate-pulse' : ''}`}
            >
              <div className="flex items-start gap-2 mb-2">
                {getTypeIcon(s.type)}
                <div className="flex-1">
                  <h4 className="font-semibold text-xs">{s.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{s.description}</p>
                </div>
                <Badge variant="outline" className="text-[10px]">{s.confidence}%</Badge>
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

        {/* Enhanced Input Section with Better Visibility */}
        <div className="border-t-2 border-blue-200 dark:border-blue-800 pt-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3 -m-3 mt-3">
          <div className="mb-2">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 text-center animate-pulse">
              💬 Ask me anything about Social Pulse 360!
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex-1 relative">
              <Input
                placeholder="Type your question here... e.g., 'How do crisis alerts work?'"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="text-sm pr-12 border-2 border-blue-300 dark:border-blue-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 shadow-sm font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage()
                  }
                }}
              />
            </div>
            <Button 
              size="icon" 
              className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-lg border-2 border-blue-500/20 hover:scale-105"
              onClick={handleSendMessage}
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-2 text-center">
            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
              ✨ Get instant help with features, analytics, insights & more
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
