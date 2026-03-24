import AsyncStorage from "@react-native-async-storage/async-storage"
import type { Achievement } from "../types"

const STORAGE_KEY = "achievements"
const GAMES_PLAYED_KEY = "achievement_games_played"

export class AchievementService {
  static readonly ALL_ACHIEVEMENTS: Achievement[] = [
    {
      id: "first_flip",
      title: "First Flip",
      description: "Play your first game",
      emoji: "🃏",
      unlocked: false,
    },
    {
      id: "perfect_game",
      title: "Perfect Game",
      description: "Finish with minimum moves",
      emoji: "🏆",
      unlocked: false,
    },
    {
      id: "speed_demon",
      title: "Speed Demon",
      description: "Finish in under 30 seconds",
      emoji: "⚡",
      unlocked: false,
    },
    {
      id: "pair_master",
      title: "Pair Master",
      description: "Complete 10 games",
      emoji: "🎯",
      unlocked: false,
    },
    {
      id: "campaign_hero",
      title: "Campaign Hero",
      description: "Complete all campaign levels",
      emoji: "🗺️",
      unlocked: false,
    },
    {
      id: "daily_devotee",
      title: "Daily Devotee",
      description: "Complete the daily challenge",
      emoji: "📅",
      unlocked: false,
    },
    {
      id: "one_shot_survivor",
      title: "One-Shot Survivor",
      description: "Win a One-Shot mode game",
      emoji: "🎯",
      unlocked: false,
    },
  ]

  /** Load all achievements, merging saved unlock state into the static definitions. */
  static async getAchievements(): Promise<Achievement[]> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY)
      const saved: Record<string, { unlocked: boolean; unlockedAt?: string }> = raw
        ? JSON.parse(raw)
        : {}

      return AchievementService.ALL_ACHIEVEMENTS.map((a) => {
        const entry = saved[a.id]
        if (entry?.unlocked) {
          return { ...a, unlocked: true, unlockedAt: entry.unlockedAt }
        }
        return { ...a, unlocked: false }
      })
    } catch (e) {
      console.error("AchievementService.getAchievements error:", e)
      return AchievementService.ALL_ACHIEVEMENTS.map((a) => ({ ...a, unlocked: false }))
    }
  }

  /**
   * Unlock an achievement by id.
   * Returns true if this call newly unlocked it (was previously locked).
   */
  static async unlock(id: string): Promise<boolean> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY)
      const saved: Record<string, { unlocked: boolean; unlockedAt?: string }> = raw
        ? JSON.parse(raw)
        : {}

      if (saved[id]?.unlocked) {
        // Already unlocked — nothing to do
        return false
      }

      saved[id] = { unlocked: true, unlockedAt: new Date().toISOString() }
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
      return true
    } catch (e) {
      console.error("AchievementService.unlock error:", e)
      return false
    }
  }

  /**
   * Evaluate game stats and unlock any newly earned achievements.
   * Returns an array of achievement ids that were newly unlocked this call.
   */
  static async checkAndUnlock(stats: {
    moves: number
    time: number
    pairs: number
    gameMode?: string
  }): Promise<string[]> {
    const newlyUnlocked: string[] = []

    // Increment games-played counter
    let gamesPlayed = 0
    try {
      const raw = await AsyncStorage.getItem(GAMES_PLAYED_KEY)
      gamesPlayed = raw ? parseInt(raw, 10) : 0
    } catch {
      // ignore
    }
    gamesPlayed += 1
    try {
      await AsyncStorage.setItem(GAMES_PLAYED_KEY, String(gamesPlayed))
    } catch {
      // ignore
    }

    // first_flip — any completed game
    if (await AchievementService.unlock("first_flip")) {
      newlyUnlocked.push("first_flip")
    }

    // perfect_game — moves === pairs * 2 (minimum possible: one flip per card)
    if (stats.moves === stats.pairs * 2) {
      if (await AchievementService.unlock("perfect_game")) {
        newlyUnlocked.push("perfect_game")
      }
    }

    // speed_demon — finished in under 30 seconds
    if (stats.time < 30) {
      if (await AchievementService.unlock("speed_demon")) {
        newlyUnlocked.push("speed_demon")
      }
    }

    // pair_master — 10 games completed
    if (gamesPlayed >= 10) {
      if (await AchievementService.unlock("pair_master")) {
        newlyUnlocked.push("pair_master")
      }
    }

    // one_shot_survivor — won a one-shot mode game
    if (stats.gameMode === "oneshot") {
      if (await AchievementService.unlock("one_shot_survivor")) {
        newlyUnlocked.push("one_shot_survivor")
      }
    }

    // daily_devotee — completed the daily challenge
    if (stats.gameMode === "daily") {
      if (await AchievementService.unlock("daily_devotee")) {
        newlyUnlocked.push("daily_devotee")
      }
    }

    return newlyUnlocked
  }
}
