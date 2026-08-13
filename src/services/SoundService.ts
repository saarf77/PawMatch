import * as Haptics from "expo-haptics"
import { createAudioPlayer, preload, type AudioPlayer, type AudioSource } from "expo-audio"

import type { Category } from "../types"
import { getCardSoundKey, type CardSoundKey } from "../utils/cardSounds"

type CardSoundProfile = {
  source: AudioSource
  rate: number
  volume: number
}

const CARD_SOUND_PROFILES: Record<CardSoundKey, CardSoundProfile> = {
  "animal-elephant": { source: require("../../assets/sounds/animal-elephant.mp3"), rate: 1, volume: 0.9 },
  "animal-roar": { source: require("../../assets/sounds/animal-roar.mp3"), rate: 1, volume: 0.8 },
  "animal-cat": { source: require("../../assets/sounds/animal-cat.mp3"), rate: 1.15, volume: 0.75 },
  "animal-dog": { source: require("../../assets/sounds/animal-dog.mp3"), rate: 1, volume: 0.75 },
  "animal-duck": { source: require("../../assets/sounds/animal-duck.mp3"), rate: 1, volume: 0.75 },
  "animal-horse": { source: require("../../assets/sounds/animal-horse.mp3"), rate: 1, volume: 0.8 },
  "animal-nature": { source: require("../../assets/sounds/animal-nature.mp3"), rate: 1.15, volume: 0.55 },
  "animal-ocean": { source: require("../../assets/sounds/animal-ocean.mp3"), rate: 1.2, volume: 0.6 },
  "car-engine": { source: require("../../assets/sounds/car-engine.mp3"), rate: 1, volume: 0.7 },
  "car-sport": { source: require("../../assets/sounds/car-sport.mp3"), rate: 1.3, volume: 0.75 },
  "car-luxury": { source: require("../../assets/sounds/car-luxury.mp3"), rate: 0.82, volume: 0.65 },
  "car-electric": { source: require("../../assets/sounds/car-electric.mp3"), rate: 1.55, volume: 0.6 },
}

const MAX_CARD_SOUND_MS = 1600

let cardSoundsEnabled = true
let cardPlayer: AudioPlayer | null = null
let stopTimer: ReturnType<typeof setTimeout> | null = null
const preloadedKeys = new Set<CardSoundKey>()

function stopCardPlayback(): void {
  if (stopTimer) clearTimeout(stopTimer)
  stopTimer = null
  try {
    cardPlayer?.pause()
  } catch {
    // Audio support must never block the game.
  }
}

function getPlayer(): AudioPlayer {
  cardPlayer ??= createAudioPlayer(null, { downloadFirst: true, updateInterval: 1000 })
  return cardPlayer
}

export const SoundService = {
  flip() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  },
  match() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  },
  victory() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  },
  shuffle() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  },
  clue() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  },
  setCardSoundsEnabled(enabled: boolean) {
    cardSoundsEnabled = enabled
    if (!enabled) stopCardPlayback()
  },
  prepareCategory(category: Category) {
    const categoryPrefix = category === "animals" ? "animal-" : category === "cars" ? "car-" : null
    if (!categoryPrefix) return

    for (const key of Object.keys(CARD_SOUND_PROFILES) as CardSoundKey[]) {
      if (!key.startsWith(categoryPrefix) || preloadedKeys.has(key)) continue
      preloadedKeys.add(key)
      void Promise.resolve(preload(CARD_SOUND_PROFILES[key].source)).catch(() => {
        preloadedKeys.delete(key)
      })
    }
  },
  playCard(category: Category, itemId: string) {
    if (!cardSoundsEnabled) return
    const soundKey = getCardSoundKey(category, itemId)
    if (!soundKey) return

    try {
      const profile = CARD_SOUND_PROFILES[soundKey]
      const player = getPlayer()
      stopCardPlayback()
      player.replace(profile.source)
      player.volume = profile.volume
      player.setPlaybackRate(profile.rate)
      player.play()
      stopTimer = setTimeout(stopCardPlayback, MAX_CARD_SOUND_MS)
    } catch (error) {
      if (__DEV__) console.warn("Card sound unavailable", error)
    }
  },
  release() {
    stopCardPlayback()
    try {
      cardPlayer?.remove()
    } catch {
      // Already released or unsupported.
    }
    cardPlayer = null
    preloadedKeys.clear()
  },
}
