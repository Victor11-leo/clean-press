import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Clock, Shirt, Truck } from "lucide-react"

// interface OrderItem {
//   name: string
//   quantity: number
// }

// interface OrderCardProps {
//   orderNumber: string
//   date: string
//   status: string
//   items: OrderItem[]
//   statusStep: number // 1: Picked Up, 2: In Cleaning, 3: Ready for Delivery, 4: Delivered
// }

export default function OrderCard({ orderNumber, date, status, items, statusStep }) {
  function getOrderStatusValue(status) {
    switch (status.toLowerCase()) {
      case "pending":
        return 0;
      case "picked-up":
        return 1;
      case "in-cleaning":
        return 2;
      case "ready-delivery":
        return 3;
      case "delivered":
        return 4;
      default:
        return -1; // in case the status doesn't match any expected ones
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Ready for Delivery":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const steps = [
    { label: "Picked Up", icon: <Clock className="h-4 w-4" /> },
    { label: "In Cleaning", icon: <Shirt className="h-4 w-4" /> },
    { label: "Ready for Delivery", icon: <Truck className="h-4 w-4" /> },
    { label: "Delivered", icon: <Check className="h-4 w-4" /> },
  ]

  const statusStepValue = getOrderStatusValue(status)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium">{orderNumber}</h3>
              <p className="text-sm text-muted-foreground">{date}</p>
            </div>
            <Badge className={getStatusColor()}>{status}</Badge>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {items.map((item, index) => (
              <div key={index} className={`text-xs bg-muted px-2 py-1 rounded-md ${item.quantity < 1 && 'hidden'}`}>
                {item.quantity}x {item.name}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 grid grid-cols-4 gap-1">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${index < statusStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                  >
                    {step.icon}
                  </div>
                  <p className="text-xs text-center mt-1">{step.label}</p>
                </div>
              ))}
              <div className="col-span-4 mt-2">
                <div className="h-1 bg-muted rounded-full w-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(statusStepValue / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </CardContent>
    </Card>
  )
}

