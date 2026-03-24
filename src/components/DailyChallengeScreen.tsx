import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { DailyChallengeService } from "../services/DailyChallengeService"
import type { DailyChallenge } from "../types"

interface Props {
  onPlay: (challenge: DailyChallenge) => void
  onBack: () => void
}

const CATEGORY_ICONS: Record<string, string> = {
  animals: "🐾",
  flags:   "🏳️",
  cars:    "🚗",
  food:    "🍕",
}

const CATEGORY_LABELS: Record<string, string> = {
  animals: "Animals",
  flags:   "Flags",
  cars:    "Cars",
  food:    "Food",
}

const DIFFICULTY_ICONS: Record<string, string> = {
  easy:   "🌟",
  medium: "🔥",
  hard:   "⚡",
}

const DIFFICULTY_COLORS: Record<string, string> = {
  easy:   "#34D399",
  medium: "#FBBF24",
  hard:   "#F87171",
}

function formatDate(dateStr: string): string {
  // dateStr is "YYYY-MM-DD"
  const [year, month, day] = dateStr.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function DailyChallengeScreen({ onPlay, onBack }: Props) {
  const insets = useSafeAreaInsets()
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null)
  const [alreadyCompleted, setAlreadyCompleted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const ch = DailyChallengeService.getTodayChallenge()
      const done = await DailyChallengeService.hasCompletedToday()
      if (!cancelled) {
        setChallenge(ch)
        setAlreadyCompleted(done)
        setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerIcon}>📅</Text>
        <Text style={styles.title}>Daily Challenge</Text>
        {challenge && (
          <Text style={styles.dateText}>{formatDate(challenge.date)}</Text>
        )}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="rgba(255,255,255,0.7)" />
        </View>
      ) : challenge ? (
        <>
          {/* Challenge details card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Today's Challenge</Text>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>{CATEGORY_ICONS[challenge.category]}</Text>
                <Text style={styles.detailLabel}>Category</Text>
                <Text style={styles.detailValue}>{CATEGORY_LABELS[challenge.category]}</Text>
              </View>

              <View style={styles.detailDivider} />

              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>🃏</Text>
                <Text style={styles.detailLabel}>Pairs</Text>
                <Text style={styles.detailValue}>{challenge.pairs}</Text>
              </View>

              <View style={styles.detailDivider} />

              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>{DIFFICULTY_ICONS[challenge.difficulty]}</Text>
                <Text style={styles.detailLabel}>Difficulty</Text>
                <Text style={[styles.detailValue, { color: DIFFICULTY_COLORS[challenge.difficulty] }]}>
                  {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                </Text>
              </View>
            </View>

            <View style={styles.seedRow}>
              <Text style={styles.seedText}>Seed #{challenge.seed}</Text>
            </View>
          </View>

          {/* Completed badge */}
          {alreadyCompleted && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedIcon}>✅</Text>
              <Text style={styles.completedText}>Already completed today!</Text>
              <Text style={styles.completedSub}>Come back tomorrow for a new challenge.</Text>
            </View>
          )}

          {/* Play button */}
          <TouchableOpacity
            style={[styles.playBtn, alreadyCompleted && styles.playBtnDisabled]}
            onPress={() => onPlay(challenge)}
            disabled={alreadyCompleted}
            activeOpacity={0.85}
          >
            <Text style={styles.playBtnText}>
              {alreadyCompleted ? "Completed" : "Play Daily Challenge"}
            </Text>
          </TouchableOpacity>
        </>
      ) : null}

      {/* Back button */}
      <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.75}>
        <Text style={styles.backBtnText}>Back</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 16,
  },
  header: {
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  headerIcon: {
    fontSize: 52,
    textAlign: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "900",
    color: "white",
    textAlign: "center",
  },
  dateText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    padding: 20,
    gap: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  detailItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  detailDivider: {
    width: 1,
    height: 50,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  detailIcon: {
    fontSize: 28,
  },
  detailLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "white",
  },
  seedRow: {
    alignItems: "center",
  },
  seedText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    fontWeight: "600",
  },
  completedBadge: {
    backgroundColor: "rgba(52,211,153,0.12)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(52,211,153,0.35)",
    padding: 16,
    alignItems: "center",
    gap: 4,
  },
  completedIcon: {
    fontSize: 30,
  },
  completedText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#34D399",
    textAlign: "center",
  },
  completedSub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
  },
  playBtn: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "rgba(139,92,246,0.75)",
    borderWidth: 2,
    borderColor: "#A78BFA",
    justifyContent: "center",
    alignItems: "center",
  },
  playBtnDisabled: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.15)",
  },
  playBtnText: {
    color: "white",
    fontWeight: "800",
    fontSize: 17,
  },
  backBtn: {
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  backBtnText: {
    color: "rgba(255,255,255,0.6)",
    fontWeight: "700",
    fontSize: 15,
  },
})
