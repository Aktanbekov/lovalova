// Layered SVG character. Pure render (no hooks) so it works in server
// components, client components and the print route alike.
//
// Coordinate system: a 200 x 360 box. Head centre (100, 92), shoulders at
// y≈160, feet at y≈332. Scenes place it with <g transform>.

import {
  HAIR_COLORS,
  OUTFIT_COLORS,
  SKIN_TONES,
  hexOf,
  type Traits,
} from "@/lib/avatar/options";

export type Pose =
  | "stand"
  | "wave"
  | "cheer"
  | "reachLeft"
  | "reachRight"
  | "hugLeft"
  | "hugRight"
  | "sit";

const INK = "#2A1E2C";
const PANTS = "#3D4A6B";
const SHOE = "#3A2A2E";

type Pt = [number, number];

// Arm geometry per pose: [shoulder, elbow(control point), hand]
const SHOULDER_L: Pt = [68, 164];
const SHOULDER_R: Pt = [132, 164];
const ARM_DOWN_L: [Pt, Pt] = [[50, 205], [54, 240]];
const ARM_DOWN_R: [Pt, Pt] = [[150, 205], [146, 240]];

function arms(pose: Pose): { l: [Pt, Pt]; r: [Pt, Pt] } {
  switch (pose) {
    case "wave":
      return { l: ARM_DOWN_L, r: [[172, 150], [170, 100]] };
    case "cheer":
      return { l: [[34, 132], [40, 92]], r: [[166, 132], [160, 92]] };
    case "reachRight":
      return { l: ARM_DOWN_L, r: [[170, 196], [194, 206]] };
    case "reachLeft":
      return { l: [[30, 196], [6, 206]], r: ARM_DOWN_R };
    case "hugRight":
      return { l: [[110, 214], [150, 196]], r: [[178, 172], [198, 186]] };
    case "hugLeft":
      return { l: [[22, 172], [2, 186]], r: [[90, 214], [50, 196]] };
    case "sit":
      return { l: [[52, 210], [64, 248]], r: [[148, 210], [136, 248]] };
    default:
      return { l: ARM_DOWN_L, r: ARM_DOWN_R };
  }
}

const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/** Sub-curve [0..t] of a quadratic Bézier (for short sleeves). */
function quadPart(s: Pt, c: Pt, e: Pt, t: number): string {
  const c1 = lerp(s, c, t);
  const p = lerp(c1, lerp(c, e, t), t);
  return `M${s[0]} ${s[1]} Q${c1[0]} ${c1[1]} ${p[0]} ${p[1]}`;
}

function Arm({
  shoulder,
  elbow,
  hand,
  skin,
  sleeve,
  shortSleeve,
}: {
  shoulder: Pt;
  elbow: Pt;
  hand: Pt;
  skin: string;
  sleeve: string;
  shortSleeve: boolean;
}) {
  const full = `M${shoulder[0]} ${shoulder[1]} Q${elbow[0]} ${elbow[1]} ${hand[0]} ${hand[1]}`;
  return (
    <g>
      {shortSleeve ? (
        <>
          <path d={full} stroke={skin} strokeWidth={17} strokeLinecap="round" fill="none" />
          <path d={quadPart(shoulder, elbow, hand, 0.42)} stroke={sleeve} strokeWidth={22} strokeLinecap="round" fill="none" />
        </>
      ) : (
        <path d={full} stroke={sleeve} strokeWidth={21} strokeLinecap="round" fill="none" />
      )}
      <circle cx={hand[0]} cy={hand[1]} r={11} fill={skin} />
    </g>
  );
}

