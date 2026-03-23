import React, { useEffect, useRef } from "react"
import { TouchableOpacity, View, Text, Animated, StyleSheet } from "react-native"
import type { MemoryCard, Category } from "../types"
import { ANIMAL_COMPONENTS } from "./animals"
import { FLAG_COMPONENTS } from "./flags"
import { CAR_COMPONENTS } from "./cars"

interface Props {
  card: MemoryCard
  isFlipped: boolean
  onClick: () => void
  cardWidth: number
  cardHeight: number
  category?: Category
}

export function MemoryCardComponent({ card, isFlipped, onClick, cardWidth, cardHeight, category = "animals" }: Props) {
  // scaleX flip trick — works with useNativeDriver unlike rotateY
  const flipAnim = useRef(new Animated.Value(isFlipped ? 1 : 0)).current
  const scaleAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.timing(flipAnim, {
      toValue: isFlipped ? 1 : 0,
      duration: 280,
      useNativeDriver: true,
    }).start()
  }, [isFlipped])

  useEffect(() => {
    if (card.isMatched) {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.12, duration: 120, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1,    duration: 150, useNativeDriver: true }),
      ]).start()
    }
  }, [card.isMatched])

  // scaleX goes 1 → 0 (first half) → 0 → 1 (second half)
  const backScaleX  = flipAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0, 0] })
  const frontScaleX = flipAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0, 1] })
  const backOpacity  = flipAnim.interpolate({ inputRange: [0.49, 0.5], outputRange: [1, 0] })
  const frontOpacity = flipAnim.interpolate({ inputRange: [0.49, 0.5], outputRange: [0, 1] })

  const ItemSVG = category === "flags" ? FLAG_COMPONENTS[card.itemId] : category === "cars" ? CAR_COMPONENTS[card.itemId] : ANIMAL_COMPONENTS[card.itemId]
  const isFlag = category === "flags"
  const svgSize = isFlag ? Math.floor(cardWidth * 0.82) : Math.floor(cardHeight * 0.58)
  const labelFontSize = Math.max(8, Math.floor(cardWidth * 0.13))

  return (
    <TouchableOpacity
      onPress={onClick}
      activeOpacity={0.85}
      style={{ width: cardWidth, height: cardHeight }}
    >
      <Animated.View style={[{ flex: 1 }, { transform: [{ scale: scaleAnim }] }]}>

        {/* BACK */}
        <Animated.View style={[
          styles.cardFace,
          styles.cardBack,
          card.isHighlighted && styles.highlighted,
          { width: cardWidth, height: cardHeight },
          { transform: [{ scaleX: backScaleX }], opacity: backOpacity, position: "absolute" },
        ]}>
          <Text style={styles.backEmoji}>🐾</Text>
        </Animated.View>

        {/* FRONT */}
        <Animated.View style={[
          styles.cardFace,
          styles.cardFront,
          card.isMatched && styles.cardMatched,
          { width: cardWidth, height: cardHeight },
          { transform: [{ scaleX: frontScaleX }], opacity: frontOpacity, position: "absolute" },
        ]}>
          <View style={[styles.animalArea, isFlag && styles.flagArea]}>
            {ItemSVG && <ItemSVG size={svgSize} />}
          </View>
          <View style={[styles.label, card.isMatched && styles.labelMatched]}>
            <Text
              style={[styles.labelText, { fontSize: labelFontSize }, card.isMatched && styles.labelTextMatched]}
              numberOfLines={1}
            >
              {card.label}
            </Text>
          </View>
        </Animated.View>

      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardFace: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  cardBack: {
    backgroundColor: "#5B21B6",
    borderColor: "rgba(255,255,255,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  highlighted: {
    borderColor: "#FBBF24",
    borderWidth: 3,
  },
  backEmoji: { fontSize: 26 },
  cardFront: {
    backgroundColor: "white",
    borderColor: "#CBD5E1",
    flexDirection: "column",
  },
  cardMatched: {
    backgroundColor: "#ECFDF5",
    borderColor: "#34D399",
    borderWidth: 2,
  },
  animalArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 2,
  },
  flagArea: {
    paddingTop: 0,
    paddingHorizontal: 4,
  },
  label: {
    backgroundColor: "#F1F5F9",
    paddingVertical: 3,
    paddingHorizontal: 2,
    alignItems: "center",
  },
  labelMatched: { backgroundColor: "#34D399" },
  labelText: { fontWeight: "700", color: "#475569", textAlign: "center" },
  labelTextMatched: { color: "white" },
})
