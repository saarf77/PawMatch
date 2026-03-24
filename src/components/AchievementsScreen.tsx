import React, { useEffect, useState, useCallback } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native"
import { AchievementService } from "../services/AchievementService"
import type { Achievement } from "../types"

interface Props {
  onBack: () => void
}

export function AchievementsScreen({ onBack }: Props) {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  const loadAchievements = useCallback(async () => {
    setLoading(true)
    try {
      const data = await AchievementService.getAchievements()
      setAchievements(data)
    } catch (e) {
      console.error("AchievementsScreen load error:", e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAchievements()
  }, [loadAchievements])

  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const total = AchievementService.ALL_ACHIEVEMENTS.length

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Achievements</Text>

        {/* Progress pill */}
        <View style={styles.progressPill}>
          <Text style={styles.progressText}>
            {unlockedCount} / {total} unlocked
          </Text>
          {/* Progress bar */}
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: total > 0 ? `${(unlockedCount / total) * 100}%` : "0%" },
              ]}
            />
          </View>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="rgba(255,255,255,0.7)" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </ScrollView>
      )}
    </View>
  )
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const { unlocked, emoji, title, description, unlockedAt } = achievement

  const formattedDate = unlockedAt
    ? new Date(unlockedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null

  return (
    <View
      style={[
        styles.card,
        unlocked ? styles.cardUnlocked : styles.cardLocked,
      ]}
    >
      {/* Emoji container */}
      <View style={[styles.emojiWrap, unlocked ? styles.emojiWrapUnlocked : styles.emojiWrapLocked]}>
        <Text style={[styles.emoji, !unlocked && styles.emojiDim]}>{emoji}</Text>
        {!unlocked && (
          <View style={styles.lockOverlay}>
            <Text style={styles.lockIcon}>🔒</Text>
          </View>
        )}
      </View>

      {/* Text info */}
      <View style={styles.cardBody}>
        <Text style={[styles.achievementTitle, !unlocked && styles.textDim]}>{title}</Text>
        <Text style={[styles.achievementDesc, !unlocked && styles.descDim]}>{description}</Text>
        {unlocked && formattedDate && (
          <Text style={styles.unlockedDate}>Unlocked {formattedDate}</Text>
        )}
      </View>

      {/* Unlocked checkmark badge */}
      {unlocked && (
        <View style={styles.checkBadge}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0F0A1E",
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  backBtn: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    marginBottom: 6,
  },
  backBtnText: {
    color: "#A78BFA",
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "white",
  },
  progressPill: {
    marginTop: 6,
    gap: 6,
  },
  progressText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    fontWeight: "600",
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: "#7C3AED",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 12,
  },

  // Cards
  card: {
    borderRadius: 18,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 14,
  },
  cardUnlocked: {
    backgroundColor: "rgba(124,58,237,0.18)",
    borderColor: "rgba(167,139,250,0.45)",
  },
  cardLocked: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderColor: "rgba(255,255,255,0.1)",
  },

  // Emoji
  emojiWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    position: "relative",
  },
  emojiWrapUnlocked: {
    backgroundColor: "rgba(124,58,237,0.35)",
    borderWidth: 1.5,
    borderColor: "rgba(167,139,250,0.5)",
  },
  emojiWrapLocked: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.12)",
  },
  emoji: {
    fontSize: 26,
  },
  emojiDim: {
    opacity: 0.3,
  },
  lockOverlay: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: "#1E1533",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  lockIcon: {
    fontSize: 11,
  },

  // Body
  cardBody: {
    flex: 1,
    gap: 3,
  },
  achievementTitle: {
    color: "white",
    fontWeight: "800",
    fontSize: 15,
  },
  achievementDesc: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 13,
    fontWeight: "400",
  },
  textDim: {
    color: "rgba(255,255,255,0.3)",
  },
  descDim: {
    color: "rgba(255,255,255,0.22)",
  },
  unlockedDate: {
    color: "#A78BFA",
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },

  // Check badge
  checkBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#059669",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  checkMark: {
    color: "white",
    fontSize: 14,
    fontWeight: "900",
  },
})
