import React, { useState, useCallback, useRef, useEffect } from "react"
import { StyleSheet, Platform, StatusBar } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"

import { NameScreen } from "./src/components/NameScreen"
import { MenuScreen } from "./src/components/MenuScreen"
import { GameScreen } from "./src/components/GameScreen"
import { GameCompleted } from "./src/components/GameCompleted"
import { LeaderboardScreen } from "./src/components/LeaderboardScreen"
import { CategoryScreen } from "./src/components/CategoryScreen"
import { CampaignScreen } from "./src/components/CampaignScreen"
import { AchievementsScreen } from "./src/components/AchievementsScreen"
import { TwoPlayerScreen } from "./src/components/TwoPlayerScreen"
import { TwoPlayerGameScreen } from "./src/components/TwoPlayerGameScreen"
import { DailyChallengeScreen } from "./src/components/DailyChallengeScreen"
import { ThemePickerScreen } from "./src/components/ThemePickerScreen"

import { GameService } from "./src/services/GameService"
import { LeaderboardService } from "./src/services/LeaderboardService"
import { NameGeneratorService } from "./src/services/NameGeneratorService"
import { SoundService } from "./src/services/SoundService"
import { AchievementService } from "./src/services/AchievementService"
import { CampaignService } from "./src/services/CampaignService"
import { DailyChallengeService } from "./src/services/DailyChallengeService"

import type { GameState, MemoryCard, User, Difficulty, GameStats, Category, GameMode, CampaignLevel, DailyChallenge } from "./src/types"
import { DIFFICULTY_CONFIG } from "./src/utils/constants"
import { shuffleUnmatchedCards, findMatchingCard, calculateScore } from "./src/utils/gameUtils"

