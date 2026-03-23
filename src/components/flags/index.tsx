import React from "react"
import Svg, { Rect, Circle, Polygon, Path, G, Line, Ellipse } from "react-native-svg"

const W = 90
const H = 60

// Israel
export function Israel({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="white" />
      <Rect y="8" width={W} height="8" fill="#0038B8" />
      <Rect y="44" width={W} height="8" fill="#0038B8" />
      <Polygon points="45,20 52,32 38,32" fill="none" stroke="#0038B8" strokeWidth="2" />
      <Polygon points="45,40 52,28 38,28" fill="none" stroke="#0038B8" strokeWidth="2" />
    </Svg>
  )
}

// Germany
export function Germany({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 3} fill="#000000" />
      <Rect y={H / 3} width={W} height={H / 3} fill="#DD0000" />
      <Rect y={H * 2 / 3} width={W} height={H / 3} fill="#FFCE00" />
    </Svg>
  )
}

// USA
export function USA({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#B22234" />
      {[0,1,2,3,4,5].map(i => (
        <Rect key={i} y={i * (H/7) + H/14} width={W} height={H/14} fill="white" />
      ))}
      <Rect width={36} height={H * 7/13} fill="#3C3B6E" />
      {[0,1,2,3,4,5,6,7,8].map(i =>
        [0,1,2,3,4].map(j => (
          <Circle key={`${i}-${j}`} cx={4 + j * 7 + (i % 2) * 3.5} cy={4 + i * 3.5} r="1.2" fill="white" />
        ))
      )}
    </Svg>
  )
}

// UK
export function UK({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#012169" />
      <Line x1="0" y1="0" x2={W} y2={H} stroke="white" strokeWidth="10" />
      <Line x1={W} y1="0" x2="0" y2={H} stroke="white" strokeWidth="10" />
      <Line x1="0" y1="0" x2={W} y2={H} stroke="#C8102E" strokeWidth="6" />
      <Line x1={W} y1="0" x2="0" y2={H} stroke="#C8102E" strokeWidth="6" />
      <Rect x={W/2 - 8} y="0" width="16" height={H} fill="white" />
      <Rect x="0" y={H/2 - 6} width={W} height="12" fill="white" />
      <Rect x={W/2 - 5} y="0" width="10" height={H} fill="#C8102E" />
      <Rect x="0" y={H/2 - 4} width={W} height="8" fill="#C8102E" />
    </Svg>
  )
}

// France
export function France({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W / 3} height={H} fill="#002395" />
      <Rect x={W / 3} width={W / 3} height={H} fill="white" />
      <Rect x={W * 2 / 3} width={W / 3} height={H} fill="#ED2939" />
    </Svg>
  )
}

// Italy
export function Italy({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W / 3} height={H} fill="#009246" />
      <Rect x={W / 3} width={W / 3} height={H} fill="white" />
      <Rect x={W * 2 / 3} width={W / 3} height={H} fill="#CE2B37" />
    </Svg>
  )
}

// Spain
export function Spain({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#c60b1e" />
      <Rect y={H * 0.25} width={W} height={H * 0.5} fill="#ffc400" />
    </Svg>
  )
}

// Japan
export function Japan({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="white" />
      <Circle cx={W / 2} cy={H / 2} r={H * 0.3} fill="#BC002D" />
    </Svg>
  )
}

// China
export function China({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#DE2910" />
      <Polygon points="12,8 14.5,15.5 7,11 17,11 9.5,15.5" fill="#FFDE00" />
      <Polygon points="24,4 25.5,8.5 21,6 27,6 22.5,8.5" fill="#FFDE00" />
      <Polygon points="30,10 31.5,14.5 27,12 33,12 28.5,14.5" fill="#FFDE00" />
      <Polygon points="30,20 31.5,24.5 27,22 33,22 28.5,24.5" fill="#FFDE00" />
      <Polygon points="24,26 25.5,30.5 21,28 27,28 22.5,30.5" fill="#FFDE00" />
    </Svg>
  )
}

