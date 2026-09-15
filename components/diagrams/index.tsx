import type { ReactNode } from "react";

/* ---------------------------------------------------------------------------
   Diagram primitives

   Every diagram is hand-authored inline SVG using the site's own design tokens,
   so it inherits the palette rather than carrying its own. No runtime library.
   --------------------------------------------------------------------------- */

const SANS = "var(--font-sans)";
const MONO = "var(--font-mono)";

function Defs() {
  return (
    <defs>
      <marker
        id="arrow"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-ink-faint)" />
      </marker>
      <marker
        id="arrow-accent"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-accent)" />
      </marker>
    </defs>
  );
}

function Node({
  x,
  y,
  w,
  h = 58,
  label,
  sub,
  tone = "default",
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  label: string;
  sub?: string;
  tone?: "default" | "accent" | "muted";
}) {
  const fill =
    tone === "accent"
      ? "var(--color-accent-wash)"
      : tone === "muted"
        ? "var(--color-paper-sunken)"
        : "var(--color-paper-raised)";
  const stroke =
    tone === "accent" ? "var(--color-accent)" : "var(--color-rule-strong)";

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={fill}
        stroke={stroke}
        strokeWidth="1"
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 3 : y + h / 2 + 4}
        textAnchor="middle"
        fontFamily={SANS}
        fontSize="13"
        fill="var(--color-ink)"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 15}
          textAnchor="middle"
          fontFamily={MONO}
          fontSize="9.5"
          letterSpacing="0.08em"
          fill="var(--color-ink-faint)"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({
  from,
  to,
  accent = false,
  dashed = false,
}: {
  from: [number, number];
  to: [number, number];
  accent?: boolean;
  dashed?: boolean;
}) {
  return (
    <line
      x1={from[0]}
      y1={from[1]}
      x2={to[0]}
      y2={to[1]}
      stroke={accent ? "var(--color-accent)" : "var(--color-ink-faint)"}
      strokeWidth="1"
      strokeDasharray={dashed ? "4 4" : undefined}
      markerEnd={accent ? "url(#arrow-accent)" : "url(#arrow)"}
    />
  );
}

