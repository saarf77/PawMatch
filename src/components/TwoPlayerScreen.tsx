import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import type { Category } from "../types"

interface Props {
  onStartGame: (p1Name: string, p2Name: string, pairs: number, category: Category) => void
  onBack: () => void
}

const PAIRS_OPTIONS = [6, 8, 10, 12]

const CATEGORY_OPTIONS: { value: Category; label: string; icon: string }[] = [
  { value: "animals", label: "Animals", icon: "🐾" },
  { value: "flags",   label: "Flags",   icon: "🏳️" },
  { value: "cars",    label: "Cars",    icon: "🚗" },
  { value: "food",    label: "Food",    icon: "🍕" },
]

export function TwoPlayerScreen({ onStartGame, onBack }: Props) {
  const insets = useSafeAreaInsets()
  const [p1Name, setP1Name] = useState("Player 1")
  const [p2Name, setP2Name] = useState("Player 2")
  const [selectedPairs, setSelectedPairs] = useState<number>(8)
  const [selectedCategory, setSelectedCategory] = useState<Category>("animals")

  const handleStart = () => {
    const name1 = p1Name.trim() || "Player 1"
    const name2 = p2Name.trim() || "Player 2"
    onStartGame(name1, name2, selectedPairs, selectedCategory)
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>2 Player</Text>
        <Text style={styles.subtitle}>Hot-seat memory battle</Text>
      </View>

      {/* Player Names */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Player Names</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Player 1</Text>
          <TextInput
            style={styles.input}
            value={p1Name}
            onChangeText={setP1Name}
            placeholder="Player 1"
            placeholderTextColor="rgba(255,255,255,0.35)"
            maxLength={20}
            selectTextOnFocus
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Player 2</Text>
          <TextInput
            style={styles.input}
            value={p2Name}
            onChangeText={setP2Name}
            placeholder="Player 2"
            placeholderTextColor="rgba(255,255,255,0.35)"
            maxLength={20}
            selectTextOnFocus
          />
        </View>
      </View>

      {/* Pairs Selector */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Number of Pairs</Text>
        <View style={styles.optionRow}>
          {PAIRS_OPTIONS.map((pairs) => (
            <TouchableOpacity
              key={pairs}
              style={[styles.optionBtn, selectedPairs === pairs && styles.optionBtnActive]}
              onPress={() => setSelectedPairs(pairs)}
              activeOpacity={0.75}
            >
              <Text style={[styles.optionBtnText, selectedPairs === pairs && styles.optionBtnTextActive]}>
                {pairs}
              </Text>
              <Text style={[styles.optionBtnSub, selectedPairs === pairs && styles.optionBtnTextActive]}>
                pairs
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Category Selector */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Category</Text>
        <View style={styles.optionRow}>
          {CATEGORY_OPTIONS.map(({ value, label, icon }) => (
            <TouchableOpacity
              key={value}
              style={[styles.categoryBtn, selectedCategory === value && styles.optionBtnActive]}
              onPress={() => setSelectedCategory(value)}
              activeOpacity={0.75}
            >
              <Text style={styles.categoryIcon}>{icon}</Text>
              <Text style={[styles.categoryLabel, selectedCategory === value && styles.optionBtnTextActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.startBtn} onPress={handleStart} activeOpacity={0.85}>
        <Text style={styles.startBtnText}>Start Game</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.75}>
        <Text style={styles.backBtnText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 4,
    gap: 4,
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.65)",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    padding: 18,
    gap: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "rgba(255,255,255,0.85)",
    marginBottom: 2,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255,255,255,0.6)",
  },
  input: {
    height: 46,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    paddingHorizontal: 14,
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
  },
  optionBtn: {
    width: 68,
    height: 60,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  optionBtnActive: {
    backgroundColor: "rgba(139,92,246,0.55)",
    borderColor: "#A78BFA",
  },
  optionBtnText: {
    fontSize: 20,
    fontWeight: "800",
    color: "rgba(255,255,255,0.75)",
  },
  optionBtnSub: {
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
    fontWeight: "600",
  },
  optionBtnTextActive: {
    color: "white",
  },
  categoryBtn: {
    width: 74,
    height: 68,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  categoryIcon: {
    fontSize: 26,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(255,255,255,0.65)",
  },
  startBtn: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "rgba(139,92,246,0.75)",
    borderWidth: 2,
    borderColor: "#A78BFA",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  startBtnText: {
    color: "white",
    fontWeight: "800",
    fontSize: 18,
  },
  backBtn: {
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },
  backBtnText: {
    color: "rgba(255,255,255,0.65)",
    fontWeight: "700",
    fontSize: 15,
  },
})
