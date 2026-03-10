/**
 * Slide progress indicator styled as football studs.
 *
 * @param {{ total: number, current: number }} props
 */
export default function ProgressDots({ total, current }) {
  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="Slide progress">
      {Array.from({ length: total }, (_, i) => {
        const isActive = i === current;
        return (
          <div
            key={i}
            role="tab"
            aria-selected={isActive}
            aria-label={`Slide ${i + 1} of ${total}`}
            className={`
              rounded-full border-2 border-[var(--black)] transition-all duration-300
              ${isActive
                ? "w-4 h-4 bg-[var(--black)]"
                : "w-2.5 h-2.5 bg-transparent opacity-40"
              }
            `}
          />
        );
      })}
    </div>
  );
}
