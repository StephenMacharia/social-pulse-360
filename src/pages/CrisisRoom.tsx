import { AlertTriangle, TrendingDown, TrendingUp, Clock, Users, MessageSquare } from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Header } from "@/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CrisisAlert } from "@/components/CrisisAlert"
import { RealTimeMetrics } from "@/components/RealTimeMetrics"
import { PlatformImpact } from "@/components/PlatformImpact"

const CrisisRoom = () => {
  const activeAlerts = [
    {
      id: 1,
      level: "critical" as const,
      title: "Negative Sentiment Spike",
      description: "84% increase in negative mentions in the last 2 hours",
      platform: "Twitter",
      affected: "12.4K users",
      trend: -32,
      timestamp: "2 min ago"
    },
    {
      id: 2,
      level: "warning" as const,
      title: "Unusual Activity Pattern",
      description: "3x normal volume of mentions detected",
      platform: "Reddit",
      affected: "8.7K users",
      trend: 156,
      timestamp: "8 min ago"
    },
    {
      id: 3,
      level: "info" as const,
      title: "Competitor Campaign Launch",
      description: "Major competitor started trending campaign",
      platform: "Instagram",
      affected: "15.2K users",
      trend: 45,
      timestamp: "23 min ago"
    }
  ]

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 space-y-6">
            {/* Crisis Room Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <div className="p-2 gradient-accent rounded-lg animate-glow">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  Crisis Control Room
                </h1>
                <p className="text-muted-foreground mt-2">
                  Real-time monitoring and crisis detection across all platforms
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
                  Last 24 Hours
                </Button>
                <Button className="gradient-primary text-white">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Emergency Response
                </Button>
              </div>
            </div>

            {/* Real-Time Status Bar */}
            <RealTimeMetrics />

            {/* Active Alerts */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Active Alerts</h2>
              <div className="grid gap-4">
                {activeAlerts.map((alert) => (
                  <CrisisAlert key={alert.id} alert={alert} />
                ))}
              </div>
            </div>

            {/* Platform Impact Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PlatformImpact />
              
              {/* Response Actions */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    Recommended Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <h4 className="font-medium text-red-400 mb-2">Immediate Action Required</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      High volume of negative sentiment detected. Consider issuing a public response.
                    </p>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Draft Response
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Monitor Closely</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Competitor activity may impact your brand mentions.
                    </p>
                    <Button size="sm" variant="outline">
                      Set Alert
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h4 className="font-medium text-blue-400 mb-2">Opportunity Detected</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Positive trend building on Instagram. Consider amplification.
                    </p>
                    <Button size="sm" variant="outline">
                      Create Campaign
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Crisis Timeline */}
            <Card className="glass">
              <CardHeader>
                <CardTitle>Crisis Timeline - Last 24 Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "14:32", event: "Negative sentiment spike detected", severity: "critical" },
                    { time: "13:45", event: "Unusual mention volume on Reddit", severity: "warning" },
                    { time: "12:18", event: "Competitor campaign launched", severity: "info" },
                    { time: "11:55", event: "Positive influencer mention", severity: "positive" },
                    { time: "10:30", event: "Normal activity levels restored", severity: "resolved" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-card/50 rounded-lg">
                      <Badge 
                        variant={item.severity === "critical" ? "destructive" : "secondary"}
                        className={
                          item.severity === "warning" ? "bg-yellow-500/20 text-yellow-400" :
                          item.severity === "positive" ? "bg-green-500/20 text-green-400" :
                          item.severity === "resolved" ? "bg-blue-500/20 text-blue-400" : ""
                        }
                      >
                        {item.severity}
                      </Badge>
                      <span className="text-sm font-mono text-muted-foreground">{item.time}</span>
                      <span className="text-sm">{item.event}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default CrisisRoom
