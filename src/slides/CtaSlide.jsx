"use client";

/**
 * CtaSlide — closing card promoting Gameweek XI.
 * No wrappedData needed.
 */
export default function CtaSlide() {
  return (
    <div className="relative flex flex-col justify-between bg-[var(--black)] min-h-[70vh] p-6 overflow-hidden select-none">

      {/* Halftone on dark background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, #F5EDD6 1px, transparent 1px)",
          backgroundSize: "6px 6px",
        }}
      />

      {/* ── HEADER ── */}
      <div className="relative z-10 flex items-start justify-between">
        <p className="font-[family-name:var(--font-mono)] text-[var(--cream)] opacity-50 text-[0.55rem] uppercase tracking-[0.3em]">
          Next Season Starts Now
        </p>
        <div className="border border-dashed border-[var(--cream)] px-2 py-0.5 opacity-40">
          <p className="font-[family-name:var(--font-mono)] text-[var(--cream)] text-[0.45rem] uppercase tracking-widest">
            2025 / 26
          </p>
        </div>
      </div>

      {/* ── HERO HEADLINE ── */}
      <div className="relative z-10 flex flex-col gap-3 my-6">
        <h2
          className="font-[family-name:var(--font-display)] text-[var(--cream)] leading-none tracking-wide"
          style={{ fontSize: "clamp(3rem, 16vw, 4.5rem)" }}
        >
          PLAY GAMEWEEK XI
        </h2>
        <div className="w-16 h-1 bg-[var(--red)]" />
        <p className="font-[family-name:var(--font-mono)] text-[var(--cream)] opacity-70 text-sm leading-relaxed max-w-xs">
          The ultimate companion app for Fantasy Premier League managers.
          Live scores, captain alerts, and squad tools — all in one place.
        </p>
      </div>

      {/* ── DIVIDER ── */}
      <hr className="relative z-10 border-none border-t-2 border-dashed border-[var(--cream)] opacity-20 my-0" />

      {/* ── CTA BUTTONS ── */}
      <div className="relative z-10 flex flex-col gap-3 my-6">
        <a
          href="https://apps.apple.com"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center justify-center gap-3
            border-2 border-[var(--cream)] bg-transparent
            px-4 py-3
            font-[family-name:var(--font-mono)] text-[var(--cream)]
            text-xs uppercase tracking-widest
            hover:bg-[var(--cream)] hover:text-[var(--black)]
            transition-colors duration-150
          "
        >
          <span aria-hidden="true">&#63743;</span>
          App Store
        </a>
        <a
          href="https://play.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center justify-center gap-3
            border-2 border-[var(--cream)] bg-transparent
            px-4 py-3
            font-[family-name:var(--font-mono)] text-[var(--cream)]
            text-xs uppercase tracking-widest
            hover:bg-[var(--cream)] hover:text-[var(--black)]
            transition-colors duration-150
          "
        >
          <span aria-hidden="true">▶</span>
          Google Play
        </a>
      </div>

      {/* ── FOOTER: URL ── */}
      <div className="relative z-10 flex items-center justify-between">
        <p className="font-[family-name:var(--font-display)] text-[var(--cream)] text-xl tracking-widest opacity-80">
          GAMEWEEKXI.COM
        </p>
        <div className="border border-dashed border-[var(--red)] px-2 py-1">
          <p className="font-[family-name:var(--font-stamp)] text-[var(--red)] text-[0.6rem] uppercase tracking-wider">
            FREE
          </p>
        </div>
      </div>
    </div>
  );
}
