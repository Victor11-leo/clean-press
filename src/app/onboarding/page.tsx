"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Package, Mail, Lock, AlertCircle, Loader } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useUser } from "@clerk/nextjs"
import { completeOnboarding } from "@/lib/onboarding"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [phone, setPhone] = useState("")
  const [plan, setPlan] = useState("")
  const [error, setError] = useState("")

  const {user} = useUser()
  if (user == undefined) return null
  if (user?.publicMetadata?.onboardingComplete) redirect('/dashboard')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")    

    setIsLoading(true)
    const formData = new FormData(e.target)
    // Simulate API call
    try {
      const res = await completeOnboarding(formData)

      // For demo purposes, we'll just redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Welcome {user?.firstName}</CardTitle>
              <CardDescription>Just a few more details and you're in</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                        onChange={(e) => setPhone(e.target.value)}
                        name="phone"
                        id="phone" type="tel" placeholder="+254 700 123 456" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Choose your plan</Label>
                        <Select 
                        name="plan"
                        onValueChange={value => setPlan(value)}
                        defaultValue="pay-as-you-go">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Subscription plan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pay-as-you-go">Pay as you go - From Ksh500 </SelectItem>
                                <SelectItem value="weekly">Weekly plan - Ksh1,800/week </SelectItem>
                                <SelectItem value="family">Family plan - Ksh3,500/week </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="w-full">
                        {isLoading ? <Loader className="animate-spin"/> : "Complete"}                        
                    </Button>
                </form>            
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
