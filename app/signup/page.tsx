"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Upload, CheckCircle, Loader2 } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("learner")
  const [fileUploaded, setFileUploaded] = useState(false)
  const [fileName, setFileName] = useState("")
  const [linkedInUrl, setLinkedInUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (activeTab === "mentor" && !fileUploaded && !linkedInUrl) {
      toast({
        title: "Verification Required",
        description: "Please upload your resume or provide your LinkedIn profile for verification.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)

      if (activeTab === "mentor") {
        toast({
          title: "Application Submitted",
          description:
            "Your mentor application has been submitted for verification. This process typically takes 1-2 business days.",
        })
      } else {
        toast({
          title: "Account Created",
          description: "Your learner account has been created successfully!",
        })
        router.push("/dashboard")
      }
    }, 1500)
  }

  const handleLogin = () => {
    router.push("/login")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileUploaded(true)
      setFileName(e.target.files[0].name)
      toast({
        title: "File Uploaded",
        description: "Your resume has been uploaded and will be reviewed.",
      })
    }
  }

  return (
    <div className="container flex min-h-screen w-full flex-col items-center justify-center py-8 overflow-auto">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an Account</h1>
          <p className="text-sm text-muted-foreground">Join our community to explore or contribute to career paths</p>
        </div>

        <Tabs defaultValue="learner" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="learner">Learner</TabsTrigger>
            <TabsTrigger value="mentor">Mentor</TabsTrigger>
          </TabsList>

          <TabsContent value="learner">
            <Card>
              <CardHeader>
                <CardTitle>Learner Account</CardTitle>
                <CardDescription>Access career paths and resources curated by verified mentors</CardDescription>
              </CardHeader>
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" required />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...
                      </>
                    ) : (
                      "Create Learner Account"
                    )}
                  </Button>
                  <div className="text-center text-sm">
                    <span className="text-muted-foreground">Already have an account? </span>
                    <Button variant="link" className="p-0" onClick={handleLogin}>
                      Sign In
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="mentor">
            <Card>
              <CardHeader>
                <CardTitle>Mentor Application</CardTitle>
                <CardDescription>Share your expertise and help others navigate their career paths</CardDescription>
              </CardHeader>
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mentor-name">Full Name</Label>
                    <Input id="mentor-name" placeholder="Jane Smith" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mentor-email">Email</Label>
                    <Input id="mentor-email" type="email" placeholder="name@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mentor-password">Password</Label>
                    <Input id="mentor-password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mentor-confirm-password">Confirm Password</Label>
                    <Input id="mentor-confirm-password" type="password" required />
                  </div>

                  <div className="space-y-2">
                    <Label>Professional Verification (Choose One)</Label>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Option 1: Upload Resume</Label>
                        <div className="mt-1 border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center">
                          {fileUploaded ? (
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              <span className="text-sm">{fileName}</span>
                            </div>
                          ) : (
                            <>
                              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground">PDF, DOC, or DOCX (max 5MB)</p>
                            </>
                          )}
                          <Input
                            id="resume-upload"
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => document.getElementById("resume-upload")?.click()}
                          >
                            {fileUploaded ? "Replace File" : "Select File"}
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Option 2: LinkedIn Profile</Label>
                        <Input
                          value={linkedInUrl}
                          onChange={(e) => setLinkedInUrl(e.target.value)}
                          placeholder="https://linkedin.com/in/yourprofile"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Your credentials will be reviewed by our team to verify your expertise. This helps maintain the
                      quality of mentor advice on our platform.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expertise">Primary Area of Expertise</Label>
                    <Input id="expertise" placeholder="e.g., Digital Marketing, Game Development" required />
                    <p className="text-xs text-muted-foreground">
                      You'll be able to add more specific skills after verification
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting Application...
                      </>
                    ) : (
                      "Submit Mentor Application"
                    )}
                  </Button>
                  <div className="text-center text-sm">
                    <span className="text-muted-foreground">Already a verified mentor? </span>
                    <Button variant="link" className="p-0" onClick={handleLogin}>
                      Sign In
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-muted-foreground">
          <Link href="/" className="underline underline-offset-4 hover:text-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
