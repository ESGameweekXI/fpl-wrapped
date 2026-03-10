const variantStyles = {
  good:    "text-[var(--green)] border-[var(--green)]",
  bad:     "text-[var(--red)]   border-[var(--red)]",
  neutral: "text-[var(--faded-ink)] border-[var(--faded-ink)]",
};

/**
 * A diagonal rubber-stamp style overlay label.
 *
 * @param {{ text: string, variant?: 'good'|'bad'|'neutral' }} props
 */
export default function StampLabel({ text, variant = "neutral" }) {
  const styles = variantStyles[variant] ?? variantStyles.neutral;

  return (
    <span className={`rubber-stamp ${styles}`}>
      {text}
    </span>
  );
}
