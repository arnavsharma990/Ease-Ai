'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link 
      href={href}
      className={cn(
        "relative text-sm font-medium transition-colors duration-300 hover:text-primary",
        "group flex items-center gap-1 py-1",
        isActive ? "text-primary" : "text-muted-foreground",
      )}
    >
      <span className="relative">
        {children}
        <span className={cn(
          "absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-purple-600 to-blue-600",
          "transition-all duration-300 group-hover:w-full",
          isActive ? "w-full" : ""
        )} />
      </span>
    </Link>
  )
} 