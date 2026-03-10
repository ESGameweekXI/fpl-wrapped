const accentStyles = {
  red:   { border: "border-[var(--red)]",   text: "text-[var(--red)]" },
  green: { border: "border-[var(--green)]", text: "text-[var(--green)]" },
  gold:  { border: "border-[var(--gold)]",  text: "text-[var(--gold)]" },
  blue:  { border: "border-[var(--blue)]",  text: "text-[var(--blue)]" },
};

/**
 * Displays a label alongside a large prominent stat value.
 *
 * @param {{ label: string, value: string|number, accent?: 'red'|'green'|'gold'|'blue' }} props
 */
export default function StatCard({ label, value, accent = "black" }) {
  const styles = accentStyles[accent] ?? { border: "border-[var(--black)]", text: "text-[var(--black)]" };

  return (
    <div
      className={`
        inline-block border-2 ${styles.border}
        bg-[var(--cream)] px-4 py-3
        rotated-card
      `}
    >
      <p
        className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)]
                   text-xs uppercase tracking-widest mb-1"
      >
        {label}
      </p>
      <p
        className={`font-[family-name:var(--font-display)] ${styles.text}
                    text-5xl leading-none tracking-wide`}
      >
        {value}
      </p>
    </div>
  );
}