// Brazil
export function Brazil({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#009C3B" />
      <Polygon points="45,6 84,30 45,54 6,30" fill="#FEDF00" />
      <Circle cx={W / 2} cy={H / 2} r="13" fill="#002776" />
      <Path d="M32,28 Q45,22 58,28" stroke="white" strokeWidth="2.5" fill="none" />
    </Svg>
  )
}

// Canada
export function Canada({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="white" />
      <Rect width={W / 4} height={H} fill="#FF0000" />
      <Rect x={W * 3 / 4} width={W / 4} height={H} fill="#FF0000" />
      <Path d="M45,12 L48,22 L58,20 L52,28 L56,38 L45,32 L34,38 L38,28 L32,20 L42,22 Z" fill="#FF0000" />
    </Svg>
  )
}

// Australia
export function Australia({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#00008B" />
      <Rect x="0" y="0" width="40" height="30" fill="#00008B" />
      <Line x1="0" y1="0" x2="40" y2="30" stroke="white" strokeWidth="6" />
      <Line x1="40" y1="0" x2="0" y2="30" stroke="white" strokeWidth="6" />
      <Line x1="0" y1="0" x2="40" y2="30" stroke="#CC0000" strokeWidth="4" />
      <Line x1="40" y1="0" x2="0" y2="30" stroke="#CC0000" strokeWidth="4" />
      <Rect x="16" y="0" width="8" height="30" fill="white" />
      <Rect x="0" y="11" width="40" height="8" fill="white" />
      <Rect x="18" y="0" width="4" height="30" fill="#CC0000" />
      <Rect x="0" y="13" width="40" height="4" fill="#CC0000" />
      <Polygon points="60,42 62,48 68,48 63,52 65,58 60,54 55,58 57,52 52,48 58,48" fill="white" />
    </Svg>
  )
}

// India
export function India({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 3} fill="#FF9933" />
      <Rect y={H / 3} width={W} height={H / 3} fill="white" />
      <Rect y={H * 2 / 3} width={W} height={H / 3} fill="#138808" />
      <Circle cx={W / 2} cy={H / 2} r="8" fill="none" stroke="#000080" strokeWidth="1.5" />
      <Circle cx={W / 2} cy={H / 2} r="2" fill="#000080" />
    </Svg>
  )
}

// Russia
export function Russia({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 3} fill="white" />
      <Rect y={H / 3} width={W} height={H / 3} fill="#0039A6" />
      <Rect y={H * 2 / 3} width={W} height={H / 3} fill="#D52B1E" />
    </Svg>
  )
}

// Mexico
export function Mexico({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W / 3} height={H} fill="#006847" />
      <Rect x={W / 3} width={W / 3} height={H} fill="white" />
      <Rect x={W * 2 / 3} width={W / 3} height={H} fill="#CE1126" />
      <Circle cx={W / 2} cy={H / 2} r="8" fill="#A0522D" />
      <Circle cx={W / 2} cy={H / 2} r="5" fill="#228B22" />
    </Svg>
  )
}

// South Korea
export function SouthKorea({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="white" />
      <Circle cx={W / 2} cy={H / 2} r="13" fill="#CD2E3A" />
      <Path d="M45,30 Q52,23 59,30 Q52,37 45,30Z" fill="#0047A0" />
      <Line x1="18" y1="10" x2="30" y2="18" stroke="black" strokeWidth="2" />
      <Line x1="20" y1="14" x2="32" y2="22" stroke="black" strokeWidth="2" />
      <Line x1="22" y1="18" x2="34" y2="26" stroke="black" strokeWidth="2" />
      <Line x1="60" y1="10" x2="72" y2="18" stroke="black" strokeWidth="2" />
      <Line x1="58" y1="14" x2="70" y2="22" stroke="black" strokeWidth="2" />
      <Line x1="56" y1="18" x2="68" y2="26" stroke="black" strokeWidth="2" />
    </Svg>
  )
}

