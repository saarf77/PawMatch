import React from "react"
import { Image, View } from "react-native"

// Pre-require all at module level to avoid deep-freeze issues
const bmw         = require("../../../assets/cars/bmw.svg")
const mercedes    = require("../../../assets/cars/mercedes.svg")
const ferrari     = require("../../../assets/cars/ferrari.svg")
const audi        = require("../../../assets/cars/audi.svg")
const toyota      = require("../../../assets/cars/toyota.svg")
const volkswagen  = require("../../../assets/cars/volkswagen.svg")
const porsche     = require("../../../assets/cars/porsche.svg")
const lamborghini = require("../../../assets/cars/lamborghini.svg")
const ford        = require("../../../assets/cars/ford.svg")
const chevrolet   = require("../../../assets/cars/chevrolet.svg")
const honda       = require("../../../assets/cars/honda.svg")
const nissan      = require("../../../assets/cars/nissan.svg")
const hyundai     = require("../../../assets/cars/hyundai.svg")
const kia         = require("../../../assets/cars/kia.svg")
const mazda       = require("../../../assets/cars/mazda.svg")
const subaru      = require("../../../assets/cars/subaru.svg")
const rollsroyce  = require("../../../assets/cars/rollsroyce.svg")
const bentley     = require("../../../assets/cars/bentley.svg")
const maserati    = require("../../../assets/cars/maserati.svg")
const jaguar      = require("../../../assets/cars/jaguar.svg")
const volvo       = require("../../../assets/cars/volvo.svg")
const peugeot     = require("../../../assets/cars/peugeot.svg")
const renault     = require("../../../assets/cars/renault.svg")
const tesla       = require("../../../assets/cars/tesla.svg")
const bugatti     = require("../../../assets/cars/bugatti.svg")

function CarLogo({ source, size = 80 }: { source: any; size?: number }) {
  return (
    <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 8, padding: 6 }}>
      <Image source={source} style={{ width: size * 0.82, height: size * 0.82 }} resizeMode="contain" />
    </View>
  )
}

export function BMW({ size = 80 }: { size?: number })         { return <CarLogo source={bmw} size={size} /> }
export function Mercedes({ size = 80 }: { size?: number })    { return <CarLogo source={mercedes} size={size} /> }
export function Ferrari({ size = 80 }: { size?: number })     { return <CarLogo source={ferrari} size={size} /> }
export function Audi({ size = 80 }: { size?: number })        { return <CarLogo source={audi} size={size} /> }
export function Toyota({ size = 80 }: { size?: number })      { return <CarLogo source={toyota} size={size} /> }
export function Volkswagen({ size = 80 }: { size?: number })  { return <CarLogo source={volkswagen} size={size} /> }
export function Porsche({ size = 80 }: { size?: number })     { return <CarLogo source={porsche} size={size} /> }
export function Lamborghini({ size = 80 }: { size?: number }) { return <CarLogo source={lamborghini} size={size} /> }
export function Ford({ size = 80 }: { size?: number })        { return <CarLogo source={ford} size={size} /> }
export function Chevrolet({ size = 80 }: { size?: number })   { return <CarLogo source={chevrolet} size={size} /> }
export function Honda({ size = 80 }: { size?: number })       { return <CarLogo source={honda} size={size} /> }
export function Nissan({ size = 80 }: { size?: number })      { return <CarLogo source={nissan} size={size} /> }
export function Hyundai({ size = 80 }: { size?: number })     { return <CarLogo source={hyundai} size={size} /> }
export function Kia({ size = 80 }: { size?: number })         { return <CarLogo source={kia} size={size} /> }
export function Mazda({ size = 80 }: { size?: number })       { return <CarLogo source={mazda} size={size} /> }
export function Subaru({ size = 80 }: { size?: number })      { return <CarLogo source={subaru} size={size} /> }
export function RollsRoyce({ size = 80 }: { size?: number })  { return <CarLogo source={rollsroyce} size={size} /> }
export function Bentley({ size = 80 }: { size?: number })     { return <CarLogo source={bentley} size={size} /> }
export function Maserati({ size = 80 }: { size?: number })    { return <CarLogo source={maserati} size={size} /> }
export function Jaguar({ size = 80 }: { size?: number })      { return <CarLogo source={jaguar} size={size} /> }
export function Volvo({ size = 80 }: { size?: number })       { return <CarLogo source={volvo} size={size} /> }
export function Peugeot({ size = 80 }: { size?: number })     { return <CarLogo source={peugeot} size={size} /> }
export function Renault({ size = 80 }: { size?: number })     { return <CarLogo source={renault} size={size} /> }
export function Tesla({ size = 80 }: { size?: number })       { return <CarLogo source={tesla} size={size} /> }
export function Bugatti({ size = 80 }: { size?: number })     { return <CarLogo source={bugatti} size={size} /> }

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
