"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SkillPath } from "@/components/skill-tree/skill-path"
import { CareerPathFAQ } from "@/components/skill-tree/career-path-faq"
import { CareerPathRating } from "@/components/skill-tree/career-path-rating"

// Career path ratings data (in a real app, this would come from a database)
const pathRatings = {
  "women-returning": { rating: 92, votes: 124 },
  "rural-digital-freelancer": { rating: 88, votes: 97 },
  "social-healthcare": { rating: 90, votes: 76 },
  "indie-game-developer": { rating: 94, votes: 156 },
  "neurodivergent-strategist": { rating: 89, votes: 82 },
  "food-catering": { rating: 91, votes: 103 },
  "small-film-production": { rating: 87, votes: 89 },
  "urban-farming": { rating: 86, votes: 78 },
  "traditional-crafts": { rating: 90, votes: 85 },
  "ethical-tech": { rating: 93, votes: 110 },
}

// Update the skillPaths array with reordered and renamed paths, plus 3 new unconventional careers
const skillPaths = [
  {
    id: "women-returning",
    title: "Women's Career Relaunch After Extended Break",
    shortTitle: "Women's Career Relaunch",
    description: "A guided path for women restarting careers after extended maternity/family/personal leave.",
    keywords: ["women", "career break", "return to work", "maternity", "career change", "returnship"],
    skills: [
      {
        id: "reflect-goals",
        title: "Reflect on Goals & Direction",
        description: "Re-evaluate your interests, values, and lifestyle needs to determine your career direction.",
        status: "available" as const,
        x: 150,
        y: 100,
        mentorTips: [
          {
            name: "Divya",
            avatar: "/default-avatar.png",
            tip: "Take time to journal about what you enjoyed in your previous roles and what you'd like to change.",
            email: "divya.ahuja@example.com",
          },
          {
            name: "Mansi",
            avatar: "/default-avatar.png",
            tip: "Consider how your priorities and values may have shifted during your career break.",
            email: "mansi.bakshi@example.com",
          },
        ],
        resources: [
          {
            title: "Career Values Assessment",
            url: "#",
          },
          {
            title: "Returning to Work Planner",
            url: "#",
          },
        ],
      },
      {
        id: "same-field",
        title: "Same Field Upgrade",
        description: "Take refresher courses and understand new tools to update your skills in your previous field.",
        status: "locked" as const,
        x: 100,
        y: 250,
        mentorTips: [
          {
            name: "Lakshmi",
            avatar: "/default-avatar.png",
            tip: "Research the latest tools and technologies in your field that emerged during your break.",
            email: "lakshmi.srinivasan@example.com",
          },
          {
            name: "Divya",
            avatar: "/default-avatar.png",
            tip: "Connect with former colleagues to understand how the industry has evolved.",
            email: "divya.ahuja@example.com",
          },
        ],
        resources: [
          {
            title: "Industry Update Webinars",
            url: "#",
          },
          {
            title: "LinkedIn Learning Refresher Courses",
            url: "#",
            isCertification: true,
          },
        ],
      },
      {
        id: "new-career",
        title: "Career Transition Specialist",
        description: "Enroll in foundational training or bootcamps to prepare for a career change.",
        status: "locked" as const,
        x: 300,
        y: 250,
        hasCertification: true,
        mentorTips: [
          {
            name: "Mansi",
            avatar: "/default-avatar.png",
            tip: "Look for bootcamps with flexible schedules designed for career changers.",
            email: "mansi.bakshi@example.com",
          },
          {
            name: "Lakshmi",
            avatar: "/default-avatar.png",
            tip: "Start with free online courses to test your interest before committing to paid programs.",
            email: "lakshmi.srinivasan@example.com",
          },
        ],
        resources: [
          {
            title: "Career Change Roadmap",
            url: "#",
          },
          {
            title: "Google Rework Your Career Certification",
            url: "https://www.coursera.org/learn/rework-your-career",
            isCertification: true,
          },
        ],
      },
      {
        id: "digital-presence",
        title: "Update Digital Presence",
        description: "Refresh your LinkedIn and résumé, tailoring them for your new role or direction.",
        status: "locked" as const,
        x: 200,
        y: 400,
        mentorTips: [
          {
            name: "Divya",
            avatar: "/default-avatar.png",
            tip: "Address your career gap honestly but focus on skills gained during that time.",
            email: "divya.ahuja@example.com",
          },
          {
            name: "Mansi",
            avatar: "/default-avatar.png",
            tip: "Update your profile photo and headline to reflect your current professional identity.",
            email: "mansi.bakshi@example.com",
          },
        ],
        resources: [
          {
            title: "LinkedIn Profile Optimization Guide",
            url: "#",
          },
          {
            title: "Resume Templates for Career Returners",
            url: "#",
          },
        ],
      },
      {
        id: "rebuild-network",
        title: "Rebuild Network",
        description: "Reconnect with former colleagues and join returnship groups to expand your professional network.",
        status: "locked" as const,
        x: 400,
        y: 400,
        mentorTips: [
          {
            name: "Lakshmi",
            avatar: "/default-avatar.png",
            tip: "Schedule virtual coffee chats with former colleagues to reestablish connections.",
            email: "lakshmi.srinivasan@example.com",
          },
          {
            name: "Divya",
            avatar: "/default-avatar.png",
            tip: "Join industry-specific groups for returners on LinkedIn and Facebook.",
            email: "divya.ahuja@example.com",
          },
        ],
        resources: [
          {
            title: "Networking Scripts for Returners",
            url: "#",
          },
          {
            title: "Women Returners Network",
            url: "#",
          },
        ],
      },
      {
        id: "apply-upskill",
        title: "Apply & Upskill Simultaneously",
        description:
          "Look for returnships, part-time roles, or flexible internships while continuing to develop skills.",
        status: "locked" as const,
        x: 300,
        y: 550,
        mentorTips: [
          {
            name: "Mansi",
            avatar: "/default-avatar.png",
            tip: "Target companies with formal returnship programs that understand career gaps.",
            email: "mansi.bakshi@example.com",
          },
          {
            name: "Lakshmi",
            avatar: "/default-avatar.png",
            tip: "Consider project-based work to build recent experience for your resume.",
            email: "lakshmi.srinivasan@example.com",
          },
        ],
        resources: [
          {
            title: "The Mom Project",
            url: "https://themomproject.com/",
          },
          {
            title: "iRelaunch",
            url: "https://www.irelaunch.com/",
          },
        ],
      },
    ],
    connections: [
      { from: "reflect-goals", to: "same-field" },
      { from: "reflect-goals", to: "new-career" },
      { from: "same-field", to: "digital-presence" },
      { from: "new-career", to: "digital-presence" },
      { from: "digital-presence", to: "rebuild-network" },
      { from: "rebuild-network", to: "apply-upskill" },
      { from: "digital-presence", to: "apply-upskill" },
    ],
    faqs: [
      {
        question: "How do I explain my career gap in interviews?",
        answer:
          "Be honest but strategic. Briefly acknowledge the gap and reason, then pivot to skills gained during that time (organization, adaptability, etc.) and your enthusiasm to return. Practice your response to sound confident.",
      },
      {
        question: "Is it better to return to my previous field or change careers?",
        answer:
          "This depends on your interests, how much your field has changed, and your financial/time constraints. Returning to your previous field typically requires less retraining, while a career change offers a fresh start but may take longer to establish.",
      },
      {
        question: "What are returnships and how do I find them?",
        answer:
          "Returnships are internship-like programs specifically designed for professionals returning after a career break. Companies like Amazon, IBM, and Goldman Sachs offer them. Search for 'returnship programs' or check platforms like iRelaunch and The Mom Project.",
      },
      {
        question: "How do I update my skills after being away from the workforce?",
        answer:
          "Start with online courses on platforms like Coursera, LinkedIn Learning, or industry-specific certifications. Join professional groups to learn current trends, and consider volunteering or project work to apply these skills practically.",
      },
      {
        question: "How long will it take to successfully return to work?",
        answer:
          "The timeline varies greatly depending on your field, the length of your break, and current market conditions. Most returners find suitable roles within 3-6 months of dedicated effort, but it can take longer for career changers or highly specialized fields.",
      },
    ],
  },
  {
    id: "food-catering",
    title: "Entrepreneurial Journey through Food Catering",
    shortTitle: "Food Catering",
    description: "A path for individuals looking to start and grow a food catering business from scratch.",
    keywords: ["entrepreneurship", "food", "catering", "business", "culinary", "startup"],
    skills: [
      {
        id: "passion-discovery",
        title: "Passion Discovery",
        description: "Identify your interest in culinary arts and entrepreneurship.",
        status: "available" as const,
        x: 150,
        y: 100,
        mentorTips: [
          {
            name: "Poonam",
            avatar: "/default-avatar.png",
            tip: "Start by exploring different cuisines and cooking techniques to find what excites you most.",
            email: "poonam.gupta@example.com",
          },
          {
            name: "Neelam",
            avatar: "/default-avatar.png",
            tip: "Consider what unique perspective or specialty you can bring to the market.",
            email: "neelam.gupta@example.com",
          },
        ],
        resources: [
          {
            title: "Culinary Exploration Guide",
            url: "#",
          },
          {
            title: "Food Business Idea Worksheet",
            url: "#",
          },
        ],
      },
      {
        id: "skill-development",
        title: "Culinary Skill Development",
        description: "Enhance your cooking techniques and menu planning abilities.",
        status: "locked" as const,
        x: 300,
        y: 200,
        hasCertification: true,
        mentorTips: [
          {
            name: "Poonam",
            avatar: "/default-avatar.png",
            tip: "Focus on mastering a few signature dishes before expanding your repertoire.",
            email: "poonam.gupta@example.com",
          },
          {
            name: "Neelam",
            avatar: "/default-avatar.png",
            tip: "Learn to scale recipes efficiently for larger groups without compromising quality.",
            email: "neelam.gupta@example.com",
          },
        ],
        resources: [
          {
            title: "Professional Cooking Techniques",
            url: "#",
            isCertification: true,
          },
          {
            title: "Menu Planning for Catering",
            url: "#",
          },
        ],
      },
      {
        id: "business-setup",
        title: "Business Setup",
        description: "Establish legal structure, permits, and basic operational framework.",
        status: "locked" as const,
        x: 450,
        y: 300,
        mentorTips: [
          {
            name: "Neelam",
            avatar: "/default-avatar.png",
            tip: "Research local food business regulations thoroughly before investing in equipment.",
            email: "neelam.gupta@example.com",
          },
          {
            name: "Poonam",
            avatar: "/default-avatar.png",
            tip: "Start with a home-based operation if regulations allow to minimize initial costs.",
            email: "poonam.gupta@example.com",
          },
        ],
        resources: [
          {
            title: "Food Business Licensing Guide",
            url: "#",
          },
          {
            title: "Catering Business Plan Template",
            url: "#",
          },
        ],
      },
      {
        id: "initial-marketing",
        title: "Initial Marketing & First Clients",
        description: "Build a brand identity and secure your first catering opportunities.",
        status: "locked" as const,
        x: 300,
        y: 400,
        mentorTips: [
          {
            name: "Poonam",
            avatar: "/default-avatar.png",
            tip: "Offer to cater small events for friends and family to build your portfolio and get testimonials.",
            email: "poonam.gupta@example.com",
          },
          {
            name: "Neelam",
            avatar: "/default-avatar.png",
            tip: "Invest in quality food photography for your social media and website.",
            email: "neelam.gupta@example.com",
          },
        ],
        resources: [
          {
            title: "Food Photography Basics",
            url: "#",
          },
          {
            title: "Social Media Marketing for Food Businesses",
            url: "#",
          },
        ],
      },
      {
        id: "scaling-operations",
        title: "Scaling Operations",
        description: "Expand your team, streamline processes, and handle larger events.",
        status: "locked" as const,
        x: 150,
        y: 500,
        mentorTips: [
          {
            name: "Neelam",
            avatar: "/default-avatar.png",
            tip: "Create detailed checklists and timelines for each event to ensure nothing is overlooked.",
            email: "neelam.gupta@example.com",
          },
          {
            name: "Poonam",
            avatar: "/default-avatar.png",
            tip: "Hire staff with complementary skills to yours to create a well-rounded team.",
            email: "poonam.gupta@example.com",
          },
        ],
        resources: [
          {
            title: "Catering Staff Management",
            url: "#",
          },
          {
            title: "Event Planning Logistics",
            url: "#",
          },
        ],
      },
      {
        id: "business-growth",
        title: "Sustainable Growth & Diversification",
        description: "Expand service offerings, optimize profitability, and build a sustainable business.",
        status: "locked" as const,
        x: 300,
        y: 600,
        mentorTips: [
          {
            name: "Poonam",
            avatar: "/default-avatar.png",
            tip: "Consider adding complementary services like cooking classes or meal prep to diversify income.",
            email: "poonam.gupta@example.com",
          },
          {
            name: "Neelam",
            avatar: "/default-avatar.png",
            tip: "Regularly review your pricing structure to ensure profitability as your costs change.",
            email: "neelam.gupta@example.com",
          },
        ],
        resources: [
          {
            title: "Catering Business Growth Strategies",
            url: "#",
          },
          {
            title: "Food Business Financial Management",
            url: "#",
          },
        ],
      },
    ],
    connections: [
      { from: "passion-discovery", to: "skill-development" },
      { from: "skill-development", to: "business-setup" },
      { from: "business-setup", to: "initial-marketing" },
      { from: "initial-marketing", to: "scaling-operations" },
      { from: "scaling-operations", to: "business-growth" },
    ],
    faqs: [
      {
        question: "Do I need formal culinary training to start a catering business?",
        answer:
          "Formal training isn't strictly necessary, but strong culinary skills are essential. Many successful caterers are self-taught or learned through apprenticeships. What matters most is your ability to consistently prepare delicious food at scale, understand food safety, and manage the logistics of food service. Consider starting with cooking classes or workshops to build your skills if you're new to professional cooking.",
      },
      {
        question: "How much startup capital do I need for a catering business?",
        answer:
          "You can start a small catering business with as little as $5,000-$10,000 if you begin home-based (where legally permitted). This would cover basic equipment, initial marketing, licensing, and insurance. Starting costs increase significantly ($50,000+) if you need a commercial kitchen space immediately. Many successful caterers start small with minimal equipment and reinvest profits to grow gradually.",
      },
      {
        question: "How do I price my catering services?",
        answer:
          "Effective pricing includes food costs (typically 25-30% of your price), labor (30-35%), overhead (15-20%), and profit margin (15-25%). Research competitors in your area for market rates. Consider offering tiered pricing options and be transparent about what's included. Remember to account for all expenses including transportation, serving equipment, and staff time for setup and cleanup.",
      },
      {
        question: "What permits and licenses do I need?",
        answer:
          "Requirements vary by location but typically include: business license, food service license, food handler's permit, catering license, and possibly a liquor license if serving alcohol. You'll also need liability insurance and may require a health department inspection of your kitchen facilities. Contact your local health department and small business administration for specific requirements in your area.",
      },
      {
        question: "How do I find my first catering clients?",
        answer:
          "Start with your personal network - offer to cater friends' events, family gatherings, or community functions, even at reduced rates to build your portfolio. Create a simple website and social media presence with quality food photos. Partner with complementary businesses like event planners, wedding venues, or corporate offices. Consider offering tastings or small sample events to showcase your food and service quality.",
      },
    ],
  },
  {
    id: "small-film-production",
    title: "Small Film Production",
    shortTitle: "Small Film Production",
    description: "A career path for aspiring filmmakers looking to produce independent short films.",
    keywords: ["film", "production", "short film", "filmmaking", "creative", "media", "storytelling"],
    skills: [
      {
        id: "creative-foundation",
        title: "Creative Foundation",
        description: "Develop your storytelling abilities and visual aesthetic.",
        status: "available" as const,
        x: 150,
        y: 100,
        mentorTips: [
          {
            name: "Anupama",
            avatar: "/default-avatar.png",
            tip: "Watch a wide variety of short films to understand different storytelling approaches and visual styles.",
            email: "anupama.gupta@example.com",
          },
          {
            name: "Raj",
            avatar: "/default-avatar.png",
            tip: "Practice writing short scripts that can be produced with minimal resources.",
            email: "raj.sharma@example.com",
          },
        ],
        resources: [
          {
            title: "Short Film Analysis Guide",
            url: "#",
          },
          {
            title: "Visual Storytelling Fundamentals",
            url: "#",
          },
        ],
      },
      {
        id: "technical-skills",
        title: "Technical Skills Acquisition",
        description: "Learn the fundamentals of cameras, lighting, sound, and editing.",
        status: "locked" as const,
        x: 300,
        y: 200,
        hasCertification: true,
        mentorTips: [
          {
            name: "Anupama",
            avatar: "/default-avatar.png",
            tip: "Start with whatever camera you have access to - even a smartphone can produce quality short films.",
            email: "anupama.gupta@example.com",
          },
          {
            name: "Raj",
            avatar: "/default-avatar.png",
            tip: "Sound quality often matters more than image quality - invest in a decent microphone early.",
            email: "raj.sharma@example.com",
          },
        ],
        resources: [
          {
            title: "Digital Filmmaking Basics",
            url: "#",
            isCertification: true,
          },
          {
            title: "Introduction to Film Editing",
            url: "#",
          },
        ],
      },
      {
        id: "first-projects",
        title: "First Projects & Portfolio Building",
        description: "Create simple short films to develop your skills and build a portfolio.",
        status: "locked" as const,
        x: 450,
        y: 300,
        mentorTips: [
          {
            name: "Anupama",
            avatar: "/default-avatar.png",
            tip: "Start with a 1-2 minute film in a single location with 1-2 actors to keep logistics manageable.",
            email: "anupama.gupta@example.com",
          },
          {
            name: "Raj",
            avatar: "/default-avatar.png",
            tip: "Don't aim for perfection - completing projects is more valuable than endless planning.",
            email: "raj.sharma@example.com",
          },
        ],
        resources: [
          {
            title: "Low-Budget Filmmaking Techniques",
            url: "#",
          },
          {
            title: "Film Portfolio Development",
            url: "#",
          },
        ],
      },
      {
        id: "networking",
        title: "Networking & Collaboration",
        description: "Build relationships with other filmmakers, actors, and crew members.",
        status: "locked" as const,
        x: 300,
        y: 400,
        mentorTips: [
          {
            name: "Anupama",
            avatar: "/default-avatar.png",
            tip: "Attend local film screenings and festivals to meet other filmmakers in your community.",
            email: "anupama.gupta@example.com",
          },
          {
            name: "Raj",
            avatar: "/default-avatar.png",
            tip: "Volunteer on other people's sets to learn and build relationships with potential collaborators.",
            email: "raj.sharma@example.com",
          },
        ],
        resources: [
          {
            title: "Film Industry Networking Guide",
            url: "#",
          },
          {
            title: "Collaborative Filmmaking Approaches",
            url: "#",
          },
        ],
      },
      {
        id: "production-management",
        title: "Production Management",
        description: "Learn to plan, budget, schedule, and manage a film production.",
        status: "locked" as const,
        x: 150,
        y: 500,
        mentorTips: [
          {
            name: "Anupama",
            avatar: "/default-avatar.png",
            tip: "Create detailed shot lists and schedules to maximize efficiency on shooting days.",
            email: "anupama.gupta@example.com",
          },
          {
            name: "Raj",
            avatar: "/default-avatar.png",
            tip: "Budget for unexpected expenses and always have contingency plans for weather, equipment issues, etc.",
            email: "raj.sharma@example.com",
          },
        ],
        resources: [
          {
            title: "Film Production Planning Templates",
            url: "#",
          },
          {
            title: "Low-Budget Film Producing",
            url: "#",
          },
        ],
      },
      {
        id: "distribution",
        title: "Festival Submission & Distribution",
        description: "Navigate film festivals, online platforms, and distribution opportunities.",
        status: "locked" as const,
        x: 300,
        y: 600,
        mentorTips: [
          {
            name: "Anupama",
            avatar: "/default-avatar.png",
            tip: "Research festivals that specifically showcase the type of films you make to increase acceptance chances.",
            email: "anupama.gupta@example.com",
          },
          {
            name: "Raj",
            avatar: "/default-avatar.png",
            tip: "Create a compelling press kit with high-quality stills, a concise synopsis, and director's statement.",
            email: "raj.sharma@example.com",
          },
        ],
        resources: [
          {
            title: "Film Festival Strategy Guide",
            url: "#",
          },
          {
            title: "Online Distribution Platforms Comparison",
            url: "#",
          },
        ],
      },
    ],
    connections: [
      { from: "creative-foundation", to: "technical-skills" },
      { from: "technical-skills", to: "first-projects" },
      { from: "first-projects", to: "networking" },
      { from: "networking", to: "production-management" },
      { from: "production-management", to: "distribution" },
    ],
    faqs: [
      {
        question: "How much does it cost to make a short film?",
        answer:
          "Short film budgets vary dramatically based on length, complexity, and resources. You can create a simple 3-5 minute short for $500-1,000 using borrowed equipment and volunteer crew. More ambitious shorts with paid crew, professional actors, multiple locations, and special effects can cost $5,000-25,000+. Many filmmakers start with 'no-budget' films using available resources and friends as actors, then gradually scale up as they gain experience.",
      },
      {
        question: "What equipment do I need to get started?",
        answer:
          "At minimum: a camera (even a smartphone with a good camera), basic audio recording equipment (lavalier or shotgun microphone), simple lighting (can be DIY with clamp lights and diffusion), and editing software (including free options like DaVinci Resolve). As you progress, consider investing in a DSLR or mirrorless camera with video capabilities, a tripod, basic lighting kit, audio recorder, and entry-level lenses. Rent specialized equipment for specific projects rather than purchasing everything.",
      },
      {
        question: "How do I find actors and crew for my short film?",
        answer:
          "For early projects, start with friends and family who are reliable and enthusiastic. As you progress, use casting websites (many have free options), local theater groups, film school students, and social media groups for filmmakers in your area. Offer clear value even for unpaid roles: credit, meals, footage for reels, and a professional set experience. Build relationships by helping on others' projects to create a network of collaborators.",
      },
      {
        question: "How long should my short film be?",
        answer:
          "While short films can technically be up to 40 minutes, aim for 5-10 minutes for festival submissions. Many prestigious festivals prefer films under 15 minutes. For your first few projects, consider making 2-5 minute shorts to practice storytelling efficiency and minimize production challenges. Online platforms often favor even shorter content (1-3 minutes). Remember that a compelling 5-minute film is better than a dragging 15-minute one.",
      },
      {
        question: "How do I make money from short films?",
        answer:
          "Short films rarely generate significant direct revenue but serve as calling cards for filmmaking skills. Potential income sources include: festival prize money, streaming platform licensing (YouTube monetization, Vimeo on Demand), educational distribution, brand/commercial work based on your portfolio, and using your short as proof-of-concept for feature film funding. Many filmmakers leverage short film success to secure paid commercial or narrative work rather than monetizing the shorts themselves.",
      },
    ],
  },
  {
    id: "urban-farming",
    title: "Urban Farming Entrepreneur",
    shortTitle: "Urban Farming",
    description:
      "A path for creating sustainable food systems in urban environments through innovative farming methods.",
    keywords: ["urban farming", "agriculture", "sustainability", "food systems", "entrepreneurship", "local food"],
    skills: [
      {
        id: "urban-agriculture-basics",
        title: "Urban Agriculture Basics",
        description: "Learn foundational principles of growing food in limited urban spaces.",
        status: "available" as const,
        x: 150,
        y: 100,
        mentorTips: [
          {
            name: "Marcus",
            avatar: "/default-avatar.png",
            tip: "Start with container gardening to understand plant needs before scaling to larger systems.",
            email: "marcus.johnson@example.com",
          },
          {
            name: "Sofia",
            avatar: "/default-avatar.png",
            tip: "Focus on high-value crops that grow well in your specific microclimate and have local demand.",
            email: "sofia.mendoza@example.com",
          },
        ],
        resources: [
          {
            title: "Urban Growing Fundamentals",
            url: "#",
          },
          {
            title: "Container Gardening Guide",
            url: "#",
          },
        ],
      },
      {
        id: "growing-techniques",
        title: "Specialized Growing Techniques",
        description: "Master space-efficient methods like vertical farming, hydroponics, and aquaponics.",
        status: "locked" as const,
        x: 300,
        y: 200,
        hasCertification: true,
        mentorTips: [
          {
            name: "Kwame",
            avatar: "/default-avatar.png",
            tip: "Build small prototype systems before investing in larger infrastructure to test what works for you.",
            email: "kwame.osei@example.com",
          },
          {
            name: "Marcus",
            avatar: "/default-avatar.png",
            tip: "Focus on automation from the beginning to reduce daily maintenance requirements.",
            email: "marcus.johnson@example.com",
          },
        ],
        resources: [
          {
            title: "Hydroponic Systems Certification",
            url: "#",
            isCertification: true,
          },
          {
            title: "Vertical Farming Techniques",
            url: "#",
          },
        ],
      },
      {
        id: "site-selection",
        title: "Site Selection & Setup",
        description: "Identify suitable urban locations and establish your growing operation.",
        status: "locked" as const,
        x: 450,
        y: 300,
        mentorTips: [
          {
            name: "Sofia",
            avatar: "/default-avatar.png",
            tip: "Consider unconventional spaces like rooftops, vacant lots, or partnerships with existing buildings.",
            email: "sofia.mendoza@example.com",
          },
          {
            name: "Kwame",
            avatar: "/default-avatar.png",
            tip: "Analyze sunlight patterns throughout the year before committing to a location.",
            email: "kwame.osei@example.com",
          },
        ],
        resources: [
          {
            title: "Urban Site Assessment Guide",
            url: "#",
          },
          {
            title: "Rooftop Farming Considerations",
            url: "#",
          },
        ],
      },
      {
        id: "business-model",
        title: "Business Model Development",
        description: "Create a sustainable business model and marketing strategy for your urban farm.",
        status: "locked" as const,
        x: 300,
        y: 400,
        mentorTips: [
          {
            name: "Marcus",
            avatar: "/default-avatar.png",
            tip: "Consider multiple revenue streams beyond just produce sales, like education or agritourism.",
            email: "marcus.johnson@example.com",
          },
          {
            name: "Sofia",
            avatar: "/default-avatar.png",
            tip: "Build relationships with chefs and restaurants before your first harvest to secure buyers.",
            email: "sofia.mendoza@example.com",
          },
        ],
        resources: [
          {
            title: "Urban Farm Business Planning",
            url: "#",
          },
          {
            title: "Direct Marketing Strategies",
            url: "#",
          },
        ],
      },
      {
        id: "community-engagement",
        title: "Community Engagement",
        description: "Build local support through education, volunteering, and community involvement.",
        status: "locked" as const,
        x: 150,
        y: 500,
        mentorTips: [
          {
            name: "Kwame",
            avatar: "/default-avatar.png",
            tip: "Host regular open days or workshops to build local champions for your project.",
            email: "kwame.osei@example.com",
          },
          {
            name: "Marcus",
            avatar: "/default-avatar.png",
            tip: "Partner with schools for educational programs that can also provide volunteer support.",
            email: "marcus.johnson@example.com",
          },
        ],
        resources: [
          {
            title: "Community Engagement Toolkit",
            url: "#",
          },
          {
            title: "Urban Farm Education Programs",
            url: "#",
          },
        ],
      },
      {
        id: "scaling-impact",
        title: "Scaling & Expanding Impact",
        description: "Grow your operation and influence in the local food system.",
        status: "locked" as const,
        x: 300,
        y: 600,
        mentorTips: [
          {
            name: "Sofia",
            avatar: "/default-avatar.png",
            tip: "Consider a hub model with multiple small sites rather than one large operation.",
            email: "sofia.mendoza@example.com",
          },
          {
            name: "Kwame",
            avatar: "/default-avatar.png",
            tip: "Document your processes to create replicable systems as you expand to new locations.",
            email: "kwame.osei@example.com",
          },
        ],
        resources: [
          {
            title: "Urban Agriculture Policy Advocacy",
            url: "#",
          },
          {
            title: "Scaling Urban Farm Operations",
            url: "#",
          },
        ],
      },
    ],
    connections: [
      { from: "urban-agriculture-basics", to: "growing-techniques" },
      { from: "growing-techniques", to: "site-selection" },
      { from: "site-selection", to: "business-model" },
      { from: "business-model", to: "community-engagement" },
      { from: "community-engagement", to: "scaling-impact" },
    ],
    faqs: [
      {
        question: "How much space do I need to start an urban farm?",
        answer:
          "You can start with as little as 500 square feet (rooftop, backyard, or vacant lot) for a micro-farm, though 1/8 to 1/4 acre allows for more diverse production and better economies of scale. Vertical farming and hydroponic systems can produce significant yields in even smaller spaces. Many successful urban farmers start small and gradually expand as they refine their systems and secure more land through partnerships with property owners or land trusts.",
      },
      {
        question: "What are the most profitable crops for urban farming?",
        answer:
          "Focus on high-value, quick-growing crops with strong local demand: specialty salad greens, microgreens, cherry tomatoes, herbs, edible flowers, and unusual varieties not found in supermarkets. These crops can yield $5-30 per square foot annually. Microgreens are particularly profitable, potentially generating $20-30 per square foot per harvest with multiple harvests possible in the same space each year. Consider your local market - restaurants may want specialty items while farmers markets favor diverse, visually appealing produce.",
      },
      {
        question: "How do I handle city regulations and zoning?",
        answer:
          "Research local zoning codes specifically for urban agriculture, which vary widely between cities. You may need permits for structures, water access, sales, or composting. Many cities now have urban agriculture ordinances that clarify requirements. Start by contacting your city planning department and local food policy councils. Consider joining forces with other urban farmers to advocate for supportive policies. Some cities offer incentives like tax breaks for urban agriculture on vacant lots.",
      },
      {
        question: "What are the startup costs for an urban farm?",
        answer:
          "Costs vary based on your approach: a soil-based micro-farm might start at $5,000-10,000 for basic tools, irrigation, soil amendments, and initial plants. Hydroponic or vertical systems typically require $10,000-50,000+ for equipment, though small DIY systems can cost less. Major expenses include growing infrastructure, water systems, tools, seeds/plants, and possibly site improvements. Many urban farmers reduce costs by starting part-time, using reclaimed materials, and gradually expanding as revenue allows.",
      },
      {
        question: "How do urban farmers access land if they don't own property?",
        answer:
          "Creative land access strategies include: leasing from property owners (businesses, schools, churches with unused land), land trusts specifically for urban agriculture, community garden plot expansion, rooftop partnerships with building owners, and temporary use agreements for vacant lots. Some cities have programs matching farmers with available land. Consider offering landowners benefits like property maintenance, beautification, tax benefits through agricultural classification, or a share of produce in exchange for land access.",
      },
    ],
  },
  {
    id: "traditional-crafts",
    title: "Traditional Crafts Revivalist",
    shortTitle: "Traditional Crafts",
    description: "A path for preserving and modernizing traditional crafts and artisanal techniques.",
    keywords: ["crafts", "artisan", "traditional", "heritage", "handmade", "cultural preservation"],
    skills: [
      {
        id: "craft-exploration",
        title: "Craft Exploration & Selection",
        description: "Research and identify traditional crafts that resonate with you and have revival potential.",
        status: "available" as const,
        x: 150,
        y: 100,
        mentorTips: [
          {
            name: "Elena",
            avatar: "/default-avatar.png",
            tip: "Look to your own heritage first - personal connection to a craft tradition creates authentic storytelling.",
            email: "elena.petrova@example.com",
          },
          {
            name: "Hiroshi",
            avatar: "/default-avatar.png",
            tip: "Consider crafts that are endangered but still have living masters you can learn from directly.",
            email: "hiroshi.tanaka@example.com",
          },
        ],
        resources: [
          {
            title: "UNESCO Intangible Cultural Heritage Database",
            url: "#",
          },
          {
            title: "Traditional Craft Documentation Methods",
            url: "#",
          },
        ],
      },
      {
        id: "apprenticeship",
        title: "Apprenticeship & Skill Mastery",
        description: "Learn directly from master craftspeople to develop technical proficiency.",
        status: "locked" as const,
        x: 300,
        y: 200,
        mentorTips: [
          {
            name: "Amara",
            avatar: "/default-avatar.png",
            tip: "Document everything - take photos, videos, and detailed notes of techniques that may not be written down.",
            email: "amara.okafor@example.com",
          },
          {
            name: "Elena",
            avatar: "/default-avatar.png",
            tip: "Learn the cultural context and stories behind the techniques, not just the mechanical skills.",
            email: "elena.petrova@example.com",
          },
        ],
        resources: [
          {
            title: "Finding Craft Mentors Guide",
            url: "#",
          },
          {
            title: "Traditional Techniques Documentation",
            url: "#",
          },
        ],
      },
      {
        id: "contemporary-adaptation",
        title: "Contemporary Adaptation",
        description: "Develop ways to make traditional crafts relevant to modern markets and lifestyles.",
        status: "locked" as const,
        x: 450,
        y: 300,
        mentorTips: [
          {
            name: "Hiroshi",
            avatar: "/default-avatar.png",
            tip: "Find the balance between innovation and tradition - change function while preserving technique.",
            email: "hiroshi.tanaka@example.com",
          },
          {
            name: "Amara",
            avatar: "/default-avatar.png",
            tip: "Collaborate with designers from other fields to find new applications for traditional techniques.",
            email: "amara.okafor@example.com",
          },
        ],
        resources: [
          {
            title: "Traditional-Contemporary Fusion Examples",
            url: "#",
          },
          {
            title: "Market Research for Craft Products",
            url: "#",
          },
        ],
      },
      {
        id: "business-development",
        title: "Business Development",
        description: "Create a sustainable business model for your craft practice.",
        status: "locked" as const,
        x: 300,
        y: 400,
        mentorTips: [
          {
            name: "Elena",
            avatar: "/default-avatar.png",
            tip: "Price your work to reflect both materials and the hours of skilled labor involved.",
            email: "elena.petrova@example.com",
          },
          {
            name: "Hiroshi",
            avatar: "/default-avatar.png",
            tip: "Consider multiple revenue streams: finished products, teaching, consulting, and documentation.",
            email: "hiroshi.tanaka@example.com",
          },
        ],
        resources: [
          {
            title: "Craft Business Planning",
            url: "#",
          },
          {
            title: "Artisan Marketing Strategies",
            url: "#",
          },
        ],
      },
      {
        id: "education-outreach",
        title: "Education & Outreach",
        description: "Share knowledge through workshops, demonstrations, and digital content.",
        status: "locked" as const,
        x: 150,
        y: 500,
        mentorTips: [
          {
            name: "Amara",
            avatar: "/default-avatar.png",
            tip: "Create accessible entry points to your craft through simple projects for beginners.",
            email: "amara.okafor@example.com",
          },
          {
            name: "Elena",
            avatar: "/default-avatar.png",
            tip: "Document your process through high-quality photos and videos to reach global audiences.",
            email: "elena.petrova@example.com",
          },
        ],
        resources: [
          {
            title: "Craft Workshop Development",
            url: "#",
          },
          {
            title: "Digital Documentation for Crafts",
            url: "#",
          },
        ],
      },
      {
        id: "cultural-advocacy",
        title: "Cultural Preservation & Advocacy",
        description: "Work with institutions and communities to ensure craft traditions continue.",
        status: "locked" as const,
        x: 300,
        y: 600,
        mentorTips: [
          {
            name: "Hiroshi",
            avatar: "/default-avatar.png",
            tip: "Partner with museums and cultural institutions to create educational programs and exhibitions.",
            email: "hiroshi.tanaka@example.com",
          },
          {
            name: "Amara",
            avatar: "/default-avatar.png",
            tip: "Develop apprenticeship programs to create pathways for the next generation of craftspeople.",
            email: "amara.okafor@example.com",
          },
        ],
        resources: [
          {
            title: "Cultural Heritage Preservation Funding",
            url: "#",
          },
          {
            title: "Craft Education Program Development",
            url: "#",
          },
        ],
      },
    ],
    connections: [
      { from: "craft-exploration", to: "apprenticeship" },
      { from: "apprenticeship", to: "contemporary-adaptation" },
      { from: "contemporary-adaptation", to: "business-development" },
      { from: "business-development", to: "education-outreach" },
      { from: "education-outreach", to: "cultural-advocacy" },
    ],
    faqs: [
      {
        question: "How do I find masters of traditional crafts to learn from?",
        answer:
          "Start with cultural centers, museums, and heritage organizations focused on specific traditions. Folk art schools, craft guilds, and cultural festivals often showcase master artisans. Online directories like the UNESCO Living Human Treasures and national craft councils list recognized masters. Social media groups dedicated to specific crafts can connect you with practitioners. Consider international opportunities through cultural exchange programs, residencies, or workshops if local masters aren't available.",
      },
      {
        question: "How can I make traditional crafts economically viable today?",
        answer:
          "Focus on creating value beyond mass production: emphasize the story and cultural significance behind your work, develop luxury or collector-quality pieces, create practical items that showcase traditional techniques, or develop experiences like workshops and demonstrations. Consider multiple revenue streams including teaching, consulting for designers, creating custom work, and developing digital content. Collaborate with contemporary designers to find new applications for traditional techniques. Target markets that value authenticity, sustainability, and craftsmanship.",
      },
      {
        question: "What's the balance between innovation and preserving tradition?",
        answer:
          "This is a personal and cultural question each craftsperson must navigate. Generally, the core techniques, materials, and cultural values should be preserved while applications, designs, and business models can evolve. Document traditional methods thoroughly before innovating. Involve community elders or culture bearers in discussions about appropriate innovation. Consider creating both traditional pieces that preserve heritage exactly and contemporary pieces that apply techniques to new forms. Be transparent with customers about what aspects are traditional versus innovative.",
      },
      {
        question: "How do I properly acknowledge and respect the cultural origins of a craft I'm practicing?",
        answer:
          "Always name and credit the cultural tradition and community of origin in your marketing and teaching. Research the history and cultural context thoroughly. If practicing a craft outside your heritage, build relationships with the source community and consider how your work can benefit them. Avoid claiming expertise in the cultural aspects if you're primarily focused on technique. Consider financial reciprocity through sourcing materials from traditional producers, supporting cultural preservation efforts, or sharing profits with source communities. Be open to feedback from members of the tradition's culture.",
      },
      {
        question: "What resources are available to support traditional craft preservation?",
        answer:
          "Funding sources include cultural heritage grants from arts councils, UNESCO, and cultural ministries; apprenticeship programs through folk arts organizations; museum partnerships for exhibitions and programs; crowdfunding specifically for cultural preservation; and tourism development initiatives that include traditional crafts. Many countries have intangible cultural heritage policies that provide recognition and support. Universities often have folklore and cultural studies departments interested in documenting traditional crafts. Consider applying for designation as a cultural treasure or seeking geographic indication protection for regional craft traditions.",
      },
    ],
  },
  {
    id: "ethical-tech",
    title: "Ethical Technology Advocate",
    shortTitle: "Ethical Tech",
    description: "A path for technology professionals working to ensure tech serves humanity's best interests.",
    keywords: ["ethics", "technology", "digital rights", "responsible innovation", "tech for good", "digital ethics"],
    skills: [
      {
        id: "ethics-foundations",
        title: "Ethics & Technology Foundations",
        description: "Develop understanding of ethical frameworks and their application to technology.",
        status: "available" as const,
        x: 150,
        y: 100,
        mentorTips: [
          {
            name: "Aisha",
            avatar: "/default-avatar.png",
            tip: "Study historical examples of technology ethics failures to identify patterns and prevention strategies.",
            email: "aisha.rahman@example.com",
          },
          {
            name: "Lars",
            avatar: "/default-avatar.png",
            tip: "Develop a personal ethical framework that helps you evaluate new technologies consistently.",
            email: "lars.nielsen@example.com",
          },
        ],
        resources: [
          {
            title: "Technology Ethics Fundamentals",
            url: "#",
          },
          {
            title: "Case Studies in Tech Ethics",
            url: "#",
          },
        ],
      },
      {
        id: "technical-expertise",
        title: "Technical Expertise Development",
        description: "Build sufficient technical knowledge to understand the systems you're evaluating.",
        status: "locked" as const,
        x: 300,
        y: 200,
        hasCertification: true,
        mentorTips: [
          {
            name: "Miguel",
            avatar: "/default-avatar.png",
            tip: "Focus on understanding how systems work conceptually rather than becoming an expert in every technology.",
            email: "miguel.fernandez@example.com",
          },
          {
            name: "Aisha",
            avatar: "/default-avatar.png",
            tip: "Learn to ask the right technical questions even if you don't have deep technical expertise yourself.",
            email: "aisha.rahman@example.com",
          },
        ],
        resources: [
          {
            title: "Responsible AI Fundamentals",
            url: "#",
            isCertification: true,
          },
          {
            title: "Privacy Engineering Basics",
            url: "#",
          },
        ],
      },
      {
        id: "impact-assessment",
        title: "Impact Assessment Methods",
        description: "Learn frameworks for evaluating technology's effects on individuals and society.",
        status: "locked" as const,
        x: 450,
        y: 300,
        mentorTips: [
          {
            name: "Lars",
            avatar: "/default-avatar.png",
            tip: "Always consider impacts on the most vulnerable populations, not just the average user.",
            email: "lars.nielsen@example.com",
          },
          {
            name: "Miguel",
            avatar: "/default-avatar.png",
            tip: "Develop methods to anticipate second and third-order effects of technology deployment.",
            email: "miguel.fernandez@example.com",
          },
        ],
        resources: [
          {
            title: "Ethical Impact Assessment Toolkit",
            url: "#",
          },
          {
            title: "Algorithmic Auditing Methodologies",
            url: "#",
          },
        ],
      },
      {
        id: "organizational-change",
        title: "Organizational Implementation",
        description: "Develop skills to integrate ethical practices into organizations and products.",
        status: "locked" as const,
        x: 300,
        y: 400,
        mentorTips: [
          {
            name: "Aisha",
            avatar: "/default-avatar.png",
            tip: "Frame ethics as risk management and innovation opportunity rather than just compliance.",
            email: "aisha.rahman@example.com",
          },
          {
            name: "Lars",
            avatar: "/default-avatar.png",
            tip: "Create practical tools and processes that make ethical decision-making easier for teams.",
            email: "lars.nielsen@example.com",
          },
        ],
        resources: [
          {
            title: "Ethics by Design Methodology",
            url: "#",
          },
          {
            title: "Building Ethical Tech Teams",
            url: "#",
          },
        ],
      },
      {
        id: "policy-advocacy",
        title: "Policy & Advocacy",
        description: "Engage with regulatory frameworks and public discourse on technology ethics.",
        status: "locked" as const,
        x: 150,
        y: 500,
        mentorTips: [
          {
            name: "Miguel",
            avatar: "/default-avatar.png",
            tip: "Translate complex technical concepts into language policymakers and the public can understand.",
            email: "miguel.fernandez@example.com",
          },
          {
            name: "Aisha",
            avatar: "/default-avatar.png",
            tip: "Build coalitions across industry, academia, civil society, and government for effective advocacy.",
            email: "aisha.rahman@example.com",
          },
        ],
        resources: [
          {
            title: "Tech Policy Fundamentals",
            url: "#",
          },
          {
            title: "Digital Rights Advocacy Strategies",
            url: "#",
          },
        ],
      },
      {
        id: "ethical-leadership",
        title: "Ethical Leadership & Community Building",
        description: "Lead initiatives and build communities focused on responsible technology.",
        status: "locked" as const,
        x: 300,
        y: 600,
        mentorTips: [
          {
            name: "Lars",
            avatar: "/default-avatar.png",
            tip: "Create safe spaces for technologists to discuss ethical concerns without fear of retaliation.",
            email: "lars.nielsen@example.com",
          },
          {
            name: "Miguel",
            avatar: "/default-avatar.png",
            tip: "Develop metrics and recognition systems that reward ethical considerations in technical work.",
            email: "miguel.fernandez@example.com",
          },
        ],
        resources: [
          {
            title: "Building Ethics Communities of Practice",
            url: "#",
          },
          {
            title: "Responsible Innovation Leadership",
            url: "#",
          },
        ],
      },
    ],
    connections: [
      { from: "ethics-foundations", to: "technical-expertise" },
      { from: "technical-expertise", to: "impact-assessment" },
      { from: "impact-assessment", to: "organizational-change" },
      { from: "organizational-change", to: "policy-advocacy" },
      { from: "policy-advocacy", to: "ethical-leadership" },
    ],
    faqs: [
      {
        question: "Do I need a technical background to work in technology ethics?",
        answer:
          "While technical knowledge is valuable, it's not always required. The field needs diverse perspectives including philosophy, law, social sciences, design, and policy. What's essential is the ability to understand technical concepts sufficiently to evaluate their implications. Many successful tech ethicists come from non-technical backgrounds and partner with technical experts. Consider your unique contribution: technical experts might focus on building ethical systems, while those with humanities backgrounds might excel at developing frameworks or policy. Interdisciplinary collaboration is key to this field.",
      },
      {
        question: "How can I make an impact as an ethical tech advocate within a company?",
        answer:
          "Start by finding allies and building a coalition of like-minded colleagues. Frame ethics in terms that resonate with business priorities: risk management, user trust, regulatory compliance, and innovation opportunity. Develop practical tools that make ethical decision-making easier, like assessment checklists or design guidelines. Document both potential harms avoided and positive outcomes of ethical approaches. Look for high-leverage opportunities like product review processes, hiring practices, or metrics definition. Consider creating an ethics committee or community of practice if one doesn't exist. Remember that incremental progress is still valuable.",
      },
      {
        question: "What are the most pressing ethical issues in technology today?",
        answer:
          "Key issues include: algorithmic bias and fairness; privacy and surveillance; AI safety and alignment; digital addiction and attention economics; misinformation and synthetic media; labor displacement and economic inequality; environmental sustainability of tech infrastructure; accessibility and digital divides; content moderation and free expression; and concentration of power in tech platforms. These issues intersect and evolve rapidly with technological advancement. The most critical concerns often involve technologies that make autonomous decisions affecting vulnerable populations, collect vast amounts of personal data, or rapidly scale without adequate oversight.",
      },
      {
        question: "How do I stay current in such a rapidly evolving field?",
        answer:
          "Follow research centers like the AI Now Institute, Data & Society, and university ethics centers. Join communities like the IEEE Ethics in Action, ACM SIGAI Ethics, or All Tech Is Human. Subscribe to newsletters that curate developments (Montreal AI Ethics Institute, The Markup, EthicalOS). Attend conferences that bridge technology and ethics like FAT*, AIES, or RightsCon. Follow diverse voices on social media, including critics of technology. Most importantly, develop a framework for evaluating new developments rather than trying to keep up with every issue. Regular conversations with peers facing similar challenges can help process new developments.",
      },
      {
        question: "How do I handle situations where ethical considerations conflict with business priorities?",
        answer:
          "First, reframe the situation by identifying long-term business risks of the unethical approach and benefits of the ethical one. Quantify potential harms where possible (regulatory fines, user trust erosion, talent retention). Build alliances with legal, security, and risk management teams who may share your concerns. Document your assessment and recommendations professionally. If the conflict persists, consider escalation paths within your organization. In serious cases, know your options regarding protected disclosures and whistleblower protections. Throughout, maintain professionalism and focus on evidence rather than moral judgments. Consider whether the issue reflects a systemic problem requiring broader change.",
      },
    ],
  },
  {
    id: "rural-digital-freelancer",
    title: "Rural Digital Freelancer",
    shortTitle: "Rural Digital Freelancer",
    description: "A career path for individuals from remote/rural areas seeking location-independent digital careers.",
    keywords: ["rural", "remote", "freelance", "digital", "online", "location-independent"],
    skills: [
      {
        id: "assess-connectivity",
        title: "Assess Connectivity & Devices",
        description: "Ensure basic tech access and explore local digital hubs or community centers with internet.",
        status: "available" as const,
        x: 150,
        y: 100,
        mentorTips: [
          {
            name: "Shubham",
            avatar: "/default-avatar.png",
            tip: "Identify backup internet options like mobile hotspots or nearby cafes for when your primary connection fails.",
            email: "shubham.singhal@example.com",
          },
          {
            name: "Kusum",
            avatar: "/default-avatar.png",
            tip: "Even a basic smartphone can be enough to start - many successful freelancers began with just that.",
            email: "kusum.lata@example.com",
          },
        ],
        resources: [
          {
            title: "Rural Internet Options Guide",
            url: "#",
          },
          {
            title: "Low-Cost Device Programs",
            url: "#",
          },
        ],
      },
      {
        id: "skill-acquisition",
        title: "Skill Acquisition",
        description: "Learn high-demand digital services like design, writing, web development, or virtual assistance.",
        status: "locked" as const,
        x: 300,
        y: 200,
        hasCertification: true,
        mentorTips: [
          {
            name: "Sagar",
            avatar: "/default-avatar.png",
            tip: "Focus on one skill to master rather than trying to learn multiple skills simultaneously.",
            email: "sagar.more@example.com",
          },
          {
            name: "Shubham",
            avatar: "/default-avatar.png",
            tip: "Download tutorials when you have good internet to study offline during connectivity issues.",
            email: "shubham.singhal@example.com",
          },
        ],
        resources: [
          {
            title: "Google Digital Marketing Certification",
            url: "https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing",
            isCertification: true,
          },
          {
            title: "Free Code Camp Responsive Web Design Certification",
            url: "https://www.freecodecamp.org/",
            isCertification: true,
          },
        ],
      },
      {
        id: "online-presence",
        title: "Build Online Presence",
        description:
          "Create a portfolio on platforms like Behance or GitHub, and establish a professional LinkedIn profile.",
        status: "locked" as const,
        x: 450,
        y: 300,
        mentorTips: [
          {
            name: "Kusum",
            avatar: "/default-avatar.png",
            tip: "Your portfolio should highlight problems you solved, not just what you created.",
            email: "kusum.lata@example.com",
          },
          {
            name: "Sagar",
            avatar: "/default-avatar.png",
            tip: "Include your rural location as a unique selling point - many clients value diverse perspectives.",
            email: "sagar.more@example.com",
          },
        ],
        resources: [
          {
            title: "Portfolio Building Guide",
            url: "#",
          },
          {
            title: "LinkedIn Profile Optimization",
            url: "#",
          },
        ],
      },
      {
        id: "freelance-platforms",
        title: "Freelance Platforms",
        description: "Create profiles on platforms like Fiverr, Upwork, or Toptal to find freelance opportunities.",
        status: "locked" as const,
        x: 300,
        y: 400,
        mentorTips: [
          {
            name: "Shubham",
            avatar: "/default-avatar.png",
            tip: "Start with smaller projects to build reviews before bidding on larger contracts.",
            email: "shubham.singhal@example.com",
          },
          {
            name: "Kusum",
            avatar: "/default-avatar.png",
            tip: "Specialize in a niche to stand out from the competition on crowded platforms.",
            email: "kusum.lata@example.com",
          },
        ],
        resources: [
          {
            title: "Fiverr Learn – Freelance 101 Certification",
            url: "https://learn.fiverr.com/courses/freelance-101",
            isCertification: true,
          },
          {
            title: "Upwork Profile Optimization Guide",
            url: "#",
          },
        ],
      },
      {
        id: "remote-jobs",
        title: "Remote Jobs",
        description: "Apply to global remote positions that match your skills and experience.",
        status: "locked" as const,
        x: 150,
        y: 500,
        mentorTips: [
          {
            name: "Sagar",
            avatar: "/default-avatar.png",
            tip: "Set up job alerts on remote-specific job boards to be notified of new opportunities.",
            email: "sagar.more@example.com",
          },
          {
            name: "Shubham",
            avatar: "/default-avatar.png",
            tip: "Research companies with fully distributed teams as they're more likely to have good remote work practices.",
            email: "shubham.singhal@example.com",
          },
        ],
        resources: [
          {
            title: "Remote Job Boards Directory",
            url: "#",
          },
          {
            title: "Remote Interview Preparation",
            url: "#",
          },
        ],
      },
      {
        id: "financial-management",
        title: "Financial & Time Management",
        description: "Develop systems for tracking income, expenses, taxes, and productive work hours.",
        status: "locked" as const,
        x: 300,
        y: 600,
        mentorTips: [
          {
            name: "Kusum",
            avatar: "/default-avatar.png",
            tip: "Set aside a percentage of each payment for taxes and create a separate business account for income.",
            email: "kusum.lata@example.com",
          },
          {
            name: "Sagar",
            avatar: "/default-avatar.png",
            tip: "Track your most productive hours and schedule client work during those times to maximize efficiency.",
            email: "sagar.more@example.com",
          },
        ],
        resources: [
          {
            title: "Freelancer's Guide to Taxes",
            url: "#",
          },
          {
            title: "Time Management for Remote Workers",
            url: "#",
          },
        ],
      },
    ],
    connections: [
      { from: "assess-connectivity", to: "skill-acquisition" },
      { from: "skill-acquisition", to: "online-presence" },
      { from: "online-presence", to: "freelance-platforms" },
      { from: "freelance-platforms", to: "remote-jobs" },
      { from: "remote-jobs", to: "financial-management" },
    ],
    faqs: [
      {
        question: "How do I handle unreliable internet connectivity?",
        answer:
          "Plan your work around connectivity limitations: download resources and work offline when possible, use mobile data as backup, schedule bandwidth-intensive tasks during reliable connection times, and communicate clearly with clients about your situation. Consider investing in signal boosters or satellite internet if financially feasible. Many rural freelancers also travel periodically to locations with better connectivity for video calls or large file uploads. Some even negotiate with clients to adjust deadlines around connectivity challenges.",
      },
      {
        question: "What digital skills are most accessible for rural workers?",
        answer:
          "Skills that require minimal bandwidth and can be done asynchronously work best: content writing, editing, data entry, virtual assistance, graphic design, and certain types of programming. These skills can often be learned through downloadable courses and practiced offline. For rural workers with limited formal education, consider starting with virtual assistance, data entry, or transcription, which have lower barriers to entry but still provide good income potential. As your skills and connectivity improve, you can gradually move into higher-paying specialties.",
      },
      {
        question: "How do I compete with freelancers from urban areas?",
        answer:
          "Emphasize your unique perspective and strengths: rural freelancers often have lower overhead costs, fewer distractions, and diverse viewpoints that urban clients value. Develop expertise in niches relevant to rural or underserved markets. Build a strong portfolio that demonstrates reliability and quality work. Be transparent about any limitations while highlighting your problem-solving abilities. Many clients appreciate working with freelancers from diverse geographic backgrounds, especially for projects targeting broader markets beyond urban centers.",
      },
      {
        question: "How do I handle payment challenges in rural areas?",
        answer:
          "Set up multiple payment options: PayPal, Wise (formerly TransferWise), and cryptocurrency if appropriate. Open an online bank account if local banking is limited. Consider mobile banking solutions popular in your region. Always have backup payment methods in case one fails. For international clients, clearly communicate any currency conversion fees or restrictions. Some rural freelancers arrange monthly payment schedules rather than per-project payments to reduce transaction fees and simplify financial planning.",
      },
      {
        question: "How can I build professional relationships without in-person networking?",
        answer:
          "Focus on digital relationship building: join online communities in your field, participate actively in relevant social media groups, attend virtual conferences and webinars, and schedule regular video calls with clients and collaborators when connectivity allows. Create valuable content to establish expertise. Consider occasional trips to regional hubs for in-person events if possible. Many successful rural freelancers build strong networks entirely online through consistent, helpful engagement in professional communities and by delivering exceptional work that generates referrals.",
      },
    ],
  },
  {
    id: "indie-game-developer",
    title: "Indie Game Developer",
    shortTitle: "Indie Game Developer",
    description: "A path for creating and publishing independent games, from concept to market.",
    keywords: ["game development", "indie games", "game design", "programming", "creative", "digital art"],
    skills: [
      {
        id: "game-fundamentals",
        title: "Game Design Fundamentals",
        description: "Learn core principles of game design, mechanics, and player experience.",
        status: "available" as const,
        x: 150,
        y: 100,
        mentorTips: [
          {
            name: "Jamal",
            avatar: "/default-avatar.png",
            tip: "Analyze games you love to understand what makes them engaging and how their mechanics work together.",
            email: "jamal.williams@example.com",
          },
          {
            name: "Sofia",
            avatar: "/default-avatar.png",
            tip: "Start by creating analog games (card or board games) to practice core design principles without technical barriers.",
            email: "sofia.rodriguez@example.com",
          },
        ],
        resources: [
          {
            title: "Game Design Document Template",
            url: "#",
          },
          {
            title: "Fundamentals of Game Design",
            url: "#",
          },
        ],
      },
      {
        id: "choose-engine",
        title: "Choose Your Engine & Tools",
        description: "Select appropriate game development tools based on your goals and resources.",
        status: "locked" as const,
        x: 300,
        y: 200,
        mentorTips: [
          {
            name: "Jamal",
            avatar: "/default-avatar.png",
            tip: "For beginners, choose user-friendly engines like Godot or GameMaker that require less programming knowledge.",
            email: "jamal.williams@example.com",
          },
          {
            name: "Sofia",
            avatar: "/default-avatar.png",
            tip: "Consider your game's needs - 2D games have different engine requirements than 3D games.",
            email: "sofia.rodriguez@example.com",
          },
        ],
        resources: [
          {
            title: "Game Engine Comparison Guide",
            url: "#",
          },
          {
            title: "Setting Up Your Development Environment",
            url: "#",
          },
        ],
      },
      {
        id: "core-skills",
        title: "Core Skills Development",
        description: "Build essential technical and creative skills for your chosen specialization.",
        status: "locked" as const,
        x: 450,
        y: 300,
        hasCertification: true,
        mentorTips: [
          {
            name: "Sofia",
            avatar: "/default-avatar.png",
            tip: "Focus on one area first (programming, art, or design) rather than trying to master everything at once.",
            email: "sofia.rodriguez@example.com",
          },
          {
            name: "Jamal",
            avatar: "/default-avatar.png",
            tip: "Create small, complete projects rather than ambitious ones that never get finished.",
            email: "jamal.williams@example.com",
          },
        ],
        resources: [
          {
            title: "Introduction to Game Programming",
            url: "#",
            isCertification: true,
          },
          {
            title: "Digital Art for Games",
            url: "#",
          },
        ],
      },
      {
        id: "first-game",
        title: "Create Your First Game",
        description: "Develop a simple but complete game to understand the full development cycle.",
        status: "locked" as const,
        x: 300,
        y: 400,
        mentorTips: [
          {
            name: "Jamal",
            avatar: "/default-avatar.png",
            tip: "Scope very small for your first game - a single mechanic executed well is better than many half-implemented features.",
            email: "jamal.williams@example.com",
          },
          {
            name: "Sofia",
            avatar: "/default-avatar.png",
            tip: "Get feedback early and often, even on rough prototypes, to identify issues before investing too much time.",
            email: "sofia.rodriguez@example.com",
          },
        ],
        resources: [
          {
            title: "Game Development Timeline Template",
            url: "#",
          },
          {
            title: "Playtesting Guide for Solo Developers",
            url: "#",
          },
        ],
      },
      {
        id: "community-building",
        title: "Community Building & Marketing",
        description: "Build an audience and market your games effectively.",
        status: "locked" as const,
        x: 150,
        y: 500,
        mentorTips: [
          {
            name: "Sofia",
            avatar: "/default-avatar.png",
            tip: "Start building your community as early as possible, sharing your development process transparently.",
            email: "sofia.rodriguez@example.com",
          },
          {
            name: "Jamal",
            avatar: "/default-avatar.png",
            tip: "Create a distinctive visual style or theme that makes your games instantly recognizable.",
            email: "jamal.williams@example.com",
          },
        ],
        resources: [
          {
            title: "Indie Game Marketing Checklist",
            url: "#",
          },
          {
            title: "Building a Community on Discord",
            url: "#",
          },
        ],
      },
      {
        id: "publishing-monetization",
        title: "Publishing & Monetization",
        description: "Release your games and develop sustainable income streams.",
        status: "locked" as const,
        x: 300,
        y: 600,
        mentorTips: [
          {
            name: "Jamal",
            avatar: "/default-avatar.png",
            tip: "Consider multiple platforms and monetization models - premium, free-to-play, and subscription all have different advantages.",
            email: "jamal.williams@example.com",
          },
          {
            name: "Sofia",
            avatar: "/default-avatar.png",
            tip: "Build relationships with other indie developers for cross-promotion opportunities.",
            email: "sofia.rodriguez@example.com",
          },
        ],
        resources: [
          {
            title: "Platform Publishing Guide",
            url: "#",
          },
          {
            title: "Indie Game Pricing Strategies",
            url: "#",
          },
        ],
      },
    ],
    connections: [
      { from: "game-fundamentals", to: "choose-engine" },
      { from: "choose-engine", to: "core-skills" },
      { from: "core-skills", to: "first-game" },
      { from: "first-game", to: "community-building" },
      { from: "community-building", to: "publishing-monetization" },
    ],
    faqs: [
      {
        question: "Do I need to know how to code to make games?",
        answer:
          "While coding knowledge is valuable, many modern game engines offer visual scripting options that require minimal traditional programming. Tools like GameMaker, Construct, or even Godot's visual scripting allow you to create games with little to no coding. However, learning basic programming concepts will significantly expand what you can create. Start with user-friendly engines and gradually learn programming alongside your game development. Many successful indie developers began with no coding experience and learned as they created their first games.",
      },
      {
        question: "How much does it cost to make an indie game?",
        answer:
          "Costs vary dramatically based on your approach. You can create games with essentially zero budget using free engines (Godot, Unity personal), open-source tools, and your own skills. Most indie developers spend between $0-$10,000 on their first commercial games, primarily covering software licenses, asset purchases, and possibly contractor help for specialized tasks. The biggest investment is typically your time. As you grow, you might invest in better equipment, paid assets, or hiring help for areas outside your expertise. Many successful indie games were created on shoestring budgets by solo developers or small teams.",
      },
      {
        question: "How long does it take to make an indie game?",
        answer:
          "Timeline varies based on scope, experience, and time commitment. Small games (like puzzle or arcade-style) can be completed in 1-3 months of part-time work. Medium-sized games typically take 6-12 months for a solo developer working part-time. Larger projects may require 1-2+ years even with a small team. For your first game, aim for something you can complete in 1-3 months to learn the process without burning out. Many successful indie developers started with extremely small games and gradually increased scope with experience.",
      },
      {
        question: "How do I stand out in a crowded market?",
        answer:
          "Focus on creating games with a unique hook or perspective rather than trying to compete with larger studios. This could be an innovative mechanic, distinctive art style, unusual theme, or underserved niche audience. Build a community around your development process by sharing regularly on social media and game development forums. Consider targeting platforms or genres with less competition. Polish is crucial - a small, highly-polished game will stand out more than a larger but rough experience. Finally, your marketing efforts matter tremendously - even great games need visibility to find their audience.",
      },
      {
        question: "Can I make a living as an indie game developer?",
        answer:
          "Yes, but it typically takes time and multiple releases to build sustainable income. Most successful indie developers didn't achieve financial stability with their first game. Consider a gradual approach: start part-time while maintaining other income, reinvest earnings from early games, and build your skills and audience with each release. Diversify income through multiple games, platforms, contract work, teaching, or Patreon support. Set realistic financial expectations - while blockbuster indie successes exist, most sustainable indie developers earn modest but sufficient incomes after establishing themselves over several years and multiple game releases.",
      },
    ],
  },
  {
    id: "neurodivergent-strategist",
    title: "Neurodivergent Learning Strategist",
    shortTitle: "Neurodivergent Learning Strategist",
    description:
      "A career path for neurodivergent individuals who want to leverage their unique perspectives to create better learning experiences.",
    keywords: ["neurodivergent", "education", "learning", "ADHD", "autism", "dyslexia", "inclusion"],
    skills: [
      {
        id: "understand-differences",
        title: "Understanding Learning Differences",
        description:
          "Develop knowledge about various neurodivergent conditions and how they affect learning processes.",
        status: "available" as const,
        x: 150,
        y: 100,
        mentorTips: [
          {
            name: "Alex",
            avatar: "/default-avatar.png",
            tip: "Start with your own experiences - document how you learn best and what challenges you've faced.",
            email: "alex.chen@example.com",
          },
          {
            name: "Priya",
            avatar: "/default-avatar.png",
            tip: "Look beyond clinical descriptions to neurodivergent communities for lived experiences and strategies.",
            email: "priya.patel@example.com",
          },
        ],
        resources: [
          {
            title: "Neurodiversity in Learning Contexts",
            url: "#",
          },
          {
            title: "Learning Differences Self-Assessment",
            url: "#",
          },
        ],
      },
      {
        id: "inclusive-tools",
        title: "Inclusive Education Tools",
        description: "Explore and evaluate tools, technologies, and methodologies that support diverse learners.",
        status: "locked" as const,
        x: 300,
        y: 200,
        mentorTips: [
          {
            name: "Priya",
            avatar: "/default-avatar.png",
            tip: "Test tools yourself rather than relying solely on reviews - what works for one neurodivergent person may not work for another.",
            email: "priya.patel@example.com",
          },
          {
            name: "Alex",
            avatar: "/default-avatar.png",
            tip: "Look for customizable tools that can be adapted to different learning preferences and needs.",
            email: "alex.chen@example.com",
          },
        ],
        resources: [
          {
            title: "Assistive Technology Evaluation Framework",
            url: "#",
          },
          {
            title: "Universal Design for Learning Resources",
            url: "#",
          },
        ],
      },
      {
        id: "learning-models",
        title: "Developing Learning Models",
        description: "Create personalized learning approaches based on neurodivergent strengths and needs.",
        status: "locked" as const,
        x: 450,
        y: 300,
        hasCertification: true,
        mentorTips: [
          {
            name: "Alex",
            avatar: "/default-avatar.png",
            tip: "Focus on strengths-based approaches rather than deficit-focused remediation.",
            email: "alex.chen@example.com",
          },
          {
            name: "Priya",
            avatar: "/default-avatar.png",
            tip: "Test your models with diverse neurodivergent individuals to ensure they're truly inclusive.",
            email: "priya.patel@example.com",
          },
        ],
        resources: [
          {
            title: "Strengths-Based Learning Design",
            url: "#",
            isCertification: true,
          },
          {
            title: "Cognitive Accessibility Guidelines",
            url: "#",
          },
        ],
      },
      {
        id: "certification",
        title: "Professional Certification",
        description: "Obtain relevant credentials to establish credibility in educational settings.",
        status: "locked" as const,
        x: 300,
        y: 400,
        hasCertification: true,
        mentorTips: [
          {
            name: "Priya",
            avatar: "/default-avatar.png",
            tip: "Look for certification programs that value lived experience alongside academic knowledge.",
            email: "priya.patel@example.com",
          },
          {
            name: "Alex",
            avatar: "/default-avatar.png",
            tip: "Request accommodations during certification processes - practicing what you'll advocate for others.",
            email: "alex.chen@example.com",
          },
        ],
        resources: [
          {
            title: "Educational Consultant Certification",
            url: "#",
            isCertification: true,
          },
          {
            title: "Accessibility Specialist Credentials",
            url: "#",
            isCertification: true,
          },
        ],
      },
      {
        id: "practical-application",
        title: "Practical Application",
        description: "Apply your expertise in educational settings or through independent consulting.",
        status: "locked" as const,
        x: 150,
        y: 500,
        mentorTips: [
          {
            name: "Alex",
            avatar: "/default-avatar.png",
            tip: "Start with volunteer opportunities to build experience and references.",
            email: "alex.chen@example.com",
          },
          {
            name: "Priya",
            avatar: "/default-avatar.png",
            tip: "Document your successes with data and testimonials to build a compelling portfolio.",
            email: "priya.patel@example.com",
          },
        ],
        resources: [
          {
            title: "Educational Consulting Business Guide",
            url: "#",
          },
          {
            title: "Case Study Documentation Templates",
            url: "#",
          },
        ],
      },
      {
        id: "advocacy-community",
        title: "Advocacy & Community Building",
        description: "Promote neurodiversity in education and build supportive professional networks.",
        status: "locked" as const,
        x: 300,
        y: 600,
        mentorTips: [
          {
            name: "Priya",
            avatar: "/default-avatar.png",
            tip: "Connect with other neurodivergent professionals to share resources and support.",
            email: "priya.patel@example.com",
          },
          {
            name: "Alex",
            avatar: "/default-avatar.png",
            tip: "Develop clear, accessible ways to explain neurodivergent needs to neurotypical educators.",
            email: "alex.chen@example.com",
          },
        ],
        resources: [
          {
            title: "Neurodiversity Advocacy Toolkit",
            url: "#",
          },
          {
            title: "Building Professional Learning Communities",
            url: "#",
          },
        ],
      },
    ],
    connections: [
      { from: "understand-differences", to: "inclusive-tools" },
      { from: "inclusive-tools", to: "learning-models" },
      { from: "learning-models", to: "certification" },
      { from: "certification", to: "practical-application" },
      { from: "practical-application", to: "advocacy-community" },
    ],
    faqs: [
      {
        question: "Do I need to disclose my neurodivergence to work in this field?",
        answer:
          "Disclosure is a personal choice, not a requirement. Many professionals in this field do share their neurodivergent identity as it adds credibility to their lived experience and helps clients relate, but others choose to focus solely on their professional expertise. You can decide what feels comfortable at different stages of your career and with different clients or employers. Some professionals disclose generally ('I have experience with neurodivergence') without specifying their condition. Consider the context, potential benefits, and your comfort level when making disclosure decisions.",
      },
      {
        question: "What if I don't have formal education credentials?",
        answer:
          "While formal education can be helpful, it's not the only path to this career. Many successful learning strategists come from non-traditional backgrounds and leverage their lived experience, self-study, and practical knowledge. Consider starting with certificate programs specifically in learning differences or accessibility, which are often more accessible than degree programs. Build a portfolio of case studies demonstrating your effectiveness. Partner with credentialed professionals initially if working in formal education settings. Organizations led by neurodivergent individuals often value lived experience and demonstrated skills over traditional credentials.",
      },
      {
        question: "How do I balance accommodating diverse needs when they sometimes conflict?",
        answer:
          "This is one of the field's biggest challenges. Start by recognizing that no single approach works for everyone. Focus on personalization and flexibility rather than one-size-fits-all solutions. Develop a toolkit of multiple strategies for common learning goals. When working with groups, incorporate multiple modalities and options so learners can choose what works best for them. Be transparent about potential conflicts and involve neurodivergent individuals in finding solutions. Remember that the goal is equitable access to learning, which may look different for different people.",
      },
      {
        question: "How do I handle imposter syndrome as a neurodivergent professional?",
        answer:
          "Imposter syndrome is common among neurodivergent professionals. Combat it by documenting your successes and positive feedback, connecting with other neurodivergent professionals for support, recognizing that your lived experience provides valuable insights, and focusing on the tangible differences you make for learners. Remember that your unique perspective is precisely what makes your contribution valuable. Start with areas where you feel most confident, and gradually expand your practice. Consider working with a mentor who understands neurodivergence to help build your professional confidence.",
      },
      {
        question: "What settings can I work in with this expertise?",
        answer:
          "Your options include: independent consulting for families navigating educational systems; working within schools, colleges, or universities as a learning specialist; developing curriculum or training for educational technology companies; conducting workshops for educators on neurodiversity inclusion; creating and selling specialized learning resources; coaching neurodivergent students directly; working with workplace learning and development teams on accessibility; or advocacy organizations focused on educational equity. Many professionals combine several of these approaches, starting with part-time or volunteer work while building their practice and reputation.",
      },
    ],
  },
]

