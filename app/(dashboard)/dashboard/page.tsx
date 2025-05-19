"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Trophy, BookOpen } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <p className="text-muted-foreground">Track your progress and discover personalized recommendations</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>My Progress</CardTitle>
              <CardDescription>Track your journey through various career paths</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Indie Game Developer</div>
                    <div className="text-sm text-muted-foreground">42% Complete</div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "42%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Rural Digital Freelancer</div>
                    <div className="text-sm text-muted-foreground">18% Complete</div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "18%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Neurodivergent Learning Strategist</div>
                    <div className="text-sm text-muted-foreground">5% Complete</div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "5%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest achievements and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Completed "Basics of Game Design" skill</p>
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Started "Remote Work Fundamentals" course</p>
                    <p className="text-sm text-muted-foreground">5 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Earned "Digital Communication" badge</p>
                    <p className="text-sm text-muted-foreground">1 week ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>Based on your interests and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-3 rounded-lg">
                  <h3 className="font-medium">Next Steps for Game Development</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Complete the "Game Monetization Strategies" skill to advance your Indie Game Developer path
                  </p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <h3 className="font-medium">Explore Related Paths</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on your interests, you might enjoy the "Digital Content Creator" career path
                  </p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <h3 className="font-medium">Upcoming Workshop</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    "Building Your Online Portfolio" - Virtual workshop this Friday at 2 PM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Goals</CardTitle>
              <CardDescription>Track your personal objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Checkbox id="goal1" />
                  <Label htmlFor="goal1" className="text-sm">
                    Complete Game Design Fundamentals by June
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="goal2" />
                  <Label htmlFor="goal2" className="text-sm">
                    Build portfolio website by end of month
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="goal3" checked />
                  <Label htmlFor="goal3" className="text-sm line-through opacity-70">
                    Join community Discord server
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="goal4" />
                  <Label htmlFor="goal4" className="text-sm">
                    Connect with 3 mentors in my field
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
