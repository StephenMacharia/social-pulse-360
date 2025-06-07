
import { Bell, Search, User } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AICopilot } from "@/components/AICopilot"

export function Header() {
  return (
    <>
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search mentions, trends, or influencers..." 
              className="pl-10 bg-muted/50 border-0 focus:bg-muted"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </header>
      
      {/* AI Copilot - positioned globally */}
      <AICopilot />
    </>
  )
}
