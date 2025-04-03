import { Card, CardContent } from "@/components/ui/card"
import { Star, User } from "lucide-react"

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Busy Professional",
      content:
        "CleanPress has been a game-changer for me. As someone who works 60+ hours a week, I never had time for laundry. Now, I schedule pickups through the app, and my clothes come back perfectly clean!",
      rating: 5,
    },
    {
      name: "Michael Omondi",
      role: "Parent of Three",
      content:
        "With three kids, laundry was taking over my life. CleanPress's subscription plan has saved me countless hours every week. The real-time tracking is fantastic - I always know when to expect delivery.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "University Student",
      content:
        "The app is super easy to use, and the prices are reasonable for students. I love that I can specify exactly how I want my clothes treated. My delicates have never looked better!",
      rating: 4,
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what people are saying about their CleanPress experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                      />
                    ))}
                </div>
                <p className="mb-6 text-muted-foreground">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <User/>
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

