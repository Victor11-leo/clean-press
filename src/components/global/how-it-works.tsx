import { Check, Shirt, Truck, Package } from "lucide-react"

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How CleanPress Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our simple 4-step process makes laundry day a breeze. Here's how we transform your laundry experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Package className="h-10 w-10" />,
              title: "Book a Pickup",
              description: "Schedule a convenient time for us to collect your laundry through our app.",
              step: 1,
            },
            {
              icon: <Truck className="h-10 w-10" />,
              title: "We Collect",
              description: "Our friendly driver will arrive at your doorstep to collect your laundry.",
              step: 2,
            },
            {
              icon: <Shirt className="h-10 w-10" />,
              title: "We Clean",
              description: "Your clothes are cleaned according to your preferences and specifications.",
              step: 3,
            },
            {
              icon: <Check className="h-10 w-10" />,
              title: "We Deliver",
              description: "Your fresh, clean laundry is delivered back to your doorstep.",
              step: 4,
            },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  {item.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>

              {index < 3 && (
                <div className="hidden lg:block w-24 h-1 border-t-2 border-dashed border-primary/50 absolute top-24 left-[calc(50%+5rem)] z-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

