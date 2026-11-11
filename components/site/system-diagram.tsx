import { experience } from "@/lib/content/experience";
import { DiagramPacket } from "./diagram-packet";

/**
 * One payment's path through the PowerMySport backend, drawn from the facts in
 * the experience entry: signature-checked webhook, idempotent event store,
 * transactional outbox, a worker that claims and retries, Redis-backed sockets.
 */
const NODES = [
  { title: "PhonePe webhook", sub: "HMAC-verified signature" },
  { title: "Event store", sub: "idempotent by event id" },
  { title: "Outbox", sub: "transactional write" },
  { title: "Worker", sub: "atomic claim, exponential backoff" },
  { title: "Socket.IO", sub: "Redis adapter across instances" },
] as const;

const W = 240;
const H = 56;
const GAP = 32;
const nodeX = (i: number) => 16 + i * 34;
const nodeY = (i: number) => 12 + i * (H + GAP);

const ROUTE = NODES.slice(0, -1).map((_, i) => ({
  x: nodeX(i + 1) + 24,
  y0: nodeY(i) + H,
  y1: nodeY(i + 1),
}));

export function SystemDiagram() {
  const stack = experience[0].stack.slice(0, 7);

  return (
    <figure
      data-b="diagram"
      data-fx="pop"
      className="surface p-5 md:p-6"
    >
      <figcaption className="label mb-4 flex items-center justify-between">
        <span>one payment, end to end</span>
        <span className="flex items-center gap-2 text-accent">
          <span className="status-dot" aria-hidden="true" />
          in production
        </span>
      </figcaption>

      <svg
        viewBox="0 0 420 436"
        role="img"
        aria-label="A payment webhook flows through signature verification, an idempotent event store, a transactional outbox and a retrying worker, then out over Redis-backed sockets."
        className="h-auto w-full"
      >
        <g
          data-b="diagram"
          data-fx="draw"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {NODES.slice(0, -1).map((_, i) => {
            const x = nodeX(i + 1) + 24;
            const y0 = nodeY(i) + H;
            const y1 = nodeY(i + 1);
            return (
              <path
                key={i}
                pathLength={1}
                d={`M${x} ${y0} V${y1} M${x - 4} ${y1 - 6} L${x} ${y1} L${x + 4} ${y1 - 6}`}
              />
            );
          })}
        </g>

        <g data-b="cards" data-fx="items">
          {NODES.map((n, i) => (
            <g key={n.title} data-item>
              <g transform={`translate(${nodeX(i)} ${nodeY(i)})`}>
              <rect
                width={W}
                height={H}
                rx="8"
                fill="var(--color-surface-raised)"
                stroke="var(--color-line-strong)"
              />
              <circle cx="20" cy={H / 2} r="4" fill="var(--color-accent)" />
              <text
                x="36"
                y="24"
                fontSize="14"
                fontWeight="500"
                fill="var(--color-fg)"
                fontFamily="var(--font-sans)"
              >
                {n.title}
              </text>
              <text
                x="36"
                y="42"
                fontSize="10.5"
                fill="var(--color-fg-faint)"
                fontFamily="var(--font-mono)"
              >
                {n.sub}
              </text>
              </g>
            </g>
          ))}
        </g>
        <DiagramPacket route={ROUTE} />
      </svg>

      <ul
        data-b="toolkit"
        data-fx="items"
        className="mt-5 flex flex-wrap gap-2"
      >
        {stack.map((s) => (
          <li key={s} className="chip">
            {s}
          </li>
        ))}
      </ul>
    </figure>
  );
}