function HairBack({ style, color }: { style: Traits["hair"]; color: string }) {
  switch (style) {
    case "long":
      return <path d="M44 92 C38 38 80 24 100 24 C120 24 162 38 156 92 L160 214 C138 228 62 228 40 214 Z" fill={color} />;
    case "wavy":
      return (
        <path
          d="M44 92 C38 38 80 24 100 24 C120 24 162 38 156 92 L162 150 C170 170 152 182 162 200 C170 216 148 230 132 222 C118 234 82 234 68 222 C52 230 30 216 38 200 C48 182 30 170 38 150 Z"
          fill={color}
        />
      );
    case "bob":
      return <path d="M42 92 C38 40 80 26 100 26 C120 26 162 40 158 92 L160 150 C140 164 60 164 40 150 Z" fill={color} />;
    case "curly":
      return (
        <g fill={color}>
          <circle cx={100} cy={74} r={62} />
          {[
            [44, 70], [40, 108], [52, 136], [156, 70], [160, 108], [148, 136], [72, 26], [100, 18], [128, 26],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={20} />
          ))}
        </g>
      );
    case "ponytail":
      return <path d="M138 64 C178 70 186 140 164 196 C160 176 150 160 152 132 C150 110 140 92 128 80 Z" fill={color} />;
    case "bun":
      return <circle cx={100} cy={30} r={22} fill={color} />;
    case "topknot":
      return <ellipse cx={100} cy={30} rx={18} ry={14} fill={color} />;
    default:
      return null;
  }
}

function HairFront({ style, color }: { style: Traits["hair"]; color: string }) {
  switch (style) {
    case "crop":
      return <path d="M50 94 C46 50 74 32 100 32 C128 32 154 50 150 94 C144 72 128 58 100 58 C76 58 58 70 50 94 Z" fill={color} />;
    case "buzz":
      return <path d="M52 84 C54 48 78 38 100 38 C122 38 146 48 148 84 C136 64 120 56 100 56 C80 56 64 64 52 84 Z" fill={color} opacity={0.85} />;
    case "sidepart":
      return <path d="M48 98 C42 46 76 28 104 30 C134 32 158 52 152 98 C150 78 140 64 126 58 C110 72 82 72 60 66 C54 76 50 86 48 98 Z" fill={color} />;
    case "curly":
      return (
        <g fill={color}>
          {[
            [56, 64], [72, 50], [90, 44], [110, 44], [128, 50], [144, 64],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={15} />
          ))}
        </g>
      );
    case "long":
    case "wavy":
      return <path d="M50 100 C44 50 76 32 100 32 C124 32 156 50 150 100 C142 70 122 54 100 52 C88 64 68 76 50 100 Z" fill={color} />;
    case "bob":
      return <path d="M48 92 C48 48 76 34 100 34 C124 34 152 48 152 92 L150 74 C124 64 76 64 50 74 Z" fill={color} />;
    case "ponytail":
    case "bun":
      return <path d="M50 92 C46 50 76 34 100 34 C124 34 154 50 150 92 C140 66 122 56 100 56 C78 56 60 66 50 92 Z" fill={color} />;
    case "pixie":
      return <path d="M48 92 C44 46 78 30 102 32 C132 34 156 52 150 92 C146 74 136 62 120 58 C104 76 74 84 54 78 Z" fill={color} />;
    case "topknot":
      return <path d="M52 84 C54 48 78 40 100 40 C122 40 146 48 148 84 C136 64 120 58 100 58 C80 58 64 64 52 84 Z" fill={color} />;
    default:
      return null;
  }
}

