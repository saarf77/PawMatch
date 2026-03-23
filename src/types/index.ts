export type GameState = "name" | "menu" | "category" | "playing" | "completed" | "leaderboard"
export type Difficulty = "easy" | "medium" | "hard"
export type Category = "animals" | "flags" | "cars"

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
}

export type User = {
  id: string
  name: string
}
