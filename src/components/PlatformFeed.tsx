
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share, Smile, Frown, Meh } from "lucide-react"

const feedData = [
  {
    id: 1,
    platform: "Twitter",
    author: "@techinfluencer",
    content: "Just launched our new AI-powered social media tool! The future of marketing is here 🚀 #AI #SocialMedia",
    sentiment: "positive",
    emotion: "excited",
    engagement: 1250,
    time: "2 hours ago",
    platformColor: "#1da1f2"
  },
  {
    id: 2,
    platform: "Instagram",
    author: "@lifestyle_blogger",
    content: "Mixed feelings about the new social platform updates. Some features are great, others need work...",
    sentiment: "neutral",
    emotion: "thoughtful",
    engagement: 890,
    time: "4 hours ago",
    platformColor: "#e4405f"
  },
  {
    id: 3,
    platform: "TikTok",
    author: "@viral_creator",
    content: "This new app is supposed to replace all others but honestly it's confusing and slow 😒",
    sentiment: "negative",
    emotion: "frustrated",
    engagement: 2100,
    time: "6 hours ago",
    platformColor: "#000000"
  }
]

const getSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case "positive": return <Smile className="w-4 h-4 text-green-500" />
    case "negative": return <Frown className="w-4 h-4 text-red-500" />
    default: return <Meh className="w-4 h-4 text-gray-500" />
  }
}

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case "positive": return "bg-green-500/10 text-green-500 border-green-500/20"
    case "negative": return "bg-red-500/10 text-red-500 border-red-500/20"
    default: return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

export function PlatformFeed() {
  return (
    <Card className="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Live Social Feed</h3>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">All Platforms</Badge>
            <Badge variant="secondary" className="bg-green-500/10 text-green-500">Live</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {feedData.map((post) => (
          <div key={post.id} className="p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: post.platformColor }}
                />
                <span className="font-medium text-sm">{post.platform}</span>
                <span className="text-muted-foreground text-sm">{post.author}</span>
              </div>
              <span className="text-xs text-muted-foreground">{post.time}</span>
            </div>
            
            <p className="text-sm mb-3 leading-relaxed">{post.content}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={getSentimentColor(post.sentiment)}>
                  {getSentimentIcon(post.sentiment)}
                  <span className="ml-1 capitalize">{post.sentiment}</span>
                </Badge>
                <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                  {post.emotion}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Heart className="w-3 h-3 mr-1" />
                  <span className="text-xs">{post.engagement}</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <MessageCircle className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Share className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
