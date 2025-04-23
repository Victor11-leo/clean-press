"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MapPin } from "lucide-react"

import PickupCard from "@/components/rider/pickup-card"

export default function PickupsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Sample pickup data
  const pickups = [
    {
      customerName: "Lucy Wanjiku",
      address: "890 Mountain View, Nairobi",
      distance: "2.7 km",
      time: "10:00 AM - 11:00 AM",
      status: "Completed" as const,
      notes: "Ring the bell twice, gate might be locked",
    },
    {
      customerName: "Priya Sharma",
      address: "234 Hill St, Nairobi",
      distance: "1.9 km",
      time: "12:30 PM - 1:30 PM",
      status: "Scheduled" as const,
      notes: "Call when arriving, customer has dogs",
    },
    {
      customerName: "Grace Wambui",
      address: "234 Suburb St, Nairobi",
      distance: "6.3 km",
      time: "4:30 PM - 5:30 PM",
      status: "Scheduled" as const,
      notes: "Apartment 4B, 3rd floor",
    },
    {
      customerName: "Peter Njoroge",
      address: "789 City Center, Nairobi",
      distance: "3.5 km",
      time: "2:00 PM - 3:00 PM",
      status: "Scheduled" as const,
      notes: "Business address, ask for reception",
    },
    {
      customerName: "Aisha Mohammed",
      address: "456 Forest Rd, Nairobi",
      distance: "4.8 km",
      time: "9:30 AM - 10:30 AM",
      status: "Completed" as const,
      notes: "",
    },
    {
      customerName: "James Kamau",
      address: "123 Lake View, Nairobi",
      distance: "4.1 km",
      time: "11:00 AM - 12:00 PM",
      status: "Completed" as const,
      notes: "Leave packages with security if not home",
    },
  ]

  // Filter pickups based on search term
  const filteredPickups = pickups.filter(
    (pickup) =>
      pickup.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pickup.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Group pickups by status
  const activePickups = filteredPickups.filter(
    (pickup) => pickup.status === "In Progress" || pickup.status === "Scheduled",
  )
  const completedPickups = filteredPickups.filter((pickup) => pickup.status === "Completed")

  return (
    <div className="min-h-screen bg-muted/30">     

      <div className="container py-6">
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by customer or address..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active ({activePickups.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedPickups.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activePickups.length > 0 ? (
              activePickups.map((pickup, index) => (
                <PickupCard
                  key={index}
                  customerName={pickup.customerName}
                  address={pickup.address}
                  distance={pickup.distance}
                  time={pickup.time}
                  status={pickup.status}
                  notes={pickup.notes}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No active pickups found.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedPickups.length > 0 ? (
              completedPickups.map((pickup, index) => (
                <PickupCard
                  key={index}
                  customerName={pickup.customerName}
                  address={pickup.address}
                  distance={pickup.distance}
                  time={pickup.time}
                  status={pickup.status}
                  notes={pickup.notes}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No completed pickups found.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
