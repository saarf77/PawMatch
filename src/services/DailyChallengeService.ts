import { storageGet, storageSet } from "../utils/storage"
import type { DailyChallenge, Category, Difficulty } from "../types"

export class DailyChallengeService {
  static getTodayChallenge(): DailyChallenge {
    const today = new Date().toISOString().split("T")[0]
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
    const val = await storageGet(key)
    return val === "done"
  }

  static async markCompletedToday(): Promise<void> {
    const key = "daily_" + new Date().toISOString().split("T")[0]
    await storageSet(key, "done")
  }
}
