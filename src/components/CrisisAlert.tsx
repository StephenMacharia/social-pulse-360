
import { AlertTriangle, TrendingDown, TrendingUp, Clock, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CrisisAlertProps {
  alert: {
    id: number
    level: "critical" | "warning" | "info"
    title: string
    description: string
    platform: string
    affected: string
    trend: number
    timestamp: string
  }
}

export function CrisisAlert({ alert }: CrisisAlertProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "critical": return "border-red-500/50 bg-red-500/10"
      case "warning": return "border-yellow-500/50 bg-yellow-500/10"
      case "info": return "border-blue-500/50 bg-blue-500/10"
      default: return "border-border bg-card"
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "critical": return <AlertTriangle className="w-5 h-5 text-red-500" />
      case "warning": return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "info": return <AlertTriangle className="w-5 h-5 text-blue-500" />
      default: return <AlertTriangle className="w-5 h-5" />
    }
  }

  const getTrendIcon = (trend: number) => {
    return trend > 0 ? (
      <TrendingUp className="w-4 h-4 text-red-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-green-500" />
    )
  }

  return (
    <Card className={`glass border-2 ${getLevelColor(alert.level)} hover:shadow-lg transition-all duration-300`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="p-2 rounded-lg bg-background/50">
              {getLevelIcon(alert.level)}
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-lg">{alert.title}</h3>
                <Badge variant="outline" className="text-xs">
                  {alert.platform}
                </Badge>
              </div>
              
              <p className="text-muted-foreground">{alert.description}</p>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Affected:</span>
                  <span className="font-medium">{alert.affected}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Trend:</span>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(alert.trend)}
                    <span className={`font-medium ${alert.trend > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {Math.abs(alert.trend)}%
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{alert.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 ml-4">
            <Button size="sm" variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Details
            </Button>
            <Button 
              size="sm" 
              className={
                alert.level === "critical" ? "bg-red-600 hover:bg-red-700" :
                alert.level === "warning" ? "bg-yellow-600 hover:bg-yellow-700" :
                "bg-blue-600 hover:bg-blue-700"
              }
            >
              Take Action
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
