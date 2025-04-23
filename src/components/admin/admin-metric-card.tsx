import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

interface AdminMetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  description: string
  icon: React.ReactNode
}

export default function AdminMetricCard({ title, value, change, trend, description, icon }: AdminMetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>
          </div>
          <div className="p-2 bg-primary/10 rounded-full text-primary">{icon}</div>
        </div>
        <div className="flex items-center mt-4">
          {trend === "up" ? (
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
          ) : trend === "down" ? (
            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
          ) : null}
          <span
            className={`text-sm font-medium ${
              trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : ""
            }`}
          >
            {change}
          </span>
          <span className="text-xs text-muted-foreground ml-1">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}
