"use client";

/**
 * ManagerTypeSlide — manager archetype scouting report.
 * Props: { manager, managerType }
 */
export default function ManagerTypeSlide({ manager, managerType }) {
  if (!managerType) return null;

  const { label, description, traits } = managerType;

  return (
    <div className="relative flex flex-col bg-[var(--cream)] min-h-[70vh] p-6 overflow-hidden select-none gap-4">

      {/* Paper grain */}
      <div className="absolute inset-0 halftone pointer-events-none" />

      {/* Watermark diagonal archetype name */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <span
          className="font-[family-name:var(--font-display)] text-[var(--faded-ink)] opacity-[0.04] leading-none text-center"
          style={{ fontSize: "clamp(3rem, 20vw, 5rem)", transform: "rotate(-20deg)" }}
          aria-hidden="true"
        >
          {label}
        </span>
      </div>

      {/* ── HEADER ── */}
      <div className="relative z-10">
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-[0.3em]">
          Scouting Report
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-[var(--black)] text-5xl leading-none tracking-wide">
          MANAGER PROFILE
        </h2>
      </div>

      <hr className="relative z-10 dashed-separator" />

      {/* ── CLUB BADGE PLACEHOLDER + NAME ── */}
      <div className="relative z-10 flex items-center gap-4">
        {/* Badge */}
        <div className="w-14 h-14 border-2 border-[var(--black)] flex items-center justify-center shrink-0 bg-[var(--black)]">
          <span className="font-[family-name:var(--font-display)] text-[var(--cream)] text-2xl leading-none">
            {manager?.name?.charAt(0) ?? "?"}
          </span>
        </div>
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-widest">
            Manager
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[var(--black)] text-sm font-bold leading-tight">
            {manager?.name}
          </p>
        </div>
      </div>

      <hr className="relative z-10 dashed-separator" />

      {/* ── ARCHETYPE HERO ── */}
      <div className="relative z-10 flex flex-col gap-2">
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-widest">
          Archetype
        </p>
        <h3
          className="font-[family-name:var(--font-display)] text-[var(--black)] leading-none tracking-wide"
          style={{ fontSize: "clamp(1.8rem, 9vw, 2.8rem)" }}
        >
          {label}
        </h3>
      </div>

      {/* ── DESCRIPTION ── */}
      <div className="relative z-10">
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.7rem] leading-relaxed italic">
          &ldquo;{description}&rdquo;
        </p>
      </div>

      <hr className="relative z-10 dashed-separator" />

      {/* ── TRAITS ── */}
      <div className="relative z-10 flex flex-col gap-2">
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-widest">
          Key Traits
        </p>
        <div className="flex flex-wrap gap-2">
          {traits.map((trait) => (
            <span
              key={trait}
              className="
                font-[family-name:var(--font-stamp)] text-[var(--black)]
                text-xs uppercase tracking-wider
                border-2 border-[var(--black)] px-2 py-1
              "
            >
              {trait}
            </span>
          ))}
        </div>
      </div>

      {/* ── FOOTER: Season stamp ── */}
      <div className="relative z-10 mt-auto flex items-center justify-between">
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.5rem] uppercase tracking-widest">
          2025/26 Season · FPL Wrapped
        </p>
        <div className="border border-dashed border-[var(--faded-ink)] px-2 py-0.5">
          <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.45rem] uppercase tracking-widest">
            Official Report
          </p>
        </div>
      </div>
    </div>
  );
}
