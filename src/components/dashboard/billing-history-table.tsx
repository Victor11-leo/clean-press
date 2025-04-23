import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye } from "lucide-react"

export default function BillingHistoryTable() {
  const invoices = [
    {
      id: "INV-2023-001",
      date: "Apr 15, 2023",
      amount: "KSh 1,800",
      status: "Paid",
      plan: "Weekly Plan",
      paymentMethod: "Visa ending in 4242",
    },
    {
      id: "INV-2023-002",
      date: "Apr 8, 2023",
      amount: "KSh 1,800",
      status: "Paid",
      plan: "Weekly Plan",
      paymentMethod: "Visa ending in 4242",
    },
    {
      id: "INV-2023-003",
      date: "Apr 1, 2023",
      amount: "KSh 1,800",
      status: "Paid",
      plan: "Weekly Plan",
      paymentMethod: "M-Pesa",
    },
    {
      id: "INV-2023-004",
      date: "Mar 25, 2023",
      amount: "KSh 1,800",
      status: "Paid",
      plan: "Weekly Plan",
      paymentMethod: "M-Pesa",
    },
    {
      id: "INV-2023-005",
      date: "Mar 18, 2023",
      amount: "KSh 1,800",
      status: "Paid",
      plan: "Weekly Plan",
      paymentMethod: "Visa ending in 4242",
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-sm">Invoice</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Amount</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Plan</th>
            <th className="text-left py-3 px-4 font-medium text-sm">Payment Method</th>
            <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b">
              <td className="py-3 px-4 text-sm">{invoice.id}</td>
              <td className="py-3 px-4 text-sm">{invoice.date}</td>
              <td className="py-3 px-4 text-sm font-medium">{invoice.amount}</td>
              <td className="py-3 px-4 text-sm">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {invoice.status}
                </Badge>
              </td>
              <td className="py-3 px-4 text-sm">{invoice.plan}</td>
              <td className="py-3 px-4 text-sm">{invoice.paymentMethod}</td>
              <td className="py-3 px-4 text-sm text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
a