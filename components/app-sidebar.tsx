"use client"

import { Users } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { GitBranch, LayoutDashboard, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function AppSidebar() {
  const pathname = usePathname()
  const { state, toggleSidebar } = useSidebar()
  const isCollapsed = state === "collapsed"

  // Simulate authentication state - in a real app, this would come from your auth provider
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)

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
      setUser({ name: "User", role: "Learner" })
    } else {
      setIsAuthenticated(false)
      setUser(null)
    }
  }, [pathname])

  const routes = [
    {
      title: "Skill Trees",
      icon: GitBranch,
      href: "/skill-tree",
      variant: "default",
    },
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      variant: "default",
    },
    {
      title: "Contribute",
      icon: Users,
      href: "/contribute",
      variant: "default",
    },
    {
      title: "AI Playground",
      icon: Sparkles,
      href: "/ai-playground",
      variant: "default",
    },
  ]

  return (
    <div className="relative">
      <Sidebar collapsible="icon" className="mt-4">
        <SidebarHeader className="flex items-center p-4">
          <div className="font-semibold">NextStep</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {routes.map((route) => (
              <SidebarMenuItem key={route.href}>
                <SidebarMenuButton asChild isActive={pathname === route.href} tooltip={route.title}>
                  <Link href={route.href}>
                    <route.icon className="h-5 w-5" />
                    <span>{route.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>{/* Footer content removed as requested */}</SidebarFooter>
      </Sidebar>

      {/* Sidebar toggle button positioned on the right edge */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-8 -right-4 h-8 w-8 rounded-full border shadow-md bg-background z-50"
        onClick={() => toggleSidebar()}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </div>
  )
}
