import React, { useState, useCallback, useRef, useEffect } from "react"
import { StyleSheet, Platform, StatusBar } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { SafeAreaView } from "react-native-safe-area-context"

import { NameScreen } from "./src/components/NameScreen"
import { MenuScreen } from "./src/components/MenuScreen"
import { GameScreen } from "./src/components/GameScreen"
import { GameCompleted } from "./src/components/GameCompleted"
import { LeaderboardScreen } from "./src/components/LeaderboardScreen"

import { GameService } from "./src/services/GameService"
import { LeaderboardService } from "./src/services/LeaderboardService"
import { NameGeneratorService } from "./src/services/NameGeneratorService"
import { SoundService } from "./src/services/SoundService"

import type { GameState, MemoryCard, User, Difficulty, GameStats } from "./src/types"
import { DIFFICULTY_CONFIG } from "./src/utils/constants"
import { shuffleUnmatchedCards, findMatchingCard, calculateScore } from "./src/utils/gameUtils"

export default function App() {
  const [gameState, setGameState] = useState<GameState>("name")
  const [user, setUser] = useState<User | null>(null)
  const [numPairs, setNumPairs] = useState(3)
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([])
  const [matches, setMatches] = useState(0)
  const [moves, setMoves] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [timerKey, setTimerKey] = useState(0)
  const [cluesRemaining, setCluesRemaining] = useState(1)
  const [isShuffling, setIsShuffling] = useState(false)
  const shuffleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleNameSubmit = (name: string) => {
    const userId = NameGeneratorService.generateId()
    setUser({ id: userId, name })
    setGameState("menu")
  }

  const startGame = useCallback((pairs: number, diff: Difficulty) => {
    setNumPairs(pairs)
    setDifficulty(diff)
    setCards(GameService.createCards(pairs))
    setFlippedIndexes([])
    setMatches(0)
    setMoves(0)
    setCurrentTime(0)
    setIsRunning(true)
    setTimerKey((k) => k + 1)
    setCluesRemaining(1)
    setGameState("playing")
  }, [])

  const handleCardClick = useCallback((clickedIndex: number) => {
    if (isChecking || cards[clickedIndex].isMatched) return
    if (flippedIndexes.includes(clickedIndex)) return
    if (flippedIndexes.length === 2) return

    SoundService.flip()

    const newFlipped = [...flippedIndexes, clickedIndex]
    setFlippedIndexes(newFlipped)
    setMoves((m) => m + 1)

    if (newFlipped.length === 2) {
      setIsChecking(true)
      const [firstIndex, secondIndex] = newFlipped
      const firstCard = cards[firstIndex]
      const secondCard = cards[secondIndex]

      if (GameService.checkForMatch(firstCard, secondCard)) {
        SoundService.match()
        setTimeout(() => {
          setCards(cards.map((card, index) =>
            index === firstIndex || index === secondIndex ? { ...card, isMatched: true } : card,
          ))
          setFlippedIndexes([])
          setMatches((m) => {
            const newMatches = m + 1
            if (newMatches === numPairs) {
              setIsRunning(false)
              SoundService.victory()
              const finalScore = calculateScore(numPairs, currentTime, moves, difficulty)
              const score = {
                userId: user?.id || "anonymous",
                userName: user?.name || "Anonymous",
                pairs: numPairs,
                time: currentTime,
                moves,
                score: finalScore,
                difficulty,
                date: new Date().toLocaleDateString(),
              }
              LeaderboardService.saveScore(score).catch(console.error)
              setGameState("completed")
            }
            return newMatches
          })
          setIsChecking(false)
        }, 500)
      } else {
        setTimeout(() => {
          setFlippedIndexes([])
          setIsChecking(false)
        }, 1000)
      }
    }
  }, [cards, flippedIndexes, isChecking, numPairs, currentTime, user, difficulty, moves])

  const handleTimeTick = useCallback((time: number) => {
    setCurrentTime(time)
  }, [])

  const handleUseClue = useCallback(() => {
    if (cluesRemaining === 0 || flippedIndexes.length !== 1) return
    SoundService.clue()
    const selectedCard = cards[flippedIndexes[0]]
    const matchingCardIndex = findMatchingCard(cards, selectedCard)
    if (matchingCardIndex !== -1) {
      setCards(cards.map((card, index) => index === matchingCardIndex ? { ...card, isHighlighted: true } : card))
      setTimeout(() => {
        setCards(cards.map((card) => ({ ...card, isHighlighted: false })))
      }, 1000)
    }
    setCluesRemaining(0)
  }, [cards, flippedIndexes, cluesRemaining])

  useEffect(() => {
    if (shuffleTimeoutRef.current) clearTimeout(shuffleTimeoutRef.current)
    if (isRunning && difficulty === "hard" && DIFFICULTY_CONFIG[difficulty].shuffleCards) {
      const setupShuffle = () => {
        shuffleTimeoutRef.current = setTimeout(() => {
          if (!isChecking) {
            setIsShuffling(true)
            setCards((c) => shuffleUnmatchedCards(c))
            SoundService.shuffle()
            setTimeout(() => {
              setIsShuffling(false)
              setupShuffle()
            }, 1000)
          } else {
            setTimeout(setupShuffle, 1000)
          }
        }, 60000)
      }
      setupShuffle()
    }
    return () => { if (shuffleTimeoutRef.current) clearTimeout(shuffleTimeoutRef.current) }
  }, [isRunning, difficulty, isChecking])

  const gameStats: GameStats = {
    moves, time: currentTime, pairs: numPairs, difficulty,
    score: calculateScore(numPairs, currentTime, moves, difficulty),
  }

  const returnHome = () => {
    setUser(null)
    setGameState("name")
  }

  return (
    <LinearGradient
      colors={["#6D28D9", "#4F46E5", "#0891B2"]}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />

        {gameState === "name" && (
          <NameScreen onNameSubmit={handleNameSubmit} />
        )}

        {gameState === "menu" && (
          <MenuScreen
            userName={user?.name}
            onStartGame={startGame}
            onShowLeaderboard={() => setGameState("leaderboard")}
            onReturnHome={returnHome}
          />
        )}

        {gameState === "leaderboard" && (
          <LeaderboardScreen onBack={() => setGameState("menu")} />
        )}

        {gameState === "playing" && (
          <GameScreen
            cards={cards}
            flippedIndexes={flippedIndexes}
            matches={matches}
            numPairs={numPairs}
            onCardClick={handleCardClick}
            onBack={() => setGameState("menu")}
            onRestart={() => startGame(numPairs, difficulty)}
            isRunning={isRunning}
            onTimeTick={handleTimeTick}
            timerKey={timerKey}
            userName={user?.name}
            difficulty={difficulty}
            moves={moves}
            onUseClue={handleUseClue}
            cluesRemaining={cluesRemaining}
            isShuffling={isShuffling}
          />
        )}

        {gameState === "completed" && (
          <GameCompleted
            stats={gameStats}
            onPlayAgain={() => startGame(numPairs, difficulty)}
            onBackToMenu={() => setGameState("menu")}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
})
