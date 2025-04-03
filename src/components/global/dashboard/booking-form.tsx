"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Check } from "lucide-react"

export default function BookingForm() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Booking successful! We'll see you soon.")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="address">Pickup Address</Label>
          <Select defaultValue="home">
            <SelectTrigger>
              <SelectValue placeholder="Select address" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home">Home - 123 Main St, Apt 4B</SelectItem>
              <SelectItem value="work">Work - 456 Business Ave, Suite 200</SelectItem>
              <SelectItem value="new">Add New Address</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Pickup Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Pickup Time</Label>
            <Select defaultValue="afternoon">
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                <SelectItem value="evening">Evening (4PM - 8PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Service Type</Label>
          <RadioGroup defaultValue="standard" className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard" className="cursor-pointer flex-1">
                <div className="font-medium">Standard</div>
                <div className="text-sm text-muted-foreground">48-hour turnaround</div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="express" id="express" />
              <Label htmlFor="express" className="cursor-pointer flex-1">
                <div className="font-medium">Express</div>
                <div className="text-sm text-muted-foreground">24-hour turnaround</div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value="same-day" id="same-day" />
              <Label htmlFor="same-day" className="cursor-pointer flex-1">
                <div className="font-medium">Same Day</div>
                <div className="text-sm text-muted-foreground">Same day delivery</div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Laundry Preferences</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="fabric-softener" />
              <Label htmlFor="fabric-softener" className="font-normal">
                Use fabric softener
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="eco-friendly" />
              <Label htmlFor="eco-friendly" className="font-normal">
                Eco-friendly detergent
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="extra-starch" />
              <Label htmlFor="extra-starch" className="font-normal">
                Extra starch for shirts
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="hang-dry" />
              <Label htmlFor="hang-dry" className="font-normal">
                Hang dry delicates
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="special-instructions">Special Instructions</Label>
          <Textarea
            id="special-instructions"
            placeholder="Any special instructions for handling your laundry..."
            className="resize-none"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Estimated Items</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="shirts" className="text-sm">
                Shirts
              </Label>
              <Input id="shirts" type="number" min="0" defaultValue="0" />
            </div>
            <div>
              <Label htmlFor="pants" className="text-sm">
                Pants
              </Label>
              <Input id="pants" type="number" min="0" defaultValue="0" />
            </div>
            <div>
              <Label htmlFor="dresses" className="text-sm">
                Dresses
              </Label>
              <Input id="dresses" type="number" min="0" defaultValue="0" />
            </div>
            <div>
              <Label htmlFor="bedding" className="text-sm">
                Bedding
              </Label>
              <Input id="bedding" type="number" min="0" defaultValue="0" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            This is just an estimate to help us prepare. Final count will be done at pickup.
          </p>
        </div>
      </div>

      <div className="pt-4 border-t">
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox id="terms" required />
          <Label htmlFor="terms" className="text-sm font-normal">
            I agree to the{" "}
            <a href="/terms" className="text-primary hover:underline">
              terms and conditions
            </a>
          </Label>
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" /> Schedule Pickup
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

