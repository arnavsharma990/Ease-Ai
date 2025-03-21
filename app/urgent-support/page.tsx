'use client'

import { useEffect } from "react"
import { FeatureLayout } from "@/components/feature-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Globe, ExternalLink } from "lucide-react"
import Link from "next/link"

const crisisResources = [
  {
    name: "NIMHANS Mental Health Helpline",
    description: "24/7 toll-free mental health helpline by National Institute of Mental Health and Neurosciences",
    phone: "080-4611 0007",
    website: "https://nimhans.ac.in",
    urgent: true
  },
  {
    name: "iCall Psychosocial Helpline",
    description: "Free counseling service by TISS (Mon-Sat, 8 AM to 10 PM IST)",
    phone: "022-25521111",
    website: "https://icallhelpline.org",
    urgent: true
  },
  {
    name: "Vandrevala Foundation",
    description: "24/7 helpline for emotional crisis and distress",
    phone: "1860-2662-345",
    website: "https://www.vandrevalafoundation.com",
    urgent: false
  },
  {
    name: "AASRA",
    description: "24/7 helpline for those feeling suicidal or in emotional distress",
    phone: "91-9820466726",
    website: "http://www.aasra.info",
    urgent: false
  },
  {
    name: "Sneha India",
    description: "Suicide prevention organization (24/7 helpline)",
    phone: "044-24640050",
    website: "https://snehaindia.org",
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
              If you or someone you know is in immediate danger, please call emergency services immediately.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-red-700 dark:text-red-400">
            <div className="flex flex-col md:flex-row gap-4">
              <Button size="lg" variant="destructive" className="gap-2" asChild>
                <a href="tel:112">
                  <Phone className="h-4 w-4" />
                  Call 112 (Emergency Services)
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-red-300 text-red-700 gap-2" asChild>
                <a href="tel:08046110007">
                  <Phone className="h-4 w-4" />
                  Call NIMHANS Helpline
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
              <strong>You are not alone.</strong> Help is available 24/7, and recovery is possible.
            </p>
          </CardContent>
        </Card>
      </div>
    </FeatureLayout>
  )
} 