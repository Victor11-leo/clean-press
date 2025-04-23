'use client'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { fetchAllUsers } from "@/lib/users"
import { useEffect } from "react"
import axios from "axios"

interface UsersTableProps {
  searchTerm: string
  statusFilter: string
  planFilter: string
}

export default function UsersTable({ searchTerm, statusFilter, planFilter }: UsersTableProps) {
  const [usersFound,setUsersFound] = useState([])
  const users = [
    {
      id: "USR-2023-001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+254 712 345 678",
      joinDate: "Apr 15, 2023",
      status: "Active",
      plan: "Weekly Plan",
      orders: 12,
      address: "123 Main St, Nairobi",
    },
    {
      id: "USR-2023-002",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+254 723 456 789",
      joinDate: "Apr 14, 2023",
      status: "Active",
      plan: "Family Plan",
      orders: 8,
      address: "456 Park Ave, Nairobi",
    },
    {
      id: "USR-2023-003",
      name: "Michael Omondi",
      email: "michael@example.com",
      phone: "+254 734 567 890",
      joinDate: "Apr 10, 2023",
      status: "Active",
      plan: "Weekly Plan",
      orders: 5,
      address: "789 River Rd, Nairobi",
    },
    {
      id: "USR-2023-004",
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+254 745 678 901",
      joinDate: "Apr 5, 2023",
      status: "Inactive",
      plan: "Free Plan",
      orders: 2,
      address: "234 Hill St, Nairobi",
    },
    {
      id: "USR-2023-005",
      name: "David Mwangi",
      email: "david@example.com",
      phone: "+254 756 789 012",
      joinDate: "Mar 28, 2023",
      status: "Suspended",
      plan: "Free Plan",
      orders: 0,
      address: "567 Valley Rd, Nairobi",
    },
    {
      id: "USR-2023-006",
      name: "Lucy Wanjiku",
      email: "lucy@example.com",
      phone: "+254 767 890 123",
      joinDate: "Mar 25, 2023",
      status: "Active",
      plan: "Weekly Plan",
      orders: 7,
      address: "890 Mountain View, Nairobi",
    },
    {
      id: "USR-2023-007",
      name: "James Kamau",
      email: "james@example.com",
      phone: "+254 778 901 234",
      joinDate: "Mar 20, 2023",
      status: "Active",
      plan: "Family Plan",
      orders: 9,
      address: "123 Lake View, Nairobi",
    },
    {
      id: "USR-2023-008",
      name: "Aisha Mohammed",
      email: "aisha@example.com",
      phone: "+254 789 012 345",
      joinDate: "Mar 15, 2023",
      status: "Active",
      plan: "Business Plan",
      orders: 15,
      address: "456 Forest Rd, Nairobi",
    },
    {
      id: "USR-2023-009",
      name: "Peter Njoroge",
      email: "peter@example.com",
      phone: "+254 790 123 456",
      joinDate: "Mar 10, 2023",
      status: "Inactive",
      plan: "Free Plan",
      orders: 1,
      address: "789 City Center, Nairobi",
    },
    {
      id: "USR-2023-010",
      name: "Grace Wambui",
      email: "grace@example.com",
      phone: "+254 701 234 567",
      joinDate: "Mar 5, 2023",
      status: "Active",
      plan: "Weekly Plan",
      orders: 6,
      address: "234 Suburb St, Nairobi",
    },
  ]
  useEffect(() => {
    const dataFind = async () => {
      const res = await axios.get('/api/user')
      console.log(res?.data?.user.data);
      setUsersFound(res?.data?.user.data)
    }
    dataFind()
  },[])
  // Apply filters
  const filteredUsers = users.filter((user) => {
    // Search filter
    if (
      searchTerm &&
      !user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !user.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !user.phone.includes(searchTerm)
    ) {
      return false
    }

    // Status filter
    if (statusFilter !== "all" && user.status.toLowerCase() !== statusFilter) {
      return false
    }

    // Plan filter
    if (planFilter !== "all") {
      const normalizedPlan = user.plan.toLowerCase().replace(/\s+/g, "-").replace("plan", "").trim()
      if (normalizedPlan !== planFilter) {
        return false
      }
    }

    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      case "Suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Free Plan":
        return "bg-gray-100 text-gray-800"
      case "Weekly Plan":
        return "bg-blue-100 text-blue-800"
      case "Family Plan":
        return "bg-purple-100 text-purple-800"
      case "Business Plan":
        return "bg-indigo-100 text-indigo-800"
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
            <th className="text-left py-3 px-4 font-medium text-sm">User</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Contact</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Join Date</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Plan</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Orders</th>
            <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-3 px-4 text-sm">
                <Checkbox />
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`/placeholder.svg?height=32&width=32&text=${user.name.charAt(0)}`}
                      alt={user.name}
                    />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.id}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div>
                  <p>{user.email}</p>
                  <p className="text-xs text-muted-foreground">{user.phone}</p>
                </div>
              </td>
              <td className="py-3 px-4 text-sm">{user.joinDate}</td>
              <td className="py-3 px-4 text-sm">
                <Badge variant="outline" className={getStatusColor(user.status)}>
                  {user.status}
                </Badge>
              </td>
              <td className="py-3 px-4 text-sm">
                <Badge variant="outline" className={getPlanColor(user.plan)}>
                  {user.plan}
                </Badge>
              </td>
              <td className="py-3 px-4 text-sm">{user.orders}</td>
              <td className="py-3 px-4 text-sm text-right">
                <div className="flex justify-end">
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <a href={`/admin/users/${user.id}`}>
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
                      <DropdownMenuItem>Edit User</DropdownMenuItem>
                      <DropdownMenuItem>View Orders</DropdownMenuItem>
                      <DropdownMenuItem>Change Plan</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.status === "Active" ? (
                        <DropdownMenuItem className="text-amber-600">Suspend User</DropdownMenuItem>
                      ) : user.status === "Suspended" ? (
                        <DropdownMenuItem className="text-green-600">Reactivate User</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-green-600">Activate User</DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No users found matching your filters.</p>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredUsers.length}</span> of{" "}
          <span className="font-medium">{users.length}</span> users
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
