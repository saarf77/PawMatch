import React, { useEffect, useState, useCallback } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native"
import { CampaignService } from "../services/CampaignService"
import type { CampaignLevel, Difficulty } from "../types"

interface Props {
  onSelectLevel: (level: CampaignLevel) => void
  onBack: () => void
}

type LevelWithUnlock = CampaignLevel & { unlocked: boolean }

const CATEGORY_EMOJI: Record<string, string> = {
  animals: "🐾",
  flags: "🌍",
  cars: "🚗",
  food: "🍕",
}

const DIFFICULTY_COLORS: Record<Difficulty, { bg: string; border: string; badge: string }> = {
  easy:   { bg: "#064E3B", border: "#059669", badge: "#065F46" },
  medium: { bg: "#78350F", border: "#D97706", badge: "#92400E" },
  hard:   { bg: "#7F1D1D", border: "#DC2626", badge: "#991B1B" },
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
}

function StarRow({ stars, max = 3 }: { stars: number; max?: number }) {
  return (
    <View style={styles.starRow}>
      {Array.from({ length: max }).map((_, i) => (
        <Text key={i} style={[styles.star, i < stars ? styles.starFilled : styles.starEmpty]}>
          ★
        </Text>
      ))}
    </View>
  )
}

export function CampaignScreen({ onSelectLevel, onBack }: Props) {
  const [levels, setLevels] = useState<LevelWithUnlock[]>([])
  const [loading, setLoading] = useState(true)

  const loadProgress = useCallback(async () => {
    setLoading(true)
    try {
      const progress = await CampaignService.getProgressWithUnlocked()
      setLevels(progress)
    } catch (e) {
      console.error("CampaignScreen load error:", e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProgress()
  }, [loadProgress])

  // First uncompleted unlocked level is the "current" highlight
  const currentLevelNum = levels.find((l) => l.unlocked && !l.completed)?.level ?? -1

  const completedCount = levels.filter((l) => l.completed).length

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Campaign</Text>
        <Text style={styles.subtitle}>
          {completedCount} / {levels.length} completed
        </Text>
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
          {levels.map((lvl) => {
            const isLocked = !lvl.unlocked
            const isCurrent = lvl.level === currentLevelNum
            const colors = DIFFICULTY_COLORS[lvl.difficulty]

            return (
              <TouchableOpacity
                key={lvl.level}
                activeOpacity={isLocked ? 1 : 0.75}
                onPress={() => {
                  if (!isLocked) onSelectLevel(lvl)
                }}
                style={[
                  styles.card,
                  {
                    backgroundColor: isLocked
                      ? "rgba(255,255,255,0.04)"
                      : colors.bg,
                    borderColor: isLocked
                      ? "rgba(255,255,255,0.12)"
                      : isCurrent
                      ? "#A78BFA"
                      : colors.border,
                    borderWidth: isCurrent ? 2.5 : 1.5,
                    opacity: isLocked ? 0.55 : 1,
                  },
                ]}
              >
                {/* Current level glow strip */}
                {isCurrent && <View style={styles.currentStrip} />}

                {/* Level number circle */}
                <View
                  style={[
                    styles.levelBadge,
                    {
                      backgroundColor: isLocked
                        ? "rgba(255,255,255,0.08)"
                        : colors.badge,
                      borderColor: isLocked ? "rgba(255,255,255,0.2)" : colors.border,
                    },
                  ]}
                >
                  {isLocked ? (
                    <Text style={styles.lockIcon}>🔒</Text>
                  ) : (
                    <Text style={styles.levelNum}>{lvl.level}</Text>
                  )}
                </View>

                {/* Main info */}
                <View style={styles.cardBody}>
                  <View style={styles.cardTopRow}>
                    <Text style={[styles.levelLabel, isLocked && styles.textDim]}>
                      {lvl.label}
                    </Text>
                    <Text style={styles.categoryEmoji}>
                      {CATEGORY_EMOJI[lvl.category] ?? "🃏"}
                    </Text>
                  </View>

                  <View style={styles.cardMetaRow}>
                    <View
                      style={[
                        styles.diffBadge,
                        {
                          backgroundColor: isLocked
                            ? "rgba(255,255,255,0.08)"
                            : colors.badge,
                          borderColor: isLocked ? "rgba(255,255,255,0.15)" : colors.border,
                        },
                      ]}
                    >
                      <Text style={[styles.diffBadgeText, isLocked && styles.textDim]}>
                        {DIFFICULTY_LABEL[lvl.difficulty]}
                      </Text>
                    </View>

                    <Text style={[styles.pairsText, isLocked && styles.textDim]}>
                      {lvl.pairs} pairs
                    </Text>
                  </View>

                  {/* Stars */}
                  {lvl.completed ? (
                    <StarRow stars={lvl.stars} />
                  ) : isLocked ? (
                    <Text style={styles.lockedHint}>Complete previous level to unlock</Text>
                  ) : (
                    <StarRow stars={0} />
                  )}
                </View>

                {/* Current label tag */}
                {isCurrent && (
                  <View style={styles.currentTag}>
                    <Text style={styles.currentTagText}>CURRENT</Text>
                  </View>
                )}
              </TouchableOpacity>
            )
          })}
        </ScrollView>
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
    gap: 4,
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
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    fontWeight: "500",
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
  card: {
    borderRadius: 18,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 14,
    overflow: "hidden",
  },
  currentStrip: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: "#A78BFA",
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },
  levelBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  levelNum: {
    color: "white",
    fontWeight: "900",
    fontSize: 18,
  },
  lockIcon: {
    fontSize: 20,
  },
  cardBody: {
    flex: 1,
    gap: 6,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  levelLabel: {
    color: "white",
    fontWeight: "800",
    fontSize: 15,
    flex: 1,
    marginRight: 8,
  },
  categoryEmoji: {
    fontSize: 22,
  },
  cardMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  diffBadge: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  diffBadgeText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  pairsText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "500",
  },
  textDim: {
    color: "rgba(255,255,255,0.35)",
  },
  starRow: {
    flexDirection: "row",
    gap: 3,
    marginTop: 2,
  },
  star: {
    fontSize: 16,
  },
  starFilled: {
    color: "#FBBF24",
  },
  starEmpty: {
    color: "rgba(255,255,255,0.2)",
  },
  lockedHint: {
    fontSize: 11,
    color: "rgba(255,255,255,0.3)",
    fontStyle: "italic",
    marginTop: 2,
  },
  currentTag: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#7C3AED",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  currentTagText: {
    color: "white",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
})
