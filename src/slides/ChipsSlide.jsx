"use client";

// Every manager receives 2 of each chip — one per half of the season.
// H1 = GW1–19, H2 = GW20+
const CHIP_TYPES = [
  { id: "wildcard", label: "Wildcard",        short: "WC" },
  { id: "bboost",   label: "Bench Boost",     short: "BB" },
  { id: "freehit",  label: "Free Hit",        short: "FH" },
  { id: "3xc",      label: "Triple Captain",  short: "TC" },
];

function verdictToVariant(verdict) {
  if (verdict === "great") return { color: "var(--green)", label: "GREAT" };
  if (verdict === "poor")  return { color: "var(--red)",   label: "POOR"  };
  return                          { color: "var(--faded-ink)", label: "OK" };
}

/**
 * For a chip type, return [h1Use, h2Use] — either the played chip data or null.
 * Uses GW number to assign half: ≤19 → H1, ≥20 → H2.
 */
function getChipSlots(usedChips, chipId) {
  const uses = usedChips
    .filter((c) => c.chip === chipId)
    .sort((a, b) => a.gw - b.gw);

  const h1 = uses.find((c) => c.gw <= 19) ?? null;
  const h2 = uses.find((c) => c.gw >= 20) ?? null;
  return [h1, h2];
}

/**
 * Compact chip card — used or unused.
 */
function ChipCard({ shortLabel, chipLabel, halfLabel, usedChip }) {
  const used = !!usedChip;

  return (
    <div
      className={`flex flex-col gap-2 border-2 p-2.5 ${
        used
          ? "border-[var(--black)] bg-[var(--cream)]"
          : "border-[var(--faded-ink)] bg-[var(--cream)] opacity-40"
      }`}
    >
      {/* ── Header: chip name + half badge ── */}
      <div className="flex items-start justify-between gap-1">
        <p
          className="font-[family-name:var(--font-display)] leading-none tracking-wide text-base"
          style={{ color: used ? "var(--black)" : "var(--faded-ink)" }}
        >
          {shortLabel}
        </p>
        <span
          className="font-[family-name:var(--font-mono)] text-[0.45rem] uppercase tracking-widest border px-1 py-0.5 leading-none shrink-0"
          style={{
            borderColor: used ? "var(--black)" : "var(--faded-ink)",
            color:       used ? "var(--black)" : "var(--faded-ink)",
          }}
        >
          {halfLabel}
        </span>
      </div>

      {used ? (
        <>
          {/* ── GW + points ── */}
          <div className="flex items-end justify-between gap-1">
            {/* Mini GW indicator */}
            <div className="flex flex-col items-center justify-center w-9 h-9 border-2 border-[var(--black)] bg-[var(--black)] text-[var(--cream)] shrink-0">
              <span className="font-[family-name:var(--font-mono)] text-[0.35rem] uppercase leading-none opacity-60">
                GW
              </span>
              <span className="font-[family-name:var(--font-display)] text-base leading-none">
                {usedChip.gw}
              </span>
            </div>

            <div className="text-right leading-none">
              <p className="font-[family-name:var(--font-display)] text-[var(--black)] text-2xl leading-none">
                {usedChip.pointsScored}
              </p>
              <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.45rem] uppercase tracking-widest">
                pts · avg {usedChip.averageThatGW}
              </p>
            </div>
          </div>

          {/* ── Verdict ── */}
          {(() => {
            const { color, label } = verdictToVariant(usedChip.verdict);
            return (
              <p
                className="font-[family-name:var(--font-stamp)] text-[0.6rem] uppercase tracking-wider border px-1.5 py-0.5 self-start leading-none"
                style={{ color, borderColor: color }}
              >
                {label}
              </p>
            );
          })()}
        </>
      ) : (
        <p className="font-[family-name:var(--font-stamp)] text-[var(--faded-ink)] text-[0.6rem] uppercase tracking-wider border border-[var(--faded-ink)] px-1.5 py-0.5 self-start leading-none">
          UNUSED
        </p>
      )}
    </div>
  );
}

/**
 * ChipsSlide — all 8 chip slots across the season (4 types × 2 halves).
 * Props: { chips }
 */
export default function ChipsSlide({ chips }) {
  const usedChips = chips ?? [];
  const usedCount = usedChips.length;

  return (
    <div className="relative flex flex-col bg-[var(--cream)] min-h-[70vh] p-6 overflow-hidden select-none gap-4">

      {/* Paper grain */}
      <div className="absolute inset-0 halftone pointer-events-none" />

      {/* ── HEADER ── */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-[0.3em]">
            Special Weapons
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[var(--black)] text-5xl leading-none tracking-wide">
            CHIPS PLAYED
          </h2>
        </div>
        <div className="border-2 border-[var(--black)] px-2 py-1 text-center shrink-0">
          <p className="font-[family-name:var(--font-display)] text-[var(--black)] text-3xl leading-none">
            {usedCount}<span className="text-lg opacity-40">/8</span>
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.45rem] uppercase tracking-widest">
            used
          </p>
        </div>
      </div>

      <hr className="relative z-10 dashed-separator" />

      {/* ── 4 ROWS × 2 COLUMNS (H1 / H2 per chip type) ── */}
      <div className="relative z-10 flex flex-col gap-2 flex-1">
        {CHIP_TYPES.map((chipType) => {
          const [h1, h2] = getChipSlots(usedChips, chipType.id);
          return (
            <div key={chipType.id} className="flex flex-col gap-1">
              {/* Row label */}
              <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.5rem] uppercase tracking-widest">
                {chipType.label}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <ChipCard
                  shortLabel={chipType.short}
                  chipLabel={chipType.label}
                  halfLabel="H1"
                  usedChip={h1}
                />
                <ChipCard
                  shortLabel={chipType.short}
                  chipLabel={chipType.label}
                  halfLabel="H2"
                  usedChip={h2}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