// Argentina
export function Argentina({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="white" />
      <Rect width={W} height={H / 3} fill="#74ACDF" />
      <Rect y={H * 2 / 3} width={W} height={H / 3} fill="#74ACDF" />
      <Circle cx={W / 2} cy={H / 2} r="7" fill="#F6B40E" />
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(i => (
        <Line key={i}
          x1={W/2} y1={H/2}
          x2={W/2 + 11 * Math.cos(i * Math.PI / 8)}
          y2={H/2 + 11 * Math.sin(i * Math.PI / 8)}
          stroke="#F6B40E" strokeWidth="1.5"
        />
      ))}
    </Svg>
  )
}

// Turkey
export function Turkey({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#E30A17" />
      <Circle cx="36" cy={H / 2} r="11" fill="white" />
      <Circle cx="40" cy={H / 2} r="8.5" fill="#E30A17" />
      <Polygon points="54,30 56,22 58,30 66,28 61,34 64,42 56,38 48,42 51,34 46,28" fill="white" />
    </Svg>
  )
}

// Netherlands
export function Netherlands({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 3} fill="#AE1C28" />
      <Rect y={H / 3} width={W} height={H / 3} fill="white" />
      <Rect y={H * 2 / 3} width={W} height={H / 3} fill="#21468B" />
    </Svg>
  )
}

// Sweden
export function Sweden({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#006AA7" />
      <Rect x="24" width="10" height={H} fill="#FECC02" />
      <Rect y={H / 2 - 5} width={W} height="10" fill="#FECC02" />
    </Svg>
  )
}

// Norway
export function Norway({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#EF2B2D" />
      <Rect x="20" width="10" height={H} fill="white" />
      <Rect y={H / 2 - 5} width={W} height="10" fill="white" />
      <Rect x="23" width="4" height={H} fill="#002868" />
      <Rect y={H / 2 - 2} width={W} height="4" fill="#002868" />
    </Svg>
  )
}

// Switzerland
export function Switzerland({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#FF0000" />
      <Rect x={W/2 - 5} y={H/2 - 14} width="10" height="28" fill="white" />
      <Rect x={W/2 - 14} y={H/2 - 5} width="28" height="10" fill="white" />
    </Svg>
  )
}

// Poland
export function Poland({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 2} fill="white" />
      <Rect y={H / 2} width={W} height={H / 2} fill="#DC143C" />
    </Svg>
  )
}

// Portugal
export function Portugal({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W * 0.4} height={H} fill="#006600" />
      <Rect x={W * 0.4} width={W * 0.6} height={H} fill="#FF0000" />
      <Circle cx={W * 0.4} cy={H / 2} r="10" fill="#FFFF00" stroke="#003399" strokeWidth="1.5" />
      <Circle cx={W * 0.4} cy={H / 2} r="6" fill="white" stroke="#003399" strokeWidth="1" />
    </Svg>
  )
}

// Greece
export function Greece({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  const stripeH = H / 9
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      {[0,2,4,6,8].map(i => <Rect key={i} y={i * stripeH} width={W} height={stripeH} fill="#0D5EAF" />)}
      {[1,3,5,7].map(i => <Rect key={i} y={i * stripeH} width={W} height={stripeH} fill="white" />)}
      <Rect width={W * 0.4} height={H * 5 / 9} fill="#0D5EAF" />
      <Rect x={W * 0.4 / 2 - 3} width="6" height={H * 5 / 9} fill="white" />
      <Rect y={H * 5 / 9 / 2 - 3} width={W * 0.4} height="6" fill="white" />
    </Svg>
  )
}

// Ukraine
export function Ukraine({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 2} fill="#005BBB" />
      <Rect y={H / 2} width={W} height={H / 2} fill="#FFD500" />
    </Svg>
  )
}

// Egypt
export function Egypt({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 3} fill="#CE1126" />
      <Rect y={H / 3} width={W} height={H / 3} fill="white" />
      <Rect y={H * 2 / 3} width={W} height={H / 3} fill="#000000" />
      <Circle cx={W / 2} cy={H / 2} r="7" fill="#C09300" />
      <Path d="M42,30 L45,38 L48,30 Z" fill="#C09300" />
    </Svg>
  )
}

