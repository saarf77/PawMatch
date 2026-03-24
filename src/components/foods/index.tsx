import React from "react"
import { View, Text } from "react-native"

function makeFood(emoji: string) {
  return function FoodComponent({ size = 80 }: { size?: number }) {
    return (
      <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: size * 0.6 }}>{emoji}</Text>
      </View>
    )
  }
}

export const Pizza    = makeFood("🍕")
export const Sushi    = makeFood("🍣")
export const Burger   = makeFood("🍔")
export const Taco     = makeFood("🌮")
export const Ramen    = makeFood("🍜")
export const Icecream = makeFood("🍦")
export const Cake     = makeFood("🎂")
export const Donut    = makeFood("🍩")
export const Hotdog   = makeFood("🌭")
export const Croissant = makeFood("🥐")
export const Dumpling = makeFood("🥟")
export const Fries    = makeFood("🍟")
export const Waffle   = makeFood("🧇")
export const Cupcake  = makeFood("🧁")
export const Pretzel  = makeFood("🥨")
export const Cookie   = makeFood("🍪")
export const Lollipop = makeFood("🍭")
export const Popcorn  = makeFood("🍿")
export const Strawberry = makeFood("🍓")
export const Watermelon = makeFood("🍉")
export const Avocado  = makeFood("🥑")
export const Mushroom = makeFood("🍄")
export const Broccoli = makeFood("🥦")
export const Cheese   = makeFood("🧀")
export const Bacon    = makeFood("🥓")

export const FOOD_COMPONENTS: Record<string, React.ComponentType<{ size?: number }>> = {
  pizza:      Pizza,
  sushi:      Sushi,
  burger:     Burger,
  taco:       Taco,
  ramen:      Ramen,
  icecream:   Icecream,
  cake:       Cake,
  donut:      Donut,
  hotdog:     Hotdog,
  croissant:  Croissant,
  dumpling:   Dumpling,
  fries:      Fries,
  waffle:     Waffle,
  cupcake:    Cupcake,
  pretzel:    Pretzel,
  cookie:     Cookie,
  lollipop:   Lollipop,
  popcorn:    Popcorn,
  strawberry: Strawberry,
  watermelon: Watermelon,
  avocado:    Avocado,
  mushroom:   Mushroom,
  broccoli:   Broccoli,
  cheese:     Cheese,
  bacon:      Bacon,
}
