
import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { 
  Home, 
  MessageCircle, 
  Users, 
  BarChart3, 
  Bell, 
  Settings,
  Zap,
  TrendingUp,
  Target,
  Search,
  AlertTriangle
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const mainItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Social Feed", url: "/feed", icon: MessageCircle },
  { title: "Mentions", url: "/mentions", icon: Bell },
  { title: "Influencers", url: "/influencers", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
]

const toolsItems = [
  { title: "AI Insights", url: "/insights", icon: Zap },
  { title: "Trends", url: "/trends", icon: TrendingUp },
  { title: "Campaigns", url: "/campaigns", icon: Target },
  { title: "Search", url: "/search", icon: Search },
]

const crisisItems = [
  { title: "Crisis Room", url: "/crisis", icon: AlertTriangle },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const getNavClass = (path: string) =>
    isActive(path) 
      ? "bg-primary/10 text-primary border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"

  return (
    <Sidebar className={`${collapsed ? "w-14" : "w-64"} border-r border-border transition-all duration-300`}>
      <SidebarContent className="bg-sidebar">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center animate-glow">
              <Zap className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                SocialNexus
              </span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-4">
            {!collapsed ? "MAIN" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="mb-1">
                    <NavLink 
                      to={item.url} 
                      end
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavClass(item.url)}`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-4">
            {!collapsed ? "CRISIS CONTROL" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {crisisItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="mb-1">
                    <NavLink 
                      to={item.url} 
                      end
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavClass(item.url)} ${isActive(item.url) ? '' : 'text-orange-400 hover:text-orange-300'}`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-4">
            {!collapsed ? "AI TOOLS" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="mb-1">
                    <NavLink 
                      to={item.url} 
                      end
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavClass(item.url)}`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <SidebarMenuButton asChild>
            <NavLink 
              to="/settings" 
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavClass('/settings')}`}
            >
              <Settings className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span className="font-medium">Settings</span>}
            </NavLink>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
