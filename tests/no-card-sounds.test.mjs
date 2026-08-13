import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import test from "node:test"

const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"))
const appSource = readFileSync(new URL("../App.tsx", import.meta.url), "utf8")
const gameScreenSource = readFileSync(new URL("../src/components/GameScreen.tsx", import.meta.url), "utf8")
const twoPlayerSource = readFileSync(new URL("../src/components/TwoPlayerGameScreen.tsx", import.meta.url), "utf8")

test("ships without card reveal audio or sound controls", () => {
  assert.equal(packageJson.dependencies?.["expo-audio"], undefined)
  assert.doesNotMatch(appSource, /playCard|getCardFlipFeedback|cardSoundsEnabled/)
  assert.doesNotMatch(gameScreenSource, /Mute card sounds|cardSoundsEnabled/)
  assert.doesNotMatch(twoPlayerSource, /playCard|Mute card sounds|cardSoundsEnabled/)
  assert.equal(existsSync(new URL("../src/utils/cardSounds.ts", import.meta.url)), false)
  assert.equal(existsSync(new URL("../assets/sounds", import.meta.url)), false)
})
