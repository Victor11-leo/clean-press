import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, CheckCircle, Clock, MapPin, Package, Truck, Banknote, AlertTriangle } from "lucide-react"

import DeliveryCard from "@/components/rider/delivery-card"
import PickupCard from "@/components/rider/pickup-card"
import Header from "@/components/global/Header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import RiderDeliveries from './deliveries/page'
import RiderMap from './map/page'
import RiderPickups from './pickups/page'
import RiderProfile from './profile/page'

export default function RiderDashboard() {
  return (
    <div className="min-h-screen bg-muted/30 flex-1 overflow-y-auto px-4">
      <Header/>    

      <Tabs className="py-6" defaultValue="dashboard">
         <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
            <TabsTrigger value="pickups">Pickups</TabsTrigger>                              
            <TabsTrigger value="profile">Profile</TabsTrigger>            
          </TabsList>

          <TabsContent value="dashboard">          
            <div className="container py-6">
              {/* Today's Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-2 bg-primary/10 rounded-full text-primary mb-2">
                        <Truck className="h-5 w-5" />
                      </div>
                      <p className="text-xs text-muted-foreground">Deliveries</p>
                      <p className="text-xl font-bold">8</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-2 bg-primary/10 rounded-full text-primary mb-2">
                        <Package className="h-5 w-5" />
                      </div>
                      <p className="text-xs text-muted-foreground">Pickups</p>
                      <p className="text-xl font-bold">5</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-2 bg-primary/10 rounded-full text-primary mb-2">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <p className="text-xs text-muted-foreground">Completed</p>
                      <p className="text-xl font-bold">3</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-2 bg-primary/10 rounded-full text-primary mb-2">
                        <Banknote className="h-5 w-5" />
                      </div>
                      <p className="text-xs text-muted-foreground">Earnings</p>
                      <p className="text-xl font-bold">KSh 1,250</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Current Task */}
              <Card className="mb-6 border-l-4 border-l-yellow-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <p className="font-medium">Current Task</p>
                      </div>
                      <h3 className="text-lg font-bold mb-1">Delivery to Sarah Johnson</h3>
                      <p className="text-sm text-muted-foreground mb-2">Order #ORD-2023-1235 • 3 items</p>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>456 Park Ave, Nairobi (2.5 km)</span>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">In Progress</Badge>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button className="flex-1 gap-1" size="sm">
                      <MapPin className="h-4 w-4" /> Navigate
                    </Button>
                    <Button className="flex-1 gap-1" size="sm" variant="outline">
                      <CheckCircle className="h-4 w-4" /> Mark Delivered
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Next Deliveries */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Upcoming Deliveries</h2>
                  <Button variant="ghost" size="sm" asChild>
                    <a href="/rider/deliveries">
                      View All <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <div className="space-y-4">
                  <DeliveryCard
                    orderId="ORD-2023-1236"
                    customerName="Michael Omondi"
                    address="789 River Rd, Nairobi"
                    distance="3.8 km"
                    time="11:30 AM - 12:30 PM"
                    items={7}
                    status="Scheduled"
                    amount="KSh 3,200"
                    paymentMethod="M-Pesa"
                  />

                  <DeliveryCard
                    orderId="ORD-2023-1238"
                    customerName="David Mwangi"
                    address="567 Valley Rd, Nairobi"
                    distance="5.2 km"
                    time="1:00 PM - 2:00 PM"
                    items={10}
                    status="Scheduled"
                    amount="KSh 4,500"
                    paymentMethod="Cash on Delivery"
                  />

                  <DeliveryCard
                    orderId="ORD-2023-1240"
                    customerName="James Kamau"
                    address="123 Lake View, Nairobi"
                    distance="4.1 km"
                    time="3:30 PM - 4:30 PM"
                    items={3}
                    status="Scheduled"
                    amount="KSh 1,500"
                    paymentMethod="Card"
                  />
                </div>
              </div>

              {/* Pickups */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Today's Pickups</h2>
                  <Button variant="ghost" size="sm" asChild>
                    <a href="/rider/pickups">
                      View All <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <div className="space-y-4">
                  <PickupCard
                    customerName="Lucy Wanjiku"
                    address="890 Mountain View, Nairobi"
                    distance="2.7 km"
                    time="10:00 AM - 11:00 AM"
                    status="Completed"
                    notes="Ring the bell twice, gate might be locked"
                  />

                  <PickupCard
                    customerName="Priya Sharma"
                    address="234 Hill St, Nairobi"
                    distance="1.9 km"
                    time="12:30 PM - 1:30 PM"
                    status="Scheduled"
                    notes="Call when arriving, customer has dogs"
                  />

                  <PickupCard
                    customerName="Grace Wambui"
                    address="234 Suburb St, Nairobi"
                    distance="6.3 km"
                    time="4:30 PM - 5:30 PM"
                    status="Scheduled"
                    notes="Apartment 4B, 3rd floor"
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks you might need</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="flex flex-col h-auto py-4 gap-2">
                      <MapPin className="h-5 w-5" />
                      <span>View Map</span>
                    </Button>

                    <Button variant="outline" className="flex flex-col h-auto py-4 gap-2">
                      <Calendar className="h-5 w-5" />
                      <span>My Schedule</span>
                    </Button>

                    <Button variant="outline" className="flex flex-col h-auto py-4 gap-2">
                      <Clock className="h-5 w-5" />
                      <span>Report Delay</span>
                    </Button>

                    <Button variant="outline" className="flex flex-col h-auto py-4 gap-2">
                      <Banknote className="h-5 w-5" />
                      <span>Earnings</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="deliveries"><RiderDeliveries/></TabsContent>
          <TabsContent value="pickups"><RiderPickups/></TabsContent>          
          <TabsContent value="profile"><RiderProfile/></TabsContent>
      </Tabs>
    </div>
  )
}
