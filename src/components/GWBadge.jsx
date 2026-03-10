/**
 * A gameweek badge styled as a matchday programme chip.
 *
 * @param {{ gw: number }} props
 */
export default function GWBadge({ gw }) {
  return (
    <div
      className="
        inline-flex flex-col items-center justify-center
        w-14 h-14 border-2 border-[var(--black)]
        bg-[var(--black)] text-[var(--cream)]
        rounded-sm
      "
    >
      <span
        className="font-[family-name:var(--font-mono)] text-[0.5rem]
                   uppercase tracking-widest leading-none opacity-70"
      >
        GW
      </span>
      <span
        className="font-[family-name:var(--font-display)] text-2xl
                   leading-none tracking-wide"
      >
        {gw}
      </span>
    </div>
  );
}
