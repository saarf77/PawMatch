import assert from "node:assert/strict"
import test from "node:test"

import {
  CARD_SOUNDS_STORAGE_KEY,
  DEFAULT_CARD_SOUNDS_ENABLED,
  getCardFlipFeedback,
  getCardSoundKey,
  parseCardSoundsPreference,
  serializeCardSoundsPreference,
} from "../src/utils/cardSounds.ts"

test("maps distinctive animal cards to recognizable sounds", () => {
  assert.equal(getCardSoundKey("animals", "elephant"), "animal-elephant")
  assert.equal(getCardSoundKey("animals", "lion"), "animal-roar")
  assert.equal(getCardSoundKey("animals", "tiger"), "animal-roar")
  assert.equal(getCardSoundKey("animals", "cat"), "animal-cat")
  assert.equal(getCardSoundKey("animals", "dog"), "animal-dog")
  assert.equal(getCardSoundKey("animals", "duck"), "animal-duck")
  assert.equal(getCardSoundKey("animals", "horse"), "animal-horse")
})

test("uses honest fallback profiles for quiet or hard-to-identify animals", () => {
  assert.equal(getCardSoundKey("animals", "giraffe"), "animal-nature")
  assert.equal(getCardSoundKey("animals", "butterfly"), "animal-nature")
  assert.equal(getCardSoundKey("animals", "dolphin"), "animal-ocean")
  assert.equal(getCardSoundKey("animals", "whale"), "animal-ocean")
})

test("groups cars by an honest sound profile instead of pretending every brand is unique", () => {
  assert.equal(getCardSoundKey("cars", "tesla"), "car-electric")
  assert.equal(getCardSoundKey("cars", "ferrari"), "car-sport")
  assert.equal(getCardSoundKey("cars", "porsche"), "car-sport")
  assert.equal(getCardSoundKey("cars", "rollsroyce"), "car-luxury")
  assert.equal(getCardSoundKey("cars", "bentley"), "car-luxury")
  assert.equal(getCardSoundKey("cars", "toyota"), "car-engine")
})

test("keeps flags and food quiet", () => {
  assert.equal(getCardSoundKey("flags", "germany"), null)
  assert.equal(getCardSoundKey("food", "pizza"), null)
})

test("starts enabled and uses a stable preference key", () => {
  assert.equal(DEFAULT_CARD_SOUNDS_ENABLED, true)
  assert.equal(CARD_SOUNDS_STORAGE_KEY, "card_sounds_enabled")
  assert.equal(parseCardSoundsPreference(null), true)
  assert.equal(parseCardSoundsPreference("false"), false)
  assert.equal(parseCardSoundsPreference("true"), true)
  assert.equal(parseCardSoundsPreference("broken"), true)
  assert.equal(serializeCardSoundsPreference(false), "false")
})

test("requests sound feedback only for an accepted manual flip", () => {
  const base = {
    category: "animals",
    itemId: "elephant",
    isMatched: false,
    isBlocked: false,
    isAlreadyFlipped: false,
    openCardCount: 0,
  }

  assert.deepEqual(getCardFlipFeedback(base), {
    accepted: true,
    soundKey: "animal-elephant",
  })
  assert.deepEqual(getCardFlipFeedback({ ...base, isAlreadyFlipped: true }), {
    accepted: false,
    soundKey: null,
  })
  assert.deepEqual(getCardFlipFeedback({ ...base, isBlocked: true }), {
    accepted: false,
    soundKey: null,
  })
  assert.deepEqual(getCardFlipFeedback({ ...base, openCardCount: 2 }), {
    accepted: false,
    soundKey: null,
  })
  assert.deepEqual(getCardFlipFeedback({ ...base, category: "flags" }), {
    accepted: true,
    soundKey: null,
  })
})
