import type { ReactNode } from "react";

/** A collapsible section built on native <details>, so it needs no JavaScript,
 *  stays keyboard-accessible, and keeps its content in the DOM for crawlers even
 *  while collapsed. Used to keep the legal pages short. */
export default function Disclosure({
  index,
  title,
  defaultOpen = false,
  delay = 0,
  children,
}: {
  index: number;
  title: string;
  defaultOpen?: boolean;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <details
      className="en-disc en-rise"
      open={defaultOpen}
      style={{ ["--d" as string]: `${delay}ms` }}
    >
      <summary data-t="title">
        <span data-t="accent" className="en-mono en-disc-num">
          {String(index).padStart(2, "0")}
        </span>
        {title}
      </summary>
      <div className="en-disc-body">{children}</div>
    </details>
  );
}
