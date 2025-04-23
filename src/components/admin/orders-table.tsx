import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, MoreHorizontal, Printer } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface OrdersTableProps {
  searchTerm: string
  statusFilter: string
  dateFilter: string
}

export default function OrdersTable({ searchTerm, statusFilter, dateFilter }: OrdersTableProps) {
  const orders = [
    {
      id: "ORD-2023-1234",
      customer: "John Doe",
      date: "Apr 22, 2023",
      amount: "KSh 2,500",
      status: "Completed",
      items: 5,
      address: "123 Main St, Nairobi",
      phone: "+254 712 345 678",
    },
    {
      id: "ORD-2023-1235",
      customer: "Sarah Johnson",
      date: "Apr 22, 2023",
      amount: "KSh 1,800",
      status: "In Progress",
      items: 3,
      address: "456 Park Ave, Nairobi",
      phone: "+254 723 456 789",
    },
    {
      id: "ORD-2023-1236",
      customer: "Michael Omondi",
      date: "Apr 21, 2023",
      amount: "KSh 3,200",
      status: "Ready for Delivery",
      items: 7,
      address: "789 River Rd, Nairobi",
      phone: "+254 734 567 890",
    },
    {
      id: "ORD-2023-1237",
      customer: "Priya Sharma",
      date: "Apr 21, 2023",
      amount: "KSh 1,200",
      status: "Picked Up",
      items: 2,
      address: "234 Hill St, Nairobi",
      phone: "+254 745 678 901",
    },
    {
      id: "ORD-2023-1238",
      customer: "David Mwangi",
      date: "Apr 20, 2023",
      amount: "KSh 4,500",
      status: "Pending",
      items: 10,
      address: "567 Valley Rd, Nairobi",
      phone: "+254 756 789 012",
    },
    {
      id: "ORD-2023-1239",
      customer: "Lucy Wanjiku",
      date: "Apr 20, 2023",
      amount: "KSh 2,800",
      status: "Cancelled",
      items: 6,
      address: "890 Mountain View, Nairobi",
      phone: "+254 767 890 123",
    },
    {
      id: "ORD-2023-1240",
      customer: "James Kamau",
      date: "Apr 19, 2023",
      amount: "KSh 1,500",
      status: "Completed",
      items: 3,
      address: "123 Lake View, Nairobi",
      phone: "+254 778 901 234",
    },
    {
      id: "ORD-2023-1241",
      customer: "Aisha Mohammed",
      date: "Apr 19, 2023",
      amount: "KSh 3,600",
      status: "Completed",
      items: 8,
      address: "456 Forest Rd, Nairobi",
      phone: "+254 789 012 345",
    },
    {
      id: "ORD-2023-1242",
      customer: "Peter Njoroge",
      date: "Apr 18, 2023",
      amount: "KSh 2,200",
      status: "Completed",
      items: 4,
      address: "789 City Center, Nairobi",
      phone: "+254 790 123 456",
    },
    {
      id: "ORD-2023-1243",
      customer: "Grace Wambui",
      date: "Apr 18, 2023",
      amount: "KSh 1,900",
      status: "Completed",
      items: 4,
      address: "234 Suburb St, Nairobi",
      phone: "+254 701 234 567",
    },
  ]

  // Apply filters
  const filteredOrders = orders.filter((order) => {
    // Search filter
    if (
      searchTerm &&
      !order.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Status filter
    if (statusFilter !== "all") {
      const normalizedStatus = order.status.toLowerCase().replace(/\s+/g, "-")
      if (normalizedStatus !== statusFilter) {
        return false
      }
    }

    // Date filter (simplified for demo)
    if (dateFilter === "today" && !order.date.includes("Apr 22")) {
      return false
    } else if (dateFilter === "yesterday" && !order.date.includes("Apr 21")) {
      return false
    } else if (dateFilter === "week" && !order.date.includes("Apr")) {
      return false
    }

    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Ready for Delivery":
        return "bg-yellow-100 text-yellow-800"
      case "Picked Up":
        return "bg-purple-100 text-purple-800"
      case "Pending":
        return "bg-gray-100 text-gray-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-sm">
              <Checkbox />
            </th>
            <th className="text-left py-3 px-4 font-medium text-sm">Order ID</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Customer</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Amount</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Items</th>
            <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="py-3 px-4 text-sm">
                <Checkbox />
              </td>
              <td className="py-3 px-4 text-sm font-medium">{order.id}</td>
              <td className="py-3 px-4 text-sm">
                <div>
                  <p>{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.phone}</p>
                </div>
              </td>
              <td className="py-3 px-4 text-sm">{order.date}</td>
              <td className="py-3 px-4 text-sm font-medium">{order.amount}</td>
              <td className="py-3 px-4 text-sm">
                <Badge variant="outline" className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </td>
              <td className="py-3 px-4 text-sm">{order.items}</td>
              <td className="py-3 px-4 text-sm text-right">
                <div className="flex justify-end">
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <a href={`/admin/orders/${order.id}`}>
                      <Eye className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Printer className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit Order</DropdownMenuItem>
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                      <DropdownMenuItem>Assign Delivery</DropdownMenuItem>
                      <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredOrders.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No orders found matching your filters.</p>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredOrders.length}</span> of{" "}
          <span className="font-medium">{orders.length}</span> orders
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
