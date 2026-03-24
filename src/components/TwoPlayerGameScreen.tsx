import React, { useState, useCallback, useRef } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { MemoryCardComponent } from "./MemoryCard"
import { GameService } from "../services/GameService"
import type { MemoryCard, Category } from "../types"

interface Props {
  p1Name: string
  p2Name: string
  pairs: number
  category: Category
  onGameEnd: (winner: string | "tie", p1Score: number, p2Score: number) => void
  onBack: () => void
}

type CurrentPlayer = 1 | 2

const CARD_WIDTH = 70
const CARD_HEIGHT = 95
const MISMATCH_DELAY_MS = 900

export function TwoPlayerGameScreen({ p1Name, p2Name, pairs, category, onGameEnd, onBack }: Props) {
  const insets = useSafeAreaInsets()

  const initCards = useCallback(() => GameService.createCards(pairs, category), [pairs, category])

  const [cards, setCards] = useState<MemoryCard[]>(initCards)
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>(1)
  const [p1Matches, setP1Matches] = useState(0)
  const [p2Matches, setP2Matches] = useState(0)
  const [locked, setLocked] = useState(false)
  const [lastResult, setLastResult] = useState<"match" | "mismatch" | null>(null)
  const [gameOver, setGameOver] = useState(false)

  const totalMatched = p1Matches + p2Matches

  const currentName = currentPlayer === 1 ? p1Name : p2Name

  const handleCardClick = useCallback((index: number) => {
    if (locked || gameOver) return
    const card = cards[index]
    if (card.isMatched) return
    if (flippedIndexes.includes(index)) return
    if (flippedIndexes.length >= 2) return

    const newFlipped = [...flippedIndexes, index]
    setFlippedIndexes(newFlipped)

    if (newFlipped.length === 2) {
      setLocked(true)
      const [i1, i2] = newFlipped
      const c1 = cards[i1]
      const c2 = cards[i2]
      const isMatch = GameService.checkForMatch(c1, c2)

      if (isMatch) {
        setLastResult("match")
        const updatedCards = cards.map((c) =>
          c.id === c1.id || c.id === c2.id ? { ...c, isMatched: true } : c
        )
        setCards(updatedCards)

        const newP1 = currentPlayer === 1 ? p1Matches + 1 : p1Matches
        const newP2 = currentPlayer === 2 ? p2Matches + 1 : p2Matches

        if (currentPlayer === 1) setP1Matches(newP1)
        else setP2Matches(newP2)

        const newTotal = newP1 + newP2

        setTimeout(() => {
          setFlippedIndexes([])
          setLocked(false)
          setLastResult(null)

          if (newTotal >= pairs) {
            setGameOver(true)
            let winner: string | "tie"
            if (newP1 > newP2) winner = p1Name
            else if (newP2 > newP1) winner = p2Name
            else winner = "tie"
            onGameEnd(winner, newP1, newP2)
          }
          // Same player keeps turn on match — do NOT switch
        }, MISMATCH_DELAY_MS)
      } else {
        setLastResult("mismatch")
        setTimeout(() => {
          setFlippedIndexes([])
          setLocked(false)
          setLastResult(null)
          setCurrentPlayer((prev) => (prev === 1 ? 2 : 1))
        }, MISMATCH_DELAY_MS)
      }
    }
  }, [locked, gameOver, cards, flippedIndexes, currentPlayer, p1Matches, p2Matches, pairs, p1Name, p2Name, onGameEnd])

  const handleRestart = () => {
    setCards(initCards())
    setFlippedIndexes([])
    setCurrentPlayer(1)
    setP1Matches(0)
    setP2Matches(0)
    setLocked(false)
    setLastResult(null)
    setGameOver(false)
  }

  const handleBack = () => {
    Alert.alert(
      "Quit Game",
      "Are you sure you want to quit this game?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Quit", style: "destructive", onPress: onBack },
      ]
    )
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 4, paddingBottom: insets.bottom + 8 }]}>

      {/* HUD - Player Scores */}
      <View style={styles.hud}>
        {/* Player 1 score */}
        <View style={[
          styles.playerChip,
          currentPlayer === 1 ? styles.playerChipActive : styles.playerChipInactive,
        ]}>
          <Text style={styles.playerChipName} numberOfLines={1}>{p1Name}</Text>
          <Text style={styles.playerChipScore}>{p1Matches}</Text>
        </View>

        {/* Center turn indicator */}
        <View style={styles.turnIndicator}>
          {lastResult === "match" && (
            <Text style={styles.resultBadgeMatch}>Match!</Text>
          )}
          {lastResult === "mismatch" && (
            <Text style={styles.resultBadgeMiss}>Miss</Text>
          )}
          {lastResult === null && (
            <Text style={styles.turnText} numberOfLines={1}>{currentName}'s turn</Text>
          )}
          <Text style={styles.pairsLeft}>{totalMatched}/{pairs}</Text>
        </View>

        {/* Player 2 score */}
        <View style={[
          styles.playerChip,
          currentPlayer === 2 ? styles.playerChipActive : styles.playerChipInactive,
        ]}>
          <Text style={styles.playerChipName} numberOfLines={1}>{p2Name}</Text>
          <Text style={styles.playerChipScore}>{p2Matches}</Text>
        </View>
      </View>

      {/* Card grid */}
      <ScrollView
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {cards.map((card, index) => (
            <View key={card.id} style={styles.cardWrapper}>
              <MemoryCardComponent
                card={card}
                isFlipped={card.isMatched || flippedIndexes.includes(index)}
                onClick={() => handleCardClick(index)}
                cardWidth={CARD_WIDTH}
                cardHeight={CARD_HEIGHT}
                category={category}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Action buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={handleBack} activeOpacity={0.8}>
          <Text style={styles.actionBtnText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={handleRestart} activeOpacity={0.8}>
          <Text style={styles.actionBtnText}>Restart</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 10,
    gap: 8,
  },
  hud: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  playerChip: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 2,
  },
  playerChipActive: {
    backgroundColor: "rgba(139,92,246,0.45)",
    borderColor: "#A78BFA",
  },
  playerChipInactive: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderColor: "rgba(255,255,255,0.15)",
  },
  playerChipName: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(255,255,255,0.8)",
    maxWidth: 90,
  },
  playerChipScore: {
    fontSize: 28,
    fontWeight: "900",
    color: "white",
    lineHeight: 32,
  },
  turnIndicator: {
    flex: 1.2,
    alignItems: "center",
    gap: 2,
  },
  turnText: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
  },
  pairsLeft: {
    fontSize: 11,
    color: "rgba(255,255,255,0.45)",
    fontWeight: "600",
  },
  resultBadgeMatch: {
    fontSize: 15,
    fontWeight: "900",
    color: "#34D399",
    textAlign: "center",
  },
  resultBadgeMiss: {
    fontSize: 15,
    fontWeight: "900",
    color: "#F87171",
    textAlign: "center",
  },
  gridContainer: {
    paddingVertical: 6,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
  },
  cardWrapper: {
    // each card is a fixed 70x95, gap handled by grid
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },
})
