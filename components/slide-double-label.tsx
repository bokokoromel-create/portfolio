/** Double ligne + slide vertical au survol / focus (même principe que le CTA « Discutons »). */
export function SlideDoubleLabel({
  label,
  lineClassName = "items-center",
}: {
  label: string;
  lineClassName?: string;
}) {
  return (
    <span className="block h-[1.4em] overflow-hidden">
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] will-change-transform motion-reduce:transition-none group-hover:-translate-y-1/2 group-focus-visible:-translate-y-1/2 motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-y-0">
        <span
          className={`flex h-[1.4em] whitespace-nowrap leading-none ${lineClassName}`}
        >
          {label}
        </span>
        <span
          className={`flex h-[1.4em] whitespace-nowrap leading-none ${lineClassName}`}
          aria-hidden="true"
        >
          {label}
        </span>
      </span>
    </span>
  );
}
