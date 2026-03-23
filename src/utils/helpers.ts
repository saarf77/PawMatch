export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

export const getGridConfig = (numCards: number): { cols: number } => {
  const maxCols = Math.min(6, Math.ceil(numCards / 4))
  const cols = Math.max(4, Math.min(maxCols, 5))
  return { cols }
}
