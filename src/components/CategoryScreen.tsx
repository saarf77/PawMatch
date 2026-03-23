import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import type { Category, Difficulty } from "../types"
import { useScale } from "../utils/useScale"

interface Props {
  pairs: number
  difficulty: Difficulty
  onSelectCategory: (category: Category) => void
  onBack: () => void
}

const CATEGORIES: { id: Category; label: string; emoji: string; desc: string }[] = [
  { id: "animals", label: "Animals", emoji: "🐾", desc: "25 cute animals" },
  { id: "flags", label: "Flags", emoji: "🌍", desc: "50 world flags" },
  { id: "cars", label: "Cars", emoji: "🚗", desc: "25 car brands" },
]

export function CategoryScreen({ pairs, difficulty, onSelectCategory, onBack }: Props) {
  const { scale } = useScale()
  const cardWidth = Math.round(140 * scale)

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={[styles.backText, { fontSize: Math.round(14 * scale) }]}>◀ Back</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { fontSize: Math.round(30 * scale) }]}>Choose a Category</Text>
      <Text style={[styles.subtitle, { fontSize: Math.round(15 * scale) }]}>{pairs} pairs · {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</Text>

      <View style={styles.grid}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.card, { width: cardWidth, paddingVertical: Math.round(28 * scale) }]}
            onPress={() => onSelectCategory(cat.id)}
            activeOpacity={0.75}
          >
            <Text style={[styles.emoji, { fontSize: Math.round(44 * scale) }]}>{cat.emoji}</Text>
            <Text style={[styles.label, { fontSize: Math.round(20 * scale) }]}>{cat.label}</Text>
            <Text style={[styles.desc, { fontSize: Math.round(13 * scale) }]}>{cat.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    alignItems: "center",
    gap: 16,
  },
  backBtn: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  backText: { color: "white", fontWeight: "700", fontSize: 14 },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "white",
    textAlign: "center",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.6)",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    width: 140,
    paddingVertical: 28,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    gap: 8,
  },
  emoji: { fontSize: 44 },
  label: { fontSize: 20, fontWeight: "800", color: "white" },
  desc: { fontSize: 13, color: "rgba(255,255,255,0.6)", textAlign: "center" },
})
