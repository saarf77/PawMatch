import React, { useEffect, useRef, useState } from "react"
import {
  View, Text, TouchableOpacity,
  StyleSheet, LayoutChangeEvent, Platform,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { MemoryCardComponent } from "./MemoryCard"
import type { MemoryCard, Difficulty, Category, GameMode } from "../types"
import { formatTime } from "../utils/helpers"
import { useScale } from "../utils/useScale"

interface Props {
  cards: MemoryCard[]
  flippedIndexes: number[]
  matches: number
  numPairs: number
  onCardClick: (index: number) => void
  onBack: () => void
  onRestart: () => void
  isRunning: boolean
  onTimeTick: (time: number) => void
  timerKey: number
  userName?: string
  difficulty: Difficulty
  moves: number
  onUseClue: () => void
  cluesRemaining: number
  isShuffling?: boolean
  category?: Category
  gameMode?: GameMode
  onGameOver?: () => void
  isGameOver?: boolean
  livesRemaining?: number
  lastFlipResult?: "match" | "mismatch" | null
}

function getGridCols(numCards: number): number {
  // Portrait mobile: prefer more rows than cols, max 5 cols
  const map: Record<number, number> = {
    6:  3, //  3×2
    8:  4, //  4×2
    10: 4, //  4×3 (2 orphan) — better than 5×2
    12: 4, //  4×3
    14: 4, //  4×4 (2 orphan) — better than 2×7
    16: 4, //  4×4
    18: 4, //  4×5 (2 orphan) — or 6×3; 4 cols is taller/better
    20: 5, //  5×4
    24: 5, //  5×5 (4 orphan) — or 6×4
    30: 5, //  5×6
    32: 6, //  6×6 (orphan 2)
    36: 6, //  6×6
  }
  return map[numCards] ?? 4
}

export function GameScreen({
  cards, flippedIndexes, matches, numPairs,
  onCardClick, onBack, onRestart,
  isRunning, onTimeTick, timerKey,
  userName, moves, onUseClue, cluesRemaining,
  category = "animals",
  gameMode,
  onGameOver,
  isGameOver = false,
  livesRemaining = 3,
  lastFlipResult,
}: Props) {
  const [elapsed, setElapsed] = useState(0)
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 })
  const [revealAll, setRevealAll] = useState(false)
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const insets = useSafeAreaInsets()
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { scale } = useScale()

  useEffect(() => { setElapsed(0) }, [timerKey])

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => setElapsed((t) => t + 1), 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isRunning, timerKey])

  useEffect(() => { onTimeTick(elapsed) }, [elapsed])

  // Sudden-death: when a mismatch is signalled, reveal all unmatched cards for 1.5s
  useEffect(() => {
    if (gameMode === "suddenDeath" && lastFlipResult === "mismatch") {
      setRevealAll(true)
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current)
      revealTimerRef.current = setTimeout(() => {
        setRevealAll(false)
        revealTimerRef.current = null
      }, 1500)
    }
    return () => {
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current)
    }
  }, [lastFlipResult, gameMode])

  const canUseClue = flippedIndexes.length === 1 && cluesRemaining > 0
  const progress = numPairs > 0 ? matches / numPairs : 0

  const onGridLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout
    setGridSize({ width, height })
  }

  // Calculate card size from actual measured grid area
  const cols = getGridCols(cards.length)
  const rows = Math.ceil(cards.length / cols)
  const GAP = 5

  let cardW = 60
  let cardH = 76

  // Scale the max card size by screen scale so cards fill iPad properly
  const MAX_CARD_W = Math.round(130 * scale)
  const MAX_CARD_H = Math.round(175 * scale)

  if (gridSize.width > 0 && gridSize.height > 0) {
    const maxCardW = Math.floor((gridSize.width  - GAP * (cols + 1)) / cols)
    const maxCardH = Math.floor((gridSize.height - GAP * (rows + 1)) / rows)
    cardW = Math.min(maxCardW, Math.floor(maxCardH / 1.35))
    cardH = Math.min(maxCardH, Math.floor(cardW * 1.35))
    cardW = Math.min(cardW, Math.floor(cardH / 1.35))
    cardH = Math.floor(cardW * 1.35)
    // Cap so cards don't grow unboundedly on very large screens
    cardW = Math.min(cardW, MAX_CARD_W)
    cardH = Math.min(cardH, MAX_CARD_H)
  }

  const chipFontSize = Math.round(12 * scale)
  const actionFontSize = Math.round(14 * scale)
  const actionBtnHeight = Math.round(44 * scale)
  const playerNameFontSize = Math.round(12 * scale)

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 4 }]}>

      {/* HUD */}
      <View style={styles.hud}>
        {userName ? (
          <Text style={[styles.playerName, { fontSize: playerNameFontSize }]}>
            Playing as <Text style={styles.bold}>{userName}</Text>
          </Text>
        ) : null}
        <View style={styles.hudRow}>
          {gameMode === "speed" && (
            <View style={[styles.chip, styles.speedBadge, { paddingHorizontal: Math.round(10 * scale), paddingVertical: Math.round(5 * scale) }]}>
              <Text style={[styles.chipText, { fontSize: chipFontSize }]}>Speed</Text>
            </View>
          )}
          {gameMode === "oneshot" && (
            <View style={[styles.chip, { paddingHorizontal: Math.round(10 * scale), paddingVertical: Math.round(5 * scale), backgroundColor: "rgba(239,68,68,0.25)", borderColor: "rgba(239,68,68,0.5)" }]}>
              <Text style={[styles.chipText, { fontSize: chipFontSize }]}>{"❤️".repeat(livesRemaining)}{"🖤".repeat(Math.max(0, 3 - livesRemaining))}</Text>
            </View>
          )}
          <View style={[styles.chip, { paddingHorizontal: Math.round(10 * scale), paddingVertical: Math.round(5 * scale) }]}>
            <Text style={[styles.chipText, { fontSize: chipFontSize }]}>⭐ {matches}/{numPairs}</Text>
          </View>
          <View style={[styles.chip, { paddingHorizontal: Math.round(10 * scale), paddingVertical: Math.round(5 * scale) }]}>
            <Text style={[styles.chipText, { fontSize: chipFontSize }]}>🕐 {formatTime(elapsed)}</Text>
          </View>
          <View style={[styles.chip, { paddingHorizontal: Math.round(10 * scale), paddingVertical: Math.round(5 * scale) }]}>
            <Text style={[styles.chipText, { fontSize: chipFontSize }]}>⚡ {moves}</Text>
          </View>
          <TouchableOpacity
            style={[styles.chip, canUseClue ? styles.clueActive : styles.clueDisabled, { paddingHorizontal: Math.round(10 * scale), paddingVertical: Math.round(5 * scale) }]}
            onPress={onUseClue}
            disabled={!canUseClue}
          >
            <Text style={[styles.chipText, { fontSize: chipFontSize }, !canUseClue && styles.chipDim]}>💡 {cluesRemaining}</Text>
          </TouchableOpacity>
        </View>
        {gameMode === "suddenDeath" && (
          <Text style={styles.suddenDeathWarning}>3 cards revealed on mismatch</Text>
        )}
      </View>

      {/* Card grid — explicit rows so cards fill height */}
      <View style={styles.gridContainer} onLayout={onGridLayout}>
        {gridSize.width > 0 && Array.from({ length: rows }).map((_, rowIndex) => (
          <View key={rowIndex} style={[styles.gridRow, { height: cardH, marginVertical: GAP / 2 }]}>
            {cards.slice(rowIndex * cols, rowIndex * cols + cols).map((card, colIndex) => {
              const index = rowIndex * cols + colIndex
              return (
                <View key={card.id} style={{ marginHorizontal: GAP / 2 }}>
                  <MemoryCardComponent
                    card={card}
                    isFlipped={card.isMatched || flippedIndexes.includes(index) || (revealAll && !card.isMatched)}
                    onClick={() => onCardClick(index)}
                    cardWidth={cardW}
                    cardHeight={cardH}
                    category={category}
                  />
                </View>
              )
            })}
          </View>
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionBtn, { height: actionBtnHeight }]} onPress={onBack} activeOpacity={0.8}>
          <Text style={[styles.actionBtnText, { fontSize: actionFontSize }]}>◀ Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { height: actionBtnHeight }]} onPress={onRestart} activeOpacity={0.8}>
          <Text style={[styles.actionBtnText, { fontSize: actionFontSize }]}>↺ Restart</Text>
        </TouchableOpacity>
      </View>

      {/* One-Shot Game Over overlay */}
      {gameMode === "oneshot" && isGameOver && (
        <View style={styles.gameOverOverlay}>
          <View style={styles.gameOverBox}>
            <Text style={{ fontSize: 48, textAlign: "center" }}>💔</Text>
            <Text style={styles.gameOverTitle}>GAME OVER</Text>
            <Text style={styles.gameOverMessage}>You used all 3 lives!</Text>
            <View style={styles.gameOverButtons}>
              <TouchableOpacity style={styles.gameOverBtn} onPress={onRestart} activeOpacity={0.8}>
                <Text style={styles.gameOverBtnText}>Try Again</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.gameOverBtn, styles.gameOverBtnSecondary]} onPress={onBack} activeOpacity={0.8}>
                <Text style={styles.gameOverBtnText}>Menu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  hud: {
    gap: 6,
    marginBottom: 6,
  },
  playerName: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 12,
    textAlign: "center",
  },
  bold: { fontWeight: "800", color: "white" },
  hudRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 5,
  },
  chip: {
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  clueActive: {
    backgroundColor: "rgba(234,179,8,0.28)",
    borderColor: "rgba(234,179,8,0.55)",
  },
  clueDisabled: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderColor: "rgba(255,255,255,0.1)",
  },
  chipText: { color: "white", fontWeight: "700", fontSize: 12 },
  chipDim:  { color: "rgba(255,255,255,0.35)" },
  progressBg: {
    height: 5,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 3,
    overflow: "hidden",
    marginHorizontal: 4,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 3,
  },
  gridContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    overflow: "hidden",
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 6,
  },
  actionBtn: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.13)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtnText: { color: "white", fontWeight: "700", fontSize: 14 },
  speedBadge: {
    backgroundColor: "rgba(59,130,246,0.35)",
    borderColor: "rgba(59,130,246,0.65)",
  },
  suddenDeathWarning: {
    color: "rgba(251,191,36,0.9)",
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 2,
  },
  gameOverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.78)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    zIndex: 99,
  },
  gameOverBox: {
    backgroundColor: "#1a0505",
    borderWidth: 2,
    borderColor: "rgba(239,68,68,0.7)",
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 28,
    alignItems: "center",
    width: "80%",
    gap: 12,
  },
  gameOverTitle: {
    color: "#ef4444",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 2,
  },
  gameOverMessage: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  gameOverButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  gameOverBtn: {
    backgroundColor: "#ef4444",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
  gameOverBtnSecondary: {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  gameOverBtnText: {
    color: "white",
    fontWeight: "800",
    fontSize: 14,
  },
})