/** Elbow connector: horizontal, then vertical, then horizontal. */
function Elbow({
  points,
  accent = false,
  dashed = false,
}: {
  points: [number, number][];
  accent?: boolean;
  dashed?: boolean;
}) {
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`)
    .join(" ");
  return (
    <path
      d={d}
      fill="none"
      stroke={accent ? "var(--color-accent)" : "var(--color-ink-faint)"}
      strokeWidth="1"
      strokeDasharray={dashed ? "4 4" : undefined}
      markerEnd={accent ? "url(#arrow-accent)" : "url(#arrow)"}
    />
  );
}

function Label({
  x,
  y,
  children,
  anchor = "middle",
  tone = "faint",
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  tone?: "faint" | "muted" | "accent";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={MONO}
      fontSize="9.5"
      letterSpacing="0.08em"
      fill={
        tone === "accent"
          ? "var(--color-accent)"
          : tone === "muted"
            ? "var(--color-ink-muted)"
            : "var(--color-ink-faint)"
      }
    >
      {children}
    </text>
  );
}

/** Wrapper: scrolls horizontally on narrow screens instead of squashing. */
function Figure({
  title,
  caption,
  viewBox,
  minWidth,
  children,
}: {
  title: string;
  caption: string;
  viewBox: string;
  minWidth: number;
  children: ReactNode;
}) {
  return (
    <figure className="my-10 border-y border-rule py-8">
      {/*
        The min-width keeps labels legible rather than letting the diagram
        shrink to unreadable. overflow-x: auto then shows a scrollbar only when
        the column is actually narrower than that — never when it fits.
      */}
      {/*
        tabIndex makes the scroll container reachable by keyboard. Without it a
        keyboard-only user cannot pan a diagram that overflows its column
        (axe: scrollable-region-focusable).
      */}
      <div
        tabIndex={0}
        role="group"
        aria-label={title}
        className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0"
      >
        <svg
          viewBox={viewBox}
          role="img"
          style={{ minWidth }}
          className="h-auto w-full"
        >
          <title>{title}</title>
          <Defs />
          {children}
        </svg>
      </div>
      <figcaption className="mt-6 text-sm text-ink-faint">{caption}</figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------------------
   PowerMySport — payment webhook reconciliation
   --------------------------------------------------------------------------- */

function PaymentOutbox() {
  return (
    <Figure
      title="PhonePe webhook reconciliation through a transactional outbox"
      caption="The provider is acknowledged immediately; the order transition happens durably in a worker. Signature verification, a unique event id and atomic claiming are what make it exactly-once."
      viewBox="0 0 880 330"
      minWidth={720}
    >
      {/* Row 1 — receive path */}
      <Node x={10} y={40} w={120} label="PhonePe" sub="PROVIDER" tone="muted" />
      <Node
        x={186}
        y={40}
        w={168}
        label="Webhook route"
        sub="VERIFY SIGNATURE"
        tone="accent"
      />
      <Node
        x={410}
        y={40}
        w={182}
        label="Webhook event"
        sub="UNIQUE EVENT ID"
      />
      <Node x={648} y={40} w={168} label="Outbox message" sub="PENDING" />

      <Arrow from={[130, 69]} to={[182, 69]} />
      <Arrow from={[354, 69]} to={[406, 69]} accent />
      <Arrow from={[592, 69]} to={[644, 69]} />

      {/* Immediate ack back to provider */}
      <Elbow points={[[270, 98], [270, 126], [70, 126], [70, 102]]} dashed />
      <Label x={172} y={140}>
        200 OK — IMMEDIATELY
      </Label>

      {/* Annotations */}
      <Label x={270} y={22} tone="accent">
        HMAC-SHA256 OVER RAW BODY
      </Label>
      <Label x={501} y={22}>
        RETRY = DUPLICATE, NOT REAPPLIED
      </Label>

      {/* Row 2 — worker path */}
      <Node
        x={648}
        y={216}
        w={168}
        label="Outbox worker"
        sub="ATOMIC CLAIM"
        tone="accent"
      />
      <Node x={410} y={216} w={182} label="Order state" sub="RECONCILED" />

      <Elbow points={[[732, 98], [732, 212]]} accent />
      <Arrow from={[644, 245]} to={[596, 245]} accent />

      {/* Retry loop */}
      <path
        d="M 648 260 L 612 260 L 612 292 L 852 292 L 852 245 L 820 245"
        fill="none"
        stroke="var(--color-ink-faint)"
        strokeWidth="1"
        strokeDasharray="4 4"
        markerEnd="url(#arrow)"
      />
      <Label x={732} y={308}>
        BACKOFF + JITTER · MAX 6 ATTEMPTS
      </Label>

      <Label x={501} y={196}>
        BOOKING CONFIRMED / FAILED
      </Label>
    </Figure>
  );
}

/* ---------------------------------------------------------------------------
   PowerMySport — monorepo topology
   --------------------------------------------------------------------------- */

function Monorepo() {
  return (
    <Figure
      title="Turborepo monorepo topology across three applications and one API"
      caption="Three deployable frontends, one shared types package, one domain-organised API. The storefront is a route group inside the client app, not a fourth deployment."
      viewBox="0 0 880 470"
      minWidth={700}
    >
      <Label x={10} y={20} anchor="start" tone="muted">
        VERCEL
      </Label>

      {/* Apps */}
      <Node x={10} y={34} w={250} h={72} label="client" sub="INCLUDES (SHOP)" tone="accent" />
      <Node x={296} y={34} w={250} h={72} label="admin" sub="OPERATIONS" />
      <Node x={582} y={34} w={250} h={72} label="community" sub="FEED + MESSAGING" />

      {/* Shared types */}
      <Node
        x={296}
        y={158}
        w={250}
        label="@powermysport/shared-types"
        sub="COMPILED TO DIST/"
        tone="muted"
      />

      <Elbow points={[[135, 106], [135, 132], [421, 132], [421, 154]]} dashed />
      <Elbow points={[[421, 106], [421, 154]]} dashed />
      <Elbow points={[[707, 106], [707, 132], [421, 132], [421, 154]]} dashed />

      {/* API */}
      <Label x={10} y={248} anchor="start" tone="muted">
        AWS ELASTIC BEANSTALK — DOCKER VIA ECR
      </Label>
      <rect
        x={10}
        y={262}
        width={822}
        height={62}
        fill="var(--color-paper-raised)"
        stroke="var(--color-ink)"
        strokeWidth="1"
      />
      <text
        x={30}
        y={288}
        fontFamily={SANS}
        fontSize="13"
        fill="var(--color-ink)"
      >
        TypeScript API
      </text>
      <text
        x={30}
        y={306}
        fontFamily={MONO}
        fontSize="9.5"
        letterSpacing="0.08em"
        fill="var(--color-ink-faint)"
      >
        CLIENT · ADMIN · COMMUNITY · SHOP · SHARED
      </text>

      <Elbow points={[[421, 216], [421, 258]]} accent />

      {/* Datastores — their own row, so nothing overlaps the API bar */}
      <Node x={296} y={372} w={120} h={56} label="MongoDB" tone="muted" />
      <Node x={440} y={372} w={120} h={56} label="Redis" sub="PUB/SUB" tone="muted" />

      <Elbow points={[[356, 324], [356, 368]]} />
      <Elbow points={[[500, 324], [500, 368]]} />

      <Label x={421} y={452} tone="faint">
        SOCKET.IO FANS OUT ACROSS INSTANCES VIA THE REDIS ADAPTER
      </Label>
    </Figure>
  );
}

/* ---------------------------------------------------------------------------
   Ping Pilott — split queues
   --------------------------------------------------------------------------- */

function QueueSplit() {
  return (
    <Figure
      title="Split monitor and alert queues with status-transition alerting"
      caption="Two queues and two workers. Health checks keep running and recording state even when alert delivery is slow or failing — the failure modes stay separate."
      viewBox="0 0 880 350"
      minWidth={720}
    >
      {/* Check path */}
      <Node x={10} y={40} w={140} label="Scheduler" sub="CRON" tone="muted" />
      <Node x={200} y={40} w={150} label="Monitor queue" sub="BULLMQ / REDIS" />
      <Node
        x={400}
        y={40}
        w={150}
        label="Monitor worker"
        sub="HTTP CHECK"
        tone="accent"
      />
      <Node x={600} y={40} w={150} label="Check record" sub="MONGODB" />

      <Arrow from={[150, 69]} to={[196, 69]} />
      <Arrow from={[350, 69]} to={[396, 69]} />
      <Arrow from={[550, 69]} to={[596, 69]} />

      {/* Decision */}
      <Node
        x={400}
        y={150}
        w={150}
        label="Status changed?"
        sub="UP ↔ DOWN"
        tone="accent"
      />
      <Elbow points={[[475, 98], [475, 146]]} accent />

      {/* No branch — recorded, but nothing is sent */}
      <Label x={475} y={228} tone="muted">
        NO — RECORDED, NO ALERT
      </Label>

      {/* Alert path */}
      <Node x={600} y={150} w={150} label="Alert queue" sub="BULLMQ / REDIS" />
      <Node x={600} y={246} w={150} label="Alert worker" sub="EMAIL + WEBHOOK" />

      <Arrow from={[550, 179]} to={[596, 179]} accent />
      <Elbow points={[[675, 208], [675, 242]]} accent />
      <Label x={575} y={170} tone="accent">
        YES
      </Label>
      <Label x={675} y={330}>
        QUIET HOURS RESPECTED
      </Label>

      {/* Live dashboard */}
      <Node x={200} y={246} w={150} label="Dashboard" sub="SOCKET.IO" tone="muted" />
      <Elbow points={[[475, 98], [475, 122], [275, 122], [275, 242]]} />
      <Label x={275} y={330}>
        LIVE STATUS
      </Label>
    </Figure>
  );
}

/* ---------------------------------------------------------------------------
   Social It Up — edge gating of the internal surface
   --------------------------------------------------------------------------- */

function EdgeGating() {
  return (
    <Figure
      title="Middleware gating of internal routes by environment"
      caption="Public pages render normally. Internal routes return a 404 in production rather than a login screen, so the tooling is not discoverable at all — while staying reachable in the environments where the team uses it."
      viewBox="0 0 880 350"
      minWidth={700}
    >
      <Node x={10} y={150} w={130} label="Request" sub="ANY PATH" tone="muted" />
      <Node
        x={190}
        y={150}
        w={180}
        label="middleware.js"
        sub="RUNS AT THE EDGE"
        tone="accent"
      />

      <Arrow from={[140, 179]} to={[186, 179]} />

      {/* Public */}
      <Node x={466} y={40} w={204} label="Public route" sub="WORK · SERVICES" />
      <Node x={716} y={40} w={140} label="Rendered" tone="muted" />
      <Elbow points={[[370, 179], [418, 179], [418, 69], [462, 69]]} />
      <Arrow from={[670, 69]} to={[712, 69]} />

      {/* Protected in production */}
      <Node
        x={466}
        y={150}
        w={204}
        label="Internal route"
        sub="IN PRODUCTION"
        tone="accent"
      />
      <Node x={716} y={150} w={140} label="404" tone="accent" />
      <Arrow from={[370, 179]} to={[462, 179]} accent />
      <Arrow from={[670, 179]} to={[712, 179]} accent />
      <Label x={786} y={232} tone="accent">
        NOT DISCOVERABLE
      </Label>

      {/* Protected elsewhere */}
      <Node
        x={466}
        y={262}
        w={204}
        label="Internal route"
        sub="DEV / PREVIEW"
      />
      <Node x={716} y={262} w={140} label="Panel" tone="muted" />
      <Elbow points={[[370, 179], [418, 179], [418, 291], [462, 291]]} />
      <Arrow from={[670, 291]} to={[712, 291]} />

      <Label x={568} y={340}>
        ADMIN · REVIEW · BUG · RATINGS · CHAT
      </Label>
    </Figure>
  );
}

/* ---------------------------------------------------------------------------
   Registry
   --------------------------------------------------------------------------- */

export const diagrams = {
  "payment-outbox": PaymentOutbox,
  monorepo: Monorepo,
  "queue-split": QueueSplit,
  "edge-gating": EdgeGating,
} as const;

export type DiagramKey = keyof typeof diagrams;

export function Diagram({ name }: { name: DiagramKey }) {
  const Component = diagrams[name];
  return <Component />;
}
