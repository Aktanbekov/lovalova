// Illustrated page scenes on an 850 x 550 canvas.
// The top ~190 units are kept quiet for the page text; characters stand
// on the ground near the bottom. Flat shapes only (no gradients/ids), so
// many pages can render on one screen without SVG id clashes.

import type { ReactNode } from "react";
import { Avatar, type Pose } from "@/components/avatar/Avatar";
import type { Traits } from "@/lib/avatar/options";
import type { SceneId } from "@/content/pages";

export const W = 850;
export const H = 550;

const C = {
  cream: "#FBF6F1",
  blush: "#F7D9D6",
  rose: "#E07A7F",
  plum: "#6B2F5B",
  ink: "#2A1E2C",
  sky: "#D9EDF3",
  grass: "#A8CF8E",
  grassDark: "#86B46E",
  sand: "#F2DDB0",
  sea: "#7DB7D1",
  night: "#2B2450",
  gold: "#F2C14E",
  wood: "#C99A6B",
  white: "#FFFFFF",
};

// ---------- small shape helpers ----------

function Heart({ x, y, s, fill, rot = 0, opacity = 1 }: { x: number; y: number; s: number; fill: string; rot?: number; opacity?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}
      d="M0 0.35 C-0.15 0.2 -1 -0.25 -0.55 -0.7 C-0.25 -0.95 0 -0.65 0 -0.45 C0 -0.65 0.25 -0.95 0.55 -0.7 C1 -0.25 0.15 0.2 0 0.35 Z"
      fill={fill}
      opacity={opacity}
    />
  );
}

function Star({ x, y, r, fill }: { x: number; y: number; r: number; fill: string }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 ? r * 0.45 : r;
    return `${(x + Math.cos(a) * rr).toFixed(1)},${(y + Math.sin(a) * rr).toFixed(1)}`;
  }).join(" ");
  return <polygon points={pts} fill={fill} />;
}

function Cloud({ x, y, s = 1, fill = C.white }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <ellipse cx={0} cy={0} rx={46} ry={20} />
      <circle cx={-18} cy={-12} r={20} />
      <circle cx={14} cy={-18} r={24} />
    </g>
  );
}

function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-12} y={-10} width={24} height={110} rx={8} fill="#8A6142" />
      <circle cx={0} cy={-50} r={62} fill={C.grassDark} />
      <circle cx={-44} cy={-14} r={40} fill={C.grassDark} />
      <circle cx={44} cy={-14} r={40} fill={C.grassDark} />
      <circle cx={-20} cy={-70} r={10} fill={C.rose} opacity={0.7} />
      <circle cx={26} cy={-36} r={8} fill={C.rose} opacity={0.7} />
    </g>
  );
}

function Flower({ x, y, c }: { x: number; y: number; c: string }) {
  return (
    <g>
      <path d={`M${x} ${y} L${x} ${y + 40}`} stroke={C.grassDark} strokeWidth={4} />
      {[0, 72, 144, 216, 288].map((a) => (
        <circle key={a} cx={x + Math.cos((a * Math.PI) / 180) * 10} cy={y + Math.sin((a * Math.PI) / 180) * 10} r={8} fill={c} />
      ))}
      <circle cx={x} cy={y} r={6} fill={C.gold} />
    </g>
  );
}

function Note({ x, y, s = 1, fill }: { x: number; y: number; s?: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <ellipse cx={0} cy={30} rx={11} ry={8} transform="rotate(-20 0 30)" />
      <rect x={8} y={-10} width={4} height={40} />
      <path d="M12 -10 Q30 -2 26 14 Q24 4 12 2 Z" />
    </g>
  );
}

// ---------- characters ----------

const SCALE = 1;

