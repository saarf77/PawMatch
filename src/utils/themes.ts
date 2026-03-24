import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import type { CardTheme } from "../types"

const STORAGE_KEY = "card_theme"

export const THEMES: Record<CardTheme, { back: string; border: string; question: string; label: string }> = {
  classic: { back: "#6D28D9",                  border: "rgba(255,255,255,0.3)",  question: "rgba(255,255,255,0.9)", label: "Classic" },
  dark:    { back: "#111827",                  border: "rgba(255,255,255,0.15)", question: "rgba(255,255,255,0.7)", label: "Dark"    },
  neon:    { back: "#0F172A",                  border: "#22D3EE",                question: "#22D3EE",               label: "Neon"    },
  minimal: { back: "rgba(255,255,255,0.1)",    border: "rgba(255,255,255,0.4)",  question: "rgba(255,255,255,0.8)", label: "Minimal" },
}

export async function saveTheme(theme: CardTheme): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, theme)
}

export async function loadTheme(): Promise<CardTheme> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY)
    if (stored && stored in THEMES) {
      return stored as CardTheme
    }
  } catch {
    // fall through to default
  }
  return "classic"
}

interface ThemeContextValue {
  theme: CardTheme
  setTheme: (t: CardTheme) => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "classic",
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [theme, setThemeState] = useState<CardTheme>("classic")

  useEffect(() => {
    loadTheme().then((saved) => setThemeState(saved))
  }, [])

  const setTheme = (t: CardTheme) => {
    setThemeState(t)
    saveTheme(t)
  }

  return React.createElement(
    ThemeContext.Provider,
    { value: { theme, setTheme } },
    children
  )
}

export function useTheme(): ThemeContextValue & { themeConfig: typeof THEMES[CardTheme] } {
  const ctx = useContext(ThemeContext)
  return {
    ...ctx,
    themeConfig: THEMES[ctx.theme],
  }
}
