import type { Category } from "../types"

export type CardSoundKey =
  | "animal-elephant"
  | "animal-roar"
  | "animal-cat"
  | "animal-dog"
  | "animal-duck"
  | "animal-horse"
  | "animal-nature"
  | "animal-ocean"
  | "car-engine"
  | "car-sport"
  | "car-luxury"
  | "car-electric"

export const CARD_SOUNDS_STORAGE_KEY = "card_sounds_enabled"
export const DEFAULT_CARD_SOUNDS_ENABLED = true

export function parseCardSoundsPreference(value: string | null): boolean {
  if (value === "false") return false
  if (value === "true") return true
  return DEFAULT_CARD_SOUNDS_ENABLED
}

export function serializeCardSoundsPreference(enabled: boolean): string {
  return String(enabled)
}

const ANIMAL_SOUND_KEYS: Record<string, CardSoundKey> = {
  elephant: "animal-elephant",
  lion: "animal-roar",
  tiger: "animal-roar",
  bear: "animal-roar",
  cat: "animal-cat",
  dog: "animal-dog",
  wolf: "animal-dog",
  fox: "animal-dog",
  duck: "animal-duck",
  chicken: "animal-duck",
  horse: "animal-horse",
  donkey: "animal-horse",
  zebra: "animal-horse",
  dolphin: "animal-ocean",
  whale: "animal-ocean",
  fish: "animal-ocean",
  octopus: "animal-ocean",
  penguin: "animal-ocean",
}

const SPORT_CARS = new Set(["ferrari", "porsche", "lamborghini", "maserati", "bugatti", "jaguar"])
const LUXURY_CARS = new Set(["rollsroyce", "bentley", "mercedes", "bmw", "audi", "volvo"])

export function getCardSoundKey(category: Category, itemId: string): CardSoundKey | null {
  if (category === "animals") return ANIMAL_SOUND_KEYS[itemId] ?? "animal-nature"
  if (category !== "cars") return null
  if (itemId === "tesla") return "car-electric"
  if (SPORT_CARS.has(itemId)) return "car-sport"
  if (LUXURY_CARS.has(itemId)) return "car-luxury"
  return "car-engine"
}

interface CardFlipFeedbackInput {
  category: Category
  itemId: string
  isMatched: boolean
  isBlocked: boolean
  isAlreadyFlipped: boolean
  openCardCount: number
}

interface CardFlipFeedback {
  accepted: boolean
  soundKey: CardSoundKey | null
}

export function getCardFlipFeedback(input: CardFlipFeedbackInput): CardFlipFeedback {
  const rejected = input.isBlocked || input.isMatched || input.isAlreadyFlipped || input.openCardCount >= 2
  if (rejected) return { accepted: false, soundKey: null }
  return {
    accepted: true,
    soundKey: getCardSoundKey(input.category, input.itemId),
  }
}
