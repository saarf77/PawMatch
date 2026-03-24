import React, { useEffect, useRef } from "react"
import { Animated, Dimensions, StyleSheet, View } from "react-native"

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

const COLORS = [
  "#FF6B6B",
  "#FFE66D",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98FB98",
]

const PIECE_COUNT = 30

interface ConfettiPiece {
  translateY: Animated.Value
  translateX: Animated.Value
  rotate: Animated.Value
  opacity: Animated.Value
  x: number
  size: number
  color: string
  delay: number
  drift: number
}

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

function createPieces(): ConfettiPiece[] {
  return Array.from({ length: PIECE_COUNT }, () => ({
    translateY: new Animated.Value(0),
    translateX: new Animated.Value(0),
    rotate: new Animated.Value(0),
    opacity: new Animated.Value(1),
    x: randomBetween(0, SCREEN_WIDTH),
    size: Math.round(randomBetween(6, 12)),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: randomBetween(0, 1200),
    drift: randomBetween(-60, 60),
  }))
}

interface Props {
  onComplete?: () => void
}

export function Confetti({ onComplete }: Props): React.ReactElement {
  const pieces = useRef<ConfettiPiece[]>(createPieces()).current

  useEffect(() => {
    const animations = pieces.map((piece) =>
      Animated.sequence([
        Animated.delay(piece.delay),
        Animated.parallel([
          Animated.timing(piece.translateY, {
            toValue: SCREEN_HEIGHT + 20,
            duration: randomBetween(1800, 3200),
            useNativeDriver: true,
          }),
          Animated.timing(piece.translateX, {
            toValue: piece.drift,
            duration: randomBetween(1800, 3200),
            useNativeDriver: true,
          }),
          Animated.timing(piece.rotate, {
            toValue: randomBetween(2, 6),
            duration: randomBetween(1800, 3200),
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.delay(randomBetween(1400, 2400)),
            Animated.timing(piece.opacity, {
              toValue: 0,
              duration: 600,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ])
    )

    Animated.parallel(animations).start(() => {
      onComplete?.()
    })
  }, [])

  return (
    <View style={styles.container} pointerEvents="none">
      {pieces.map((piece, index) => {
        const rotateDeg = piece.rotate.interpolate({
          inputRange: [0, 6],
          outputRange: ["0deg", "1080deg"],
        })
        return (
          <Animated.View
            key={index}
            style={[
              styles.piece,
              {
                left: piece.x,
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                borderRadius: piece.size < 9 ? 1 : 2,
                opacity: piece.opacity,
                transform: [
                  { translateY: piece.translateY },
                  { translateX: piece.translateX },
                  { rotate: rotateDeg },
                ],
              },
            ]}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  piece: {
    position: "absolute",
    top: -16,
  },
})
