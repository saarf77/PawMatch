import type { MemoryCard, Category } from "../types"
import { ANIMALS_CONFIG, FLAGS_CONFIG, CARS_CONFIG, FOOD_CONFIG } from "../utils/constants"

export class GameService {
  static createCards(numPairs: number, category: Category = "animals"): MemoryCard[] {
    const config =
      category === "flags" ? FLAGS_CONFIG :
      category === "cars"  ? CARS_CONFIG  :
      category === "food"  ? FOOD_CONFIG  :
      ANIMALS_CONFIG
    const shuffled = [...config].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, numPairs)
    const cards: MemoryCard[] = []

    selected.forEach(({ itemId, label }, index) => {
      cards.push(
        { id: index * 2, itemId, label, isMatched: false },
        { id: index * 2 + 1, itemId, label, isMatched: false },
      )
    })

    return cards.sort(() => Math.random() - 0.5)
  }

  static checkForMatch(firstCard: MemoryCard, secondCard: MemoryCard): boolean {
    return firstCard.itemId === secondCard.itemId
  }
}
