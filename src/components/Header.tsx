
import { Bell, Search, User } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AICopilot } from "@/components/AICopilot"

export function Header() {
  return (
    <>
      <header 
        className="h-16 bg-card border-b border-border flex items-center justify-between px-6"
        role="banner"
      >
        <div className="flex items-center gap-4">
          <SidebarTrigger 
            className="text-muted-foreground hover:text-foreground" 
            aria-label="Toggle sidebar navigation"
          />
          <div className="relative w-96" role="search">
            <label htmlFor="global-search" className="sr-only">
              Search mentions, trends, or influencers
            </label>
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" 
              aria-hidden="true"
            />
            <Input 
              id="global-search"
              placeholder="Search mentions, trends, or influencers..." 
              className="pl-10 bg-muted/50 border-0 focus:bg-muted"
              aria-label="Search mentions, trends, or influencers"
            />
          </div>
        </div>

        <nav className="flex items-center gap-4" role="navigation" aria-label="User actions">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            aria-label="Notifications (1 new)"
          >
            <Bell className="w-4 h-4" aria-hidden="true" />
            <span 
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"
              aria-label="1 new notification"
            ></span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            aria-label="User profile"
          >
            <User className="w-4 h-4" aria-hidden="true" />
          </Button>
        </nav>
      </header>
      
      {/* AI Copilot - positioned globally */}
      <AICopilot />
    </>
  )
}
