import { storageGet, storageSet, storageRemove } from "../utils/storage"
import type { CampaignLevel } from "../types"
import { CAMPAIGN_LEVELS } from "../utils/constants"

const STORAGE_KEY = "campaign_progress"
type SavedProgress = Record<number, { completed: boolean; stars: number }>

export class CampaignService {
  static async getProgressWithUnlocked(): Promise<(CampaignLevel & { unlocked: boolean })[]> {
    try {
      const raw = await storageGet(STORAGE_KEY)
      const saved: SavedProgress = raw ? JSON.parse(raw) : {}
      return CAMPAIGN_LEVELS.map((lvl, index) => {
        const savedLevel = saved[lvl.level]
        const completed = savedLevel?.completed ?? false
        const stars = savedLevel?.stars ?? 0
        const previousCompleted = index === 0 ? true : (saved[CAMPAIGN_LEVELS[index - 1].level]?.completed ?? false)
        return { ...lvl, completed, stars, unlocked: previousCompleted }
      })
    } catch {
      return CAMPAIGN_LEVELS.map((lvl, index) => ({ ...lvl, completed: false, stars: 0, unlocked: index === 0 }))
    }
  }

  static async completeLevel(level: number, stars: number): Promise<void> {
    try {
      const raw = await storageGet(STORAGE_KEY)
      const saved: SavedProgress = raw ? JSON.parse(raw) : {}
      saved[level] = { completed: true, stars: Math.max(stars, saved[level]?.stars ?? 0) }
      await storageSet(STORAGE_KEY, JSON.stringify(saved))
    } catch (e) {
      console.error("CampaignService.completeLevel error:", e)
    }
  }

  static async resetProgress(): Promise<void> {
    await storageRemove(STORAGE_KEY)
  }
}
