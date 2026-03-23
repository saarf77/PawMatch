import React, { useEffect, useRef, useState } from "react"
import {
  View, Text, TouchableOpacity,
  StyleSheet, LayoutChangeEvent,
} from "react-native"
import { MemoryCardComponent } from "./MemoryCard"
import type { MemoryCard, Difficulty, Category } from "../types"
import { formatTime } from "../utils/helpers"

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
}: Props) {
  const [elapsed, setElapsed] = useState(0)
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 })
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

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

  const MAX_CARD_W = 130
  const MAX_CARD_H = 175

  if (gridSize.width > 0 && gridSize.height > 0) {
    const maxCardW = Math.floor((gridSize.width  - GAP * (cols + 1)) / cols)
    const maxCardH = Math.floor((gridSize.height - GAP * (rows + 1)) / rows)
    cardW = Math.min(maxCardW, Math.floor(maxCardH / 1.35))
    cardH = Math.min(maxCardH, Math.floor(cardW * 1.35))
    cardW = Math.min(cardW, Math.floor(cardH / 1.35))
    cardH = Math.floor(cardW * 1.35)
    // Cap for tablets / large screens
    cardW = Math.min(cardW, MAX_CARD_W)
    cardH = Math.min(cardH, MAX_CARD_H)
  }

  return (
    <View style={styles.screen}>

      {/* HUD */}
      <View style={styles.hud}>
        {userName ? (
          <Text style={styles.playerName}>
            Playing as <Text style={styles.bold}>{userName}</Text>
          </Text>
        ) : null}
        <View style={styles.hudRow}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>⭐ {matches}/{numPairs}</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>🕐 {formatTime(elapsed)}</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>⚡ {moves}</Text>
          </View>
          <TouchableOpacity
            style={[styles.chip, canUseClue ? styles.clueActive : styles.clueDisabled]}
            onPress={onUseClue}
            disabled={!canUseClue}
          >
            <Text style={[styles.chipText, !canUseClue && styles.chipDim]}>💡 {cluesRemaining}</Text>
          </TouchableOpacity>
        </View>
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
                    isFlipped={card.isMatched || flippedIndexes.includes(index)}
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
        <TouchableOpacity style={styles.actionBtn} onPress={onBack} activeOpacity={0.8}>
          <Text style={styles.actionBtnText}>◀ Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={onRestart} activeOpacity={0.8}>
          <Text style={styles.actionBtnText}>↺ Restart</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 8,
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
})
