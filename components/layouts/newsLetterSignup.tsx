'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/forms/components/input"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Subscribing email:", email)
    setEmail("")
  }

  return (
    <div className="w-full   ">
      <h2 className="text-2xl font-bold mb-4 text-[#1a1a1a]">
        Sign up to our newsletter
      </h2>
      <form onSubmit={handleSubmit} className="flex">
        <Input
          type="email"
          placeholder="name@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-r-none border-r-0 bg-[#f8f8fc] focus-visible:ring-0 focus-visible:ring-offset-0"
          required
        />
        <Button 
          type="submit"
          variant={"secondary"}
          size={"md"}
          noBorder
          className="rounded-l-none "
        >
          Subscribe
        </Button>
      </form>
    </div>
  )
}

