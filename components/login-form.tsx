"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "admin" && password === "admin123") {
      // For now, just show an alert or redirect
      router.push("/dash")
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <Card className="w-[350px] shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Login</CardTitle>
        <CardDescription>
          Please enter your credentials to access the dashboard.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Hint: admin</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Hint: admin123</p>
          </div>
          {error && <p className="text-sm text-destructive font-medium">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-[#00A1E0] hover:bg-[#0085BA]">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