// South Africa
export function SouthAfrica({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="white" />
      <Rect width={W} height={H / 3} fill="#007A4D" />
      <Rect y={H * 2 / 3} width={W} height={H / 3} fill="#001489" />
      <Polygon points="0,0 32,30 0,60" fill="#FFB612" />
      <Polygon points="0,4 28,30 0,56" fill="#007A4D" />
      <Polygon points="0,20 18,30 0,40" fill="#000000" />
      <Rect y={H/3} width={W} height={H/3} fill="#DE3831" />
      <Rect y={H/3 + 5} width={W} height={H/3 - 10} fill="white" />
      <Rect y={H/3 + 8} width={W} height={H/3 - 16} fill="#007A4D" />
    </Svg>
  )
}

// Nigeria
export function Nigeria({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W / 3} height={H} fill="#008751" />
      <Rect x={W / 3} width={W / 3} height={H} fill="white" />
      <Rect x={W * 2 / 3} width={W / 3} height={H} fill="#008751" />
    </Svg>
  )
}

// Saudi Arabia
export function SaudiArabia({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#006C35" />
      <Path d="M20,28 L24,24 L28,28 L32,22 L36,28 L40,24 L44,28" stroke="white" strokeWidth="2" fill="none" />
      <Rect x="52" y="24" width="18" height="12" rx="2" fill="none" stroke="white" strokeWidth="2" />
      <Line x1="52" y1="30" x2="70" y2="30" stroke="white" strokeWidth="2" />
      <Rect x="20" y="38" width="50" height="2.5" fill="white" />
    </Svg>
  )
}

// UAE
export function UAE({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 3} fill="#00732F" />
      <Rect y={H / 3} width={W} height={H / 3} fill="white" />
      <Rect y={H * 2 / 3} width={W} height={H / 3} fill="#000000" />
      <Rect width="22" height={H} fill="#FF0000" />
    </Svg>
  )
}

// Indonesia
export function Indonesia({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 2} fill="#CE1126" />
      <Rect y={H / 2} width={W} height={H / 2} fill="white" />
    </Svg>
  )
}

// Thailand
export function Thailand({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#A51931" />
      <Rect y={H / 6} width={W} height={H * 4 / 6} fill="white" />
      <Rect y={H / 3} width={W} height={H / 3} fill="#2D2A4A" />
    </Svg>
  )
}

// Pakistan
export function Pakistan({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#01411C" />
      <Rect width={W / 4} height={H} fill="white" />
      <Circle cx="50" cy={H / 2} r="12" fill="white" />
      <Circle cx="54" cy={H / 2} r="9" fill="#01411C" />
      <Polygon points="58,24 60,30 66,30 61,34 63,40 58,36 53,40 55,34 50,30 56,30" fill="white" />
    </Svg>
  )
}

// Bangladesh
export function Bangladesh({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#006A4E" />
      <Circle cx="42" cy={H / 2} r="16" fill="#F42A41" />
    </Svg>
  )
}

// Vietnam
export function Vietnam({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#DA251D" />
      <Polygon points="45,18 47.5,26 55,26 49,31 51,39 45,34 39,39 41,31 35,26 42.5,26" fill="#FFFF00" />
    </Svg>
  )
}

// Iran
export function Iran({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 3} fill="#239F40" />
      <Rect y={H / 3} width={W} height={H / 3} fill="white" />
      <Rect y={H * 2 / 3} width={W} height={H / 3} fill="#DA0000" />
      <Circle cx={W/2} cy={H/2} r="6" fill="#DA0000" stroke="none" />
      <Path d="M42,30 Q45,26 48,30 Q45,34 42,30Z" fill="#239F40" />
    </Svg>
  )
}

