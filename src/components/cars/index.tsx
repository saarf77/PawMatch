import React from "react"
import Svg, { Circle, Ellipse, Path, Rect, G, Line, Polygon, Text as SvgText } from "react-native-svg"

const S = 100 // viewBox size

// BMW - blue/white roundel split into 4 quadrants
export function BMW({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="44" fill="#1C1C1C" />
      <Circle cx="50" cy="50" r="38" fill="white" />
      <Circle cx="50" cy="50" r="34" fill="#1C1C1C" />
      {/* 4 quadrants */}
      <Path d="M50,16 A34,34 0 0,1 84,50 L50,50 Z" fill="#0066CC" />
      <Path d="M50,84 A34,34 0 0,1 16,50 L50,50 Z" fill="#0066CC" />
      <Path d="M50,16 A34,34 0 0,0 16,50 L50,50 Z" fill="white" />
      <Path d="M50,84 A34,34 0 0,0 84,50 L50,50 Z" fill="white" />
      <Circle cx="50" cy="50" r="34" fill="none" stroke="white" strokeWidth="1.5" />
      <Circle cx="50" cy="50" r="38" fill="none" stroke="#1C1C1C" strokeWidth="1" />
      <SvgText x="50" y="94" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">BMW</SvgText>
    </Svg>
  )
}

// Mercedes - three-pointed star in circle
export function Mercedes({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="44" fill="#1C1C1C" />
      <Circle cx="50" cy="50" r="40" fill="none" stroke="#C0C0C0" strokeWidth="2.5" />
      {/* Three-pointed star */}
      <Path d="M50,14 L53,47 L50,50 L47,47 Z" fill="#C0C0C0" />
      <Path d="M50,14 L53,47 L50,50 L47,47 Z" fill="#C0C0C0" transform="rotate(120,50,50)" />
      <Path d="M50,14 L53,47 L50,50 L47,47 Z" fill="#C0C0C0" transform="rotate(240,50,50)" />
      <Circle cx="50" cy="50" r="5" fill="#C0C0C0" />
      <SvgText x="50" y="94" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">MERCEDES</SvgText>
    </Svg>
  )
}

// Ferrari - prancing horse on yellow shield
export function Ferrari({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path d="M20,10 L80,10 L80,75 Q50,95 20,75 Z" fill="#FFD700" stroke="#1C1C1C" strokeWidth="2" />
      {/* Horse body */}
      <Path d="M50,25 C44,25 40,30 41,36 C42,40 45,42 45,46 L45,62 C45,64 47,65 50,65 C53,65 55,64 55,62 L55,46 C55,42 58,40 59,36 C60,30 56,25 50,25 Z" fill="#1C1C1C" />
      {/* Horse head */}
      <Path d="M50,20 C47,18 44,20 44,24 C44,28 47,30 50,29 C53,30 56,28 56,24 C56,20 53,18 50,20 Z" fill="#1C1C1C" />
      {/* Legs */}
      <Rect x="44" y="60" width="5" height="12" rx="2" fill="#1C1C1C" />
      <Rect x="51" y="60" width="5" height="12" rx="2" fill="#1C1C1C" />
      {/* Tail */}
      <Path d="M55,45 Q65,38 62,30" stroke="#1C1C1C" strokeWidth="3" fill="none" strokeLinecap="round" />
      <SvgText x="50" y="94" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">FERRARI</SvgText>
    </Svg>
  )
}

// Audi - four rings
export function Audi({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width="100" height="100" fill="#1C1C1C" />
      {[18, 34, 50, 66].map((cx, i) => (
        <G key={i}>
          <Circle cx={cx} cy="50" r="16" fill="none" stroke="#C0C0C0" strokeWidth="5" />
        </G>
      ))}
      <SvgText x="50" y="82" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">AUDI</SvgText>
    </Svg>
  )
}

