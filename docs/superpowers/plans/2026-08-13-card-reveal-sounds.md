# Card-Reveal Sounds Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Play short offline animal or car audio on accepted card flips, with a persistent accessible mute control in single-player and two-player games.

**Architecture:** Keep item-to-sound grouping in a pure tested module and keep playback inside the existing `SoundService`. App state loads and persists one audio preference, while both game flows explicitly request playback only after validating a manual flip.

**Tech Stack:** React Native 0.83, Expo SDK 55, TypeScript, `expo-audio`, Node test runner, local MP3 assets, Vercel static deployment.

---

## File map

- Create `src/utils/cardSounds.ts`: pure item-to-profile mapping and preference constants.
- Create `tests/cardSounds.test.mjs`: mapping and preference behavior.
- Create `assets/sounds/*.mp3`: short offline animal and car clips.
- Create `assets/sounds/ATTRIBUTION.md`: source and license records.
- Modify `src/services/SoundService.ts`: managed Expo audio player, preloading, replacement playback, mute state, and cleanup.
- Modify `src/utils/storage.ts`: browser-local persistence path in addition to the native file-system path.
- Modify `App.tsx`: load preference, preload the active category, play the revealed item, and pass audio controls.
- Modify `src/components/GameScreen.tsx`: accessible sound toggle in the HUD.
- Modify `src/components/TwoPlayerGameScreen.tsx`: reveal playback and the same toggle.
- Modify `package.json` and `package-lock.json`: add `expo-audio` and run both test suites.

### Task 1: Pure sound selection rules

- [ ] **Step 1: Write `tests/cardSounds.test.mjs` first**

Cover exact elephant mapping, big-cat grouping, quiet-animal fallback, ICE and electric car profiles, and no sounds for flags or food using `getCardSoundKey(category, itemId)`.

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test tests/cardSounds.test.mjs`

Expected: FAIL because `src/utils/cardSounds.ts` does not exist.

- [ ] **Step 3: Implement `src/utils/cardSounds.ts`**

Export `CardSoundKey`, `CARD_SOUNDS_STORAGE_KEY`, `DEFAULT_CARD_SOUNDS_ENABLED`, and `getCardSoundKey(category, itemId)`. Use explicit animal groups and map Tesla to `car-electric`, sports brands to `car-sport`, luxury brands to `car-luxury`, and remaining cars to `car-engine`.

- [ ] **Step 4: Run the test and verify GREEN**

Run: `node --test tests/cardSounds.test.mjs`

Expected: all mapping tests pass.

### Task 2: Licensed offline audio pack

- [ ] **Step 1: Add short source clips below `assets/sounds/`**

Bundle elephant, big-cat, dog, cat, duck, horse, nature, generic engine, sports engine, luxury engine, and electric whoosh MP3 files. Trim long recordings to approximately 0.5–2 seconds and normalize them so card flips remain responsive and pleasant.

- [ ] **Step 2: Add `assets/sounds/ATTRIBUTION.md`**

Record title, author, source URL, license, and any trimming/conversion for each clip. Accept only CC0/public-domain assets or original generated effects.

- [ ] **Step 3: Validate the pack**

Run: `find assets/sounds -name '*.mp3' -exec file {} +`

Expected: every mapped source is a valid MPEG audio file and no file is empty.

### Task 3: Playback and persistence

- [ ] **Step 1: Add `expo-audio`**

Run: `npx expo install expo-audio`

Expected: the Expo-compatible package version is added to the lockfile.

- [ ] **Step 2: Extend `SoundService`**

Add a static asset table using literal `require()` calls. `prepareCategory` preloads unique mapped sounds for animals or cars. `playCard` exits when muted or unmapped, stops/replaces the one active player, seeks to zero, and plays. Playback errors must never reject into the game flow. Add `setCardSoundsEnabled` and `release`.

- [ ] **Step 3: Make the shared storage browser-safe**

When `Platform.OS === 'web'`, use `globalThis.localStorage` in `storageGet`, `storageSet`, and `storageRemove`; retain the existing Expo file-system implementation on native.

- [ ] **Step 4: Verify types**

Run: `npx tsc --noEmit`

Expected: exit 0.

### Task 4: Single-player and two-player wiring

- [ ] **Step 1: Add interaction assertions before production wiring**

Extend the testable helper surface so an accepted flip yields one `{ category, itemId }` playback request and rejected flips yield none. Run the focused test to verify RED before wiring the callers.

- [ ] **Step 2: Wire `App.tsx`**

Load `CARD_SOUNDS_STORAGE_KEY`, default to enabled, synchronize `SoundService`, and persist toggles. Call `SoundService.playCard(category, cards[clickedIndex].itemId)` after the existing rejection guards and before state mutation. Prepare the selected category in `startGame`.

- [ ] **Step 3: Add the single-player toggle**

Add a small HUD `TouchableOpacity` showing `🔊` or `🔇`, with `accessibilityRole="button"`, state, label, and hint. Toggling must not affect the clue button or haptics.

- [ ] **Step 4: Wire two-player playback and toggle**

After two-player guard checks, call `SoundService.playCard(category, card.itemId)`. Accept the audio preference and toggle callback as props, display the same accessible control, and prepare the category when the game initializes.

- [ ] **Step 5: Run focused and full tests**

Run: `npm test`

Expected: responsive and sound tests pass with zero failures.

### Task 5: Production verification and deployment

- [ ] **Step 1: Run static checks**

Run: `npx tsc --noEmit && npm test && npm run build:web && git diff --check`

Expected: every command exits 0.

- [ ] **Step 2: Browser smoke-test locally**

Verify animal and car games, elephant and car playback, mute/unmute, preference persistence after reload, single-player and two-player HUDs, no audio overlap, and no console errors.

- [ ] **Step 3: Commit and push**

Stage only the PawMatch feature files, commit with a focused message, and push `master` to `origin`.

- [ ] **Step 4: Verify the Vercel deployment**

Confirm `https://paw-match-omega.vercel.app/` serves the new commit, then repeat the production browser smoke test.
