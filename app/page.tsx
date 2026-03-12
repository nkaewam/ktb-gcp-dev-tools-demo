"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon, LockIcon, UserIcon } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      router.push("/dash");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans p-4 dark:bg-black">
      <div className="absolute top-8 left-8">
        <Image
          className="dark:invert h-8 w-auto"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
      </div>

      <Card className="w-full max-w-md shadow-xl border-zinc-200 dark:border-zinc-800">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <LockIcon className="size-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-primary">Krungthai NEXT</CardTitle>
          <CardDescription className="text-zinc-500 dark:text-zinc-400">
            Enter your credentials to access your savings dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                <Input
                  id="username"
                  placeholder="admin"
                  className="pl-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="admin123"
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                >
                  {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-sm font-medium text-destructive mt-1">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full mt-2 h-11 text-base font-semibold transition-all hover:scale-[1.01] active:scale-[0.99]">
              Log In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 pt-2">
          <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800" />
          <div className="text-center space-y-1">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Hint: use <code className="bg-primary/5 text-primary px-1 rounded">admin</code> / <code className="bg-primary/5 text-primary px-1 rounded">admin123</code>
            </p>
          </div>
        </CardFooter>
      </Card>

      <div className="fixed bottom-4 text-center w-full">
        <p className="text-xs text-zinc-400 dark:text-zinc-600">
          © 2026 Krung Thai Bank PCL. All rights reserved.
        </p>
      </div>
    </div>
  );
}
