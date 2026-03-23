import React from "react"
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
import { DIFFICULTY_CONFIG } from "../utils/constants"
import type { Difficulty } from "../types"

interface Props {
  userName?: string
  onStartGame: (pairs: number, difficulty: Difficulty) => void
  onShowLeaderboard: () => void
  onReturnHome: () => void
}

const DIFFICULTY_ICONS: Record<Difficulty, string> = {
  easy: "🌟", medium: "🔥", hard: "⚡",
}
const DIFFICULTY_DESC: Record<Difficulty, string> = {
  easy: "Perfect for beginners",
  medium: "A real challenge",
  hard: "Cards shuffle too!",
}
const DIFFICULTY_COLORS: Record<Difficulty, { bg: string; border: string; btn: string }> = {
  easy: { bg: "#064E3B", border: "#059669", btn: "#065F46" },
  medium: { bg: "#78350F", border: "#D97706", btn: "#92400E" },
  hard: { bg: "#7F1D1D", border: "#DC2626", btn: "#991B1B" },
}

export function MenuScreen({ userName, onStartGame, onShowLeaderboard, onReturnHome }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mind Pairs</Text>
        {userName && (
          <Text style={styles.welcome}>Welcome, <Text style={styles.bold}>{userName}</Text>!</Text>
        )}
        <TouchableOpacity onPress={onReturnHome}>
          <Text style={styles.changePlayer}>🏠 Change Player</Text>
        </TouchableOpacity>
      </View>

      {/* Difficulty cards */}
      {(Object.entries(DIFFICULTY_CONFIG) as [Difficulty, typeof DIFFICULTY_CONFIG.easy][]).map(([diff, config]) => {
        const colors = DIFFICULTY_COLORS[diff]
        return (
          <View key={diff} style={[styles.card, { backgroundColor: colors.bg, borderColor: colors.border }]}>
            <Text style={styles.diffIcon}>{DIFFICULTY_ICONS[diff]}</Text>
            <Text style={styles.diffLabel}>{config.label}</Text>
            <Text style={styles.diffDesc}>{DIFFICULTY_DESC[diff]}</Text>
            <Text style={styles.badge}>+{config.timeBonus}s bonus per pair</Text>
            <View style={styles.pairsGrid}>
              {config.pairs.map((pairs) => (
                <TouchableOpacity
                  key={pairs}
                  style={[styles.pairBtn, { backgroundColor: colors.btn, borderColor: colors.border }]}
                  onPress={() => onStartGame(pairs, diff)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.pairBtnText}>{pairs} Pairs</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )
      })}

      {/* Leaderboard */}
      <TouchableOpacity style={styles.leaderboardBtn} onPress={onShowLeaderboard} activeOpacity={0.8}>
        <Text style={styles.leaderboardBtnText}>🏆 View Leaderboard</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingTop: 60, paddingBottom: 40, gap: 16 },
  header: { alignItems: "center", marginBottom: 8, gap: 4 },
  title: { fontSize: 42, fontWeight: "900", color: "white" },
  welcome: { fontSize: 18, color: "rgba(255,255,255,0.85)" },
  bold: { fontWeight: "800", color: "white" },
  changePlayer: { fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 4 },
  card: {
    borderRadius: 20, borderWidth: 2, padding: 18, gap: 8,
  },
  diffIcon: { fontSize: 36, textAlign: "center" },
  diffLabel: { fontSize: 22, fontWeight: "800", color: "white", textAlign: "center" },
  diffDesc: { fontSize: 14, color: "rgba(255,255,255,0.65)", textAlign: "center" },
  badge: {
    alignSelf: "center", backgroundColor: "rgba(255,255,255,0.15)",
    color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: "600",
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
  },
  pairsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 4 },
  pairBtn: {
    flex: 1, minWidth: "45%", height: 44, borderRadius: 12,
    borderWidth: 1, justifyContent: "center", alignItems: "center",
  },
  pairBtnText: { color: "white", fontWeight: "700", fontSize: 15 },
  leaderboardBtn: {
    height: 52, borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 2, borderColor: "rgba(255,255,255,0.3)",
    justifyContent: "center", alignItems: "center",
    marginTop: 4,
  },
  leaderboardBtnText: { color: "white", fontWeight: "700", fontSize: 17 },
})
