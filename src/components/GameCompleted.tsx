import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native"
import type { GameStats } from "../types"
import { formatTime } from "../utils/helpers"
import { calculateScore } from "../utils/gameUtils"

interface Props {
  stats: GameStats
  onPlayAgain: () => void
  onBackToMenu: () => void
}

function getPerformance(pairs: number, time: number, moves: number) {
  const perfectMoves = pairs * 2
  const efficiency = perfectMoves / Math.max(moves, 1)
  if (efficiency >= 0.9) return { emoji: "🏆", title: "Perfect!", message: "Amazing memory!" }
  if (efficiency >= 0.7) return { emoji: "⭐", title: "Great job!", message: "Very impressive!" }
  if (efficiency >= 0.5) return { emoji: "👏", title: "Good job!", message: "Keep practicing!" }
  return { emoji: "🎮", title: "You did it!", message: "Try again for a better score!" }
}

export function GameCompleted({ stats, onPlayAgain, onBackToMenu }: Props) {
  const perf = getPerformance(stats.pairs, stats.time, stats.moves)
  const finalScore = calculateScore(stats.pairs, stats.time, stats.moves, stats.difficulty)

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{perf.emoji}</Text>
      <Text style={styles.title}>{perf.title}</Text>
      <Text style={styles.message}>{perf.message}</Text>

      <View style={styles.statsCard}>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🏅</Text>
            <Text style={styles.statLabel}>Pairs</Text>
            <Text style={styles.statValue}>{stats.pairs}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🕐</Text>
            <Text style={styles.statLabel}>Time</Text>
            <Text style={styles.statValue}>{formatTime(stats.time)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>⚡</Text>
            <Text style={styles.statLabel}>Moves</Text>
            <Text style={styles.statValue}>{stats.moves}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🏆</Text>
            <Text style={styles.statLabel}>Score</Text>
            <Text style={styles.statValue}>{finalScore.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btn} onPress={onPlayAgain} activeOpacity={0.8}>
          <Text style={styles.btnText}>↺ Play Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={onBackToMenu} activeOpacity={0.8}>
          <Text style={styles.btnText}>🏠 Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24, gap: 16 },
  emoji: { fontSize: 72, textAlign: "center" },
  title: { fontSize: 40, fontWeight: "900", color: "white", textAlign: "center" },
  message: { fontSize: 20, color: "rgba(255,255,255,0.85)", textAlign: "center" },
  statsCard: {
    width: "100%", maxWidth: 340,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 20, padding: 20,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.2)",
  },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  statItem: { flex: 1, minWidth: "45%", alignItems: "center", gap: 4 },
  statIcon: { fontSize: 28 },
  statLabel: { fontSize: 13, color: "rgba(255,255,255,0.7)" },
  statValue: { fontSize: 26, fontWeight: "800", color: "white" },
  buttons: { flexDirection: "row", gap: 12, marginTop: 8 },
  btn: {
    height: 52, paddingHorizontal: 28, borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 2, borderColor: "rgba(255,255,255,0.3)",
    justifyContent: "center", alignItems: "center",
  },
  btnText: { color: "white", fontWeight: "700", fontSize: 16 },
})
