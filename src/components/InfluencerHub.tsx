
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, Users, TrendingUp, MessageCircle } from "lucide-react"

const influencers = [
  {
    id: 1,
    name: "Sarah Chen",
    handle: "@sarahtech",
    category: "Technology",
    followers: "125K",
    engagement: "8.5%",
    rating: 4.8,
    recentMention: "Mentioned your brand 2 hours ago"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    handle: "@fitnessguru",
    category: "Fitness",
    followers: "89K", 
    engagement: "12.3%",
    rating: 4.6,
    recentMention: "Posted about wellness trends"
  },
  {
    id: 3,
    name: "Elena Rodriguez", 
    handle: "@foodie_elena",
    category: "Food & Lifestyle",
    followers: "230K",
    engagement: "6.2%",
    rating: 4.9,
    recentMention: "Shared your product story"
  }
]

export function InfluencerHub() {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Influencer Discovery
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {influencers.map((influencer) => (
          <div key={influencer.id} className="p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {influencer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{influencer.name}</h4>
                  <p className="text-sm text-muted-foreground">{influencer.handle}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{influencer.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                {influencer.category}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {influencer.followers}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {influencer.engagement}
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">{influencer.recentMention}</p>
            
            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                <MessageCircle className="w-3 h-3 mr-1" />
                Connect
              </Button>
              <Button size="sm" variant="outline">
                View Profile
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
