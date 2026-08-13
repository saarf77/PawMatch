# Mind Pairs Vercel Production Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the current `saarf77/PawMatch` Expo application as a Git-connected Vercel production deployment.

**Architecture:** Expo produces a static Metro web export in `dist`. Vercel serves those assets and falls back application routes to `index.html`; GitHub `master` becomes the production source for future deploys.

**Tech Stack:** Expo 55, React Native Web, Metro, Vercel, GitHub

---

### Task 1: Make the Expo web export reproducible

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Record the failing export**

Run: `npx expo export --platform web --output-dir dist`

Expected: FAIL requesting `react-dom` and `react-native-web`.

- [ ] **Step 2: Install SDK-compatible web dependencies**

Run: `npx expo install react-dom react-native-web @expo/metro-runtime`

Expected: `package.json` and `package-lock.json` contain Expo-compatible versions.

- [ ] **Step 3: Add the production build script**

Add to `package.json`:

```json
"build:web": "expo export --platform web --output-dir dist"
```

- [ ] **Step 4: Verify the export passes**

Run: `npm run build:web`

Expected: exit code 0 with `dist/index.html` and bundled web assets.

### Task 2: Add Vercel static-hosting configuration

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Add the build and routing contract**

```json
{
  "buildCommand": "npm run build:web",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

- [ ] **Step 2: Validate configuration and generated files**

Run: `node -e "JSON.parse(require('fs').readFileSync('vercel.json')); require('fs').accessSync('dist/index.html')"`

Expected: exit code 0.

- [ ] **Step 3: Run TypeScript validation**

Run: `npx tsc --noEmit`

Expected: exit code 0.

### Task 3: Publish the source and deploy

**Files:**
- Commit: `package.json`, `package-lock.json`, `vercel.json`, deployment docs

- [ ] **Step 1: Review the exact source changes**

Run: `git diff --check && git diff --stat && git status --short`

Expected: only deployment-related changes and no whitespace errors.

- [ ] **Step 2: Commit and push `master`**

```bash
git add package.json package-lock.json vercel.json docs/superpowers
git commit -m "build: add Vercel web deployment"
git push origin master
```

Expected: GitHub `master` contains the deployment commit.

- [ ] **Step 3: Create the Vercel project**

Import `saarf77/PawMatch`, use `master`, and deploy with `vercel.json`.

Expected: Vercel reports a successful production deployment and the project Git settings show `saarf77/PawMatch`.

- [ ] **Step 4: Verify production**

Copy the exact production URL returned by Vercel and request it with `curl -L -sS -o /dev/null -w '%{http_code}'`.

Expected: `200`.

- [ ] **Step 5: Verify current features visually**

Open the production URL, start the game, and confirm the category and mode screens expose animals, flags, cars, food, campaign, daily challenge, achievements, themes, and two-player play.

Expected: the new deployment matches `saarf77/PawMatch`, not the stale v0 build.
