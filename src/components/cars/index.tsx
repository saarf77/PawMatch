import React from "react"
import { Image, View } from "react-native"

const logos: Record<string, any> = {
  bmw:         require("../../../assets/cars/bmw.svg"),
  mercedes:    require("../../../assets/cars/mercedes.svg"),
  ferrari:     require("../../../assets/cars/ferrari.svg"),
  audi:        require("../../../assets/cars/audi.svg"),
  toyota:      require("../../../assets/cars/toyota.svg"),
  volkswagen:  require("../../../assets/cars/volkswagen.svg"),
  porsche:     require("../../../assets/cars/porsche.svg"),
  lamborghini: require("../../../assets/cars/lamborghini.svg"),
  ford:        require("../../../assets/cars/ford.svg"),
  chevrolet:   require("../../../assets/cars/chevrolet.svg"),
  honda:       require("../../../assets/cars/honda.svg"),
  nissan:      require("../../../assets/cars/nissan.svg"),
  hyundai:     require("../../../assets/cars/hyundai.svg"),
  kia:         require("../../../assets/cars/kia.svg"),
  mazda:       require("../../../assets/cars/mazda.svg"),
  subaru:      require("../../../assets/cars/subaru.svg"),
  rollsroyce:  require("../../../assets/cars/rollsroyce.svg"),
  bentley:     require("../../../assets/cars/bentley.svg"),
  maserati:    require("../../../assets/cars/maserati.svg"),
  jaguar:      require("../../../assets/cars/jaguar.svg"),
  volvo:       require("../../../assets/cars/volvo.svg"),
  peugeot:     require("../../../assets/cars/peugeot.svg"),
  renault:     require("../../../assets/cars/renault.svg"),
  tesla:       require("../../../assets/cars/tesla.svg"),
  bugatti:     require("../../../assets/cars/bugatti.svg"),
}

function makeCarComponent(carId: string): React.ComponentType<{ size?: number }> {
  return function CarComponent({ size = 80 }: { size?: number }) {
    return (
      <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 8, padding: 6 }}>
        <Image
          source={logos[carId]}
          style={{ width: size * 0.82, height: size * 0.82 }}
          resizeMode="contain"
        />
      </View>
    )
  }
}

export const BMW         = makeCarComponent("bmw")
export const Mercedes    = makeCarComponent("mercedes")
export const Ferrari     = makeCarComponent("ferrari")
export const Audi        = makeCarComponent("audi")
export const Toyota      = makeCarComponent("toyota")
export const Volkswagen  = makeCarComponent("volkswagen")
export const Porsche     = makeCarComponent("porsche")
export const Lamborghini = makeCarComponent("lamborghini")
export const Ford        = makeCarComponent("ford")
export const Chevrolet   = makeCarComponent("chevrolet")
export const Honda       = makeCarComponent("honda")
export const Nissan      = makeCarComponent("nissan")
export const Hyundai     = makeCarComponent("hyundai")
export const Kia         = makeCarComponent("kia")
export const Mazda       = makeCarComponent("mazda")
export const Subaru      = makeCarComponent("subaru")
export const RollsRoyce  = makeCarComponent("rollsroyce")
export const Bentley     = makeCarComponent("bentley")
export const Maserati    = makeCarComponent("maserati")
export const Jaguar      = makeCarComponent("jaguar")
export const Volvo       = makeCarComponent("volvo")
export const Peugeot     = makeCarComponent("peugeot")
export const Renault     = makeCarComponent("renault")
export const Tesla       = makeCarComponent("tesla")
export const Bugatti     = makeCarComponent("bugatti")

export const CAR_COMPONENTS: Record<string, React.ComponentType<{ size?: number }>> = {
  bmw: BMW, mercedes: Mercedes, ferrari: Ferrari, audi: Audi,
  toyota: Toyota, volkswagen: Volkswagen, porsche: Porsche,
  lamborghini: Lamborghini, ford: Ford, chevrolet: Chevrolet,
  honda: Honda, nissan: Nissan, hyundai: Hyundai, kia: Kia,
  mazda: Mazda, subaru: Subaru, rollsroyce: RollsRoyce,
  bentley: Bentley, maserati: Maserati, jaguar: Jaguar,
  volvo: Volvo, peugeot: Peugeot, renault: Renault,
  tesla: Tesla, bugatti: Bugatti,
}
