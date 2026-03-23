import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from "react-native"
import type { Score } from "../types"
import { LeaderboardService } from "../services/LeaderboardService"
import { formatTime } from "../utils/helpers"

interface Props {
  onBack: () => void
}

const DIFF_COLORS: Record<string, string> = {
  easy: "#065F46", medium: "#92400E", hard: "#991B1B",
}

const RANK_ICONS = ["🥇", "🥈", "🥉"]

export function LeaderboardScreen({ onBack }: Props) {
  const [scores, setScores] = useState<Score[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<"score" | "date">("score")

  useEffect(() => {
    LeaderboardService.getScores()
      .then(setScores)
      .finally(() => setLoading(false))
  }, [])

  const sorted = [...scores].sort((a, b) => {
    if (sortBy === "score") {
      if (b.score !== a.score) return b.score - a.score
      return a.time - b.time
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🏆 Leaderboard</Text>
        <View style={styles.sortRow}>
          <TouchableOpacity
            style={[styles.sortBtn, sortBy === "score" && styles.sortBtnActive]}
            onPress={() => setSortBy("score")}
          >
            <Text style={styles.sortBtnText}>By Score</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortBtn, sortBy === "date" && styles.sortBtnActive]}
            onPress={() => setSortBy("date")}
          >
            <Text style={styles.sortBtnText}>By Date</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator color="white" size="large" style={{ marginTop: 40 }} />
      ) : sorted.length === 0 ? (
        <Text style={styles.empty}>No scores yet. Be the first to play!</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {sorted.map((score, i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.rank}>{RANK_ICONS[i] ?? `#${i + 1}`}</Text>
              <View style={styles.rowMain}>
                <Text style={styles.rowName}>{score.userName}</Text>
                <Text style={styles.rowMeta}>{formatTime(score.time)} · {score.moves} moves · {score.date}</Text>
              </View>
              <View style={[styles.diffBadge, { backgroundColor: DIFF_COLORS[score.difficulty] }]}>
                <Text style={styles.diffText}>{score.difficulty}</Text>
              </View>
              <Text style={styles.rowScore}>{score.score.toLocaleString()}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.8}>
        <Text style={styles.backBtnText}>◀ Back to Menu</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 54 },
  header: { marginBottom: 16, gap: 12 },
  title: { fontSize: 32, fontWeight: "900", color: "white", textAlign: "center" },
  sortRow: { flexDirection: "row", gap: 8, justifyContent: "center" },
  sortBtn: {
    paddingHorizontal: 18, paddingVertical: 8, borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.2)",
  },
  sortBtnActive: { backgroundColor: "rgba(255,255,255,0.28)", borderColor: "rgba(255,255,255,0.5)" },
  sortBtnText: { color: "white", fontWeight: "600", fontSize: 14 },
  empty: { color: "rgba(255,255,255,0.7)", fontSize: 16, textAlign: "center", marginTop: 40 },
  row: {
    flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 14, padding: 12, marginBottom: 8,
  },
  rank: { fontSize: 22, width: 32, textAlign: "center" },
  rowMain: { flex: 1 },
  rowName: { color: "white", fontWeight: "700", fontSize: 15 },
  rowMeta: { color: "rgba(255,255,255,0.55)", fontSize: 12, marginTop: 2 },
  diffBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  diffText: { color: "white", fontSize: 11, fontWeight: "600" },
  rowScore: { color: "white", fontWeight: "800", fontSize: 16, minWidth: 54, textAlign: "right" },
  backBtn: {
    height: 50, borderRadius: 16, marginTop: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 2, borderColor: "rgba(255,255,255,0.3)",
    justifyContent: "center", alignItems: "center",
  },
  backBtnText: { color: "white", fontWeight: "700", fontSize: 16 },
})
