import * as Haptics from "expo-haptics"

// React Native doesn't have Web Audio API.
// We use haptics for tactile feedback instead.
// For real audio, expo-audio can be added with sound files.

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
}
