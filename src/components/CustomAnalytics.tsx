
import { useState } from "react"
import { Plus, Grip, X, BarChart3, PieChart, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line } from "recharts"

interface Widget {
  id: string
  type: "bar" | "pie" | "line" | "metric"
  title: string
  size: "small" | "medium" | "large"
  data: any[]
  config: Record<string, any>
}

interface DashboardLayout {
  id: string
  name: string
  widgets: Widget[]
}

export function CustomAnalytics() {
  const [dashboards, setDashboards] = useState<DashboardLayout[]>([
    {
      id: "1",
      name: "Main Dashboard",
      widgets: [
        {
          id: "w1",
          type: "metric",
          title: "Total Mentions",
          size: "small",
          data: [{ value: 24891, change: 12.5 }],
          config: { color: "blue" }
        },
        {
          id: "w2", 
          type: "bar",
          title: "Sentiment by Platform",
          size: "medium",
          data: [
            { name: "Twitter", positive: 45, negative: 20, neutral: 35 },
            { name: "Instagram", positive: 60, negative: 15, neutral: 25 },
            { name: "Reddit", positive: 30, negative: 40, neutral: 30 }
          ],
          config: {}
        },
        {
          id: "w3",
          type: "pie",
          title: "Emotion Distribution",
          size: "medium", 
          data: [
            { name: "Joy", value: 35, color: "#10b981" },
            { name: "Anger", value: 25, color: "#ef4444" },
            { name: "Fear", value: 20, color: "#f59e0b" },
            { name: "Sadness", value: 20, color: "#6366f1" }
          ],
          config: {}
        }
      ]
    }
  ])

  const [activeDashboard, setActiveDashboard] = useState(dashboards[0])
  const [showAddWidget, setShowAddWidget] = useState(false)
  const [newWidget, setNewWidget] = useState({
    title: "",
    type: "metric" as const,
    size: "medium" as const
  })

  const widgetTypes = [
    { value: "metric", label: "Metric Card", icon: TrendingUp },
    { value: "bar", label: "Bar Chart", icon: BarChart3 },
    { value: "pie", label: "Pie Chart", icon: PieChart },
    { value: "line", label: "Line Chart", icon: TrendingUp }
  ]

  const widgetSizes = [
    { value: "small", label: "Small (1x1)" },
    { value: "medium", label: "Medium (2x1)" },
    { value: "large", label: "Large (2x2)" }
  ]

  const addWidget = () => {
    if (!newWidget.title.trim()) return

    const widget: Widget = {
      id: `w_${Date.now()}`,
      type: newWidget.type,
      title: newWidget.title,
      size: newWidget.size,
      data: generateSampleData(newWidget.type),
      config: {}
    }

    const updatedDashboard = {
      ...activeDashboard,
      widgets: [...activeDashboard.widgets, widget]
    }

    setActiveDashboard(updatedDashboard)
    setDashboards(prev => prev.map(d => d.id === updatedDashboard.id ? updatedDashboard : d))
    setNewWidget({ title: "", type: "metric", size: "medium" })
    setShowAddWidget(false)
  }

  const removeWidget = (widgetId: string) => {
    const updatedDashboard = {
      ...activeDashboard,
      widgets: activeDashboard.widgets.filter(w => w.id !== widgetId)
    }

    setActiveDashboard(updatedDashboard)
    setDashboards(prev => prev.map(d => d.id === updatedDashboard.id ? updatedDashboard : d))
  }

  const generateSampleData = (type: string) => {
    switch (type) {
      case "metric":
        return [{ value: Math.floor(Math.random() * 10000), change: Math.floor(Math.random() * 20) }]
      case "bar":
        return [
          { name: "A", value: Math.floor(Math.random() * 100) },
          { name: "B", value: Math.floor(Math.random() * 100) },
          { name: "C", value: Math.floor(Math.random() * 100) }
        ]
      case "pie":
        return [
          { name: "Category 1", value: 40, color: "#8b5cf6" },
          { name: "Category 2", value: 30, color: "#3b82f6" },
          { name: "Category 3", value: 30, color: "#10b981" }
        ]
      case "line":
        return [
          { name: "Jan", value: 100 },
          { name: "Feb", value: 120 },
          { name: "Mar", value: 150 },
          { name: "Apr", value: 130 },
          { name: "May", value: 180 }
        ]
      default:
        return []
    }
  }

  const renderWidget = (widget: Widget) => {
    const sizeClasses = {
      small: "col-span-1 row-span-1",
      medium: "col-span-2 row-span-1", 
      large: "col-span-2 row-span-2"
    }

    return (
      <Card key={widget.id} className={`glass ${sizeClasses[widget.size]} relative group`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6"
                onClick={() => removeWidget(widget.id)}
              >
                <X className="w-3 h-3" />
              </Button>
              <div className="cursor-move">
                <Grip className="w-3 h-3 text-muted-foreground" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {widget.type === "metric" && (
            <div>
              <div className="text-2xl font-bold">{widget.data[0]?.value.toLocaleString()}</div>
              <div className="text-sm text-green-500">+{widget.data[0]?.change}% from last week</div>
            </div>
          )}

          {widget.type === "bar" && (
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={widget.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
                <Bar dataKey="value" fill="#8b5cf6" />
                {widget.data[0]?.positive !== undefined && (
                  <>
                    <Bar dataKey="positive" fill="#10b981" />
                    <Bar dataKey="negative" fill="#ef4444" />
                    <Bar dataKey="neutral" fill="#6b7280" />
                  </>
                )}
              </BarChart>
            </ResponsiveContainer>
          )}

          {widget.type === "pie" && (
            <ResponsiveContainer width="100%" height={150}>
              <RechartsPieChart>
                <Pie
                  data={widget.data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {widget.data.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          )}

          {widget.type === "line" && (
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={widget.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{activeDashboard.name}</h2>
          <p className="text-muted-foreground">Customize your analytics dashboard</p>
        </div>
        
        <div className="flex gap-3">
          <Select value={activeDashboard.id} onValueChange={(value) => {
            const dashboard = dashboards.find(d => d.id === value)
            if (dashboard) setActiveDashboard(dashboard)
          }}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dashboards.map(dashboard => (
                <SelectItem key={dashboard.id} value={dashboard.id}>
                  {dashboard.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Dialog open={showAddWidget} onOpenChange={setShowAddWidget}>
            <DialogTrigger asChild>
              <Button className="gradient-primary text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Widget
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Widget</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Widget Title</Label>
                  <Input
                    id="title"
                    value={newWidget.title}
                    onChange={(e) => setNewWidget(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter widget title..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Widget Type</Label>
                  <Select value={newWidget.type} onValueChange={(value: any) => setNewWidget(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {widgetTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="w-4 h-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="size">Widget Size</Label>
                  <Select value={newWidget.size} onValueChange={(value: any) => setNewWidget(prev => ({ ...prev, size: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {widgetSizes.map(size => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={addWidget} className="gradient-primary text-white flex-1">
                    Add Widget
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddWidget(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-4 grid-rows-4 gap-4 h-[800px]">
        {activeDashboard.widgets.map(renderWidget)}
        
        {activeDashboard.widgets.length === 0 && (
          <div className="col-span-4 row-span-4 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No widgets yet</h3>
              <p className="mb-4">Start building your custom dashboard by adding widgets</p>
              <Button onClick={() => setShowAddWidget(true)} className="gradient-primary text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Widget
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
