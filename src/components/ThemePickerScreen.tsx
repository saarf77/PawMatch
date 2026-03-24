import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native"
import { loadTheme, saveTheme, THEMES } from "../utils/themes"
import type { CardTheme } from "../types"

interface Props {
  onBack: () => void
}

const THEME_KEYS: CardTheme[] = ["classic", "dark", "neon", "minimal"]

export function ThemePickerScreen({ onBack }: Props): React.ReactElement {
  const [selected, setSelected] = useState<CardTheme>("classic")

  useEffect(() => {
    loadTheme().then((t) => setSelected(t))
  }, [])

  async function handleSelect(theme: CardTheme) {
    setSelected(theme)
    await saveTheme(theme)
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.75}>
          <Text style={styles.backBtnText}>◀ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Card Theme</Text>
        <View style={styles.headerSpacer} />
      </View>

      <Text style={styles.subtitle}>Choose how the card backs look</Text>

      <ScrollView
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      >
        {THEME_KEYS.map((key) => {
          const cfg = THEMES[key]
          const isActive = selected === key

          return (
            <TouchableOpacity
              key={key}
              style={[
                styles.card,
                isActive && styles.cardActive,
              ]}
              onPress={() => handleSelect(key)}
              activeOpacity={0.8}
            >
              {/* Mini card preview */}
              <View
                style={[
                  styles.preview,
                  {
                    backgroundColor: cfg.back,
                    borderColor: cfg.border,
                  },
                ]}
              >
                <Text style={[styles.questionMark, { color: cfg.question }]}>?</Text>
              </View>

              {/* Label row */}
              <View style={styles.labelRow}>
                <Text style={styles.label}>{cfg.label}</Text>
                {isActive && (
                  <View style={styles.checkCircle}>
                    <Text style={styles.checkMark}>✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 56,
    paddingHorizontal: 20,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  backBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  backBtnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "900",
    color: "white",
  },
  headerSpacer: {
    width: 72, // mirrors backBtn width so title stays centred
  },

  subtitle: {
    textAlign: "center",
    color: "rgba(255,255,255,0.65)",
    fontSize: 15,
    marginBottom: 28,
  },

  // Grid of theme cards
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "center",
    paddingBottom: 40,
  },

  card: {
    width: 148,
    borderRadius: 18,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    gap: 12,
  },
  cardActive: {
    borderColor: "rgba(255,255,255,0.6)",
    backgroundColor: "rgba(255,255,255,0.14)",
  },

  // Mini card preview
  preview: {
    width: 72,
    height: 96,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  questionMark: {
    fontSize: 36,
    fontWeight: "900",
  },

  // Label row
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  label: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
  },
  checkMark: {
    color: "white",
    fontSize: 12,
    fontWeight: "900",
    lineHeight: 14,
  },
})
