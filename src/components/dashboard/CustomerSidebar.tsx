
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import { CalendarIcon, DumbellIcon, LayoutDashboard, LineChart, LogOut, Settings, User, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"

const CustomerSidebar = () => {
  const { pathname } = useLocation()
  const { logout } = useAuth()
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "My Profile",
      href: "/dashboard/profile",
      icon: User
    },
    {
      name: "Workouts",
      href: "/dashboard/workouts",
      icon: DumbellIcon
    },
    {
      name: "Classes",
      href: "/dashboard/classes",
      icon: Users
    },
    {
      name: "Schedule",
      href: "/dashboard/schedule",
      icon: CalendarIcon
    },
    {
      name: "Progress",
      href: "/dashboard/progress",
      icon: LineChart
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings
    }
  ]

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex flex-col gap-2">
        <div className="flex h-[60px] items-center px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img src="/lovable-uploads/01fa474e-e83a-48f4-9ffc-2047ca448aa7.png" alt="Uptown Gym" className="h-6 w-auto" />
            <span className="font-bold">Member Portal</span>
          </Link>
        </div>
        <Separator />
        <ScrollArea className="flex-1 h-[calc(100vh-60px)]">
          <div className="flex flex-col gap-2 p-6">
            <nav className="grid gap-2 text-sm">
              {links.map((link, i) => (
                <Button
                  key={i}
                  variant={pathname === link.href ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "justify-start",
                    pathname === link.href && "font-medium bg-gray-200 dark:bg-gray-700"
                  )}
                  asChild
                >
                  <Link to={link.href}>
                    <link.icon className="mr-2 h-4 w-4" />
                    {link.name}
                  </Link>
                </Button>
              ))}
              <Separator className="my-2" />
              <Button 
                variant="ghost" 
                size="sm" 
                className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </nav>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default CustomerSidebar