function Eyes({ style }: { style: Traits["eyes"] }) {
  const xs = [82, 118];
  const y = 98;
  switch (style) {
    case "dot":
      return <g fill={INK}>{xs.map((x) => <circle key={x} cx={x} cy={y} r={5} />)}</g>;
    case "happy":
      return (
        <g stroke={INK} strokeWidth={3.5} fill="none" strokeLinecap="round">
          {xs.map((x) => <path key={x} d={`M${x - 7} ${y + 2} Q${x} ${y - 7} ${x + 7} ${y + 2}`} />)}
        </g>
      );
    case "lashes":
      return (
        <g>
          {xs.map((x, i) => (
            <g key={x}>
              <ellipse cx={x} cy={y} rx={5.5} ry={6.5} fill={INK} />
              <circle cx={x + 1.8} cy={y - 2.2} r={1.8} fill="#fff" />
              <path
                d={i === 0 ? `M${x - 5} ${y - 5} l-5 -4 M${x - 2} ${y - 7} l-3 -5` : `M${x + 5} ${y - 5} l5 -4 M${x + 2} ${y - 7} l3 -5`}
                stroke={INK}
                strokeWidth={2.2}
                strokeLinecap="round"
              />
            </g>
          ))}
        </g>
      );
    case "sleepy":
      return (
        <g>
          {xs.map((x) => (
            <g key={x}>
              <path d={`M${x - 7} ${y} A7 7 0 0 0 ${x + 7} ${y} Z`} fill={INK} />
              <path d={`M${x - 8} ${y} L${x + 8} ${y}`} stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
            </g>
          ))}
        </g>
      );
    case "wide":
      return (
        <g>
          {xs.map((x) => (
            <g key={x}>
              <ellipse cx={x} cy={y} rx={8} ry={9} fill="#fff" stroke={INK} strokeWidth={1.5} />
              <circle cx={x} cy={y + 1} r={4.5} fill={INK} />
              <circle cx={x + 1.5} cy={y - 1} r={1.5} fill="#fff" />
            </g>
          ))}
        </g>
      );
    default: // shine
      return (
        <g>
          {xs.map((x) => (
            <g key={x}>
              <ellipse cx={x} cy={y} rx={6} ry={7} fill={INK} />
              <circle cx={x + 2} cy={y - 2.5} r={2.2} fill="#fff" />
            </g>
          ))}
        </g>
      );
  }
}

function Brows({ style, color }: { style: Traits["brows"]; color: string }) {
  const w = style === "bold" ? 5 : 3;
  const lift = style === "arched" ? 7 : 3;
  return (
    <g stroke={color} strokeWidth={w} strokeLinecap="round" fill="none">
      <path d={`M73 ${84} Q81 ${84 - lift} 90 ${84}`} />
      <path d={`M110 ${84} Q119 ${84 - lift} 127 ${84}`} />
    </g>
  );
}

function Mouth({ open }: { open: boolean }) {
  return open ? (
    <g>
      <path d="M86 116 Q100 136 114 116 Z" fill="#7A2E3A" />
      <path d="M92 124 Q100 131 108 124" fill="#E58A8A" />
    </g>
  ) : (
    <path d="M88 117 Q100 128 112 117" stroke={INK} strokeWidth={3.5} fill="none" strokeLinecap="round" />
  );
}

function FacialHair({ style, color }: { style: Traits["facialHair"]; color: string }) {
  switch (style) {
    case "stubble":
      return <path d="M58 108 C62 140 82 148 100 148 C118 148 138 140 142 108 C134 128 118 134 100 134 C82 134 66 128 58 108 Z" fill={color} opacity={0.28} />;
    case "mustache":
      return <path d="M84 113 C90 106 98 108 100 111 C102 108 110 106 116 113 C110 114 104 113 100 112 C96 113 90 114 84 113 Z" fill={color} />;
    case "beard":
      return (
        <path
          d="M54 102 C56 146 80 156 100 156 C120 156 144 146 146 102 C140 118 132 128 118 130 C112 122 88 122 82 130 C68 128 60 118 54 102 Z"
          fill={color}
        />
      );
    default:
      return null;
  }
}

function Glasses({ style }: { style: Traits["glasses"] }) {
  if (style === "none") return null;
  const common = { stroke: INK, strokeWidth: 3, fill: "#ffffff", fillOpacity: 0.18 };
  return (
    <g>
      {style === "round" ? (
        <>
          <circle cx={82} cy={98} r={13} {...common} />
          <circle cx={118} cy={98} r={13} {...common} />
        </>
      ) : (
        <>
          <rect x={68} y={88} width={28} height={21} rx={5} {...common} />
          <rect x={104} y={88} width={28} height={21} rx={5} {...common} />
        </>
      )}
      <path d="M95 96 Q100 92 105 96" stroke={INK} strokeWidth={3} fill="none" />
    </g>
  );
}

