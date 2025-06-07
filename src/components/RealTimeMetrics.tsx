
import { Activity, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RealTimeMetrics() {
  const metrics = [
    {
      label: "System Status",
      value: "Operational",
      status: "success",
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      label: "Active Monitors",
      value: "847",
      status: "info",
      icon: Activity,
      color: "text-blue-500"
    },
    {
      label: "Response Time",
      value: "1.2s",
      status: "warning",
      icon: Clock,
      color: "text-yellow-500"
    },
    {
      label: "Critical Alerts",
      value: "3",
      status: "error",
      icon: AlertCircle,
      color: "text-red-500"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="glass border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
              <div className={`p-2 rounded-lg bg-background/50 ${metric.color}`}>
                <metric.icon className="w-5 h-5" />
              </div>
            </div>
            {metric.label === "System Status" && (
              <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
                All Systems Online
              </Badge>
            )}
            {metric.label === "Response Time" && (
              <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-yellow-500 rounded-full" />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
