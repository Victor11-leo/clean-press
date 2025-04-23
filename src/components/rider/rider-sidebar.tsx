"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, LogOut, Menu, Package, Settings, Truck, Calendar, Clock, MapPin, User } from "lucide-react"

export default function RiderSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const navItems = [
    { name: "Dashboard", href: "/rider", icon: Home },
    { name: "Deliveries", href: "/rider/deliveries", icon: Truck },
    { name: "Pickups", href: "/rider/pickups", icon: Package },
    { name: "Schedule", href: "/rider/schedule", icon: Calendar },
    { name: "History", href: "/rider/history", icon: Clock },
    { name: "Map", href: "/rider/map", icon: MapPin },
    { name: "Profile", href: "/rider/profile", icon: User },
    { name: "Settings", href: "/rider/settings", icon: Settings },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed bottom-4 right-4 md:hidden z-50">
        <Button variant="default" size="icon" className="h-12 w-12 rounded-full shadow-lg" onClick={toggleSidebar}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:h-screen
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/rider" className="flex items-center gap-2 font-bold text-xl">
              <div className="bg-primary text-primary-foreground p-1 rounded">
                <Package className="h-5 w-5" />
              </div>
              <span>CleanPress Rider</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button variant={isActive(item.href) ? "default" : "ghost"} className="w-full justify-start gap-2">
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </nav>
          <div className="p-4 border-t">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center gap-4 mb-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Rider" />
                  <AvatarFallback>RD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Alex Rider</p>
                  <p className="text-sm text-muted-foreground">Online</p>
                </div>
              </div>
              <Link href="/logout">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={toggleSidebar}></div>}
    </>
  )
}
