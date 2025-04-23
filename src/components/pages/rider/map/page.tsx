"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MapPin } from "lucide-react"

import DeliveryCard from "@/components/rider/delivery-card"

export default function DeliveriesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Sample delivery data
  const deliveries = [
    {
      orderId: "ORD-2023-1235",
      customerName: "Sarah Johnson",
      address: "456 Park Ave, Nairobi",
      distance: "2.5 km",
      time: "10:30 AM - 11:30 AM",
      items: 3,
      status: "In Progress" as const,
      amount: "KSh 1,800",
      paymentMethod: "M-Pesa",
    },
    {
      orderId: "ORD-2023-1236",
      customerName: "Michael Omondi",
      address: "789 River Rd, Nairobi",
      distance: "3.8 km",
      time: "11:30 AM - 12:30 PM",
      items: 7,
      status: "Scheduled" as const,
      amount: "KSh 3,200",
      paymentMethod: "M-Pesa",
    },
    {
      orderId: "ORD-2023-1238",
      customerName: "David Mwangi",
      address: "567 Valley Rd, Nairobi",
      distance: "5.2 km",
      time: "1:00 PM - 2:00 PM",
      items: 10,
      status: "Scheduled" as const,
      amount: "KSh 4,500",
      paymentMethod: "Cash on Delivery",
    },
    {
      orderId: "ORD-2023-1240",
      customerName: "James Kamau",
      address: "123 Lake View, Nairobi",
      distance: "4.1 km",
      time: "3:30 PM - 4:30 PM",
      items: 3,
      status: "Scheduled" as const,
      amount: "KSh 1,500",
      paymentMethod: "Card",
    },
    {
      orderId: "ORD-2023-1234",
      customerName: "John Doe",
      address: "123 Main St, Nairobi",
      distance: "1.2 km",
      time: "9:00 AM - 10:00 AM",
      items: 5,
      status: "Completed" as const,
      amount: "KSh 2,500",
      paymentMethod: "M-Pesa",
    },
    {
      orderId: "ORD-2023-1237",
      customerName: "Priya Sharma",
      address: "234 Hill St, Nairobi",
      distance: "1.9 km",
      time: "12:30 PM - 1:30 PM",
      items: 2,
      status: "Completed" as const,
      amount: "KSh 1,200",
      paymentMethod: "Card",
    },
  ]

  // Filter deliveries based on search term
  const filteredDeliveries = deliveries.filter(
    (delivery) =>
      delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Group deliveries by status
  const activeDeliveries = filteredDeliveries.filter(
    (delivery) => delivery.status === "In Progress" || delivery.status === "Scheduled",
  )
  const completedDeliveries = filteredDeliveries.filter((delivery) => delivery.status === "Completed")

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
                  placeholder="Search by customer, order ID, or address..."
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
            <TabsTrigger value="active">Active ({activeDeliveries.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedDeliveries.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeDeliveries.length > 0 ? (
              activeDeliveries.map((delivery) => (
                <DeliveryCard
                  key={delivery.orderId}
                  orderId={delivery.orderId}
                  customerName={delivery.customerName}
                  address={delivery.address}
                  distance={delivery.distance}
                  time={delivery.time}
                  items={delivery.items}
                  status={delivery.status}
                  amount={delivery.amount}
                  paymentMethod={delivery.paymentMethod}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No active deliveries found.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedDeliveries.length > 0 ? (
              completedDeliveries.map((delivery) => (
                <DeliveryCard
                  key={delivery.orderId}
                  orderId={delivery.orderId}
                  customerName={delivery.customerName}
                  address={delivery.address}
                  distance={delivery.distance}
                  time={delivery.time}
                  items={delivery.items}
                  status={delivery.status}
                  amount={delivery.amount}
                  paymentMethod={delivery.paymentMethod}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No completed deliveries found.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