// Toyota - three overlapping ovals
export function Toyota({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width="100" height="100" fill="#CC0000" />
      {/* Outer oval */}
      <Ellipse cx="50" cy="46" rx="30" ry="20" fill="none" stroke="white" strokeWidth="4" />
      {/* Inner vertical oval */}
      <Ellipse cx="50" cy="46" rx="12" ry="20" fill="none" stroke="white" strokeWidth="4" />
      {/* Horizontal bar */}
      <Ellipse cx="50" cy="32" rx="26" ry="8" fill="none" stroke="white" strokeWidth="4" />
      <SvgText x="50" y="82" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">TOYOTA</SvgText>
    </Svg>
  )
}

// Volkswagen - VW letters in circle
export function Volkswagen({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="44" fill="#1C3F8F" />
      <Circle cx="50" cy="50" r="38" fill="none" stroke="white" strokeWidth="2" />
      {/* V shape */}
      <Path d="M35,28 L50,58 L65,28" fill="none" stroke="white" strokeWidth="5" strokeLinejoin="round" />
      {/* W shape */}
      <Path d="M28,42 L36,62 L50,50 L64,62 L72,42" fill="none" stroke="white" strokeWidth="5" strokeLinejoin="round" />
      <SvgText x="50" y="94" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">VOLKSWAGEN</SvgText>
    </Svg>
  )
}

// Porsche - horse on striped shield
export function Porsche({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path d="M20,12 L80,12 L80,72 Q50,90 20,72 Z" fill="#AA0000" stroke="#C0A000" strokeWidth="2.5" />
      {/* Stripes */}
      <Rect x="20" y="12" width="20" height="60" fill="#1C1C1C" />
      <Rect x="60" y="12" width="20" height="60" fill="#1C1C1C" />
      {/* Horse */}
      <Path d="M50,24 C46,24 43,27 44,32 C45,36 48,37 48,42 L48,55 C48,57 49,58 50,58 C51,58 52,57 52,55 L52,42 C52,37 55,36 56,32 C57,27 54,24 50,24 Z" fill="#C0A000" />
      <Path d="M50,20 C48,18 45,20 45,23 C45,26 48,28 50,27 C52,28 55,26 55,23 C55,20 52,18 50,20 Z" fill="#C0A000" />
      <Rect x="46" y="53" width="3.5" height="8" rx="1.5" fill="#C0A000" />
      <Rect x="50.5" y="53" width="3.5" height="8" rx="1.5" fill="#C0A000" />
      <SvgText x="50" y="94" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">PORSCHE</SvgText>
    </Svg>
  )
}

// Lamborghini - raging bull on yellow shield
export function Lamborghini({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path d="M20,10 L80,10 L80,74 Q50,92 20,74 Z" fill="#FFD700" stroke="#1C1C1C" strokeWidth="2" />
      {/* Bull */}
      <Path d="M50,35 C45,33 40,36 40,42 C40,47 44,50 50,50 C56,50 60,47 60,42 C60,36 55,33 50,35 Z" fill="#1C1C1C" />
      {/* Horns */}
      <Path d="M42,36 Q36,26 32,30" stroke="#1C1C1C" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <Path d="M58,36 Q64,26 68,30" stroke="#1C1C1C" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Legs */}
      <Rect x="43" y="50" width="5" height="14" rx="2" fill="#1C1C1C" />
      <Rect x="52" y="50" width="5" height="14" rx="2" fill="#1C1C1C" />
      {/* Tail */}
      <Path d="M60,44 Q70,40 68,34" stroke="#1C1C1C" strokeWidth="3" fill="none" strokeLinecap="round" />
      <SvgText x="50" y="94" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="bold">LAMBORGHINI</SvgText>
    </Svg>
  )
}

// Ford - Ford oval script
export function Ford({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width="100" height="100" fill="#003478" />
      <Ellipse cx="50" cy="50" rx="42" ry="28" fill="none" stroke="white" strokeWidth="3" />
      <SvgText x="50" y="58" textAnchor="middle" fill="white" fontSize="26" fontWeight="bold" fontStyle="italic">Ford</SvgText>
    </Svg>
  )
}