export function Couple({
  A,
  B,
  poses,
  cx = W / 2,
  y = 188,
  s = SCALE,
  gap,
  only,
  seat = true,
}: {
  A: Traits;
  B: Traits;
  poses: [Pose, Pose];
  cx?: number;
  y?: number;
  s?: number;
  /** Distance between the two avatars' left edges, in avatar units. */
  gap?: number;
  only?: "A" | "B";
  /** Draw a bench under sitting characters (scenes with furniture pass false). */
  seat?: boolean;
}) {
  const holding = poses[0] === "reachRight" && poses[1] === "reachLeft";
  const hugging = poses[0] === "hugRight" && poses[1] === "hugLeft";
  const g = gap ?? (holding ? 188 : hugging ? 150 : 196);
  const total = only ? 200 : g + 200;
  const xA = cx - (total * s) / 2;
  const xB = only ? xA : xA + g * s;
  const feet = y + (poses[0] === "sit" ? 300 : 326) * s;
  const sitting = poses[0] === "sit" || poses[1] === "sit";
  const benchL = xA - 14;
  const benchR = xB + 200 * s + 14;
  const benchY = y + 228 * s;
  return (
    <g>
      <ellipse cx={cx} cy={feet + 6} rx={(total * s) / 2 + 10} ry={14} fill="#000" opacity={0.08} />
      {sitting && seat && (
        <g fill="#B98559">
          <rect x={benchL + 20} y={benchY + 10} width={12} height={feet - benchY - 10} rx={4} fill="#8A6142" />
          <rect x={benchR - 32} y={benchY + 10} width={12} height={feet - benchY - 10} rx={4} fill="#8A6142" />
          <rect x={benchL} y={benchY - 70} width={benchR - benchL} height={14} rx={7} />
          <rect x={benchL} y={benchY} width={benchR - benchL} height={20} rx={8} />
        </g>
      )}
      {only !== "B" && (
        <g transform={`translate(${xA} ${y}) scale(${s})`}>
          <Avatar traits={A} pose={poses[0]} />
        </g>
      )}
      {only !== "A" && (
        <g transform={`translate(${xB} ${y}) scale(${s})`}>
          <Avatar traits={B} pose={poses[1]} />
        </g>
      )}
    </g>
  );
}

// ---------- scenes ----------

type SceneProps = { A: Traits; B: Traits; poses: [Pose, Pose] };
type SceneDef = { dark?: boolean; render: (p: SceneProps) => ReactNode };

const ground = (fill: string, y = 470) => <path d={`M0 ${y} Q${W / 2} ${y - 30} ${W} ${y} L${W} ${H} L0 ${H} Z`} fill={fill} />;

