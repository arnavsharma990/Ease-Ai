"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={false}
      themes={["light", "dark"]}
      value={{
        light: "light",
        dark: "dark",
        system: "system",
      }}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

