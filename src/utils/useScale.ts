import { useWindowDimensions } from "react-native"
import { getResponsiveMetrics } from "./responsive"

export function useScale() {
  const { width, height } = useWindowDimensions()
  const metrics = getResponsiveMetrics(width)

  return { ...metrics, screenWidth: width, screenHeight: height }
}
