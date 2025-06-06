
import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AIInsightCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: ReactNode
  gradient?: "primary" | "secondary" | "accent"
}

export function AIInsightCard({ title, value, change, changeType, icon, gradient = "primary" }: AIInsightCardProps) {
  const gradientClass = gradient === "primary" ? "gradient-primary" : 
                       gradient === "secondary" ? "gradient-secondary" : "gradient-accent"
  
  const changeColor = changeType === "positive" ? "text-green-500" : 
                     changeType === "negative" ? "text-red-500" : "text-muted-foreground"

  return (
    <Card className="glass hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${gradientClass} group-hover:animate-glow transition-all duration-300`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {change && (
          <Badge variant="secondary" className={`mt-2 ${changeColor} bg-transparent border-0 px-0`}>
            {change}
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}
