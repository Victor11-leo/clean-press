import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingSection() {
  const plans = [
    {
      name: "Pay As You Go",
      price: "From KSh 500",
      description: "Perfect for occasional laundry needs",
      features: ["No commitment", "Standard 48-hour turnaround", "Pay per order", "Basic garment care"],
      popular: false,
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
    },
    {
      name: "Weekly Plan",
      price: "KSh 1,800/week",
      description: "Ideal for individuals and couples",
      features: [
        "2 pickups per week",
        "24-hour turnaround",
        "Priority scheduling",
        "Premium garment care",
        "Free stain treatment",
      ],
      popular: true,
      buttonText: "Choose Plan",
      buttonVariant: "default" as const,
    },
    {
      name: "Family Plan",
      price: "KSh 3,500/week",
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
      buttonText: "Choose Plan",
      buttonVariant: "outline" as const,
    },
  ]

  return (
    <section id="pricing" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for your laundry needs. All plans include free pickup and delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg" : "border shadow"}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/signup" className="w-full">
                  <Button variant={plan.buttonVariant} className="w-full">
                    {plan.buttonText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Need a custom plan for your business? We offer special rates for businesses.
          </p>
          <Link href="/contact">
            <Button variant="link">Contact us for business pricing</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