export default function SkillTreePage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const pathParam = searchParams.get("path")

  // Set the selected path based on URL parameter or default to the first path
  useEffect(() => {
    if (pathParam) {
      setSelectedPath(pathParam)
    } else if (skillPaths.length > 0 && !selectedPath) {
      setSelectedPath(skillPaths[0].id)
    }
  }, [pathParam, selectedPath])

  const selectedPathData = skillPaths.find((path) => path.id === selectedPath)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Skill Trees</h1>
        <p className="text-muted-foreground">
          Explore interactive career paths designed for unconventional and accessible careers
        </p>
      </div>

      <Tabs value={selectedPath || ""} onValueChange={setSelectedPath} className="w-full">
        <TabsList className="mb-8 flex w-full flex-wrap justify-start gap-2">
          {skillPaths.map((path) => (
            <TabsTrigger key={path.id} value={path.id} className="flex-shrink-0">
              {path.shortTitle || path.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {skillPaths.map((path) => (
          <TabsContent key={path.id} value={path.id} className="w-full">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{path.title}</h2>
                  <p className="text-muted-foreground">{path.description}</p>
                </div>
                <CareerPathRating
                  pathId={path.id}
                  initialRating={pathRatings[path.id as keyof typeof pathRatings]?.rating || 85}
                  totalVotes={pathRatings[path.id as keyof typeof pathRatings]?.votes || 0}
                />
              </div>
            </div>

            <SkillPath
              id={path.id}
              title={path.title}
              description={path.description}
              skills={path.skills}
              connections={path.connections}
            />

            <CareerPathFAQ faqs={path.faqs} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
