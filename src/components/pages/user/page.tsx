"use client"

import React, { useState, useRef } from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {Clock,     
  Shirt,  
  Star,  
} from "lucide-react"
import OrderCard from "@/components/global/dashboard/order-card"
import BookingForm from "@/components/global/dashboard/booking-form"
import { SignOutButton, useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import Header from "@/components/global/Header"



export default function DashboardPage() {
  const bookings = useQuery(api.order.fetchTasks)
  
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  console.log(bookings);
  if (bookings == undefined) return null

  const pendingOrders = bookings?.filter(order => order.status !== "delivered");

  const now = new Date();

  function formatPickupDate(dateString:string) {
    const date = new Date(dateString);
    const today = new Date();
  
    // Check if it's today
    const isToday = date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear();
  
    if (isToday) return "Today";
  
    // Otherwise return something like "Apr 22"
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  }

  const closestOrder = pendingOrders.reduce((closest, current) => {
    const currentDiff = Math.abs(new Date(current.pickupDate) - now);
    const closestDiff = Math.abs(new Date(closest.pickupDate) - now);
    return currentDiff < closestDiff ? current : closest;
  }, pendingOrders[0]);

  const closestOrderDate = formatPickupDate(closestOrder.pickupDate)

  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-muted/30">
    
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4">
        <Header/>
                
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
                      <div className="text-2xl font-bold">{pendingOrders?.length}</div>
                      <div className="p-2 bg-primary/10 rounded-full text-primary">
                        <Shirt className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{pendingOrders?.length} orders in progress</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Next Pickup</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{closestOrderDate}</div>
                      <div className="p-2 bg-primary/10 rounded-full text-primary">
                        <Clock className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Scheduled for {closestOrder.pickupTime}</p>
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
                        {pendingOrders.map((d) => (
                        <OrderCard
                          key={d._id}
                          orderNumber={"ORD-2023-1234"}
                          date="Today, 10:30 AM"
                          status={d.status}
                          items={[
                            { name: "Shirts", quantity: d.shirts },
                            { name: "Pants", quantity: d.pants },
                            { name: "Bedsheets", quantity: d.bedding },
                            { name: "Dresses", quantity: d.dresses },
                          ]}
                          statusStep={0}
                        />
                        ))}
                        
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div>                  
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



