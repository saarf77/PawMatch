import AsyncStorage from "@react-native-async-storage/async-storage"
import type { DailyChallenge } from "../types"
import type { Category, Difficulty } from "../types"
import { FOOD_CONFIG, ANIMALS_CONFIG, FLAGS_CONFIG, CARS_CONFIG } from "../utils/constants"

export class DailyChallengeService {
  static getTodayChallenge(): DailyChallenge {
    // Use today's date as a deterministic seed
    const today = new Date().toISOString().split("T")[0] // "2024-03-24"
    const seed = today.split("-").reduce((acc, v) => acc + parseInt(v), 0)
    const categories: Category[] = ["animals", "flags", "cars", "food"]
    const difficulties: Difficulty[] = ["easy", "medium", "hard"]
    const pairsOptions = [6, 8, 10, 12]
    return {
      date: today,
      seed,
      pairs: pairsOptions[seed % pairsOptions.length],
      category: categories[seed % categories.length],
      difficulty: difficulties[seed % difficulties.length],
    }
  }

  static async hasCompletedToday(): Promise<boolean> {
    const key = "daily_" + new Date().toISOString().split("T")[0]
    const val = await AsyncStorage.getItem(key)
    return val === "done"
  }

  static async markCompletedToday(): Promise<void> {
    const key = "daily_" + new Date().toISOString().split("T")[0]
    await AsyncStorage.setItem(key, "done")
  }
}