export const SCENES: Record<SceneId, SceneDef> = {
  letter: {
    render: () => (
      <g>
        <rect width={W} height={H} fill={C.cream} />
        <rect x={24} y={24} width={W - 48} height={H - 48} rx={18} fill="none" stroke={C.rose} strokeWidth={3} strokeDasharray="2 10" strokeLinecap="round" />
        <Heart x={70} y={74} s={22} fill={C.rose} rot={-12} />
        <Heart x={W - 70} y={H - 66} s={22} fill={C.plum} rot={12} opacity={0.8} />
        <Heart x={W - 92} y={78} s={12} fill={C.rose} opacity={0.5} />
        <Heart x={92} y={H - 70} s={12} fill={C.plum} opacity={0.4} />
      </g>
    ),
  },

  hearts: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill={C.blush} />
        {[
          [80, 230, 30, -15, C.rose], [160, 330, 18, 10, C.plum], [700, 250, 34, 12, C.rose], [770, 360, 18, -8, C.plum],
          [110, 430, 22, 18, C.white], [640, 420, 14, 0, C.white], [250, 270, 12, -20, C.white], [600, 300, 12, 20, C.rose],
        ].map(([x, y, s, r, f], i) => (
          <Heart key={i} x={x as number} y={y as number} s={s as number} rot={r as number} fill={f as string} opacity={0.85} />
        ))}
        {ground("#F1C4C1", 500)}
        <Couple A={A} B={B} poses={poses} />
      </g>
    ),
  },

  park: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill={C.sky} />
        <circle cx={770} cy={250} r={30} fill={C.gold} opacity={0.9} />
        <Cloud x={640} y={245} s={0.7} />
        <path d="M0 400 Q220 330 450 390 Q650 440 850 380 L850 550 L0 550 Z" fill={C.grassDark} />
        {ground(C.grass, 480)}
        <Tree x={110} y={390} s={1} />
        <Flower x={720} y={470} c={C.rose} />
        <Flower x={770} y={480} c={C.white} />
        <Couple A={A} B={B} poses={poses} cx={470} />
      </g>
    ),
  },

  stars: {
    dark: true,
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill={C.night} />
        <circle cx={730} cy={260} r={42} fill="#F6EBC8" />
        <circle cx={746} cy={250} r={38} fill={C.night} />
        {[[60, 240, 6], [150, 300, 4], [250, 230, 5], [600, 230, 4], [650, 330, 6], [800, 330, 4], [90, 360, 4], [200, 400, 3], [700, 420, 3], [560, 280, 3]].map(([x, y, r], i) => (
          <Star key={i} x={x} y={y} r={r * 2} fill="#F6EBC8" />
        ))}
        {ground("#3E3570", 500)}
        <Couple A={A} B={B} poses={poses} />
      </g>
    ),
  },

  kitchen: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill="#F6E7D8" />
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x={i * 72} y={300} width={70} height={36} fill={i % 2 ? "#FFFFFF" : "#EAD7C3"} opacity={0.7} />
        ))}
        <rect x={0} y={336} width={W} height={20} fill={C.wood} />
        <rect x={0} y={356} width={W} height={194} fill="#E9D3BC" />
        <rect x={60} y={260} width={70} height={46} rx={10} fill={C.rose} />
        <rect x={52} y={256} width={86} height={10} rx={5} fill="#B85A5F" />
        <rect x={700} y={250} width={56} height={56} rx={8} fill="#6E9E6A" />
        <circle cx={728} cy={242} r={8} fill="#6E9E6A" />
        <Couple A={A} B={B} poses={poses} />
      </g>
    ),
  },

  couch: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill="#ECE3F2" />
        <rect x={0} y={500} width={W} height={50} fill="#D6C7A6" />
        <rect x={640} y={250} width={14} height={160} fill="#8A6142" />
        <path d="M612 250 L682 250 L668 210 L626 210 Z" fill={C.gold} />
        <rect x={190} y={330} width={470} height={150} rx={40} fill={C.plum} />
        <rect x={160} y={390} width={70} height={110} rx={30} fill="#5A2650" />
        <rect x={620} y={390} width={70} height={110} rx={30} fill="#5A2650" />
        <Couple A={A} B={B} poses={poses} y={204} seat={false} />
        <rect x={230} y={470} width={390} height={40} rx={16} fill="#5A2650" />
      </g>
    ),
  },

  beach: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill={C.sky} />
        <circle cx={120} cy={240} r={40} fill={C.gold} />
        <rect x={0} y={340} width={W} height={90} fill={C.sea} />
        <path d="M0 360 Q40 350 80 360 T160 360 T240 360 T320 360 T400 360 T480 360 T560 360 T640 360 T720 360 T800 360 T880 360" stroke="#fff" strokeWidth={4} fill="none" opacity={0.7} />
        <path d="M0 420 Q425 400 850 420 L850 550 L0 550 Z" fill={C.sand} />
        <path d="M720 520 L740 300" stroke="#8A6142" strokeWidth={6} />
        <path d="M650 310 Q740 230 830 310 Z" fill={C.rose} />
        <Couple A={A} B={B} poses={poses} cx={400} />
      </g>
    ),
  },

  mountains: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill={C.sky} />
        <path d="M-40 430 L170 220 L380 430 Z" fill="#8FA7B8" />
        <path d="M170 220 L210 260 L190 270 L170 255 L150 272 L130 260 Z" fill="#fff" />
        <path d="M300 430 L560 190 L820 430 Z" fill="#7A93A6" />
        <path d="M560 190 L606 232 L582 244 L560 228 L536 246 L514 232 Z" fill="#fff" />
        <path d="M600 430 L760 280 L920 430 Z" fill="#8FA7B8" />
        {ground(C.grass, 470)}
        <Couple A={A} B={B} poses={poses} />
      </g>
    ),
  },

  dance: {
    dark: true,
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill="#3A2350" />
        <path d="M120 0 L40 550 L280 550 Z" fill="#fff" opacity={0.06} />
        <path d="M730 0 L570 550 L810 550 Z" fill="#fff" opacity={0.06} />
        <circle cx={425} cy={18} r={0} />
        <rect x={0} y={480} width={W} height={70} fill="#2C1A3E" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={i * 150} y={480} width={140} height={70} fill={i % 2 ? C.rose : C.gold} opacity={0.25} />
        ))}
        <Note x={110} y={260} s={1.2} fill={C.gold} />
        <Note x={720} y={290} s={1} fill={C.rose} />
        <Note x={180} y={380} s={0.8} fill={C.rose} />
        <Couple A={A} B={B} poses={poses} />
      </g>
    ),
  },

  cafe: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill="#F3E3D0" />
        <rect x={0} y={460} width={W} height={90} fill="#C99A6B" />
        <rect x={60} y={230} width={150} height={150} rx={10} fill={C.sky} stroke="#fff" strokeWidth={8} />
        <path d="M135 230 L135 380 M60 305 L210 305" stroke="#fff" strokeWidth={6} />
        <rect x={640} y={240} width={150} height={10} fill="#8A6142" />
        <rect x={660} y={212} width={22} height={28} rx={4} fill={C.rose} />
        <rect x={700} y={206} width={22} height={34} rx={4} fill={C.plum} />
        <rect x={740} y={216} width={22} height={24} rx={4} fill={C.gold} />
        <Couple A={A} B={B} poses={poses} gap={250} y={204} />
        <rect x={395} y={420} width={60} height={90} fill="#8A6142" />
        <ellipse cx={425} cy={420} rx={80} ry={16} fill="#A87650" />
        <rect x={398} y={392} width={22} height={24} rx={4} fill="#fff" />
        <rect x={432} y={392} width={22} height={24} rx={4} fill="#fff" />
        <path d="M404 384 q4 -8 0 -16 M438 384 q4 -8 0 -16" stroke="#fff" strokeWidth={3} fill="none" opacity={0.8} />
      </g>
    ),
  },

  car: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill={C.sky} />
        <Cloud x={700} y={240} s={0.8} />
        <path d="M0 380 Q300 330 850 370 L850 550 L0 550 Z" fill={C.grassDark} />
        <rect x={0} y={450} width={W} height={100} fill="#7C7882" />
        <path d="M0 500 L850 500" stroke="#fff" strokeWidth={6} strokeDasharray="40 30" />
        <g transform="translate(40 330)">
          <path d="M20 100 L20 60 Q30 40 60 40 L100 0 L220 0 L260 40 L300 50 Q320 56 320 80 L320 100 Z" fill={C.gold} />
          <path d="M110 12 L210 12 L240 42 L90 42 Z" fill="#CFE6EE" />
          <circle cx={80} cy={104} r={24} fill={C.ink} />
          <circle cx={260} cy={104} r={24} fill={C.ink} />
          <circle cx={80} cy={104} r={9} fill="#ccc" />
          <circle cx={260} cy={104} r={9} fill="#ccc" />
        </g>
        <Couple A={A} B={B} poses={poses} cx={590} />
      </g>
    ),
  },

  rain: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill="#D5DEE8" />
        {Array.from({ length: 40 }, (_, i) => {
          const x = (i * 97) % W;
          const y = 200 + ((i * 53) % 280);
          return <path key={i} d={`M${x} ${y} l-6 18`} stroke="#8EA3BC" strokeWidth={3} strokeLinecap="round" />;
        })}
        {ground("#B9C7D6", 490)}
        <ellipse cx={170} cy={515} rx={60} ry={8} fill="#9FB1C6" />
        <path d="M425 200 L425 300" stroke={C.ink} strokeWidth={5} />
        <path d="M265 222 Q425 120 585 222 Q545 206 505 222 Q465 206 425 222 Q385 206 345 222 Q305 206 265 222 Z" fill={C.rose} />
        <Couple A={A} B={B} poses={poses} y={204} />
      </g>
    ),
  },

  home: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill={C.sky} />
        <rect x={580} y={300} width={230} height={190} fill="#F3E3D0" />
        <path d="M555 310 L695 210 L835 310 Z" fill={C.plum} />
        <rect x={760} y={226} width={26} height={50} fill="#8A6142" />
        <rect x={604} y={340} width={50} height={50} fill="#CFE6EE" stroke="#fff" strokeWidth={5} />
        <rect x={680} y={380} width={46} height={110} rx={6} fill={C.rose} />
        <circle cx={716} cy={436} r={4} fill={C.gold} />
        {ground(C.grass, 490)}
        <Tree x={80} y={410} s={0.8} />
        <Flower x={530} y={480} c={C.rose} />
        <Flower x={790} y={492} c={C.gold} />
        <Couple A={A} B={B} poses={poses} cx={330} />
      </g>
    ),
  },

  spotlight: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill="#FCEBD5" />
        {Array.from({ length: 14 }, (_, i) => {
          const a1 = (i / 14) * Math.PI * 2;
          const a2 = a1 + Math.PI / 14;
          const r = 700;
          return (
            <path
              key={i}
              d={`M425 380 L${425 + Math.cos(a1) * r} ${380 + Math.sin(a1) * r} L${425 + Math.cos(a2) * r} ${380 + Math.sin(a2) * r} Z`}
              fill="#F8D9B0"
              opacity={0.6}
            />
          );
        })}
        <Star x={150} y={300} r={16} fill={C.gold} />
        <Star x={710} y={270} r={12} fill={C.rose} />
        <Star x={680} y={420} r={8} fill={C.gold} />
        <Star x={180} y={430} r={9} fill={C.rose} />
        {ground("#F3D3A6", 500)}
        <Couple A={A} B={B} poses={poses} />
      </g>
    ),
  },

  bigheart: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill={C.cream} />
        <Heart x={425} y={330} s={230} fill={C.blush} />
        <Heart x={130} y={300} s={24} fill={C.rose} rot={-14} />
        <Heart x={720} y={330} s={30} fill={C.rose} rot={10} />
        <Heart x={690} y={450} s={14} fill={C.plum} opacity={0.6} />
        <Heart x={170} y={440} s={12} fill={C.plum} opacity={0.6} />
        <Couple A={A} B={B} poses={poses} />
      </g>
    ),
  },

  garden: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill="#E4F1E1" />
        <circle cx={90} cy={420} r={70} fill={C.grassDark} />
        <circle cx={770} cy={410} r={80} fill={C.grassDark} />
        {ground(C.grass, 480)}
        {[40, 110, 180, 670, 740, 810].map((x, i) => (
          <Flower key={x} x={x} y={470 + (i % 2) * 14} c={[C.rose, C.white, C.gold, C.plum][i % 4]} />
        ))}
        <Couple A={A} B={B} poses={poses} />
      </g>
    ),
  },

  city: {
    dark: true,
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill="#3B3164" />
        <circle cx={720} cy={70} r={0} />
        {[
          [20, 260, 90], [120, 300, 70], [200, 230, 80], [290, 320, 60], [560, 280, 70], [640, 220, 90], [740, 300, 90],
        ].map(([x, y, w], i) => (
          <g key={i}>
            <rect x={x} y={y} width={w} height={H - y} fill="#2A2350" />
            {Array.from({ length: 6 }, (_, j) => (
              <rect key={j} x={x + 12 + (j % 2) * (w / 2 - 6)} y={y + 20 + Math.floor(j / 2) * 40} width={14} height={18} fill={C.gold} opacity={(i + j) % 3 ? 0.85 : 0.25} />
            ))}
          </g>
        ))}
        <rect x={0} y={490} width={W} height={60} fill="#221C40" />
        <Couple A={A} B={B} poses={poses} />
      </g>
    ),
  },

  games: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill="#E3EEF5" />
        <rect x={0} y={500} width={W} height={50} fill="#C8B79A" />
        <ellipse cx={425} cy={500} rx={330} ry={34} fill={C.rose} opacity={0.5} />
        <rect x={80} y={240} width={150} height={100} rx={10} fill={C.ink} />
        <rect x={90} y={250} width={130} height={80} rx={4} fill="#7DB7D1" />
        <rect x={140} y={340} width={30} height={30} fill={C.ink} />
        <Couple A={A} B={B} poses={poses} gap={240} y={204} />
        <g transform="translate(375 460)">
          <rect width={100} height={60} rx={6} fill={C.white} />
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={(i % 4) * 25} y={Math.floor(i / 4) * 20} width={25} height={20} fill={(i + Math.floor(i / 4)) % 2 ? C.ink : C.white} />
          ))}
        </g>
      </g>
    ),
  },

  music: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill="#FBEFCF" />
        <Note x={90} y={240} s={1.4} fill={C.plum} />
        <Note x={720} y={250} s={1.1} fill={C.rose} />
        <Note x={170} y={360} s={0.8} fill={C.rose} />
        <Note x={680} y={380} s={0.9} fill={C.plum} />
        <g transform="translate(70 320) rotate(-12)">
          <ellipse cx={40} cy={140} rx={46} ry={40} fill={C.wood} />
          <ellipse cx={40} cy={92} rx={34} ry={30} fill={C.wood} />
          <circle cx={40} cy={120} r={12} fill={C.ink} />
          <rect x={34} y={-30} width={12} height={100} fill="#8A6142" />
        </g>
        {ground("#F0D9A0", 500)}
        <Couple A={A} B={B} poses={poses} />
      </g>
    ),
  },

  sunrise: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill="#FCE1CF" />
        <rect y={260} width={W} height={120} fill="#F9CDB6" />
        <circle cx={425} cy={420} r={150} fill="#F7B27A" opacity={0.85} />
        <path d="M0 420 Q200 360 420 410 Q640 450 850 400 L850 550 L0 550 Z" fill="#E59C8C" />
        {ground("#D98579", 495)}
        <Couple A={A} B={B} poses={poses} />
      </g>
    ),
  },

  pets: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill={C.sky} />
        <Cloud x={130} y={250} s={0.8} />
        {ground(C.grass, 480)}
        <Couple A={A} B={B} poses={poses} cx={380} />
        <g transform="translate(640 400)">
          <ellipse cx={60} cy={60} rx={60} ry={34} fill={C.wood} />
          <circle cx={120} cy={30} r={32} fill={C.wood} />
          <ellipse cx={104} cy={10} rx={12} ry={22} fill="#8A6142" transform="rotate(-20 104 10)" />
          <ellipse cx={142} cy={12} rx={12} ry={22} fill="#8A6142" transform="rotate(20 142 12)" />
          <circle cx={112} cy={30} r={4} fill={C.ink} />
          <circle cx={132} cy={30} r={4} fill={C.ink} />
          <ellipse cx={122} cy={44} rx={7} ry={5} fill={C.ink} />
          <rect x={20} y={80} width={14} height={30} rx={6} fill={C.wood} />
          <rect x={86} y={80} width={14} height={30} rx={6} fill={C.wood} />
          <path d="M0 50 Q-24 30 -18 10" stroke={C.wood} strokeWidth={10} strokeLinecap="round" fill="none" />
        </g>
      </g>
    ),
  },

  books: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill="#F1E6DA" />
        {[30, 640].map((x0) => (
          <g key={x0}>
            <rect x={x0} y={220} width={180} height={290} rx={6} fill="#B98559" />
            {[0, 1, 2].map((r) => (
              <g key={r}>
                <rect x={x0 + 10} y={232 + r * 92} width={160} height={78} fill="#8A6142" />
                {Array.from({ length: 7 }, (_, i) => (
                  <rect
                    key={i}
                    x={x0 + 16 + i * 22}
                    y={250 + r * 92 + (i % 3) * 5}
                    width={17}
                    height={60 - (i % 3) * 5}
                    fill={[C.rose, C.plum, "#4C7A9E", C.gold, "#6E9E6A"][(i + r + x0) % 5]}
                  />
                ))}
              </g>
            ))}
          </g>
        ))}
        <rect x={0} y={500} width={W} height={50} fill="#C8B79A" />
        <Couple A={A} B={B} poses={poses} y={204} />
        <g transform="translate(395 470)">
          <rect width={60} height={12} rx={2} fill={C.rose} />
          <rect x={4} y={-12} width={52} height={12} rx={2} fill="#4C7A9E" />
          <rect x={-2} y={-24} width={58} height={12} rx={2} fill={C.gold} />
        </g>
      </g>
    ),
  },

  snow: {
    dark: true,
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill="#24345A" />
        {Array.from({ length: 36 }, (_, i) => (
          <circle key={i} cx={(i * 113) % W} cy={190 + ((i * 71) % 300)} r={(i % 3) + 2} fill="#fff" opacity={0.85} />
        ))}
        <g transform="translate(110 260)">
          <path d="M0 0 L70 110 L-70 110 Z" fill="#3E7A55" />
          <path d="M0 60 L90 190 L-90 190 Z" fill="#3E7A55" />
          <rect x={-12} y={190} width={24} height={30} fill="#8A6142" />
          <Star x={0} y={-6} r={18} fill={C.gold} />
          <circle cx={-30} cy={150} r={7} fill={C.rose} />
          <circle cx={26} cy={100} r={7} fill={C.gold} />
          <circle cx={40} cy={170} r={7} fill="#fff" />
        </g>
        {ground("#E9F0F7", 495)}
        <Couple A={A} B={B} poses={poses} cx={480} />
      </g>
    ),
  },

  cake: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill="#FDE8EC" />
        {[[100, 280, C.gold], [740, 260, C.sea], [160, 380, C.rose], [700, 400, C.plum]].map(([x, y, f], i) => (
          <g key={i}>
            <ellipse cx={x as number} cy={y as number} rx={26} ry={32} fill={f as string} />
            <path d={`M${x} ${(y as number) + 32} q-6 30 4 60`} stroke={C.ink} strokeWidth={2} fill="none" opacity={0.5} />
          </g>
        ))}
        {ground("#F6CCD4", 500)}
        <Couple A={A} B={B} poses={poses} gap={250} />
        <g transform="translate(365 410)">
          <rect x={0} y={30} width={120} height={60} rx={8} fill={C.cream} />
          <rect x={0} y={30} width={120} height={16} rx={8} fill={C.rose} />
          <rect x={20} y={0} width={80} height={36} rx={6} fill={C.cream} />
          <rect x={20} y={0} width={80} height={10} rx={5} fill={C.rose} />
          {[40, 60, 80].map((x) => (
            <g key={x}>
              <rect x={x - 3} y={-24} width={6} height={24} fill={C.sea} />
              <ellipse cx={x} cy={-30} rx={5} ry={8} fill={C.gold} />
            </g>
          ))}
        </g>
      </g>
    ),
  },

  arch: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill="#F4F0EA" />
        <path d="M240 500 L240 330 Q240 190 425 190 Q610 190 610 330 L610 500" stroke="#E6DCCB" strokeWidth={26} fill="none" />
        {Array.from({ length: 18 }, (_, i) => {
          const a = Math.PI + (i / 17) * Math.PI;
          return <circle key={i} cx={425 + Math.cos(a) * 185} cy={330 + Math.sin(a) * 140} r={14} fill={[C.rose, C.white, C.blush][i % 3]} />;
        })}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <circle cx={240} cy={350 + i * 32} r={12} fill={[C.rose, C.blush][i % 2]} />
            <circle cx={610} cy={350 + i * 32} r={12} fill={[C.blush, C.rose][i % 2]} />
          </g>
        ))}
        {ground("#E8E0D2", 500)}
        <Couple A={A} B={B} poses={poses} />
      </g>
    ),
  },

  plane: {
    render: ({ A, B, poses }) => (
      <g>
        <rect width={W} height={H} fill={C.sky} />
        <Cloud x={160} y={250} s={1} />
        <Cloud x={700} y={300} s={0.7} />
        <g transform="translate(600 210) rotate(-10)">
          <path d="M0 20 L140 14 Q170 16 170 26 Q170 36 140 38 L0 32 Z" fill={C.white} />
          <path d="M60 22 L30 -20 L50 -20 L100 22 Z" fill={C.rose} />
          <path d="M60 32 L30 74 L50 74 L100 32 Z" fill={C.rose} />
          <path d="M0 20 L-10 -6 L10 -6 L22 20 Z" fill={C.rose} />
        </g>
        {ground(C.grass, 490)}
        <g transform="translate(150 410)">
          <rect width={70} height={86} rx={10} fill={C.plum} />
          <rect x={22} y={-14} width={26} height={16} rx={6} fill="none" stroke={C.ink} strokeWidth={5} />
          <rect x={0} y={30} width={70} height={8} fill={C.gold} />
        </g>
        <Couple A={A} B={B} poses={poses} cx={460} />
      </g>
    ),
  },
};

export function Scene({ id, A, B, poses }: { id: SceneId; A: Traits; B: Traits; poses: [Pose, Pose] }) {
  const def = SCENES[id] ?? SCENES.hearts;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {def.render({ A, B, poses })}
    </svg>
  );
}

export function isDarkScene(id: SceneId) {
  return Boolean(SCENES[id]?.dark);
}
