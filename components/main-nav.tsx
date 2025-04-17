'use client'

import { NavLink } from "@/components/nav-link"
import Link from "next/link"
import { cn } from "@/lib/utils"

const features = [
  { title: 'AI Chat', href: '/chat' },
  { title: 'Community', href: '/community' },
  { title: 'Consultation', href: '/consultation' },
  { title: 'Analytics', href: '/profile/analytics' },
  { title: 'Resources', href: '/resources' },
  { title: 'Wellness Tools', href: '/wellness' },
]

const wellnessTools = [
  { title: 'Breathing', href: '/breathing' },
  { title: 'Mood', href: '/mood' },
  { title: 'Journal', href: '/journal' },
]

export function MainNav() {
  return (
    <div className="hidden md:flex gap-6">
      {features.map((item) => (
        item.title === 'Wellness Tools' ? (
          <div key={item.title} className="relative group">
            <NavLink href={item.href}>
              {item.title}
            </NavLink>
            <div className="absolute left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-border p-2 min-w-[160px]">
                <div className="flex flex-col gap-1">
                  {wellnessTools.map((tool) => (
                    <Link
                      key={tool.title}
                      href={tool.href}
                      className={cn(
                        "block w-full px-4 py-2 text-sm rounded-md",
                        "hover:bg-purple-50 dark:hover:bg-purple-900/20",
                        "text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400",
                        "transition-colors duration-200"
                      )}
                    >
                      {tool.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NavLink key={item.title} href={item.href}>
            {item.title}
          </NavLink>
        )
      ))}
    </div>
  )
} 