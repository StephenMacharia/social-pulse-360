
import { MessageCircle, Heart, Share, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PlatformImpact() {
  const platforms = [
    {
      name: "Twitter",
      status: "critical",
      mentions: "8.4K",
      sentiment: -34,
      engagement: "156K",
      icon: MessageCircle,
      color: "text-red-500"
    },
    {
      name: "Instagram",
      status: "warning",
      mentions: "2.1K",
      sentiment: 12,
      engagement: "89K",
      icon: Heart,
      color: "text-yellow-500"
    },
    {
      name: "Reddit",
      status: "normal",
      mentions: "1.8K",
      sentiment: 8,
      engagement: "45K",
      icon: Share,
      color: "text-green-500"
    },
    {
      name: "TikTok",
      status: "opportunity",
      mentions: "3.2K",
      sentiment: 67,
      engagement: "234K",
      icon: TrendingUp,
      color: "text-blue-500"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-red-500/20 text-red-400 border-red-500/30"
      case "warning": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "normal": return "bg-green-500/20 text-green-400 border-green-500/30"
      case "opportunity": return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Platform Impact Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {platforms.map((platform, index) => (
          <div key={index} className="p-4 bg-card/50 rounded-lg border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-background/50 ${platform.color}`}>
                  <platform.icon className="w-4 h-4" />
                </div>
                <span className="font-medium">{platform.name}</span>
              </div>
              <Badge className={getStatusColor(platform.status)}>
                {platform.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Mentions</p>
                <p className="font-semibold">{platform.mentions}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Sentiment</p>
                <p className={`font-semibold ${platform.sentiment > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {platform.sentiment > 0 ? '+' : ''}{platform.sentiment}%
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Engagement</p>
                <p className="font-semibold">{platform.engagement}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
