export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display text-[1.9rem] font-bold leading-none tracking-tight ${light ? "text-white" : "text-wine"} ${className}`}>
      <svg viewBox="-1.15 -1.05 2.3 1.55" className="h-[0.95em] w-[1.15em]" aria-hidden="true">
        <path d="M0 0.4 C-0.18 0.22 -1.05 -0.22 -0.6 -0.72 C-0.28 -1 0 -0.7 0 -0.48 C0 -0.7 0.28 -1 0.6 -0.72 C1.05 -0.22 0.18 0.22 0 0.4 Z" fill="#E11D58" />
        <path d="M-0.42 -0.52 C-0.6 -0.4 -0.58 -0.2 -0.42 -0.05" stroke="#fff" strokeWidth="0.1" fill="none" strokeLinecap="round" opacity="0.8" />
        <circle cx="0.62" cy="-0.88" r="0.12" fill="#FFC93C" />
      </svg>
      lovalova
    </span>
  );
}
