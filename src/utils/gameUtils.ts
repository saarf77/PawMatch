import type { MemoryCard } from "../types"
import { DIFFICULTY_CONFIG } from "./constants"

export const shuffleUnmatchedCards = (cards: MemoryCard[]): MemoryCard[] => {
  const matchedCards = cards.map((card, index) => ({ card, index })).filter((item) => item.card.isMatched)
  const unmatchedCards = cards.map((card, index) => ({ card, index })).filter((item) => !item.card.isMatched)
  const result = new Array(cards.length)
  matchedCards.forEach(({ card, index }) => { result[index] = card })
  const shuffledUnmatched = [...unmatchedCards].sort(() => Math.random() - 0.5).map((item) => item.card)
  let unmatchedIndex = 0
  for (let i = 0; i < result.length; i++) {
    if (!result[i]) result[i] = shuffledUnmatched[unmatchedIndex++]
  }
  return result
}

export const calculateScore = (
  pairs: number,
  time: number,
  moves: number,
  difficulty: keyof typeof DIFFICULTY_CONFIG,
): number => {
  const config = DIFFICULTY_CONFIG[difficulty]
  const perfectMoves = pairs * 2
  const expectedTime = perfectMoves * 2
  const moveScore = Math.max(0, 1000 * (perfectMoves / moves))
  const timeScore = Math.max(0, 1000 * (expectedTime / time))
  const pairBonus = pairs * 100
  const baseScore = (moveScore + timeScore + pairBonus) * config.scoreMultiplier
  return Math.round(baseScore)
}

export const findMatchingCard = (cards: MemoryCard[], selectedCard: MemoryCard): number => {
  return cards.findIndex(
    (card) => !card.isMatched && !card.isHighlighted && card.id !== selectedCard.id && card.animalId === selectedCard.animalId,
  )
}
