'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { Bell, Search } from "lucide-react"
import { redirect } from "next/navigation"

const DashboardHeader = () => {
  const {user} = useUser()
  // if (!user) redirect('/')
  return (
    <header className="hidden md:block border-b bg-background sticky top-0 z-20">
      <div className="container flex h-16 items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-md border border-input bg-background pl-8 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </Button>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.imageUrl} alt="User" />
              <AvatarFallback>{user?.firstName}</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-muted-foreground">{user?.emailAddresses[0].emailAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader