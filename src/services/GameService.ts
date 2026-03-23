import type { MemoryCard } from "../types"
import { ICONS_CONFIG } from "../utils/constants"

export class GameService {
  static createCards(numPairs: number): MemoryCard[] {
    const shuffled = [...ICONS_CONFIG].sort(() => Math.random() - 0.5)
    const selectedIcons = shuffled.slice(0, numPairs)
    const cards: MemoryCard[] = []

    selectedIcons.forEach(({ animalId, label }, index) => {
      cards.push(
        { id: index * 2, animalId, label, isMatched: false },
        { id: index * 2 + 1, animalId, label, isMatched: false },
      )
    })

    return cards.sort(() => Math.random() - 0.5)
  }

  static checkForMatch(firstCard: MemoryCard, secondCard: MemoryCard): boolean {
    return firstCard.animalId === secondCard.animalId
  }
}