// Iraq
export function Iraq({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 3} fill="#CE1126" />
      <Rect y={H / 3} width={W} height={H / 3} fill="white" />
      <Rect y={H * 2 / 3} width={W} height={H / 3} fill="#000000" />
      <Path d="M32,28 Q37,24 42,28 Q37,32 32,28Z" fill="#007A3D" />
      <Path d="M42,28 Q47,24 52,28 Q47,32 42,28Z" fill="#007A3D" />
      <Path d="M52,28 Q57,24 62,28 Q57,32 52,28Z" fill="#007A3D" />
    </Svg>
  )
}

// Jordan
export function Jordan({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 3} fill="#007A3D" />
      <Rect y={H / 3} width={W} height={H / 3} fill="white" />
      <Rect y={H * 2 / 3} width={W} height={H / 3} fill="#000000" />
      <Polygon points="0,0 30,30 0,60" fill="#CE1126" />
      <Polygon points="10,30 13,24 16,30 22,30 17,34 19,40 13,36 7,40 9,34 4,30" fill="white" />
    </Svg>
  )
}

// Morocco
export function Morocco({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#C1272D" />
      <Path d="M45,22 L47,28 L53,28 L48,32 L50,38 L45,34 L40,38 L42,32 L37,28 L43,28 Z"
        fill="none" stroke="#006233" strokeWidth="2" />
    </Svg>
  )
}

// Kenya
export function Kenya({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="white" />
      <Rect width={W} height={H / 3} fill="#006600" />
      <Rect y={H * 2 / 3} width={W} height={H / 3} fill="#006600" />
      <Rect y={H / 4} width={W} height={H / 2} fill="#BB0000" />
      <Rect y={H / 4 - 3} width={W} height="6" fill="black" />
      <Rect y={H * 3 / 4 - 3} width={W} height="6" fill="black" />
      <Ellipse cx={W/2} cy={H/2} rx="6" ry="10" fill="white" stroke="black" strokeWidth="1.5" />
    </Svg>
  )
}

// Ethiopia
export function Ethiopia({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 3} fill="#078930" />
      <Rect y={H / 3} width={W} height={H / 3} fill="#FCDD09" />
      <Rect y={H * 2 / 3} width={W} height={H / 3} fill="#DA121A" />
      <Circle cx={W / 2} cy={H / 2} r="11" fill="#0F47AF" />
      <Polygon points="45,30 47,26 49,30 53,28 50,32 52,36 48,34 44,36 46,32 43,28" fill="#FCDD09" />
    </Svg>
  )
}

// Ghana
export function Ghana({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 3} fill="#006B3F" />
      <Rect y={H / 3} width={W} height={H / 3} fill="#FCD116" />
      <Rect y={H * 2 / 3} width={W} height={H / 3} fill="#CE1126" />
      <Polygon points="45,24 47,30 53,30 48,34 50,40 45,36 40,40 42,34 37,30 43,30" fill="black" />
    </Svg>
  )
}

// New Zealand
export function NewZealand({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#00247D" />
      <Rect x="0" y="0" width="40" height="30" fill="#00247D" />
      <Line x1="0" y1="0" x2="40" y2="30" stroke="white" strokeWidth="6" />
      <Line x1="40" y1="0" x2="0" y2="30" stroke="white" strokeWidth="6" />
      <Line x1="0" y1="0" x2="40" y2="30" stroke="#CC0000" strokeWidth="3" />
      <Line x1="40" y1="0" x2="0" y2="30" stroke="#CC0000" strokeWidth="3" />
      <Rect x="16" y="0" width="8" height="30" fill="white" />
      <Rect x="0" y="11" width="40" height="8" fill="white" />
      <Rect x="18" y="0" width="4" height="30" fill="#CC0000" />
      <Rect x="0" y="13" width="40" height="4" fill="#CC0000" />
      <Circle cx="60" cy="12" r="3" fill="#CC0000" stroke="white" strokeWidth="1" />
      <Circle cx="72" cy="20" r="3" fill="#CC0000" stroke="white" strokeWidth="1" />
      <Circle cx="65" cy="30" r="3" fill="#CC0000" stroke="white" strokeWidth="1" />
      <Circle cx="55" cy="26" r="3" fill="#CC0000" stroke="white" strokeWidth="1" />
    </Svg>
  )
}