function Head({ face, skin }: { face: Traits["face"]; skin: string }) {
  const ears = face === "oval" ? [54, 146] : [51, 149];
  return (
    <g fill={skin}>
      {ears.map((x) => <circle key={x} cx={x} cy={102} r={9} />)}
      {face === "oval" ? (
        <ellipse cx={100} cy={94} rx={47} ry={55} />
      ) : face === "soft" ? (
        <rect x={51} y={42} width={98} height={104} rx={40} />
      ) : (
        <circle cx={100} cy={94} r={51} />
      )}
    </g>
  );
}

function Body({ traits, pose, outfit, skin }: { traits: Traits; pose: Pose; outfit: string; skin: string }) {
  const sit = pose === "sit";
  const legTop = 240;
  const legBottom = sit ? 292 : 318;
  const shoeY = sit ? 298 : 324;
  const isDress = traits.outfit === "dress";
  const isOveralls = traits.outfit === "overalls";
  const pants = isOveralls ? outfit : PANTS;
  const legs = isDress ? (
    <g fill={skin}>
      <rect x={76} y={250} width={18} height={legBottom - 250} rx={8} />
      <rect x={106} y={250} width={18} height={legBottom - 250} rx={8} />
    </g>
  ) : (
    <g fill={pants}>
      <rect x={68} y={legTop - 10} width={30} height={legBottom - legTop + 10} rx={10} />
      <rect x={102} y={legTop - 10} width={30} height={legBottom - legTop + 10} rx={10} />
    </g>
  );
  const shoes = (
    <g fill={SHOE}>
      <ellipse cx={82} cy={shoeY} rx={18} ry={9} />
      <ellipse cx={118} cy={shoeY} rx={18} ry={9} />
    </g>
  );

  const torsoD = "M66 154 Q100 140 134 154 Q146 160 146 176 L140 246 Q100 254 60 246 L54 176 Q54 160 66 154 Z";
  let torso: React.ReactNode;
  switch (traits.outfit) {
    case "dress":
      torso = <path d="M66 152 Q100 140 134 152 Q144 158 144 172 L162 272 Q100 288 38 272 L56 172 Q56 158 66 152 Z" fill={outfit} />;
      break;
    case "overalls":
      torso = (
        <g>
          <path d={torsoD} fill="#F3ECE2" />
          <path d="M74 186 L126 186 L130 248 Q100 254 70 248 Z" fill={outfit} />
          <path d="M74 186 L68 156 M126 186 L132 156" stroke={outfit} strokeWidth={8} strokeLinecap="round" />
          <circle cx={78} cy={192} r={3} fill="#F3ECE2" />
          <circle cx={122} cy={192} r={3} fill="#F3ECE2" />
        </g>
      );
      break;
    case "hoodie":
      torso = (
        <g>
          <ellipse cx={100} cy={152} rx={34} ry={14} fill={outfit} />
          <path d={torsoD} fill={outfit} />
          <path d="M92 156 L90 186 M108 156 L110 186" stroke="#F3ECE2" strokeWidth={3} strokeLinecap="round" />
          <rect x={76} y={208} width={48} height={22} rx={8} fill="#000" opacity={0.12} />
        </g>
      );
      break;
    case "shirt":
      torso = (
        <g>
          <path d={torsoD} fill={outfit} />
          <path d="M86 148 L100 166 L114 148 L108 160 L100 168 L92 160 Z" fill="#F3ECE2" />
          {[180, 200, 220].map((y) => <circle key={y} cx={100} cy={y} r={2.5} fill="#F3ECE2" />)}
        </g>
      );
      break;
    case "blazer":
      torso = (
        <g>
          <path d={torsoD} fill={outfit} />
          <path d="M86 150 L100 200 L114 150 Z" fill="#F3ECE2" />
          <path d="M86 150 L96 196 L80 172 Z M114 150 L104 196 L120 172 Z" fill="#000" opacity={0.18} />
          <circle cx={100} cy={214} r={3} fill="#000" opacity={0.3} />
        </g>
      );
      break;
    case "sweater":
      torso = (
        <g>
          <path d={torsoD} fill={outfit} />
          <path d="M84 150 Q100 162 116 150" stroke="#000" strokeOpacity={0.15} strokeWidth={5} fill="none" />
          <path d="M60 238 Q100 246 140 238" stroke="#000" strokeOpacity={0.15} strokeWidth={6} fill="none" />
        </g>
      );
      break;
    case "stripes":
      torso = (
        <g>
          <path d={torsoD} fill={outfit} />
          {[178, 200, 222].map((y) => (
            <path key={y} d={`M56 ${y} Q100 ${y + 6} 144 ${y}`} stroke="#F3ECE2" strokeWidth={7} fill="none" />
          ))}
          <path d="M86 150 Q100 160 114 150" stroke="#000" strokeOpacity={0.15} strokeWidth={3} fill="none" />
        </g>
      );
      break;
    default: // tee
      torso = (
        <g>
          <path d={torsoD} fill={outfit} />
          <path d="M86 150 Q100 160 114 150" stroke="#000" strokeOpacity={0.15} strokeWidth={3} fill="none" />
        </g>
      );
  }

  return (
    <g>
      {legs}
      {shoes}
      {torso}
    </g>
  );
}

