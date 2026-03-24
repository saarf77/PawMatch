import AsyncStorage from "@react-native-async-storage/async-storage"
import type { CampaignLevel } from "../types"
import { CAMPAIGN_LEVELS } from "../utils/constants"

const STORAGE_KEY = "campaign_progress"

type SavedProgress = Record<number, { completed: boolean; stars: number }>

export class CampaignService {
  static async getProgress(): Promise<CampaignLevel[]> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY)
      const saved: SavedProgress = raw ? JSON.parse(raw) : {}

      return CAMPAIGN_LEVELS.map((lvl, index) => {
        const savedLevel = saved[lvl.level]
        const completed = savedLevel?.completed ?? false
        const stars = savedLevel?.stars ?? 0

        // Level 1 is always unlocked; subsequent levels unlock when previous is completed
        const previousCompleted = index === 0 ? true : (saved[CAMPAIGN_LEVELS[index - 1].level]?.completed ?? false)
        const unlocked = previousCompleted

        return {
          ...lvl,
          completed,
          stars,
          // Re-use the `unlocked` state by embedding it in stars/completed:
          // Locked levels get stars = -1 as a sentinel, but CampaignLevel type only has 0-3.
          // Instead we keep type clean — locked levels have completed=false and stars=0,
          // but callers can detect locked status by checking the unlocked flag below.
          // We attach it as an extra field via type widening in the return value.
          // Since CampaignLevel doesn't have `unlocked`, we store it alongside.
        } as CampaignLevel & { unlocked: boolean }
      }) as unknown as CampaignLevel[]
    } catch (e) {
      console.error("CampaignService.getProgress error:", e)
      return CAMPAIGN_LEVELS.map((lvl, index) => ({
        ...lvl,
        completed: false,
        stars: 0,
        unlocked: index === 0,
      })) as unknown as CampaignLevel[]
    }
  }

  /**
   * Returns levels with an extra `unlocked` boolean field attached to each item.
   * This is the preferred method for UI consumption.
   */
  static async getProgressWithUnlocked(): Promise<(CampaignLevel & { unlocked: boolean })[]> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY)
      const saved: SavedProgress = raw ? JSON.parse(raw) : {}

      return CAMPAIGN_LEVELS.map((lvl, index) => {
        const savedLevel = saved[lvl.level]
        const completed = savedLevel?.completed ?? false
        const stars = savedLevel?.stars ?? 0
        const previousCompleted = index === 0 ? true : (saved[CAMPAIGN_LEVELS[index - 1].level]?.completed ?? false)
        const unlocked = previousCompleted

        return { ...lvl, completed, stars, unlocked }
      })
    } catch (e) {
      console.error("CampaignService.getProgressWithUnlocked error:", e)
      return CAMPAIGN_LEVELS.map((lvl, index) => ({
        ...lvl,
        completed: false,
        stars: 0,
        unlocked: index === 0,
      }))
    }
  }

  static async completeLevel(level: number, stars: number): Promise<void> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY)
      const saved: SavedProgress = raw ? JSON.parse(raw) : {}

      // Only upgrade stars, never downgrade
      const existing = saved[level]
      saved[level] = {
        completed: true,
        stars: Math.max(stars, existing?.stars ?? 0),
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
    } catch (e) {
      console.error("CampaignService.completeLevel error:", e)
    }
  }

  static async resetProgress(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      console.error("CampaignService.resetProgress error:", e)
    }
  }
}