// Singapore
export function Singapore({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 2} fill="#EF3340" />
      <Rect y={H / 2} width={W} height={H / 2} fill="white" />
      <Circle cx="22" cy={H / 2 - 4} r="9" fill="white" />
      <Circle cx="26" cy={H / 2 - 4} r="7" fill="#EF3340" />
      <Polygon points="36,22 37.5,27 42,27 38.5,30 40,35 36,32 32,35 33.5,30 30,27 34.5,27" fill="white" />
    </Svg>
  )
}

// Malaysia
export function Malaysia({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      {[0,1,2,3,4,5,6].map(i => (
        <Rect key={i} y={i * (H/7)} width={W} height={H/7} fill={i % 2 === 0 ? "#CC0001" : "white"} />
      ))}
      <Rect width="40" height="30" fill="#010066" />
      <Circle cx="16" cy="15" r="9" fill="#FFCC00" />
      <Circle cx="19" cy="15" r="7" fill="#010066" />
      <Polygon points="28,8 29.5,13 34,13 30.5,16 32,21 28,18 24,21 25.5,16 22,13 26.5,13" fill="#FFCC00" />
    </Svg>
  )
}

// Philippines
export function Philippines({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 2} fill="#0038A8" />
      <Rect y={H / 2} width={W} height={H / 2} fill="#CE1126" />
      <Polygon points="0,0 36,30 0,60" fill="white" />
      <Circle cx="12" cy="30" r="5" fill="#FCD116" />
      <Polygon points="4,8 6,14 12,14 7,18 9,24 4,20 -1,24 1,18 -4,14 2,14" fill="#FCD116" />
    </Svg>
  )
}

// Chile
export function Chile({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 2} fill="white" />
      <Rect y={H / 2} width={W} height={H / 2} fill="#D52B1E" />
      <Rect width={W / 3} height={H / 2} fill="#0039A6" />
      <Polygon points="15,14 17,20 23,20 18,24 20,30 15,26 10,30 12,24 7,20 13,20" fill="white" />
    </Svg>
  )
}

// Colombia
export function Colombia({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 2} fill="#FCD116" />
      <Rect y={H / 2} width={W} height={H / 4} fill="#003087" />
      <Rect y={H * 3 / 4} width={W} height={H / 4} fill="#CE1126" />
    </Svg>
  )
}

// Peru
export function Peru({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W / 3} height={H} fill="#D91023" />
      <Rect x={W / 3} width={W / 3} height={H} fill="white" />
      <Rect x={W * 2 / 3} width={W / 3} height={H} fill="#D91023" />
    </Svg>
  )
}

// Venezuela
export function Venezuela({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 3} fill="#CF142B" />
      <Rect y={H / 3} width={W} height={H / 3} fill="#00247D" />
      <Rect y={H * 2 / 3} width={W} height={H / 3} fill="#CF6A00" />
      {[0,1,2,3,4,5,6].map(i => (
        <Circle key={i}
          cx={W/2 - 18 + i * 6}
          cy={H/2}
          r="2.5"
          fill="white"
        />
      ))}
    </Svg>
  )
}

// Cuba
export function Cuba({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      {[0,1,2,3,4].map(i => (
        <Rect key={i} y={i * (H/5)} width={W} height={H/5} fill={i % 2 === 0 ? "#002A8F" : "white"} />
      ))}
      <Polygon points="0,0 32,30 0,60" fill="#CF142B" />
      <Polygon points="6,20 9,28 16,28 11,33 13,41 6,36 -1,41 1,33 -4,28 3,28" fill="white" />
    </Svg>
  )
}

// Finland
export function Finland({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="white" />
      <Rect x="20" width="10" height={H} fill="#003580" />
      <Rect y={H / 2 - 5} width={W} height="10" fill="#003580" />
    </Svg>
  )
}

// Denmark
export function Denmark({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H} fill="#C60C30" />
      <Rect x="22" width="10" height={H} fill="white" />
      <Rect y={H / 2 - 5} width={W} height="10" fill="white" />
    </Svg>
  )
}