export function Avatar({
  traits,
  pose = "stand",
  open,
}: {
  traits: Traits;
  pose?: Pose;
  /** Open, laughing mouth. Defaults to on for wave/cheer. */
  open?: boolean;
}) {
  const skin = hexOf(SKIN_TONES, traits.skin);
  const hair = hexOf(HAIR_COLORS, traits.hairColor);
  const outfit = hexOf(OUTFIT_COLORS, traits.outfit === "blazer" && traits.outfitColor === "cream" ? "charcoal" : traits.outfitColor);
  const shortSleeve = traits.outfit === "tee" || traits.outfit === "stripes" || traits.outfit === "dress" || traits.outfit === "overalls";
  const sleeve = traits.outfit === "overalls" ? "#F3ECE2" : outfit;
  const a = arms(pose);
  const mouthOpen = open ?? (pose === "wave" || pose === "cheer");

  return (
    <g>
      <HairBack style={traits.hair} color={hair} />
      <Body traits={traits} pose={pose} outfit={outfit} skin={skin} />
      <rect x={90} y={134} width={20} height={20} rx={6} fill={skin} />
      <Head face={traits.face} skin={skin} />
      {traits.blush && (
        <g fill="#F08F8F" opacity={0.45}>
          <ellipse cx={72} cy={114} rx={9} ry={5.5} />
          <ellipse cx={128} cy={114} rx={9} ry={5.5} />
        </g>
      )}
      <Eyes style={traits.eyes} />
      <Brows style={traits.brows} color={traits.hair === "bald" ? "#5C3B28" : hair} />
      <path d="M97 107 Q100 111 103 107" stroke="#000" strokeOpacity={0.25} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <FacialHair style={traits.facialHair} color={hair} />
      <Mouth open={mouthOpen} />
      <HairFront style={traits.hair} color={hair} />
      <Glasses style={traits.glasses} />
      <Arm shoulder={SHOULDER_L} elbow={a.l[0]} hand={a.l[1]} skin={skin} sleeve={sleeve} shortSleeve={shortSleeve} />
      <Arm shoulder={SHOULDER_R} elbow={a.r[0]} hand={a.r[1]} skin={skin} sleeve={sleeve} shortSleeve={shortSleeve} />
    </g>
  );
}

/** Stand-alone avatar <svg>, used in the builder and thumbnails. */
export function AvatarSvg({
  traits,
  pose = "stand",
  className,
  crop = "full",
  title,
}: {
  traits: Traits;
  pose?: Pose;
  className?: string;
  crop?: "full" | "head";
  title?: string;
}) {
  const viewBox = crop === "head" ? "30 0 140 160" : "-10 0 220 345";
  return (
    <svg viewBox={viewBox} className={className} role="img" aria-label={title ?? "Character"}>
      <Avatar traits={traits} pose={pose} />
    </svg>
  );
}
