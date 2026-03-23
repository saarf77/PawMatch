export type GameState = "name" | "menu" | "playing" | "completed" | "leaderboard"
export type Difficulty = "easy" | "medium" | "hard"

export type Score = {
  userId: string
  userName: string
  pairs: number
  time: number
  moves: number
  score: number
  difficulty: Difficulty
  date: string
}

export type MemoryCard = {
  id: number
  animalId: string
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
}

export type User = {
  id: string
  name: string
}
