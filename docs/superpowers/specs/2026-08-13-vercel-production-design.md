# Mind Pairs Vercel Production Design

## Goal

Replace the stale standalone v0 deployment with the current `saarf77/PawMatch` Expo application and keep future production deployments connected to `master`.

## Design

- Add the Expo web dependencies required by the current SDK.
- Add a reproducible `build:web` script that exports the application to `dist`.
- Add Vercel configuration for the build output and single-page fallback.
- Push the verified configuration to `saarf77/PawMatch`.
- Import that repository into Vercel as a Git-connected project using `master`.
- Verify the production application contains categories and advanced modes from the current repository.
- Use the new production URL for the portfolio's PawMatch live link and proof capture.

The old v0 project remains untouched unless Saar separately authorizes deleting it or moving its domain.

## Verification

- The export fails before web dependencies are added and passes afterward.
- The generated `dist/index.html` and JavaScript assets exist.
- The production URL returns HTTP 200.
- The production menu exposes the current feature set rather than only the old animal-card flow.
- The Vercel project is connected to `saarf77/PawMatch` on `master`.

