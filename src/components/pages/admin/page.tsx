import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart3, DollarSign, Download, ShoppingBag, Truck, Users } from "lucide-react"
import RecentOrdersTable from "@/components/admin/recent-orders-table"
import RecentUsersTable from "@/components/admin/recent-user-table"
import AdminMetricCard from "@/components/admin/admin-metric-card"
import AdminChart from "@/components/admin/admin-chart"
import Header from "@/components/global/Header"

import AdminOrders from './orders/page'
import AdminUsers from './users/page'


export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-muted/30 flex-1 overflow-y-auto px-4">  
      <Header/>    

      <Tabs className="py-6" defaultValue="dashboard">
         <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>            
          </TabsList>
            
      <TabsContent value="dashboard">
        <div className="container py-6">
          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <AdminMetricCard
              title="Total Orders"
              value="1,284"
              change="+12.5%"
              trend="up"
              description="vs. previous month"
              icon={<ShoppingBag className="h-5 w-5" />}
            />
            <AdminMetricCard
              title="Total Revenue"
              value="KSh 458,200"
              change="+8.2%"
              trend="up"
              description="vs. previous month"
              icon={<DollarSign className="h-5 w-5" />}
            />
            <AdminMetricCard
              title="Active Users"
              value="842"
              change="+24.5%"
              trend="up"
              description="vs. previous month"
              icon={<Users className="h-5 w-5" />}
            />
            <AdminMetricCard
              title="Pending Deliveries"
              value="38"
              change="-5.1%"
              trend="down"
              description="vs. previous month"
              icon={<Truck className="h-5 w-5" />}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Daily revenue for the current month</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" /> Export
                </Button>
              </CardHeader>
              <CardContent>
                <AdminChart
                  type="bar"
                  labels={["Week 1", "Week 2", "Week 3", "Week 4"]}
                  datasets={[
                    {
                      label: "Revenue",
                      data: [120500, 145200, 98700, 93800],
                      backgroundColor: "rgba(99, 102, 241, 0.8)",
                    },
                  ]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Order Statistics</CardTitle>
                  <CardDescription>Orders by status</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" /> Export
                </Button>
              </CardHeader>
              <CardContent>
                <AdminChart
                  type="doughnut"
                  labels={["Completed", "In Progress", "Pending", "Cancelled"]}
                  datasets={[
                    {
                      data: [63, 25, 10, 2],
                      backgroundColor: [
                        "rgba(34, 197, 94, 0.8)",
                        "rgba(59, 130, 246, 0.8)",
                        "rgba(234, 179, 8, 0.8)",
                        "rgba(239, 68, 68, 0.8)",
                      ],
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Tabs defaultValue="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                <TabsTrigger value="users">Recent Users</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href="/admin/orders">View All Orders</a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="/admin/users">View All Users</a>
                </Button>
              </div>
            </div>

            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest orders across all customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentOrdersTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Recent Users</CardTitle>
                  <CardDescription>Latest user registrations and activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentUsersTable />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="justify-start gap-2" asChild>
                    <a href="/admin/orders/new">
                      <ShoppingBag className="h-4 w-4" /> Create New Order
                    </a>
                  </Button>
                  <Button className="justify-start gap-2" asChild>
                    <a href="/admin/users/new">
                      <Users className="h-4 w-4" /> Add New User
                    </a>
                  </Button>
                  <Button className="justify-start gap-2" asChild>
                    <a href="/admin/analytics">
                      <BarChart3 className="h-4 w-4" /> View Analytics
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="orders">
        <AdminOrders/>
      </TabsContent>
      <TabsContent value="users"><AdminUsers/></TabsContent>
      </Tabs>
    </div>
  )
}
