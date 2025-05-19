"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TreesIcon as Tree, Menu, LogOut } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function Navbar() {
  const isMobile = useIsMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)
  const pathname = usePathname()

  // Simulate checking auth state on component mount
  useEffect(() => {
    // Check if we're on a page that would typically require authentication
    const isAuthPage =
      pathname.includes("/dashboard") ||
      pathname.includes("/skill-tree") ||
      pathname.includes("/contribute") ||
      pathname.includes("/ai-playground")

    // For demo purposes, we'll consider the user logged in if they're on an auth page
    if (isAuthPage) {
      setIsAuthenticated(true)
      setUser({ name: "Poonam", role: "Mentor" })
    } else {
      setIsAuthenticated(false)
      setUser(null)
    }
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-1">
              <Tree className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">NextStep</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Conditional rendering based on auth state */}
          {isMobile ? (
            // Mobile menu button - Only shown on mobile
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <SheetHeader className="mb-4">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2">
                  {/* Show either login buttons or user profile based on auth state */}
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/default-avatar.png" />
                          <AvatarFallback>P</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Poonam</div>
                          <div className="text-xs text-muted-foreground">{user?.role}</div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/">
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button className="w-full justify-start" asChild>
                        <Link href="/signup">Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          ) : // Desktop auth buttons or user avatar
          isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:block text-sm font-medium">Poonam</div>
              <Avatar className="h-6 w-6">
                <AvatarImage src="/default-avatar.png" />
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
