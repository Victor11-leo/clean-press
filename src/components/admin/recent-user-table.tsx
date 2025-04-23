import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function RecentOrdersTable() {
  const orders = [
    {
      id: "ORD-2023-1234",
      customer: "John Doe",
      date: "Apr 22, 2023",
      amount: "KSh 2,500",
      status: "Completed",
      items: 5,
    },
    {
      id: "ORD-2023-1235",
      customer: "Sarah Johnson",
      date: "Apr 22, 2023",
      amount: "KSh 1,800",
      status: "In Progress",
      items: 3,
    },
    {
      id: "ORD-2023-1236",
      customer: "Michael Omondi",
      date: "Apr 21, 2023",
      amount: "KSh 3,200",
      status: "Ready for Delivery",
      items: 7,
    },
    {
      id: "ORD-2023-1237",
      customer: "Priya Sharma",
      date: "Apr 21, 2023",
      amount: "KSh 1,200",
      status: "Picked Up",
      items: 2,
    },
    {
      id: "ORD-2023-1238",
      customer: "David Mwangi",
      date: "Apr 20, 2023",
      amount: "KSh 4,500",
      status: "Pending",
      items: 10,
    },
  ]

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
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
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
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="py-3 px-4 text-sm font-medium">{order.id}</td>
              <td className="py-3 px-4 text-sm">{order.customer}</td>
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
    </div>
  )
}
