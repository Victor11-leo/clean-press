import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Trash2, Edit, Check } from "lucide-react"

interface PaymentMethodCardProps {
  type: "card" | "mpesa" | "paypal"
  name: string
  expiry?: string
  phone?: string
  isDefault: boolean
}

export default function PaymentMethodCard({ type, name, expiry, phone, isDefault }: PaymentMethodCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {type === "card" && (
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <CreditCard className="h-5 w-5" />
                </div>
              )}
              {type === "mpesa" && (
                <div className="w-10 h-10 rounded-full bg-[#43B02A] flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="24" height="24" rx="12" fill="currentColor" />
                    <path d="M7 7H17V17H7V7Z" fill="white" />
                  </svg>
                </div>
              )}
              <div>
                <div className="font-medium">{name}</div>
                {expiry && <div className="text-xs text-muted-foreground">Expires {expiry}</div>}
                {phone && <div className="text-xs text-muted-foreground">{phone}</div>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isDefault && (
                <Badge variant="outline" className="border-primary text-primary">
                  <Check className="mr-1 h-3 w-3" /> Default
                </Badge>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            {!isDefault && (
              <Button variant="ghost" size="sm">
                Set as Default
              </Button>
            )}
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4 mr-1" /> Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
