import { useWindowDimensions } from "react-native"

// Returns a scale factor relative to iPhone base (390pt wide)
// iPad mini ~768, iPad ~820, iPad Pro ~1024
export function useScale() {
  const { width, height } = useWindowDimensions()
  const isTablet = width >= 768
  // Scale fonts/spacing proportionally, capped so things don't get absurdly large
  const scale = Math.min(width / 390, 2.2)
  return { scale, isTablet, screenWidth: width, screenHeight: height }
}
