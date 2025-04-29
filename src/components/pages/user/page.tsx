"use client"

import React, { useState, useRef } from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {handlePayment} from '@/lib/onboarding'
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


function getRandomChars(input, length = 5) {
  let result = '';
  const characters = input;
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * characters.length);
    result += characters[randIndex];
  }
  return result;
}

function formatRelativeDate(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  
  // Remove time part for both dates to get clean day differences
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dateMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffInDays = Math.round((dateMidnight - nowMidnight) / msPerDay);

  if (diffInDays === 0) return "today";
  if (diffInDays === 1) return "tomorrow";
  if (diffInDays === -1) return "yesterday";

  if (diffInDays > 1) return `in ${diffInDays} days`;
  if (diffInDays < -1) return `${Math.abs(diffInDays)} days ago`;
}


export default function DashboardPage() {
  const bookings = useQuery(api.order.fetchTasks)
  const {user} = useUser()
  
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  console.log(bookings);
  if (bookings == undefined || user == undefined) return null

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
                        {pendingOrders.map((d) => {
                          const timeStamp = formatRelativeDate(d._creationTime)
                          const randomCh = getRandomChars(d._id)
                          return (
                        <OrderCard
                          key={d._id}
                          orderNumber={`order-${randomCh}`}
                          date={timeStamp}
                          status={d.status}
                          items={[
                            { name: "Shirts", quantity: d.shirts },
                            { name: "Pants", quantity: d.pants },
                            { name: "Bedsheets", quantity: d.bedding },
                            { name: "Dresses", quantity: d.dresses },
                          ]}
                          statusStep={0}
                        />
                        )})}
                        
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
                  {pendingOrders.map((d) => {
                          const timeStamp = formatRelativeDate(d._creationTime)
                          const randomCh = getRandomChars(d._id)
                          return (
                        <OrderCard
                          key={d._id}
                          orderNumber={`order-${randomCh}`}
                          date={timeStamp}
                          status={d.status}
                          items={[
                            { name: "Shirts", quantity: d.shirts },
                            { name: "Pants", quantity: d.pants },
                            { name: "Bedsheets", quantity: d.bedding },
                            { name: "Dresses", quantity: d.dresses },
                          ]}
                          statusStep={0}
                        />
                        )})}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="subscription">
              <Card>
                <CardHeader>
                  <CardTitle>My Subscription</CardTitle>
                  <CardDescription>Currently on {user.publicMetadata.plan} plan, phone {user.publicMetadata.phone}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Button
                    onClick={() => handlePayment({
                      phone:user.publicMetadata.phone,
                      amount:1
                    })}
                    >Upgrade To weekly plan</Button>
                    <Button
                    onClick={() => handlePayment({
                      phone:user.publicMetadata.phone,
                      amount:1
                    })}
                    >Upgrade To family plan</Button>
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



