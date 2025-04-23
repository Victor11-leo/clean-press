import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, AlertCircle, CheckCircle } from "lucide-react"

interface PickupCardProps {
  customerName: string
  address: string
  distance: string
  time: string
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled"
  notes?: string
}

export default function PickupCard({ customerName, address, distance, time, status, notes }: PickupCardProps) {
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

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold">{customerName}</h3>
            <p className="text-xs text-muted-foreground">Pickup</p>
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
          {notes && (
            <div className="flex items-start gap-2 text-sm">
              <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <span>{notes}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {status === "Completed" ? (
            <Button className="flex-1 gap-1" size="sm" variant="outline" disabled>
              <CheckCircle className="h-4 w-4" /> Completed
            </Button>
          ) : (
            <>
              <Button className="flex-1 gap-1" size="sm">
                <MapPin className="h-4 w-4" /> Navigate
              </Button>
              <Button className="flex-1 gap-1" size="sm" variant="outline">
                <Phone className="h-4 w-4" /> Call
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
