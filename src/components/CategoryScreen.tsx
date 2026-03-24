import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import type { Category, Difficulty, GameMode } from "../types"
import { useScale } from "../utils/useScale"

interface Props {
  pairs: number
  difficulty: Difficulty
  onSelectCategory: (category: Category, gameMode: GameMode) => void
  onBack: () => void
}

const CATEGORIES: { id: Category; label: string; emoji: string; desc: string }[] = [
  { id: "animals", label: "Animals", emoji: "🐾", desc: "25 cute animals" },
  { id: "flags",   label: "Flags",   emoji: "🌍", desc: "50 world flags" },
  { id: "cars",    label: "Cars",    emoji: "🚗", desc: "25 car brands" },
  { id: "food",    label: "Food",    emoji: "🍕", desc: "25 tasty foods" },
]

const GAME_MODES: { id: GameMode; label: string; emoji: string; desc: string }[] = [
  { id: "classic",     label: "Classic",     emoji: "🃏", desc: "Standard memory game" },
  { id: "speed",       label: "Speed",       emoji: "⚡", desc: "Beat your best time" },
  { id: "oneshot",     label: "One-Shot",    emoji: "💀", desc: "One wrong = game over" },
  { id: "suddenDeath", label: "Sudden Death",emoji: "🔥", desc: "Wrong flip = all revealed" },
]

export function CategoryScreen({ pairs, difficulty, onSelectCategory, onBack }: Props) {
  const { scale } = useScale()
  const [selectedCategory, setSelectedCategory] = useState<Category>("animals")
  const [selectedMode, setSelectedMode] = useState<GameMode>("classic")
  const cardWidth = Math.round(140 * scale)

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={[styles.backText, { fontSize: Math.round(14 * scale) }]}>◀ Back</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { fontSize: Math.round(28 * scale) }]}>Choose Category</Text>
      <Text style={[styles.subtitle, { fontSize: Math.round(15 * scale) }]}>
        {pairs} pairs · {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </Text>

      {/* Category selector */}
      <View style={styles.grid}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.card,
              { width: cardWidth, paddingVertical: Math.round(20 * scale) },
              selectedCategory === cat.id && styles.cardSelected,
            ]}
            onPress={() => setSelectedCategory(cat.id)}
            activeOpacity={0.75}
          >
            {selectedCategory === cat.id && <Text style={styles.checkmark}>✓</Text>}
            <Text style={[styles.emoji, { fontSize: Math.round(36 * scale) }]}>{cat.emoji}</Text>
            <Text style={[styles.label, { fontSize: Math.round(16 * scale) }]}>{cat.label}</Text>
            <Text style={[styles.desc, { fontSize: Math.round(11 * scale) }]}>{cat.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Mode selector */}
      <Text style={[styles.sectionTitle, { fontSize: Math.round(18 * scale) }]}>Game Mode</Text>
      <View style={styles.modeGrid}>
        {GAME_MODES.map((mode) => (
          <TouchableOpacity
            key={mode.id}
            style={[
              styles.modeCard,
              selectedMode === mode.id && styles.modeCardSelected,
            ]}
            onPress={() => setSelectedMode(mode.id)}
            activeOpacity={0.75}
          >
            <Text style={[styles.modeEmoji, { fontSize: Math.round(24 * scale) }]}>{mode.emoji}</Text>
            <View style={styles.modeText}>
              <Text style={[styles.modeLabel, { fontSize: Math.round(14 * scale) }]}>{mode.label}</Text>
              <Text style={[styles.modeDesc, { fontSize: Math.round(11 * scale) }]}>{mode.desc}</Text>
            </View>
            {selectedMode === mode.id && <Text style={styles.modeCheck}>✓</Text>}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.startBtn, { height: Math.round(52 * scale) }]}
        onPress={() => onSelectCategory(selectedCategory, selectedMode)}
        activeOpacity={0.8}
      >
        <Text style={[styles.startBtnText, { fontSize: Math.round(18 * scale) }]}>Start Game →</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 32,
    alignItems: "center",
    gap: 12,
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
  title: { fontSize: 28, fontWeight: "900", color: "white", textAlign: "center", marginTop: 8 },
  subtitle: { fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 4 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "white", alignSelf: "flex-start", marginTop: 8 },
  grid: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    width: 140,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    gap: 6,
  },
  cardSelected: {
    backgroundColor: "rgba(139,92,246,0.35)",
    borderColor: "#A78BFA",
  },
  checkmark: {
    position: "absolute",
    top: 8,
    right: 10,
    color: "#A78BFA",
    fontWeight: "900",
    fontSize: 16,
  },
  emoji: { fontSize: 36 },
  label: { fontSize: 16, fontWeight: "800", color: "white" },
  desc: { fontSize: 11, color: "rgba(255,255,255,0.6)", textAlign: "center" },
  modeGrid: {
    width: "100%",
    gap: 8,
  },
  modeCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
  },
  modeCardSelected: {
    backgroundColor: "rgba(139,92,246,0.3)",
    borderColor: "#A78BFA",
  },
  modeEmoji: { fontSize: 24 },
  modeText: { flex: 1 },
  modeLabel: { fontSize: 14, fontWeight: "800", color: "white" },
  modeDesc: { fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2 },
  modeCheck: { color: "#A78BFA", fontWeight: "900", fontSize: 16 },
  startBtn: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: "rgba(139,92,246,0.5)",
    borderWidth: 2,
    borderColor: "#A78BFA",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  startBtnText: { color: "white", fontWeight: "900", fontSize: 18 },
})
