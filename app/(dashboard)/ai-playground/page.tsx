"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Bot, Send, ThumbsDown, ThumbsUp, User, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AIPlaygroundPage() {
  const { toast } = useToast()
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content:
        "Welcome to the AI Career Path Generator! I can help you explore unconventional career paths or suggest steps for a career you're interested in. What would you like to explore today?",
    },
  ])

  // Sample AI-generated career paths for mentor review
  const aiGeneratedPaths = [
    {
      id: "digital-accessibility",
      title: "Digital Accessibility Specialist",
      description: "Help make digital products accessible to people with disabilities",
      status: "pending",
      createdAt: "2 hours ago",
      expertise: ["web development", "UX design", "accessibility"],
    },
    {
      id: "climate-tech",
      title: "Climate Tech Educator",
      description: "Teach sustainable technologies to rural communities",
      status: "approved",
      createdAt: "1 day ago",
      expertise: ["education", "sustainability", "community development"],
    },
    {
      id: "cross-cultural",
      title: "Cross-Cultural UX Researcher",
      description: "Research how different cultures interact with digital products",
      status: "pending",
      createdAt: "3 hours ago",
      expertise: ["UX research", "cultural studies", "psychology"],
    },
    {
      id: "mental-health",
      title: "Digital Mental Health Navigator",
      description: "Guide people to appropriate mental health resources online",
      status: "rejected",
      createdAt: "5 days ago",
      expertise: ["mental health", "healthcare", "social work"],
    },
  ]

  // Define responses with their associated keywords
  const keywordResponses = [
    {
      keywords: ["accessibility", "disability", "inclusive", "disabilities", "wcag", "assistive"],
      response:
        "Based on your interests, I'd suggest exploring a career as a **Digital Accessibility Specialist**. This role combines technical skills with advocacy for underrepresented groups.\n\n**Key steps:**\n1. Learn WCAG standards and assistive technologies\n2. Practice auditing websites for accessibility issues\n3. Connect with disability advocacy groups\n4. Build a portfolio of accessibility improvements\n5. Consider certification in digital accessibility",
    },
    {
      keywords: ["climate", "sustainability", "sustainable", "environment", "environmental", "rural", "green", "eco"],
      response:
        "I've analyzed your background and interests. You might excel as a **Climate Tech Educator** working with rural communities.\n\n**Career path steps:**\n1. Build knowledge in sustainable technologies (solar, water filtration)\n2. Develop teaching materials for low-resource settings\n3. Partner with local community organizations\n4. Create hands-on workshops that require minimal equipment\n5. Document impact and seek funding from environmental organizations",
    },
    {
      keywords: [
        "culture",
        "cultural",
        "diverse",
        "diversity",
        "international",
        "global",
        "multicultural",
        "ux",
        "research",
      ],
      response:
        "Have you considered becoming a **Cross-Cultural UX Researcher**? This emerging field needs people who understand diverse perspectives.\n\n**Suggested path:**\n1. Study basic UX research methodologies\n2. Leverage your multicultural background or learn about other cultures\n3. Practice conducting user interviews across different communities\n4. Create case studies showing how cultural factors affect product usage\n5. Connect with tech companies expanding to new markets",
    },
  ]

  // Default response when no keywords match
  const defaultResponse =
    "Based on what you've shared, you might consider exploring **unconventional career paths** that combine different disciplines. Consider your unique strengths and interests.\n\n**General career exploration steps:**\n1. Identify your transferable skills and core interests\n2. Research emerging fields at the intersection of your interests\n3. Connect with professionals in those fields for informational interviews\n4. Look for short-term projects or volunteer opportunities to gain experience\n5. Build a portfolio showcasing your unique perspective and approach"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    // Add user message
    const userMessage = { role: "user" as const, content: prompt.trim() }
    setMessages((prev) => [...prev, userMessage])

    // Clear input immediately to prevent double submissions
    setPrompt("")

    // Simulate AI thinking
    setIsLoading(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      // Convert prompt to lowercase for case-insensitive matching
      const lowercasePrompt = prompt.toLowerCase()

      // Check if any keywords match the prompt
      let matchedResponse = defaultResponse

      for (const item of keywordResponses) {
        // Check if any of the keywords are in the prompt
        if (item.keywords.some((keyword) => lowercasePrompt.includes(keyword))) {
          matchedResponse = item.response
          break // Use the first matching response
        }
      }

      const aiResponse = {
        role: "assistant" as const,
        content: matchedResponse,
      }

      // Add AI response
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 2000)
  }

  const handleFeedback = (isPositive: boolean) => {
    toast({
      title: isPositive ? "Feedback Received: Helpful" : "Feedback Received: Not Helpful",
      description: "Thank you for your feedback. This helps improve our AI suggestions.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
            <Clock className="h-3 w-3" /> Pending Review
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> Needs Revision
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">AI Career Path Playground</h1>
        <p className="text-muted-foreground">
          Explore AI-generated career paths or suggest new paths for the community
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">AI Career Generator</TabsTrigger>
          <TabsTrigger value="review">Mentor Review</TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle>AI Career Path Generator</CardTitle>
                  <CardDescription>
                    Describe your interests, skills, or constraints, and our AI will suggest unconventional career paths
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col overflow-hidden">
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4 px-1">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`flex gap-3 ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          } p-3 rounded-lg`}
                          style={{ maxWidth: "85%", wordBreak: "break-word" }}
                        >
                          <div className="flex-shrink-0 mt-1">
                            {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                          </div>
                          <div
                            className="prose prose-sm dark:prose-invert"
                            dangerouslySetInnerHTML={{
                              __html: message.content
                                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                                .replace(/\n/g, "<br />"),
                            }}
                          />
                        </div>
                        {message.role === "assistant" && index > 0 && (
                          <div className="flex items-center gap-1 ml-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleFeedback(true)}
                            >
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleFeedback(false)}
                            >
                              <ThumbsDown className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex space-x-2">
                            <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                            <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-75" />
                            <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-150" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe your interests or ask about a specific career path..."
                      className="min-h-[60px] flex-1"
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !prompt.trim()}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">1. Describe Your Interests</h3>
                    <p className="text-sm text-muted-foreground">
                      Tell the AI about your skills, interests, or constraints
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">2. Get AI Suggestions</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI will generate unconventional career paths based on your input
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">3. Mentor Review</h3>
                    <p className="text-sm text-muted-foreground">
                      Promising paths are reviewed by mentors and added to our skill tree
                    </p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm font-medium">Try these keywords:</p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>
                        "I'm interested in <strong>accessibility</strong> and helping people with disabilities"
                      </li>
                      <li>
                        "I care about <strong>climate change</strong> and want to work in{" "}
                        <strong>sustainability</strong>"
                      </li>
                      <li>
                        "I enjoy understanding different <strong>cultures</strong> and doing{" "}
                        <strong>UX research</strong>"
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="review">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Career Paths for Review</CardTitle>
                <CardDescription>
                  As a mentor, you can review and approve AI-generated career paths in your areas of expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiGeneratedPaths.map((path) => (
                    <Card key={path.id} className="overflow-hidden">
                      <div className="p-4 flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{path.title}</h3>
                            {getStatusBadge(path.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{path.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {path.expertise.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">Generated {path.createdAt}</p>
                        </div>
                        <div className="flex gap-2">
                          {path.status === "pending" && (
                            <>
                              <Button size="sm" variant="outline">
                                Review
                              </Button>
                              <Button size="sm">Approve</Button>
                            </>
                          )}
                          {path.status === "approved" && (
                            <Button size="sm" variant="outline">
                              View in Skill Tree
                            </Button>
                          )}
                          {path.status === "rejected" && (
                            <Button size="sm" variant="outline">
                              Edit & Resubmit
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mentor Review Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Ensure career paths are realistic and accessible for marginalized communities</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Verify that steps are clear, actionable, and in a logical sequence</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Check that resources mentioned are accessible and up-to-date</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>Add your own expertise and insights to improve the career path</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Expertise Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium mb-1">Primary Expertise</div>
                      <div className="flex flex-wrap gap-1">
                        <Badge>Web Development</Badge>
                        <Badge>UX Design</Badge>
                        <Badge>Accessibility</Badge>
                      </div>
                    </div>
                    <div>
                      <div className="font-medium mb-1">Secondary Expertise</div>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary">Education</Badge>
                        <Badge variant="secondary">Remote Work</Badge>
                        <Badge variant="secondary">Career Transition</Badge>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" size="sm">
                        Update Expertise
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