// Chevrolet - bowtie
export function Chevrolet({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width="100" height="100" fill="#1C1C1C" />
      {/* Bowtie shape */}
      <Path d="M5,40 L42,40 L42,35 L95,35 L95,60 L58,60 L58,65 L5,65 Z" fill="#C4A000" />
      <Path d="M42,40 L42,60 L58,60 L58,40 Z" fill="#1C1C1C" />
      <SvgText x="50" y="86" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">CHEVROLET</SvgText>
    </Svg>
  )
}

// Honda - stylized H
export function Honda({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width="100" height="100" fill="#CC0000" />
      <Path d="M28,20 L28,80 M28,50 L72,50 M72,20 L72,80" stroke="white" strokeWidth="10" strokeLinecap="round" fill="none" />
      <SvgText x="50" y="94" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">HONDA</SvgText>
    </Svg>
  )
}

// Nissan - horizontal bar through circle
export function Nissan({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width="100" height="100" fill="#1C1C1C" />
      <Circle cx="50" cy="46" r="32" fill="none" stroke="#C0C0C0" strokeWidth="4" />
      <Rect x="14" y="38" width="72" height="16" fill="#1C1C1C" />
      <Rect x="14" y="38" width="72" height="16" fill="none" stroke="#C0C0C0" strokeWidth="4" />
      <SvgText x="50" y="50" textAnchor="middle" fill="#C0C0C0" fontSize="10" fontWeight="bold">NISSAN</SvgText>
    </Svg>
  )
}

// Hyundai - italic H ellipse
export function Hyundai({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width="100" height="100" fill="#002C5F" />
      <Ellipse cx="50" cy="46" rx="40" ry="28" fill="none" stroke="white" strokeWidth="3" />
      <Path d="M32,30 L32,62 M32,46 L68,46 M68,30 L68,62" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none" transform="skewX(-8)" />
      <SvgText x="50" y="86" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">HYUNDAI</SvgText>
    </Svg>
  )
}

// Kia - KIA in oval
export function Kia({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width="100" height="100" fill="#CC0000" />
      <Ellipse cx="50" cy="46" rx="42" ry="26" fill="none" stroke="white" strokeWidth="3" />
      <SvgText x="50" y="56" textAnchor="middle" fill="white" fontSize="22" fontWeight="900" letterSpacing="4">KIA</SvgText>
    </Svg>
  )
}

// Mazda - stylized M wings
export function Mazda({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width="100" height="100" fill="#1C1C1C" />
      {/* Wing shape */}
      <Path d="M50,30 C38,30 20,42 20,50 C30,42 42,46 50,54 C58,46 70,42 80,50 C80,42 62,30 50,30 Z" fill="white" />
      <Path d="M50,54 C42,46 30,48 24,54 C30,58 42,56 50,54 Z" fill="#1C1C1C" />
      <Path d="M50,54 C58,46 70,48 76,54 C70,58 58,56 50,54 Z" fill="#1C1C1C" />
      <SvgText x="50" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">MAZDA</SvgText>
    </Svg>
  )
}

// Subaru - six stars cluster
export function Subaru({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width="100" height="100" fill="#003399" />
      <Ellipse cx="50" cy="46" rx="40" ry="28" fill="none" stroke="white" strokeWidth="2.5" />
      {/* 6 stars: 1 large + 5 small */}
      <Circle cx="42" cy="42" r="7" fill="white" />
      <Circle cx="34" cy="46" r="4" fill="white" />
      <Circle cx="40" cy="52" r="4" fill="white" />
      <Circle cx="52" cy="36" r="4" fill="white" />
      <Circle cx="58" cy="44" r="4" fill="white" />
      <Circle cx="54" cy="52" r="4" fill="white" />
      <SvgText x="50" y="84" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">SUBARU</SvgText>
    </Svg>
  )
}

// Rolls Royce - RR monogram
export function RollsRoyce({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width="100" height="100" fill="#1C1C1C" />
      <Circle cx="50" cy="46" r="36" fill="none" stroke="#C0A000" strokeWidth="2" />
      <SvgText x="50" y="58" textAnchor="middle" fill="#C0A000" fontSize="30" fontWeight="900" fontStyle="italic">RR</SvgText>
      <SvgText x="50" y="90" textAnchor="middle" fill="#C0A000" fontSize="7" fontWeight="bold" letterSpacing="1">ROLLS-ROYCE</SvgText>
    </Svg>
  )
}

