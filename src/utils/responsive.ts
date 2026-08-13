export interface ResponsiveMetrics {
  scale: number
  contentMaxWidth: number
  pagePadding: number
  isTablet: boolean
  isDesktop: boolean
}

export function getResponsiveMetrics(width: number): ResponsiveMetrics {
  const isTablet = width >= 768
  const isDesktop = width >= 900
  const scale = Math.min(Math.max(width / 390, 0.88), 1.12)
  const contentMaxWidth = isTablet && !isDesktop ? 720 : 760
  const pagePadding = width < 360 ? 12 : isTablet ? 24 : 16

  return { scale, contentMaxWidth, pagePadding, isTablet, isDesktop }
}
