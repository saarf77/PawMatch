import * as FileSystem from "expo-file-system/legacy"
import type { Score } from "../types"

const FILE_PATH = FileSystem.documentDirectory + "memory_game_scores.json"

export class LeaderboardService {
  static async getScores(): Promise<Score[]> {
    try {
      const info = await FileSystem.getInfoAsync(FILE_PATH)
      if (!info.exists) return []
      const content = await FileSystem.readAsStringAsync(FILE_PATH)
      return JSON.parse(content)
    } catch {
      return []
    }
  }

  static async saveScore(score: Score): Promise<void> {
    try {
      const current = await this.getScores()
      current.push(score)
      current.sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score
        return a.time - b.time
      })
      const top = current.slice(0, 100)
      await FileSystem.writeAsStringAsync(FILE_PATH, JSON.stringify(top))
    } catch (e) {
      console.error("Error saving score:", e)
    }
  }
}
