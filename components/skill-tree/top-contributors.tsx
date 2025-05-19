import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TopContributorsProps {
  contributors?: {
    name: string
    avatar: string
    role: string
    completedSkills: number
    totalSkills: number
    path: string[]
  }[]
  pathTitle: string
}

export function TopContributors({ contributors, pathTitle }: TopContributorsProps) {
  // Define default contributors based on the path title
  if (!contributors || contributors.length === 0) {
    // Match mentors based on the path title
    if (pathTitle.includes("Women's Career Relaunch")) {
      contributors = [
        {
          name: "Divya",
          avatar: "/default-avatar.png",
          role: "Career Transition Coach",
          completedSkills: 6,
          totalSkills: 6,
          path: [
            "Reflect on Goals",
            "Same Field Upgrade",
            "Digital Presence",
            "Rebuild Network",
            "Apply Upskill",
            "Career Transition",
          ],
        },
        {
          name: "Lakshmi",
          avatar: "/default-avatar.png",
          role: "HR Consultant",
          completedSkills: 5,
          totalSkills: 6,
          path: ["Reflect on Goals", "Same Field Upgrade", "Digital Presence", "Rebuild Network", "Apply Upskill"],
        },
        {
          name: "Mansi",
          avatar: "/default-avatar.png",
          role: "Returnship Program Manager",
          completedSkills: 6,
          totalSkills: 6,
          path: [
            "Reflect on Goals",
            "Career Transition",
            "Digital Presence",
            "Rebuild Network",
            "Apply Upskill",
            "Same Field Upgrade",
          ],
        },
      ]
    } else if (pathTitle.includes("Food Catering")) {
      contributors = [
        {
          name: "Poonam",
          avatar: "/default-avatar.png",
          role: "Catering Business Owner",
          completedSkills: 6,
          totalSkills: 6,
          path: [
            "Passion Discovery",
            "Culinary Skill",
            "Business Setup",
            "Initial Marketing",
            "Scaling Operations",
            "Business Growth",
          ],
        },
        {
          name: "Neelam",
          avatar: "/default-avatar.png",
          role: "Food Entrepreneur",
          completedSkills: 5,
          totalSkills: 6,
          path: ["Passion Discovery", "Culinary Skill", "Business Setup", "Initial Marketing", "Scaling Operations"],
        },
      ]
    } else if (pathTitle.includes("Small Film Production")) {
      contributors = [
        {
          name: "Anupama",
          avatar: "/default-avatar.png",
          role: "Independent Filmmaker",
          completedSkills: 6,
          totalSkills: 6,
          path: [
            "Creative Foundation",
            "Technical Skills",
            "First Projects",
            "Networking",
            "Production Management",
            "Distribution",
          ],
        },
        {
          name: "Raj",
          avatar: "/default-avatar.png",
          role: "Film Director",
          completedSkills: 5,
          totalSkills: 6,
          path: ["Creative Foundation", "Technical Skills", "First Projects", "Networking", "Production Management"],
        },
      ]
    } else if (pathTitle.includes("Urban Farming")) {
      contributors = [
        {
          name: "Marcus",
          avatar: "/default-avatar.png",
          role: "Urban Agriculture Specialist",
          completedSkills: 5,
          totalSkills: 6,
          path: [
            "Urban Agriculture Basics",
            "Growing Techniques",
            "Site Selection",
            "Business Model",
            "Community Engagement",
          ],
        },
        {
          name: "Sofia",
          avatar: "/default-avatar.png",
          role: "Sustainable Food Systems Expert",
          completedSkills: 4,
          totalSkills: 6,
          path: ["Urban Agriculture Basics", "Growing Techniques", "Site Selection", "Business Model"],
        },
        {
          name: "Kwame",
          avatar: "/default-avatar.png",
          role: "Community Garden Coordinator",
          completedSkills: 6,
          totalSkills: 6,
          path: [
            "Urban Agriculture Basics",
            "Growing Techniques",
            "Site Selection",
            "Business Model",
            "Community Engagement",
            "Scaling Impact",
          ],
        },
      ]
    } else if (pathTitle.includes("Traditional Crafts")) {
      contributors = [
        {
          name: "Elena",
          avatar: "/default-avatar.png",
          role: "Textile Artisan",
          completedSkills: 5,
          totalSkills: 6,
          path: [
            "Craft Exploration",
            "Apprenticeship",
            "Contemporary Adaptation",
            "Business Development",
            "Education Outreach",
          ],
        },
        {
          name: "Hiroshi",
          avatar: "/default-avatar.png",
          role: "Master Craftsman",
          completedSkills: 6,
          totalSkills: 6,
          path: [
            "Craft Exploration",
            "Apprenticeship",
            "Contemporary Adaptation",
            "Business Development",
            "Education Outreach",
            "Cultural Advocacy",
          ],
        },
        {
          name: "Amara",
          avatar: "/default-avatar.png",
          role: "Cultural Heritage Specialist",
          completedSkills: 4,
          totalSkills: 6,
          path: ["Craft Exploration", "Apprenticeship", "Contemporary Adaptation", "Business Development"],
        },
      ]
    } else if (pathTitle.includes("Ethical Technology")) {
      contributors = [
        {
          name: "Aisha",
          avatar: "/default-avatar.png",
          role: "Tech Ethics Consultant",
          completedSkills: 5,
          totalSkills: 6,
          path: [
            "Ethics Foundations",
            "Technical Expertise",
            "Impact Assessment",
            "Organizational Change",
            "Policy Advocacy",
          ],
        },
        {
          name: "Lars",
          avatar: "/default-avatar.png",
          role: "Digital Rights Advocate",
          completedSkills: 4,
          totalSkills: 6,
          path: ["Ethics Foundations", "Technical Expertise", "Impact Assessment", "Organizational Change"],
        },
        {
          name: "Miguel",
          avatar: "/default-avatar.png",
          role: "Responsible AI Researcher",
          completedSkills: 6,
          totalSkills: 6,
          path: [
            "Ethics Foundations",
            "Technical Expertise",
            "Impact Assessment",
            "Organizational Change",
            "Policy Advocacy",
            "Ethical Leadership",
          ],
        },
      ]
    } else if (pathTitle.includes("Rural Digital Freelancer")) {
      contributors = [
        {
          name: "Shubham",
          avatar: "/default-avatar.png",
          role: "Remote Web Developer",
          completedSkills: 6,
          totalSkills: 6,
          path: [
            "Assess Connectivity",
            "Skill Acquisition",
            "Online Presence",
            "Freelance Platforms",
            "Remote Jobs",
            "Financial Management",
          ],
        },
        {
          name: "Kusum",
          avatar: "/default-avatar.png",
          role: "Digital Marketing Specialist",
          completedSkills: 5,
          totalSkills: 6,
          path: ["Assess Connectivity", "Skill Acquisition", "Online Presence", "Freelance Platforms", "Remote Jobs"],
        },
        {
          name: "Sagar",
          avatar: "/default-avatar.png",
          role: "Virtual Assistant",
          completedSkills: 4,
          totalSkills: 6,
          path: ["Assess Connectivity", "Skill Acquisition", "Online Presence", "Freelance Platforms"],
        },
      ]
    } else if (pathTitle.includes("Indie Game Developer")) {
      contributors = [
        {
          name: "Jamal",
          avatar: "/default-avatar.png",
          role: "Game Designer",
          completedSkills: 5,
          totalSkills: 6,
          path: [
            "Game Design Fundamentals",
            "Choose Your Engine",
            "Core Skills Development",
            "Create Your First Game",
            "Community Building",
          ],
        },
        {
          name: "Sofia",
          avatar: "/default-avatar.png",
          role: "Indie Game Artist",
          completedSkills: 6,
          totalSkills: 6,
          path: [
            "Game Design Fundamentals",
            "Choose Your Engine",
            "Core Skills Development",
            "Create Your First Game",
            "Community Building",
            "Publishing & Monetization",
          ],
        },
      ]
    } else if (pathTitle.includes("Neurodivergent Learning Strategist")) {
      contributors = [
        {
          name: "Alex",
          avatar: "/default-avatar.png",
          role: "Educational Consultant",
          completedSkills: 6,
          totalSkills: 6,
          path: [
            "Understanding Learning Differences",
            "Inclusive Education Tools",
            "Developing Learning Models",
            "Professional Certification",
            "Practical Application",
            "Advocacy & Community",
          ],
        },
        {
          name: "Priya",
          avatar: "/default-avatar.png",
          role: "Learning Specialist",
          completedSkills: 5,
          totalSkills: 6,
          path: [
            "Understanding Learning Differences",
            "Inclusive Education Tools",
            "Developing Learning Models",
            "Professional Certification",
            "Practical Application",
          ],
        },
      ]
    } else {
      // Default contributors if path doesn't match any known paths
      contributors = [
        {
          name: "Sarah",
          avatar: "/default-avatar.png",
          role: "Career Mentor",
          completedSkills: 5,
          totalSkills: 6,
          path: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
        },
        {
          name: "Michael",
          avatar: "/default-avatar.png",
          role: "Industry Expert",
          completedSkills: 6,
          totalSkills: 6,
          path: ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6"],
        },
      ]
    }
  }

  return (
    <Card className="overflow-hidden h-full">
      <CardHeader>
        <CardTitle className="text-lg">Top Contributors</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <Tabs defaultValue={contributors[0].name.replace(/\s+/g, "-").toLowerCase()} className="w-full">
          <TabsList className="w-full grid" style={{ gridTemplateColumns: `repeat(${contributors.length}, 1fr)` }}>
            {contributors.map((contributor) => (
              <TabsTrigger
                key={contributor.name}
                value={contributor.name.replace(/\s+/g, "-").toLowerCase()}
                className="text-xs px-2 py-1"
              >
                {contributor.name.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {contributors.map((contributor) => (
            <TabsContent
              key={contributor.name}
              value={contributor.name.replace(/\s+/g, "-").toLowerCase()}
              className="mt-3"
            >
              <div className="flex items-center gap-2 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{contributor.name}</div>
                  <div className="text-xs text-muted-foreground">{contributor.role}</div>
                </div>
              </div>

              <div className="text-sm">
                <div className="font-medium mb-2">Career Path:</div>
                <div className="relative pl-6">
                  {contributor.path.map((skill, skillIndex) => {
                    const isLast = skillIndex === contributor.path.length - 1
                    return (
                      <div key={skillIndex} className="mb-3 last:mb-0 relative">
                        {/* Vertical line connecting steps */}
                        {!isLast && (
                          <div
                            className="absolute left-0 top-6 w-[2px] h-[calc(100%+4px)] bg-green-500/70"
                            style={{ transform: "translateX(-50%)" }}
                          ></div>
                        )}

                        {/* Step circle */}
                        <div
                          className="absolute left-0 top-1 z-10 flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-medium"
                          style={{ transform: "translateX(-50%)" }}
                        >
                          {skillIndex + 1}
                        </div>

                        {/* Step text */}
                        <div className="ml-4">{skill}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
