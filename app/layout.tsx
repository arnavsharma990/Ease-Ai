import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/AuthContext"
import { UserProfileButton } from "@/components/user-profile-button"
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "./providers"
import { MainNav } from "@/components/main-nav"

// Optimize font loading
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  adjustFontFallback: true,
})

// Add metadata for better SEO and performance hints
export const metadata: Metadata = {
  title: "Sukoon",
  description: "Your AI Mental Health Companion",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head>
        <link rel="preconnect" href="https://openrouter.ai" />
        <link rel="preconnect" href="https://api.dicebear.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={cn(
        "min-h-screen bg-background antialiased",
        "transition-colors duration-300",
        "selection:bg-purple-200 selection:text-purple-900",
        "dark:selection:bg-purple-800 dark:selection:text-purple-100"
      )}>
        <Providers>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="relative min-h-screen">
                <div 
                  className="fixed inset-0 bg-gradient-to-b from-rose-50/90 via-rose-100/50 to-indigo-50/90 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 -z-10"
                  aria-hidden="true"
                />

                <div className="relative flex flex-col min-h-screen">
                  <header className="sticky top-0 z-50 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60">
                    <nav className="container flex h-16 items-center justify-between">
                      <div className="flex items-center gap-3 group">
                        <div className="relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-500" />
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sukoonAI%20logo-HcziUhbd1eIKlUo474fj9tI9blzLeT.png"
                            alt="Sukoon Logo"
                            width={32}
                            height={32}
                            className="relative rounded-lg transform group-hover:scale-105 transition duration-500"
                            priority
                          />
                        </div>
                        <Link 
                          href="/" 
                          className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
                        >
                          Sukoon
                        </Link>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <MainNav />
                        <Button 
                          variant="destructive" 
                          asChild
                          className="relative group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30"
                        >
                          <Link href="/urgent-support" prefetch className="relative z-10">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500 to-rose-600 group-hover:opacity-90 transition-opacity" />
                            <span className="relative">Urgent Support</span>
                          </Link>
                        </Button>
                        <ModeToggle />
                        <UserProfileButton />
                      </div>
                    </nav>
                  </header>

                  <main className="flex-1 container py-6 relative">
                    {children}
                  </main>

                  <footer className="border-t py-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
                    <div className="container text-center text-sm text-muted-foreground">
                      <p>Sukoon is an AI assistant for mental wellness support. Not a replacement for professional help.</p>
                      <p className="mt-2">
                        If you're experiencing a crisis, please contact a mental health professional or crisis hotline.
                      </p>
                    </div>
                  </footer>
                </div>
                <Toaster />
              </div>
            </ThemeProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}