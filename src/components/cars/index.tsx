import React from "react"
import { Image, View } from "react-native"

// Uses car brand logos from a public CDN (car-logos.org)
const BASE = "https://www.carlogos.org/car-logos/"

const CAR_LOGO_URLS: Record<string, string> = {
  bmw:          "https://www.carlogos.org/car-logos/bmw-logo-2020-gray-download.png",
  mercedes:     "https://www.carlogos.org/car-logos/mercedes-benz-logo-2011-download.png",
  ferrari:      "https://www.carlogos.org/car-logos/ferrari-logo-750x1100.png",
  audi:         "https://www.carlogos.org/car-logos/audi-logo-2016-download.png",
  toyota:       "https://www.carlogos.org/car-logos/toyota-logo-2020-europe-download.png",
  volkswagen:   "https://www.carlogos.org/car-logos/volkswagen-logo-2019-download.png",
  porsche:      "https://www.carlogos.org/car-logos/porsche-logo-2014-download.png",
  lamborghini:  "https://www.carlogos.org/car-logos/lamborghini-logo-download.png",
  ford:         "https://www.carlogos.org/car-logos/ford-logo-2017-download.png",
  chevrolet:    "https://www.carlogos.org/car-logos/chevrolet-logo-2013-download.png",
  honda:        "https://www.carlogos.org/car-logos/honda-logo-download.png",
  nissan:       "https://www.carlogos.org/car-logos/nissan-logo-2020-black-download.png",
  hyundai:      "https://www.carlogos.org/car-logos/hyundai-logo-2011-download.png",
  kia:          "https://www.carlogos.org/car-logos/kia-logo-2021-download.png",
  mazda:        "https://www.carlogos.org/car-logos/mazda-logo-2018-download.png",
  subaru:       "https://www.carlogos.org/car-logos/subaru-logo-2019-download.png",
  rollsroyce:   "https://www.carlogos.org/car-logos/rolls-royce-logo-download.png",
  bentley:      "https://www.carlogos.org/car-logos/bentley-logo-2002-download.png",
  maserati:     "https://www.carlogos.org/car-logos/maserati-logo-download.png",
  jaguar:       "https://www.carlogos.org/car-logos/jaguar-logo-2012-download.png",
  volvo:        "https://www.carlogos.org/car-logos/volvo-logo-2014-download.png",
  peugeot:      "https://www.carlogos.org/car-logos/peugeot-logo-2021-download.png",
  renault:      "https://www.carlogos.org/car-logos/renault-logo-2021-download.png",
  tesla:        "https://www.carlogos.org/car-logos/tesla-logo-2007-download.png",
  bugatti:      "https://www.carlogos.org/car-logos/bugatti-logo-download.png",
}

function CarLogo({ carId, size = 80 }: { carId: string; size?: number }) {
  const url = CAR_LOGO_URLS[carId]
  return (
    <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 8 }}>
      <Image
        source={{ uri: url }}
        style={{ width: size * 0.85, height: size * 0.85 }}
        resizeMode="contain"
      />
    </View>
  )
}

// Generate a component for each car
function makeCarComponent(carId: string): React.ComponentType<{ size?: number }> {
  return function CarComponent({ size = 80 }: { size?: number }) {
    return <CarLogo carId={carId} size={size} />
  }
}

export const BMW          = makeCarComponent("bmw")
export const Mercedes     = makeCarComponent("mercedes")
export const Ferrari      = makeCarComponent("ferrari")
export const Audi         = makeCarComponent("audi")
export const Toyota       = makeCarComponent("toyota")
export const Volkswagen   = makeCarComponent("volkswagen")
export const Porsche      = makeCarComponent("porsche")
export const Lamborghini  = makeCarComponent("lamborghini")
export const Ford         = makeCarComponent("ford")
export const Chevrolet    = makeCarComponent("chevrolet")
export const Honda        = makeCarComponent("honda")
export const Nissan       = makeCarComponent("nissan")
export const Hyundai      = makeCarComponent("hyundai")
export const Kia          = makeCarComponent("kia")
export const Mazda        = makeCarComponent("mazda")
export const Subaru       = makeCarComponent("subaru")
export const RollsRoyce   = makeCarComponent("rollsroyce")
export const Bentley      = makeCarComponent("bentley")
export const Maserati     = makeCarComponent("maserati")
export const Jaguar       = makeCarComponent("jaguar")
export const Volvo        = makeCarComponent("volvo")
export const Peugeot      = makeCarComponent("peugeot")
export const Renault      = makeCarComponent("renault")
export const Tesla        = makeCarComponent("tesla")
export const Bugatti      = makeCarComponent("bugatti")

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
