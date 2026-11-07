import type { ReactNode } from "react";

/** "01 · PLATFORM OVERVIEW" label, title (an <em> renders in gold) and lead. */
export default function SectionHead({
  index,
  label,
  title,
  lead,
  center = false,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
}) {
  return (
    <header className={`en-head en-reveal${center ? " is-center" : ""}`}>
      <p className="en-eyebrow">
        {index && <span>{index}</span>}
        {label}
      </p>
      <h2 className="en-h2">{title}</h2>
      {lead && <p className="en-lead">{lead}</p>}
    </header>
  );
}