// Austria
export function Austria({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 3} fill="#ED2939" />
      <Rect y={H / 3} width={W} height={H / 3} fill="white" />
      <Rect y={H * 2 / 3} width={W} height={H / 3} fill="#ED2939" />
    </Svg>
  )
}

// Belgium
export function Belgium({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W / 3} height={H} fill="#000000" />
      <Rect x={W / 3} width={W / 3} height={H} fill="#FAE042" />
      <Rect x={W * 2 / 3} width={W / 3} height={H} fill="#EF3340" />
    </Svg>
  )
}

// Romania
export function Romania({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W / 3} height={H} fill="#002B7F" />
      <Rect x={W / 3} width={W / 3} height={H} fill="#FCD116" />
      <Rect x={W * 2 / 3} width={W / 3} height={H} fill="#CE1126" />
    </Svg>
  )
}

// Hungary
export function Hungary({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 3} fill="#CE2939" />
      <Rect y={H / 3} width={W} height={H / 3} fill="white" />
      <Rect y={H * 2 / 3} width={W} height={H / 3} fill="#477050" />
    </Svg>
  )
}

// Czech Republic
export function CzechRepublic({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 2} fill="white" />
      <Rect y={H / 2} width={W} height={H / 2} fill="#D7141A" />
      <Polygon points="0,0 40,30 0,60" fill="#11457E" />
    </Svg>
  )
}

// Slovakia
export function Slovakia({ size = 80 }: { size?: number }) {
  const h = size * (H / W)
  return (
    <Svg width={size} height={h} viewBox={`0 0 ${W} ${H}`}>
      <Rect width={W} height={H / 3} fill="white" />
      <Rect y={H / 3} width={W} height={H / 3} fill="#003DA5" />
      <Rect y={H * 2 / 3} width={W} height={H / 3} fill="#EE1C25" />
      <Rect x="8" y="16" width="18" height="28" rx="3" fill="white" stroke="#003DA5" strokeWidth="1" />
      <Rect x="8" y="22" width="18" height="8" fill="#003DA5" />
      <Rect x="8" y="30" width="18" height="8" fill="#EE1C25" />
      <Rect x="15" y="16" width="4" height="12" fill="#EE1C25" />
    </Svg>
  )
}

export const FLAG_COMPONENTS: Record<string, React.ComponentType<{ size?: number }>> = {
  israel: Israel,
  germany: Germany,
  usa: USA,
  uk: UK,
  france: France,
  italy: Italy,
  spain: Spain,
  japan: Japan,
  china: China,
  brazil: Brazil,
  canada: Canada,
  australia: Australia,
  india: India,
  russia: Russia,
  mexico: Mexico,
  southkorea: SouthKorea,
  argentina: Argentina,
  turkey: Turkey,
  netherlands: Netherlands,
  sweden: Sweden,
  norway: Norway,
  switzerland: Switzerland,
  poland: Poland,
  portugal: Portugal,
  greece: Greece,
  ukraine: Ukraine,
  egypt: Egypt,
  southafrica: SouthAfrica,
  nigeria: Nigeria,
  saudiarabia: SaudiArabia,
  uae: UAE,
  indonesia: Indonesia,
  thailand: Thailand,
  pakistan: Pakistan,
  bangladesh: Bangladesh,
  vietnam: Vietnam,
  iran: Iran,
  iraq: Iraq,
  jordan: Jordan,
  morocco: Morocco,
  kenya: Kenya,
  ethiopia: Ethiopia,
  ghana: Ghana,
  newzealand: NewZealand,
  singapore: Singapore,
  malaysia: Malaysia,
  philippines: Philippines,
  chile: Chile,
  colombia: Colombia,
  peru: Peru,
  venezuela: Venezuela,
  cuba: Cuba,
  finland: Finland,
  denmark: Denmark,
  austria: Austria,
  belgium: Belgium,
  romania: Romania,
  hungary: Hungary,
  czech: CzechRepublic,
  slovakia: Slovakia,
}
