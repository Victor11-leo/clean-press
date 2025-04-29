import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, Package, CreditCard, Ellipsis } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { toast } from "sonner"

interface DeliveryCardProps {
  order_id: string
  orderId: string
  customerName: string
  address: string
  distance: string
  time: string
  items: number
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled"
  amount: string
  paymentMethod: string
}

export default function DeliveryCard({
  order_id,
  orderId,
  customerName,
  address,
  distance,
  time,
  items,
  status,
  amount,
  paymentMethod,
}: DeliveryCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Scheduled":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const updateOrder = useMutation(api.order.updateTask)
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold">{customerName}</h3>
            <p className="text-xs text-muted-foreground">{orderId}</p>
          </div>
          <Badge className={getStatusColor()}>{status}</Badge>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="flex-1">
              {address} <span className="text-xs text-muted-foreground">({distance})</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Package className="h-4 w-4 text-muted-foreground shrink-0" />
            <span>{items} items</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="h-4 w-4 text-muted-foreground shrink-0" />
            <span>
              {amount} • {paymentMethod}
            </span>
          </div>
        </div>

        <div className="flex gap-2">          
          <Button className="flex-1 gap-1" size="sm" variant="outline">

            <DropdownMenu>
            <DropdownMenuTrigger><Ellipsis/></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Change Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
              onClick={() => {
                updateOrder({
                  id:order_id,
                  status:"picked-up"
                })
                toast.success("Picked Up")
              }}>
                Picked Up</DropdownMenuItem>
              <DropdownMenuItem
              onClick={() => {
                updateOrder({
                  id:order_id,
                  status:"in-cleaning"
                })
                toast.success("In Cleaning")
              }}
              >In Cleaning</DropdownMenuItem>
              <DropdownMenuItem
              onClick={() => {
                updateOrder({
                  id:order_id,
                  status:"ready-delivery"
                })
                toast.success("Ready Deliver")
              }}
              >Ready 4 Delivery</DropdownMenuItem>
              <DropdownMenuItem
              onClick={() => {
                updateOrder({
                  id:order_id,
                  status:"delivered"
                })
                toast.success("Delivered")
              }}
              >Delivered</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
