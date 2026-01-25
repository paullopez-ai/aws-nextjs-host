"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-sm text-muted-foreground" aria-hidden="true">
        ☀️
      </span>
      <SwitchPrimitive.Root
        checked={isDark}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "bg-input data-[checked]:bg-primary"
        )}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
            "data-[checked]:translate-x-5 data-[unchecked]:translate-x-0"
          )}
        />
      </SwitchPrimitive.Root>
      <span className="text-sm text-muted-foreground" aria-hidden="true">
        🌙
      </span>
    </div>
  )
}
