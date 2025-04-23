"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, Truck, Package, Calendar, Clock, Banknote, Edit, CheckCircle } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveProfile = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsEditing(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-muted/30">      

      <div className="container py-6">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Alex Rider" />
                  <AvatarFallback className="text-2xl">AR</AvatarFallback>
                </Avatar>
                {!isEditing && (
                  <Button variant="ghost" size="sm" className="mt-2" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" /> Edit Profile
                  </Button>
                )}
              </div>

              <div className="flex-1 space-y-4 text-center md:text-left">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="Alex" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Rider" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="alex@cleanpress.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+254 712 345 678" />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h2 className="text-2xl font-bold">Alex Rider</h2>
                      <p className="text-muted-foreground">Delivery Rider</p>
                      <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                        <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          4.8 Rating
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Email</p>
                        <p className="font-medium">alex@cleanpress.com</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Phone</p>
                        <p className="font-medium">+254 712 345 678</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Joined</p>
                        <p className="font-medium">January 15, 2023</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Vehicle</p>
                        <p className="font-medium">Motorcycle • KBZ 123A</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Performance Statistics</CardTitle>
                <CardDescription>Your delivery performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <Truck className="h-5 w-5 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">Total Deliveries</p>
                    <p className="text-xl font-bold">248</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <Package className="h-5 w-5 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">Total Pickups</p>
                    <p className="text-xl font-bold">156</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">On-Time Rate</p>
                    <p className="text-xl font-bold">98%</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <Clock className="h-5 w-5 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">Avg. Delivery Time</p>
                    <p className="text-xl font-bold">18 min</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Monthly Deliveries</h3>
                    <div className="h-12 bg-muted rounded-md flex items-end">
                      {/* This would be a real chart in a production app */}
                      <div className="h-6 w-1/12 bg-primary rounded-sm mx-0.5"></div>
                      <div className="h-8 w-1/12 bg-primary rounded-sm mx-0.5"></div>
                      <div className="h-5 w-1/12 bg-primary rounded-sm mx-0.5"></div>
                      <div className="h-7 w-1/12 bg-primary rounded-sm mx-0.5"></div>
                      <div className="h-9 w-1/12 bg-primary rounded-sm mx-0.5"></div>
                      <div className="h-10 w-1/12 bg-primary rounded-sm mx-0.5"></div>
                      <div className="h-8 w-1/12 bg-primary rounded-sm mx-0.5"></div>
                      <div className="h-11 w-1/12 bg-primary rounded-sm mx-0.5"></div>
                      <div className="h-7 w-1/12 bg-primary rounded-sm mx-0.5"></div>
                      <div className="h-9 w-1/12 bg-primary rounded-sm mx-0.5"></div>
                      <div className="h-10 w-1/12 bg-primary rounded-sm mx-0.5"></div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Weekly Performance</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-sm w-24">On-time:</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "98%" }}></div>
                        </div>
                        <span className="text-sm ml-2">98%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm w-24">Satisfaction:</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "95%" }}></div>
                        </div>
                        <span className="text-sm ml-2">95%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm w-24">Efficiency:</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                        <span className="text-sm ml-2">92%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle>Earnings History</CardTitle>
                <CardDescription>Your earnings and payment history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <Banknote className="h-5 w-5 text-primary mb-2" />
                        <p className="text-xs text-muted-foreground">This Week</p>
                        <p className="text-xl font-bold">KSh 8,450</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <Calendar className="h-5 w-5 text-primary mb-2" />
                        <p className="text-xs text-muted-foreground">This Month</p>
                        <p className="text-xl font-bold">KSh 32,800</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <Clock className="h-5 w-5 text-primary mb-2" />
                        <p className="text-xs text-muted-foreground">All Time</p>
                        <p className="text-xl font-bold">KSh 156,720</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Recent Payments</h3>
                  <div className="border rounded-md">
                    <div className="flex items-center justify-between p-3 border-b">
                      <div>
                        <p className="font-medium">Weekly Payment</p>
                        <p className="text-sm text-muted-foreground">Apr 22, 2023</p>
                      </div>
                      <p className="font-medium">KSh 8,450</p>
                    </div>
                    <div className="flex items-center justify-between p-3 border-b">
                      <div>
                        <p className="font-medium">Weekly Payment</p>
                        <p className="text-sm text-muted-foreground">Apr 15, 2023</p>
                      </div>
                      <p className="font-medium">KSh 7,850</p>
                    </div>
                    <div className="flex items-center justify-between p-3 border-b">
                      <div>
                        <p className="font-medium">Weekly Payment</p>
                        <p className="text-sm text-muted-foreground">Apr 8, 2023</p>
                      </div>
                      <p className="font-medium">KSh 8,200</p>
                    </div>
                    <div className="flex items-center justify-between p-3 border-b">
                      <div>
                        <p className="font-medium">Weekly Payment</p>
                        <p className="text-sm text-muted-foreground">Apr 1, 2023</p>
                      </div>
                      <p className="font-medium">KSh 8,300</p>
                    </div>
                    <div className="flex items-center justify-between p-3">
                      <div>
                        <p className="font-medium">Weekly Payment</p>
                        <p className="text-sm text-muted-foreground">Mar 25, 2023</p>
                      </div>
                      <p className="font-medium">KSh 7,950</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Transactions
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>What customers are saying about you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <span className="font-bold text-lg">4.8</span>
                    <span className="text-muted-foreground">out of 5</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Based on 124 reviews</p>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Sarah Johnson</p>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm mb-2">
                      Alex was very professional and delivered my laundry on time. He was careful with my items and very
                      polite.
                    </p>
                    <p className="text-xs text-muted-foreground">Apr 20, 2023</p>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Michael Omondi</p>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm mb-2">
                      Great service! Alex called ahead to confirm I was home and delivered everything in perfect
                      condition.
                    </p>
                    <p className="text-xs text-muted-foreground">Apr 18, 2023</p>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Priya Sharma</p>
                      <div className="flex">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ))}
                        <Star className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-sm mb-2">
                      Delivery was a bit later than the scheduled time, but Alex was very apologetic and kept me
                      updated.
                    </p>
                    <p className="text-xs text-muted-foreground">Apr 15, 2023</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Reviews
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