// Bentley - winged B
export function Bentley({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width="100" height="100" fill="#1C1C1C" />
      {/* Wings */}
      <Path d="M50,46 C42,38 20,34 10,42 C20,36 40,44 50,46 Z" fill="#C0C0C0" />
      <Path d="M50,46 C58,38 80,34 90,42 C80,36 60,44 50,46 Z" fill="#C0C0C0" />
      <Path d="M50,46 C42,54 20,58 10,50 C20,56 40,48 50,46 Z" fill="#C0C0C0" />
      <Path d="M50,46 C58,54 80,58 90,50 C80,56 60,48 50,46 Z" fill="#C0C0C0" />
      {/* B circle */}
      <Circle cx="50" cy="46" r="14" fill="#1C1C1C" stroke="#C0C0C0" strokeWidth="2" />
      <SvgText x="50" y="52" textAnchor="middle" fill="#C0C0C0" fontSize="18" fontWeight="900">B</SvgText>
      <SvgText x="50" y="88" textAnchor="middle" fill="#C0C0C0" fontSize="8" fontWeight="bold" letterSpacing="1">BENTLEY</SvgText>
    </Svg>
  )
}

// Maserati - trident
export function Maserati({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width="100" height="100" fill="#003399" />
      {/* Trident */}
      <Line x1="50" y1="18" x2="50" y2="72" stroke="white" strokeWidth="5" strokeLinecap="round" />
      <Line x1="34" y1="18" x2="34" y2="50" stroke="white" strokeWidth="5" strokeLinecap="round" />
      <Line x1="66" y1="18" x2="66" y2="50" stroke="white" strokeWidth="5" strokeLinecap="round" />
      {/* Prong tips */}
      <Path d="M34,18 Q30,10 34,10 Q38,10 34,18 Z" fill="white" />
      <Path d="M50,18 Q46,8 50,8 Q54,8 50,18 Z" fill="white" />
      <Path d="M66,18 Q62,10 66,10 Q70,10 66,18 Z" fill="white" />
      {/* Cross bar */}
      <Line x1="34" y1="46" x2="66" y2="46" stroke="white" strokeWidth="4" />
      <SvgText x="50" y="88" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="bold">MASERATI</SvgText>
    </Svg>
  )
}

// Jaguar - leaping jaguar
export function Jaguar({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width="100" height="100" fill="#1C1C1C" />
      {/* Body */}
      <Path d="M15,52 Q30,38 50,36 Q70,34 82,46 Q78,54 60,56 Q40,58 15,52 Z" fill="#C0C0C0" />
      {/* Head */}
      <Ellipse cx="80" cy="44" rx="12" ry="9" fill="#C0C0C0" />
      {/* Ear */}
      <Polygon points="84,38 88,32 92,38" fill="#C0C0C0" />
      {/* Tail */}
      <Path d="M15,52 Q8,46 10,40 Q12,46 18,50" fill="none" stroke="#C0C0C0" strokeWidth="3.5" strokeLinecap="round" />
      {/* Legs */}
      <Line x1="35" y1="56" x2="32" y2="70" stroke="#C0C0C0" strokeWidth="4" strokeLinecap="round" />
      <Line x1="55" y1="56" x2="52" y2="70" stroke="#C0C0C0" strokeWidth="4" strokeLinecap="round" />
      <SvgText x="50" y="88" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">JAGUAR</SvgText>
    </Svg>
  )
}

// Volvo - circle with arrow
export function Volvo({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width="100" height="100" fill="#003E90" />
      <Circle cx="50" cy="50" r="28" fill="none" stroke="white" strokeWidth="5" />
      {/* Arrow pointing top-right */}
      <Line x1="50" y1="22" x2="76" y2="22" stroke="white" strokeWidth="5" strokeLinecap="round" />
      <Line x1="76" y1="22" x2="76" y2="48" stroke="white" strokeWidth="5" strokeLinecap="round" />
      <Line x1="68" y1="30" x2="50" y2="50" stroke="white" strokeWidth="5" strokeLinecap="round" />
      <SvgText x="50" y="88" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">VOLVO</SvgText>
    </Svg>
  )
}

