"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, CreditCard, AlertTriangle, Clock, Package } from "lucide-react"

import PaymentMethodCard from "@/components/dashboard/payment-method-card"
import BillingHistoryTable from "@/components/dashboard/billing-history-table"

export default function SubscriptionPage() {
  const [currentPlan, setCurrentPlan] = useState("free")
  const [autoRenew, setAutoRenew] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showPauseDialog, setShowPauseDialog] = useState(false)
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState("")

  const handleUpgrade = (plan: string) => {
    setSelectedUpgradePlan(plan)
    setShowUpgradeDialog(true)
  }

  const confirmUpgrade = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setCurrentPlan(selectedUpgradePlan)
      setShowUpgradeDialog(false)
      setIsLoading(false)
    }, 1500)
  }

  const handlePause = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setShowPauseDialog(false)
      setIsLoading(false)
      // Show success message
    }, 1500)
  }

  const handleCancel = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setCurrentPlan("free")
      setShowCancelDialog(false)
      setIsLoading(false)
      // Show success message
    }, 1500)
  }

  const plans = [
    {
      id: "free",
      name: "Free Plan",
      price: "KSh 0",
      interval: "",
      description: "Basic laundry services with standard pricing",
      features: ["Pay per order", "Standard 48-hour turnaround", "Basic garment care", "No commitment required"],
      popular: false,
      current: currentPlan === "free",
    },
    {
      id: "weekly",
      name: "Weekly Plan",
      price: "KSh 1,800",
      interval: "/week",
      description: "Ideal for individuals and couples",
      features: [
        "2 pickups per week",
        "24-hour turnaround",
        "Priority scheduling",
        "Premium garment care",
        "Free stain treatment",
      ],
      popular: true,
      current: currentPlan === "weekly",
    },
    {
      id: "family",
      name: "Family Plan",
      price: "KSh 3,500",
      interval: "/week",
      description: "Perfect for families and shared houses",
      features: [
        "3 pickups per week",
        "Same-day service available",
        "Priority scheduling",
        "Premium garment care",
        "Free stain treatment",
        "Dedicated account manager",
      ],
      popular: false,
      current: currentPlan === "family",
    },
    {
      id: "business",
      name: "Business Plan",
      price: "KSh 10,000",
      interval: "/month",
      description: "Tailored for businesses with high volume needs",
      features: [
        "Unlimited pickups",
        "Same-day service guaranteed",
        "Dedicated account manager",
        "Custom branding options",
        "Bulk discounts",
        "API integration available",
      ],
      popular: false,
      current: currentPlan === "business",
    },
  ]

  const currentPlanDetails = plans.find((plan) => plan.id === currentPlan)

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Subscription Management</h1>
            <p className="text-muted-foreground">Manage your subscription plan and billing details</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {currentPlan !== "free" && (
          <Alert className="mb-6">
            <Package className="h-4 w-4" />
            <AlertTitle>Current Plan: {currentPlanDetails?.name}</AlertTitle>
            <AlertDescription>
              Your next billing date is on April 28, 2023. You can manage your subscription below.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="plans" className="space-y-6">
          <TabsList>
            <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            <TabsTrigger value="billing">Billing History</TabsTrigger>
          </TabsList>

          <TabsContent value="plans">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`${plan.current ? "border-primary" : "border"} ${plan.popular ? "shadow-lg" : "shadow"}`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{plan.name}</CardTitle>
                        <div className="mt-2 flex items-baseline">
                          <span className="text-2xl font-bold">{plan.price}</span>
                          <span className="text-sm text-muted-foreground ml-1">{plan.interval}</span>
                        </div>
                      </div>
                      {plan.popular && <Badge className="bg-primary">Popular</Badge>}
                      {plan.current && (
                        <Badge variant="outline" className="border-primary text-primary">
                          Current
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-1 shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {plan.current ? (
                      <div className="w-full space-y-2">
                        {plan.id !== "free" && (
                          <>
                            <Button variant="outline" className="w-full" onClick={() => setShowPauseDialog(true)}>
                              Pause Subscription
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full text-destructive hover:text-destructive"
                              onClick={() => setShowCancelDialog(true)}
                            >
                              Cancel Subscription
                            </Button>
                          </>
                        )}
                      </div>
                    ) : (
                      <Button
                        className="w-full"
                        variant={plan.id === "free" ? "outline" : "default"}
                        onClick={() => handleUpgrade(plan.id)}
                      >
                        {plan.id === "free" ? "Current Plan" : `Upgrade to ${plan.name}`}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>

            {currentPlan !== "free" && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Subscription Settings</CardTitle>
                  <CardDescription>Manage your subscription preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-renew">Auto-renew subscription</Label>
                      <p className="text-sm text-muted-foreground">
                        Your subscription will automatically renew at the end of each billing cycle
                      </p>
                    </div>
                    <Switch id="auto-renew" checked={autoRenew} onCheckedChange={setAutoRenew} />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="space-y-0.5">
                      <Label>Billing Cycle</Label>
                      <p className="text-sm text-muted-foreground">Your current billing cycle is weekly</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Cycle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="payment">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment methods</CardDescription>
                  </div>
                  <Button size="sm">Add Payment Method</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <PaymentMethodCard type="card" name="Visa ending in 4242" expiry="04/25" isDefault={true} />
                    <PaymentMethodCard type="mpesa" name="M-Pesa" phone="+254 712 345 678" isDefault={false} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing Address</CardTitle>
                  <CardDescription>Your billing address for invoices and receipts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">123 Main Street, Apt 4B</p>
                    <p className="text-sm text-muted-foreground">Nairobi, Kenya</p>
                    <p className="text-sm text-muted-foreground">+254 712 345 678</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    Update Address
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View your past invoices and payment history</CardDescription>
              </CardHeader>
              <CardContent>
                <BillingHistoryTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Upgrade Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade Subscription</DialogTitle>
            <DialogDescription>
              You are about to upgrade to the {plans.find((p) => p.id === selectedUpgradePlan)?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Plan Details</h4>
              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{plans.find((p) => p.id === selectedUpgradePlan)?.name}</span>
                  <span className="text-sm font-medium">
                    {plans.find((p) => p.id === selectedUpgradePlan)?.price}
                    <span className="text-xs text-muted-foreground">
                      {plans.find((p) => p.id === selectedUpgradePlan)?.interval}
                    </span>
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your subscription will start immediately and you'll be billed today.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Payment Method</h4>
              <RadioGroup defaultValue="card" className="space-y-2">
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                    <CreditCard className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Visa ending in 4242</div>
                      <div className="text-xs text-muted-foreground">Expires 04/25</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="mpesa" id="mpesa" />
                  <Label htmlFor="mpesa" className="flex items-center gap-2 cursor-pointer flex-1">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="12" fill="#43B02A" />
                      <path d="M7 7H17V17H7V7Z" fill="white" />
                    </svg>
                    <div>
                      <div className="font-medium">M-Pesa</div>
                      <div className="text-xs text-muted-foreground">+254 712 345 678</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpgradeDialog(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={confirmUpgrade} disabled={isLoading}>
              {isLoading ? "Processing..." : "Confirm Upgrade"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pause Dialog */}
      <Dialog open={showPauseDialog} onOpenChange={setShowPauseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pause Subscription</DialogTitle>
            <DialogDescription>
              You can pause your subscription for up to 30 days. Your benefits will be temporarily suspended.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4 p-4 bg-muted rounded-md">
              <Clock className="h-10 w-10 text-muted-foreground" />
              <div>
                <h4 className="font-medium">Your subscription will be paused</h4>
                <p className="text-sm text-muted-foreground">
                  You can resume your subscription at any time. You won't be charged during the pause period.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pause-reason">Reason for pausing (optional)</Label>
              <select id="pause-reason" className="w-full p-2 rounded-md border border-input bg-background">
                <option value="">Select a reason</option>
                <option value="temporary">Temporarily away</option>
                <option value="vacation">Going on vacation</option>
                <option value="cost">Cost concerns</option>
                <option value="other">Other reason</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPauseDialog(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handlePause} disabled={isLoading}>
              {isLoading ? "Processing..." : "Pause Subscription"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Cancel Subscription
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your subscription? You'll lose access to all premium features.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>You'll lose these benefits:</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {currentPlanDetails?.features.map((feature, i) => (
                    <li key={i} className="text-sm">
                      {feature}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="cancel-reason">Reason for cancellation</Label>
              <select id="cancel-reason" className="w-full p-2 rounded-md border border-input bg-background" required>
                <option value="">Select a reason</option>
                <option value="too-expensive">Too expensive</option>
                <option value="not-using">Not using the service enough</option>
                <option value="quality">Quality issues</option>
                <option value="competitor">Switching to a competitor</option>
                <option value="other">Other reason</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)} disabled={isLoading}>
              Keep Subscription
            </Button>
            <Button variant="destructive" onClick={handleCancel} disabled={isLoading}>
              {isLoading ? "Processing..." : "Confirm Cancellation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
