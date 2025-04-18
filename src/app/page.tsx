import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Truck, Clock, CreditCard, Star, MessageCircle, Package, Calendar } from "lucide-react"
import HeroSection from "@/components/global/hero-section"
import FeatureCard from "@/components/global/feature-card"
import HowItWorks from "@/components/global/how-it-works"
import TestimonialSection from "@/components/global/testimonial-section"
import PricingSection from "@/components/global/pricing-section"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const Home = async () =>  {
  const { userId} = await auth()
  // if (userId) redirect('/dashboard')
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 z-50 bg-background px-8">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="bg-primary text-primary-foreground p-1 rounded">
              <Package className="h-6 w-6" />
            </div>
            <span>Usafi Bora</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
          </nav>
          
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4">
        <HeroSection />

        <section id="features" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Features That Make Laundry Day Easy</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our app is designed to make your laundry experience seamless and hassle-free.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Calendar className="h-8 w-8" />}
                title="Easy Booking"
                description="Schedule pickups with just a few taps. Choose your preferred date and time slot."
              />
              <FeatureCard
                icon={<Truck className="h-8 w-8" />}
                title="Real-time Tracking"
                description="Track your laundry from pickup to delivery with real-time status updates."
              />
              <FeatureCard
                icon={<CreditCard className="h-8 w-8" />}
                title="Secure Payments"
                description="Multiple payment options including M-Pesa, cards, and cash on delivery."
              />
              <FeatureCard
                icon={<Clock className="h-8 w-8" />}
                title="Subscription Plans"
                description="Save time and money with our weekly and monthly subscription plans."
              />
              <FeatureCard
                icon={<MessageCircle className="h-8 w-8" />}
                title="Customer Support"
                description="Get help instantly with our in-app chat and WhatsApp support."
              />
              <FeatureCard
                icon={<Star className="h-8 w-8" />}
                title="Reviews & Ratings"
                description="Share your experience and help us improve our service."
              />
            </div>
          </div>
        </section>

        <HowItWorks />

        <TestimonialSection />

        <PricingSection />

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Make Laundry Day Stress-Free?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Join thousands of satisfied customers who have transformed their laundry experience.
            </p>
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started Today <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <div className="bg-primary text-primary-foreground p-1 rounded">
                  <Package className="h-6 w-6" />
                </div>
                <span>Smart Laundry</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Making laundry day a breeze with our convenient pickup and delivery service.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="text-muted-foreground hover:text-foreground">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">support@cleanpress.com</li>
                <li className="text-muted-foreground">+254 700 123 456</li>
                <li className="text-muted-foreground">Nairobi, Kenya</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Smart Laundry. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home