// Peugeot - lion on shield
export function Peugeot({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width="100" height="100" fill="#1C1C1C" />
      {/* Shield */}
      <Path d="M30,10 L70,10 L70,62 Q50,80 30,62 Z" fill="none" stroke="#C0C0C0" strokeWidth="3" />
      {/* Lion simplified */}
      <Circle cx="50" cy="30" r="10" fill="#C0C0C0" />
      <Path d="M44,30 Q42,24 46,22 Q50,20 54,22 Q58,24 56,30" fill="#C0C0C0" />
      <Ellipse cx="50" cy="44" rx="9" ry="12" fill="#C0C0C0" />
      <Line x1="44" y1="54" x2="42" y2="66" stroke="#C0C0C0" strokeWidth="4" strokeLinecap="round" />
      <Line x1="56" y1="54" x2="58" y2="66" stroke="#C0C0C0" strokeWidth="4" strokeLinecap="round" />
      <SvgText x="50" y="94" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">PEUGEOT</SvgText>
    </Svg>
  )
}

// Renault - diamond rhombus
export function Renault({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width="100" height="100" fill="#FFCC00" />
      {/* Outer diamond */}
      <Polygon points="50,8 82,50 50,92 18,50" fill="none" stroke="#1C1C1C" strokeWidth="4" />
      {/* Inner diamond */}
      <Polygon points="50,22 68,50 50,78 32,50" fill="none" stroke="#1C1C1C" strokeWidth="4" />
      {/* Center cross */}
      <Line x1="50" y1="22" x2="50" y2="78" stroke="#1C1C1C" strokeWidth="4" />
      <Line x1="32" y1="50" x2="68" y2="50" stroke="#1C1C1C" strokeWidth="4" />
    </Svg>
  )
}

// Tesla - T shield
export function Tesla({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width="100" height="100" fill="#CC0000" />
      {/* Tesla T logo */}
      <Path d="M50,20 L50,78" stroke="white" strokeWidth="7" strokeLinecap="round" />
      <Path d="M26,20 L74,20" stroke="white" strokeWidth="7" strokeLinecap="round" />
      <Path d="M26,20 Q26,32 50,32" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" />
      <Path d="M74,20 Q74,32 50,32" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" />
      <SvgText x="50" y="94" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">TESLA</SvgText>
    </Svg>
  )
}

// Bugatti - double oval with EB
export function Bugatti({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width="100" height="100" fill="#1C1C1C" />
      <Ellipse cx="50" cy="46" rx="40" ry="26" fill="none" stroke="#CC0000" strokeWidth="3" />
      <Ellipse cx="50" cy="46" rx="30" ry="18" fill="none" stroke="#CC0000" strokeWidth="2" />
      <SvgText x="50" y="54" textAnchor="middle" fill="#CC0000" fontSize="20" fontWeight="900" fontStyle="italic">EB</SvgText>
      <SvgText x="50" y="86" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="bold" letterSpacing="1">BUGATTI</SvgText>
    </Svg>
  )
}

export const CAR_COMPONENTS: Record<string, React.ComponentType<{ size?: number }>> = {
  bmw: BMW,
  mercedes: Mercedes,
  ferrari: Ferrari,
  audi: Audi,
  toyota: Toyota,
  volkswagen: Volkswagen,
  porsche: Porsche,
  lamborghini: Lamborghini,
  ford: Ford,
  chevrolet: Chevrolet,
  honda: Honda,
  nissan: Nissan,
  hyundai: Hyundai,
  kia: Kia,
  mazda: Mazda,
  subaru: Subaru,
  rollsroyce: RollsRoyce,
  bentley: Bentley,
  maserati: Maserati,
  jaguar: Jaguar,
  volvo: Volvo,
  peugeot: Peugeot,
  renault: Renault,
  tesla: Tesla,
  bugatti: Bugatti,
}