// Two-player result state
type TwoPlayerResult = { winner: string | "tie"; p1Score: number; p2Score: number } | null

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
  const [category, setCategory] = useState<Category>("animals")
  const [gameMode, setGameMode] = useState<GameMode>("classic")
  const [pendingPairs, setPendingPairs] = useState(3)
  const [pendingDifficulty, setPendingDifficulty] = useState<Difficulty>("easy")
  const [isGameOver, setIsGameOver] = useState(false)
  const [livesRemaining, setLivesRemaining] = useState(3)
  const [lastFlipResult, setLastFlipResult] = useState<"match" | "mismatch" | null>(null)

  // Campaign
  const [activeCampaignLevel, setActiveCampaignLevel] = useState<CampaignLevel | null>(null)

  // Two-player
  const [tpP1Name, setTpP1Name] = useState("Player 1")
  const [tpP2Name, setTpP2Name] = useState("Player 2")
  const [tpPairs, setTpPairs] = useState(8)
  const [tpCategory, setTpCategory] = useState<Category>("animals")
  const [tpResult, setTpResult] = useState<TwoPlayerResult>(null)

  const shuffleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleNameSubmit = (name: string) => {
    const userId = NameGeneratorService.generateId()
    setUser({ id: userId, name })
    AchievementService.unlock("first_flip")
    setGameState("menu")
  }

  const handleSelectPairs = useCallback((pairs: number, diff: Difficulty) => {
    setPendingPairs(pairs)
    setPendingDifficulty(diff)
    setGameState("category")
  }, [])

  const startGame = useCallback((pairs: number, diff: Difficulty, cat: Category, mode: GameMode = "classic") => {
    setNumPairs(pairs)
    setDifficulty(diff)
    setCategory(cat)
    setGameMode(mode)
    setCards(GameService.createCards(pairs, cat))
    setFlippedIndexes([])
    setMatches(0)
    setMoves(0)
    setCurrentTime(0)
    setIsRunning(true)
    setTimerKey((k) => k + 1)
    setCluesRemaining(1)
    setIsGameOver(false)
    setLivesRemaining(3)
    setLastFlipResult(null)
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
        setLastFlipResult("match")
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
              const finalScore = calculateScore(numPairs, currentTime, moves + 1, difficulty)
              const score = {
                userId: user?.id || "anonymous",
                userName: user?.name || "Anonymous",
                pairs: numPairs,
                time: currentTime,
                moves: moves + 1,
                score: finalScore,
                difficulty,
                category,
                date: new Date().toLocaleDateString(),
                gameMode,
              }
              LeaderboardService.saveScore(score).catch(console.error)
              // Check achievements
              AchievementService.checkAndUnlock({ moves: moves + 1, time: currentTime, pairs: numPairs, gameMode })
              // If daily challenge, mark complete
              if (gameMode === "classic" && activeCampaignLevel) {
                const stars = moves + 1 <= numPairs * 2 ? 3 : moves + 1 <= numPairs * 3 ? 2 : 1
                CampaignService.completeLevel(activeCampaignLevel.level, stars)
                AchievementService.unlock("campaign_hero").catch(console.error)
                setActiveCampaignLevel(null)
              }
              setGameState("completed")
            }
            return newMatches
          })
          setIsChecking(false)
        }, 500)
      } else {
        setLastFlipResult("mismatch")
        if (gameMode === "oneshot") {
          setTimeout(() => {
            setLivesRemaining((lives) => {
              const newLives = lives - 1
              if (newLives <= 0) {
                setIsGameOver(true)
                setIsRunning(false)
              }
              return newLives
            })
            setFlippedIndexes([])
            setIsChecking(false)
            setLastFlipResult(null)
          }, 800)
        } else {
          setTimeout(() => {
            setFlippedIndexes([])
            setIsChecking(false)
            setLastFlipResult(null)
          }, 1000)
        }
      }
    }
  }, [cards, flippedIndexes, isChecking, numPairs, currentTime, user, difficulty, moves, gameMode, activeCampaignLevel])

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
    gameMode,
  }

  const returnHome = () => {
    setUser(null)
    setGameState("name")
  }

  // Campaign level selected
  const handleCampaignLevelSelect = (level: CampaignLevel) => {
    setActiveCampaignLevel(level)
    startGame(level.pairs, level.difficulty, level.category, "classic")
  }

  // Daily challenge
  const handleDailyPlay = (challenge: DailyChallenge) => {
    DailyChallengeService.markCompletedToday()
    AchievementService.unlock("daily_devotee")
    startGame(challenge.pairs, challenge.difficulty, challenge.category, "classic")
  }

  // Two-player
  const handleTwoPlayerStart = (p1: string, p2: string, pairs: number, cat: Category) => {
    setTpP1Name(p1)
    setTpP2Name(p2)
    setTpPairs(pairs)
    setTpCategory(cat)
    setTpResult(null)
    setGameState("twoPlayerGame")
  }

  const handleTwoPlayerEnd = (winner: string | "tie", p1Score: number, p2Score: number) => {
    setTpResult({ winner, p1Score, p2Score })
    // go back to setup screen with result shown
    setGameState("menu")
  }

  return (
    <SafeAreaProvider>
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
              onSelectPairs={handleSelectPairs}
              onShowLeaderboard={() => setGameState("leaderboard")}
              onReturnHome={returnHome}
              onShowCampaign={() => setGameState("campaign")}
              onShowAchievements={() => setGameState("achievements")}
              onShowTwoPlayer={() => { setTpResult(null); setGameState("twoPlayer") }}
              onShowDailyChallenge={() => setGameState("dailyChallenge")}
              onShowThemePicker={() => setGameState("themePicker")}
            />
          )}

          {gameState === "category" && (
            <CategoryScreen
              pairs={pendingPairs}
              difficulty={pendingDifficulty}
              onSelectCategory={(cat, mode) => startGame(pendingPairs, pendingDifficulty, cat, mode)}
              onBack={() => setGameState("menu")}
            />
          )}

          {gameState === "leaderboard" && (
            <LeaderboardScreen onBack={() => setGameState("menu")} />
          )}

          {gameState === "campaign" && (
            <CampaignScreen
              onSelectLevel={handleCampaignLevelSelect}
              onBack={() => setGameState("menu")}
            />
          )}

          {gameState === "achievements" && (
            <AchievementsScreen onBack={() => setGameState("menu")} />
          )}

          {gameState === "twoPlayer" && (
            <TwoPlayerScreen
              onStartGame={handleTwoPlayerStart}
              onBack={() => setGameState("menu")}
            />
          )}

          {gameState === "twoPlayerGame" && (
            <TwoPlayerGameScreen
              p1Name={tpP1Name}
              p2Name={tpP2Name}
              pairs={tpPairs}
              category={tpCategory}
              onGameEnd={handleTwoPlayerEnd}
              onBack={() => setGameState("menu")}
            />
          )}

          {gameState === "dailyChallenge" && (
            <DailyChallengeScreen
              onPlay={handleDailyPlay}
              onBack={() => setGameState("menu")}
            />
          )}

          {gameState === "themePicker" && (
            <ThemePickerScreen onBack={() => setGameState("menu")} />
          )}

          {gameState === "playing" && (
            <GameScreen
              cards={cards}
              flippedIndexes={flippedIndexes}
              matches={matches}
              numPairs={numPairs}
              onCardClick={handleCardClick}
              onBack={() => setGameState("menu")}
              onRestart={() => startGame(numPairs, difficulty, category, gameMode)}
              isRunning={isRunning}
              onTimeTick={handleTimeTick}
              timerKey={timerKey}
              userName={user?.name}
              difficulty={difficulty}
              moves={moves}
              onUseClue={handleUseClue}
              cluesRemaining={cluesRemaining}
              isShuffling={isShuffling}
              category={category}
              gameMode={gameMode}
              isGameOver={isGameOver}
              livesRemaining={livesRemaining}
              lastFlipResult={lastFlipResult}
            />
          )}

          {gameState === "completed" && (
            <GameCompleted
              stats={gameStats}
              onPlayAgain={() => startGame(numPairs, difficulty, category, gameMode)}
              onBackToMenu={() => setGameState("menu")}
            />
          )}
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
})
