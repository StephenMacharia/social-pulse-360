import {
  BarChart3,
  Bell,
  Home,
  Settings,
  AlertTriangle,
  Zap,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebar } from "@/components/ui/sidebar"

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
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const { isOpen, onOpen, onClose } = useSidebar()

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-64 flex flex-col gap-4 p-0 pt-4">
        <div className="px-4 pb-6">
          <SheetHeader className="px-4 pb-6">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              Manage your account preferences, set privacy settings, and more.
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="flex-1">
          <ul className="grid gap-1">
            {items.map((item) => (
              <li key={item.title}>
                <SheetTrigger asChild>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/50 data-[active]:bg-secondary
                      data-[active]:text-secondary-foreground`
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </NavLink>
                </SheetTrigger>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-border px-4 py-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex h-8 w-full items-center justify-between rounded-md">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <span>shadcn</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SheetContent>
    </Sheet>
  )
}
