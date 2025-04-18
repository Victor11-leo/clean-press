"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  Calendar,
  Clock,
  CreditCard,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  Plus,
  Settings,
  Shirt,
  ShoppingBag,
  Star,
  Truck,
  User,
} from "lucide-react"
import DashboardHeader from "@/components/global/dashboard/dashboard-header"
import OrderCard from "@/components/global/dashboard/order-card"
import BookingForm from "@/components/global/dashboard/booking-form"
import { SignOutButton, useUser } from "@clerk/nextjs"

export default function DashboardPage() {
  const {user} = useUser()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-muted/30">
      {/* Mobile Header */}
      <header className="md:hidden border-b bg-background sticky top-0 z-30">
        <div className="flex h-16 items-center px-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-2 font-bold text-xl ml-2">
            <div className="bg-primary text-primary-foreground p-1 rounded">
              <Package className="h-5 w-5" />
            </div>
            <span>Usafi Bora</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.imageUrl} alt="User" />
              <AvatarFallback>{user?.firstName}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:h-screen
        `}
      >
        <div className="flex flex-col h-full relative">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
              <div className="bg-primary text-primary-foreground p-1 rounded">
                <Package className="h-5 w-5" />
              </div>
              <span>Usafi Bora</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <div className="space-y-1">
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Home className="h-5 w-5" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/dashboard/orders">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  My Orders
                </Button>
              </Link>
              <Link href="/dashboard/book">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Calendar className="h-5 w-5" />
                  Book Pickup
                </Button>
              </Link>
              <Link href="/dashboard/subscription">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <CreditCard className="h-5 w-5" />
                  Subscription
                </Button>
              </Link>
              
            </div>
            <div className="mt-6 pt-6 border-t absolute bottom-2">
              <div className="space-y-1">                
                <SignOutButton>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
                </SignOutButton>
                
              </div>
            </div>
          </nav>
          
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4">
        <DashboardHeader />

        <div className="container py-6">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="book">Book Pickup</TabsTrigger>
              <TabsTrigger value="orders">My Orders</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">2</div>
                      <div className="p-2 bg-primary/10 rounded-full text-primary">
                        <Shirt className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">2 orders in progress</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Next Pickup</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">Today</div>
                      <div className="p-2 bg-primary/10 rounded-full text-primary">
                        <Clock className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Scheduled for 4:00 PM</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">250</div>
                      <div className="p-2 bg-primary/10 rounded-full text-primary">
                        <Star className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">50 points until free service</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Active Orders</CardTitle>
                        <Link href="/dashboard/orders">
                          <Button variant="ghost" size="sm">
                            View All
                          </Button>
                        </Link>
                      </div>
                      <CardDescription>Track your current laundry orders</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <OrderCard
                          orderNumber="ORD-2023-1234"
                          date="Today, 10:30 AM"
                          status="In Progress"
                          items={[
                            { name: "Shirts", quantity: 5 },
                            { name: "Pants", quantity: 3 },
                            { name: "Bedsheets", quantity: 2 },
                          ]}
                          statusStep={2}
                        />
                        <OrderCard
                          orderNumber="ORD-2023-1233"
                          date="Yesterday, 2:15 PM"
                          status="Ready for Delivery"
                          items={[
                            { name: "Shirts", quantity: 3 },
                            { name: "Dresses", quantity: 2 },
                          ]}
                          statusStep={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Common tasks you might want to do</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button className="w-full justify-start gap-2" variant="outline">
                        <Plus className="h-4 w-4" />
                        Book New Pickup
                      </Button>
                      <Button className="w-full justify-start gap-2" variant="outline">
                        <Truck className="h-4 w-4" />
                        Track Delivery
                      </Button>
                      <Button className="w-full justify-start gap-2" variant="outline">
                        <MessageSquare className="h-4 w-4" />
                        Contact Support
                      </Button>
                      <Button className="w-full justify-start gap-2" variant="outline">
                        <CreditCard className="h-4 w-4" />
                        Manage Subscription
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="book">
              <Card>
                <CardHeader>
                  <CardTitle>Book a Laundry Pickup</CardTitle>
                  <CardDescription>Schedule a convenient time for us to collect your laundry</CardDescription>
                </CardHeader>
                <CardContent>
                  <BookingForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>My Orders</CardTitle>
                  <CardDescription>View and track all your laundry orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <OrderCard
                      orderNumber="ORD-2023-1234"
                      date="Today, 10:30 AM"
                      status="In Progress"
                      items={[
                        { name: "Shirts", quantity: 5 },
                        { name: "Pants", quantity: 3 },
                        { name: "Bedsheets", quantity: 2 },
                      ]}
                      statusStep={2}
                    />
                    <OrderCard
                      orderNumber="ORD-2023-1233"
                      date="Yesterday, 2:15 PM"
                      status="Ready for Delivery"
                      items={[
                        { name: "Shirts", quantity: 3 },
                        { name: "Dresses", quantity: 2 },
                      ]}
                      statusStep={3}
                    />
                    <OrderCard
                      orderNumber="ORD-2023-1232"
                      date="Mar 22, 2023, 9:45 AM"
                      status="Completed"
                      items={[
                        { name: "Shirts", quantity: 4 },
                        { name: "Pants", quantity: 2 },
                        { name: "Jackets", quantity: 1 },
                      ]}
                      statusStep={4}
                    />
                    <OrderCard
                      orderNumber="ORD-2023-1231"
                      date="Mar 18, 2023, 11:20 AM"
                      status="Completed"
                      items={[
                        { name: "Shirts", quantity: 6 },
                        { name: "Pants", quantity: 4 },
                      ]}
                      statusStep={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={toggleSidebar}></div>}
    </div>
  )
}

