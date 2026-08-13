# PawMatch Card-Reveal Sounds

## Goal

Make animal and car cards feel alive by playing a short, recognizable sound when the player successfully flips a face-down card. The feature must work on web, iOS, and Android, remain usable offline, and never become noisy or mandatory.

## Experience

- An accepted tap keeps the existing flip haptic and immediately plays the revealed card's sound.
- Animal cards use recognizable real-animal clips where one exists: elephant trumpet, lion or tiger roar, wolf howl, cat meow, dog bark, duck quack, horse neigh, owl hoot, and similar sounds.
- Quiet, fictional, or difficult-to-identify animals use one gentle nature cue rather than a misleading recording.
- Car cards use four honest sound profiles instead of claiming that every brand has a model-specific recording: supercar rev, luxury engine, everyday engine, and electric whoosh.
- Only one reveal sound plays at a time. A new accepted flip replaces the previous clip so rapid play cannot create overlapping noise.
- Automatic reveals, matched cards remaining face-up, clues, and rerenders do not replay card sounds.
- A compact speaker control appears in both single-player and two-player HUDs. It shows `🔊` when enabled and `🔇` when muted, has an accessible label, and persists the choice.
- Sound starts enabled. Haptics, match feedback, and victory feedback continue to work when card sounds are muted.

## Architecture

`SoundService` remains the single feedback boundary. It gains:

- a static mapping from `(category, itemId)` to a small bundled audio source;
- `prepareCategory(category)` to preload only the sounds needed for the current game;
- `playCard(category, itemId)` to restart or replace the active short clip;
- `setCardSoundsEnabled(enabled)` and cleanup for the persistent player.

A pure `cardSoundMap` module owns the grouping rules so they can be tested without React Native or the audio runtime. App-level state owns the user's sound preference and passes it to both game screens. Persistence uses the existing storage abstraction, with a browser-safe local-storage path for the web build.

Audio playback uses Expo SDK 55's `expo-audio` package and local compressed assets. The app uses one managed player rather than creating a player for every card. Playback failures are swallowed after development logging so a missing or unsupported audio codec can never block a flip.

## Assets and licensing

- Clips are short, trimmed, normalized, and bundled below `assets/sounds/`.
- Use CC0/public-domain recordings or original generated effects only.
- `assets/sounds/ATTRIBUTION.md` records the source and license for every bundled clip, even when attribution is not required.
- The initial pack favors a small number of clear clips over 50 heavy or misleading brand-specific recordings.

## Testing

- Pure mapping tests cover representative animals, all car-profile assignments, category exclusions, and fallback behavior.
- Preference tests cover the default, mute state, and persistence serialization.
- Interaction tests verify that only accepted manual flips request playback in both game modes.
- TypeScript, responsive tests, the web export, and a production browser smoke test must pass before deployment.
- Manual checks confirm audible elephant and car sounds, instant mute/unmute, no overlap, no replay on automatic reveals, and no console errors.

## Out of scope

- Music, volume sliders, remote streaming, recording user audio, exact per-model car recordings, and sounds for flags or food.
