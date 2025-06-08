
import { useState } from "react"
import { Star, Send, Users, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface NPSResponse {
  id: string
  score: number
  feedback: string
  date: string
  source: string
}

export function NPSSurvey() {
  const [selectedScore, setSelectedScore] = useState<number | null>(null)
  const [feedback, setFeedback] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const recentResponses: NPSResponse[] = [
    { id: "1", score: 9, feedback: "Great platform, love the AI insights!", date: "2024-01-15", source: "Email" },
    { id: "2", score: 8, feedback: "Very useful for social monitoring", date: "2024-01-14", source: "In-app" },
    { id: "3", score: 6, feedback: "Good but could use more features", date: "2024-01-13", source: "SMS" },
    { id: "4", score: 10, feedback: "Excellent crisis management tools", date: "2024-01-12", source: "Email" }
  ]

  const npsScore = Math.round(recentResponses.reduce((acc, r) => acc + r.score, 0) / recentResponses.length * 10)
  const promoters = recentResponses.filter(r => r.score >= 9).length
  const detractors = recentResponses.filter(r => r.score <= 6).length

  const handleSubmit = () => {
    if (selectedScore !== null) {
      console.log("NPS submission:", { score: selectedScore, feedback })
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setSelectedScore(null)
        setFeedback("")
      }, 3000)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 9) return "text-green-400"
    if (score >= 7) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 9) return "Promoter"
    if (score >= 7) return "Passive"
    return "Detractor"
  }

  if (isSubmitted) {
    return (
      <Card className="glass">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Thank you for your feedback!</h3>
          <p className="text-muted-foreground">Your response helps us improve our platform.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* NPS Survey Card */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Net Promoter Score Survey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              How likely are you to recommend our platform to a friend or colleague?
            </p>
            <div className="grid grid-cols-11 gap-2">
              {Array.from({ length: 11 }, (_, i) => (
                <Button
                  key={i}
                  variant={selectedScore === i ? "default" : "outline"}
                  className={`h-10 w-full ${selectedScore === i ? "bg-primary" : ""}`}
                  onClick={() => setSelectedScore(i)}
                >
                  {i}
                </Button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Not likely</span>
              <span>Very likely</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Additional feedback (optional)
            </label>
            <Textarea
              placeholder="Tell us more about your experience..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-20"
            />
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={selectedScore === null}
            className="w-full"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit Feedback
          </Button>
        </CardContent>
      </Card>

      {/* NPS Analytics */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            NPS Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-card/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{npsScore}</div>
              <div className="text-sm text-muted-foreground">Overall NPS</div>
            </div>
            <div className="text-center p-4 bg-card/50 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{promoters}</div>
              <div className="text-sm text-muted-foreground">Promoters</div>
            </div>
            <div className="text-center p-4 bg-card/50 rounded-lg">
              <div className="text-2xl font-bold text-red-400">{detractors}</div>
              <div className="text-sm text-muted-foreground">Detractors</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Recent Responses</h4>
            {recentResponses.slice(0, 3).map((response) => (
              <div key={response.id} className="flex items-start gap-3 p-3 bg-card/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${getScoreColor(response.score)}`}>
                    {response.score}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {getScoreLabel(response.score)}
                  </Badge>
                </div>
                <div className="flex-1">
                  <p className="text-sm">{response.feedback}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{response.date}</span>
                    <Badge variant="secondary" className="text-xs">{response.source}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
