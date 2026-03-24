import { storageGet, storageSet } from "../utils/storage"
import type { Achievement } from "../types"

const STORAGE_KEY = "achievements"
const GAMES_PLAYED_KEY = "achievement_games_played"

export class AchievementService {
  static readonly ALL_ACHIEVEMENTS: Achievement[] = [
    { id: "first_flip",        title: "First Flip",        description: "Play your first game",          emoji: "🃏", unlocked: false },
    { id: "perfect_game",      title: "Perfect Game",      description: "Finish with minimum moves",      emoji: "🏆", unlocked: false },
    { id: "speed_demon",       title: "Speed Demon",       description: "Finish in under 30 seconds",     emoji: "⚡", unlocked: false },
    { id: "pair_master",       title: "Pair Master",       description: "Complete 10 games",              emoji: "🎯", unlocked: false },
    { id: "campaign_hero",     title: "Campaign Hero",     description: "Complete all campaign levels",   emoji: "🗺️", unlocked: false },
    { id: "daily_devotee",     title: "Daily Devotee",     description: "Complete the daily challenge",   emoji: "📅", unlocked: false },
    { id: "one_shot_survivor", title: "One-Shot Survivor", description: "Win a One-Shot mode game",       emoji: "💀", unlocked: false },
  ]

  static async getAchievements(): Promise<Achievement[]> {
    try {
      const raw = await storageGet(STORAGE_KEY)
      const saved: Record<string, { unlocked: boolean; unlockedAt?: string }> = raw ? JSON.parse(raw) : {}
      return AchievementService.ALL_ACHIEVEMENTS.map((a) => {
        const entry = saved[a.id]
        return entry?.unlocked ? { ...a, unlocked: true, unlockedAt: entry.unlockedAt } : { ...a, unlocked: false }
      })
    } catch {
      return AchievementService.ALL_ACHIEVEMENTS.map((a) => ({ ...a, unlocked: false }))
    }
  }

  static async unlock(id: string): Promise<boolean> {
    try {
      const raw = await storageGet(STORAGE_KEY)
      const saved: Record<string, { unlocked: boolean; unlockedAt?: string }> = raw ? JSON.parse(raw) : {}
      if (saved[id]?.unlocked) return false
      saved[id] = { unlocked: true, unlockedAt: new Date().toISOString() }
      await storageSet(STORAGE_KEY, JSON.stringify(saved))
      return true
    } catch {
      return false
    }
  }

  static async checkAndUnlock(stats: { moves: number; time: number; pairs: number; gameMode?: string }): Promise<string[]> {
    const newlyUnlocked: string[] = []

    let gamesPlayed = 0
    try {
      const raw = await storageGet(GAMES_PLAYED_KEY)
      gamesPlayed = raw ? parseInt(raw, 10) : 0
    } catch { /* ignore */ }
    gamesPlayed += 1
    await storageSet(GAMES_PLAYED_KEY, String(gamesPlayed))

    if (await AchievementService.unlock("first_flip")) newlyUnlocked.push("first_flip")
    if (stats.moves === stats.pairs * 2 && await AchievementService.unlock("perfect_game")) newlyUnlocked.push("perfect_game")
    if (stats.time < 30 && await AchievementService.unlock("speed_demon")) newlyUnlocked.push("speed_demon")
    if (gamesPlayed >= 10 && await AchievementService.unlock("pair_master")) newlyUnlocked.push("pair_master")
    if (stats.gameMode === "oneshot" && await AchievementService.unlock("one_shot_survivor")) newlyUnlocked.push("one_shot_survivor")
    if (stats.gameMode === "daily" && await AchievementService.unlock("daily_devotee")) newlyUnlocked.push("daily_devotee")

    return newlyUnlocked
  }
}
