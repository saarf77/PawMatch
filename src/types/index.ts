export type GameState =
  | "name" | "menu" | "category" | "playing" | "completed" | "leaderboard"
  | "campaign" | "achievements" | "twoPlayer" | "twoPlayerGame" | "dailyChallenge" | "themePicker"

export type Difficulty = "easy" | "medium" | "hard"
export type Category = "animals" | "flags" | "cars" | "food"
export type GameMode = "classic" | "speed" | "oneshot" | "suddenDeath"
export type CardTheme = "classic" | "dark" | "neon" | "minimal"

export type Score = {
  userId: string
  userName: string
  pairs: number
  time: number
  moves: number
  score: number
  difficulty: Difficulty
  category: Category
  date: string
  gameMode?: GameMode
}

export type MemoryCard = {
  id: number
  itemId: string
  label: string
  isMatched: boolean
  isHighlighted?: boolean
}

export type GameStats = {
  moves: number
  time: number
  pairs: number
  difficulty: Difficulty
  score: number
  gameMode?: GameMode
}

export type User = {
  id: string
  name: string
}

export type CampaignLevel = {
  level: number
  pairs: number
  difficulty: Difficulty
  category: Category
  label: string
  completed: boolean
  stars: number // 0-3
}

export type TwoPlayerState = {
  currentPlayer: 1 | 2
  player1Matches: number
  player2Matches: number
  player1Name: string
  player2Name: string
}

export type Achievement = {
  id: string
  title: string
  description: string
  emoji: string
  unlocked: boolean
  unlockedAt?: string
}

export type DailyChallenge = {
  date: string
  seed: number
  pairs: number
  category: Category
  difficulty: Difficulty
}
