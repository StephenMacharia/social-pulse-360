import {
  Home,
  AlertTriangle,
  BarChart3,
  Zap,
  Building2,
  Settings,
  HelpCircle,
  User,
} from "lucide-react"
import { NavLink } from "react-router-dom"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSidebar } from "@/components/ui/sidebar"
import { useUser } from "@clerk/clerk-react"

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Crisis Room",
    url: "/crisis",
    icon: AlertTriangle,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Automation",
    url: "/automation",
    icon: Zap,
  },
  {
    title: "Business Dev",
    url: "/business",
    icon: Building2,
  },
]

export function AppSidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar()
  const { user } = useUser()

  return (
    <aside className={`
      ${isCollapsed ? 'w-16' : 'w-60'}
      flex flex-col bg-card border-r border-border transition-all duration-200`
    }>
      <div className="flex-1 flex flex-col justify-between h-full p-3">
        <nav className="flex flex-col space-y-1">
          {items.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className={({ isActive }) => `
                flex items-center gap-3 p-3 rounded-lg transition-colors
                ${isActive
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'hover:bg-secondary/50'
                }
              `}
            >
              <item.icon className="w-4 h-4" />
              {!isCollapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-1 pt-4 border-t border-border">
          <NavLink
            to="/settings"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50"
          >
            <Settings className="w-4 h-4" />
            {!isCollapsed && <span>Settings</span>}
          </NavLink>
          <NavLink
            to="/help"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50"
          >
            <HelpCircle className="w-4 h-4" />
            {!isCollapsed && <span>Help</span>}
          </NavLink>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 left-2 rounded-full shadow transition-transform hover:scale-110 md:hidden"
          >
            <Avatar className="w-7 h-7">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="md:hidden">
          <SheetHeader>
            <SheetTitle>Your Profile</SheetTitle>
            <SheetDescription>
              Manage your account settings and set preferences.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{user?.firstName} {user?.lastName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <Button variant="outline">Account Settings</Button>
            </div>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <Button variant="outline">Help & Support</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </aside>
  )
}
