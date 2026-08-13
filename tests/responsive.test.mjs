import assert from "node:assert/strict"
import test from "node:test"

import { getResponsiveMetrics } from "../src/utils/responsive.ts"

test("keeps phone sizing at the existing baseline", () => {
  assert.deepEqual(getResponsiveMetrics(390), {
    scale: 1,
    contentMaxWidth: 760,
    pagePadding: 16,
    isTablet: false,
    isDesktop: false,
  })
})

test("caps tablet and desktop scaling instead of doubling the interface", () => {
  assert.equal(getResponsiveMetrics(768).scale, 1.12)
  assert.equal(getResponsiveMetrics(990).scale, 1.12)
  assert.equal(getResponsiveMetrics(1920).scale, 1.12)
})

test("reduces scale and gutters on narrow phones", () => {
  const metrics = getResponsiveMetrics(320)

  assert.equal(metrics.scale, 0.88)
  assert.equal(metrics.pagePadding, 12)
  assert.equal(metrics.isTablet, false)
})

test("uses one stable content width across large screens", () => {
  assert.equal(getResponsiveMetrics(768).contentMaxWidth, 720)
  assert.equal(getResponsiveMetrics(990).contentMaxWidth, 760)
  assert.equal(getResponsiveMetrics(1440).contentMaxWidth, 760)
  assert.equal(getResponsiveMetrics(990).isDesktop, true)
})
