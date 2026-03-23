import React from "react"
import { View } from "react-native"
import { SvgXml } from "react-native-svg"
import { CAR_LOGOS } from "./logos"

function CarLogo({ carId, size = 80 }: { carId: string; size?: number }) {
  const xml = CAR_LOGOS[carId]
  return (
    <View style={{ width: size, height: size, justifyContent: "center", alignItems: "center", backgroundColor: "white", borderRadius: 8, padding: 6 }}>
      <SvgXml xml={xml} width={size * 0.82} height={size * 0.82} />
    </View>
  )
}

export function BMW({ size = 80 }: { size?: number })         { return <CarLogo carId="bmw" size={size} /> }
export function Mercedes({ size = 80 }: { size?: number })    { return <CarLogo carId="mercedes" size={size} /> }
export function Ferrari({ size = 80 }: { size?: number })     { return <CarLogo carId="ferrari" size={size} /> }
export function Audi({ size = 80 }: { size?: number })        { return <CarLogo carId="audi" size={size} /> }
export function Toyota({ size = 80 }: { size?: number })      { return <CarLogo carId="toyota" size={size} /> }
export function Volkswagen({ size = 80 }: { size?: number })  { return <CarLogo carId="volkswagen" size={size} /> }
export function Porsche({ size = 80 }: { size?: number })     { return <CarLogo carId="porsche" size={size} /> }
export function Lamborghini({ size = 80 }: { size?: number }) { return <CarLogo carId="lamborghini" size={size} /> }
export function Ford({ size = 80 }: { size?: number })        { return <CarLogo carId="ford" size={size} /> }
export function Chevrolet({ size = 80 }: { size?: number })   { return <CarLogo carId="chevrolet" size={size} /> }
export function Honda({ size = 80 }: { size?: number })       { return <CarLogo carId="honda" size={size} /> }
export function Nissan({ size = 80 }: { size?: number })      { return <CarLogo carId="nissan" size={size} /> }
export function Hyundai({ size = 80 }: { size?: number })     { return <CarLogo carId="hyundai" size={size} /> }
export function Kia({ size = 80 }: { size?: number })         { return <CarLogo carId="kia" size={size} /> }
export function Mazda({ size = 80 }: { size?: number })       { return <CarLogo carId="mazda" size={size} /> }
export function Subaru({ size = 80 }: { size?: number })      { return <CarLogo carId="subaru" size={size} /> }
export function RollsRoyce({ size = 80 }: { size?: number })  { return <CarLogo carId="rollsroyce" size={size} /> }
export function Bentley({ size = 80 }: { size?: number })     { return <CarLogo carId="bentley" size={size} /> }
export function Maserati({ size = 80 }: { size?: number })    { return <CarLogo carId="maserati" size={size} /> }
export function Jaguar({ size = 80 }: { size?: number })      { return <CarLogo carId="jaguar" size={size} /> }
export function Volvo({ size = 80 }: { size?: number })       { return <CarLogo carId="volvo" size={size} /> }
export function Peugeot({ size = 80 }: { size?: number })     { return <CarLogo carId="peugeot" size={size} /> }
export function Renault({ size = 80 }: { size?: number })     { return <CarLogo carId="renault" size={size} /> }
export function Tesla({ size = 80 }: { size?: number })       { return <CarLogo carId="tesla" size={size} /> }
export function Bugatti({ size = 80 }: { size?: number })     { return <CarLogo carId="bugatti" size={size} /> }

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
