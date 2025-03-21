'use client'

import { useEffect } from "react"
import { FeatureLayout } from "@/components/feature-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Globe, ExternalLink } from "lucide-react"
import Link from "next/link"

const crisisResources = [
  {
    name: "988 Suicide & Crisis Lifeline",
    description: "24/7, free and confidential support for people in distress",
    phone: "988",
    website: "https://988lifeline.org",
    urgent: true
  },
  {
    name: "Crisis Text Line",
    description: "Text HOME to 741741 to connect with a Crisis Counselor",
    phone: "Text HOME to 741741",
    website: "https://www.crisistextline.org",
    urgent: true
  },
  {
    name: "SAMHSA National Helpline",
    description: "Treatment referral and information service (English and Spanish)",
    phone: "1-800-662-4357",
    website: "https://www.samhsa.gov/find-help/national-helpline",
    urgent: false
  },
  {
    name: "Veterans Crisis Line",
    description: "For veterans and their loved ones",
    phone: "988, Press 1",
    website: "https://www.veteranscrisisline.net",
    urgent: false
  },
  {
    name: "The Trevor Project",
    description: "Crisis intervention for LGBTQ young people",
    phone: "1-866-488-7386",
    website: "https://www.thetrevorproject.org",
    urgent: false
  }
]

export default function UrgentSupportPage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <FeatureLayout title="Urgent Support">
      <div className="space-y-8">
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/50">
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-400">Need immediate help?</CardTitle>
            <CardDescription className="text-red-600/90 dark:text-red-300/90">
              If you or someone you know is in immediate danger, please call emergency services.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-red-700 dark:text-red-400">
            <div className="flex flex-col md:flex-row gap-4">
              <Button size="lg" variant="destructive" className="gap-2" asChild>
                <a href="tel:911">
                  <Phone className="h-4 w-4" />
                  Call 911 (US) / 999 (UK)
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-red-300 text-red-700 gap-2" asChild>
                <a href="tel:988">
                  <Phone className="h-4 w-4" />
                  Call 988 Suicide & Crisis Lifeline
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {crisisResources.map(resource => (
            <Card key={resource.name} className={resource.urgent ? "border-red-200 dark:border-red-900/50" : ""}>
              <CardHeader>
                <CardTitle className={resource.urgent ? "text-red-700 dark:text-red-400" : ""}>
                  {resource.name}
                </CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{resource.phone}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <Link href={resource.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4" />
                    Visit Website
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Remember</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Mental health emergencies are real medical emergencies that require immediate attention. 
              Don't hesitate to reach out for help if you're experiencing:
            </p>
            <ul>
              <li>Thoughts of harming yourself or others</li>
              <li>Overwhelming feelings of despair or hopelessness</li>
              <li>Severe anxiety or panic attacks that don't subside</li>
              <li>Dangerous or concerning behavior due to substance use</li>
              <li>Any situation where you feel unsafe</li>
            </ul>
            <p>
              <strong>You are not alone.</strong> Help is available, and recovery is possible.
            </p>
          </CardContent>
        </Card>
      </div>
    </FeatureLayout>
  )
} 