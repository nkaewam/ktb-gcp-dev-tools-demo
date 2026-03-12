"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Lock, User, Info } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (username === "admin" && password === "admin123") {
      router.push("/dash");
    } else {
      setError("Invalid username or password. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-[#00A1E0] text-white shadow-lg shadow-[#00A1E0]/20">
            <Lock className="size-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Krungthai <span className="text-[#00A1E0]">NEXT</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Experience the next level of savings
          </p>
        </div>

        <Card className="border-none shadow-xl shadow-zinc-200/50 dark:shadow-none dark:bg-zinc-900/50 dark:border dark:border-zinc-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription aria-live="polite">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-destructive/10 text-destructive border-none py-3">
                  <AlertDescription className="text-xs font-medium">{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 size-4 text-zinc-400" />
                  <Input
                    id="username"
                    placeholder="Enter username"
                    className="pl-10 h-11 bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-[#00A1E0]"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 size-4 text-zinc-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="pl-10 pr-10 h-11 bg-zinc-50/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-[#00A1E0]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div className="rounded-lg bg-zinc-100/80 dark:bg-zinc-800/50 p-3 flex gap-3 items-start border border-zinc-200/50 dark:border-zinc-700/30">
                <Info className="size-4 text-[#00A1E0] mt-0.5 shrink-0" />
                <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-200 mb-0.5">Quick Hint:</p>
                  <p>Username: <span className="font-mono bg-zinc-200 dark:bg-zinc-700 px-1 rounded">admin</span></p>
                  <p>Password: <span className="font-mono bg-zinc-200 dark:bg-zinc-700 px-1 rounded">admin123</span></p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full h-11 text-base font-semibold bg-[#00A1E0] hover:bg-[#008BBF] text-white transition-all shadow-md shadow-[#00A1E0]/20"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Log In"}
              </Button>
              <div className="text-center">
                <a href="#" className="text-sm text-[#00A1E0] hover:underline transition-all">
                  Forgot password?
                </a>
              </div>
            </CardFooter>
          </form>
        </Card>

        <p className="mt-8 text-center text-xs text-zinc-400">
          &copy; 2026 Krung Thai Bank PCL. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
