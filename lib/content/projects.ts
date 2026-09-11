import type { DiagramKey } from "@/components/diagrams";

export type ProjectLink = { label: string; href: string };

export type CaseSection = {
  heading: string;
  body: string[];
  /** Optional architecture diagram rendered after the prose */
  diagram?: DiagramKey;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  role: string;
  /** Shown on the work index — one tight paragraph */
  summary: string;
  stack: string[];
  links: ProjectLink[];
  /** Key/value facts rendered as a spec table on the case study */
  facts: { label: string; value: string }[];
  sections: CaseSection[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "powermysport",
    name: "PowerMySport",
    tagline:
      "A three-application sports platform on one shared Node.js backend",
    year: "2026",
    role: "Lead Full-Stack Engineer",
    summary:
      "A sports booking, commerce and community product built as a Turborepo monorepo — three Next.js applications sharing one TypeScript API. I lead the engineering: payment reconciliation, real-time delivery, a layered permission system, an AI assistant with tool access, and the containerised deploy pipeline.",
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Redis",
      "Socket.IO",
      "PhonePe",
      "Docker",
      "AWS",
    ],
    links: [{ label: "Live site", href: "https://powermysport.com" }],
    facts: [
      { label: "Role", value: "Lead Full-Stack Engineer" },
      { label: "Team", value: "2 engineers, reporting to founder" },
      { label: "Timeline", value: "Jan 2026 — present" },
      { label: "Status", value: "In production" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Three audiences needed genuinely different products: players booking venues and coaching, a community space with its own feed and messaging, and an operations team administering all of it. Building them as independent stacks would have meant three copies of authentication, three notification pipelines and three deployment setups to keep in step.",
          "The constraint was a two-person team. Whatever the architecture was, very few people had to be able to maintain it.",
        ],
      },
      {
        heading: "Monorepo architecture",
        body: [
          "The system is a Turborepo workspace holding three Next.js applications — client, admin and community — plus a shared types package that the applications and the API all compile against. The storefront lives inside the client application as its own route group rather than as a fourth deployment, since it shares the same session and checkout path.",
          "A single TypeScript Express API backs all three, organised by domain rather than by technical layer: client, admin, community and shop each own their controllers, models, services and socket handlers, over a shared layer for the concerns that genuinely cross domains. It means a booking rule changes in one place and every surface sees it.",
          "One detail worth recording: Turborepo's build cache initially declared no outputs for the shared packages, so a cache hit would skip their compile and restore no `dist` — producing a green local build and a red CI build from the same commit. The fix was declaring `dist/**` as a build output.",
        ],
        diagram: "monorepo",
      },
      {
        heading: "Making payments survive failure",
        body: [
          "Payments run through PhonePe, and the hard requirement is that money and order state never diverge — including when the user closes the tab mid-payment or the provider retries a callback.",
          "Every webhook is verified before it is trusted: the raw request body is captured before JSON parsing, and an HMAC-SHA256 signature is recomputed over those exact bytes and compared against the provider's header. Parsing first and re-serialising would change the bytes and break the comparison, so the raw body has to be preserved deliberately.",
          "Verified events are then persisted, not processed inline. Each one is written to a webhook event record keyed by a unique event id — so a provider retry is recognised as a duplicate rather than applied twice — and a message is enqueued to a transactional outbox. A background worker claims outbox messages atomically with a findOneAndUpdate, so two instances never process the same message, and failures retry on exponential backoff with jitter up to six attempts before being marked failed.",
          "The result is that reconciliation is decoupled from the provider's HTTP timeout. PhonePe gets an immediate acknowledgement; the actual order transition happens durably, in order, and exactly once.",
        ],
        diagram: "payment-outbox",
      },
      {
        heading: "Real-time across instances",
        body: [
          "Socket.IO carries live notifications, community activity and messaging. Because the API runs as more than one container, an in-memory event map would mean a user connected to instance A never receives an event emitted on instance B.",
          "The server attaches the Redis adapter with a dedicated pub/sub client pair, so emissions fan out across every instance. It is a small amount of configuration that is the difference between real-time working in development and real-time working in production.",
        ],
      },
      {
        heading: "Permissions as a layered system",
        body: [
          "The platform outgrew simple role checks quickly. Alongside player, parent, coach, venue-lister and expert accounts, the admin side carries its own roles — support, operations, finance, analytics and system — each defined by a permission template rather than by a hardcoded branch.",
          "Coaches and venue-listers are deliberately kept as separate identities rather than as flags on one account, because their permissions genuinely differ and collapsing them would have made every later authorization check ambiguous.",
          "Authorization is enforced server-side on every route, with schema validation on inputs, rate limiting on the endpoints touching money and authentication, and Helmet-set headers. The UI hides what a role cannot do; the API is what decides.",
        ],
      },
      {
        heading: "An assistant with real tools",
        body: [
          "The platform includes an AI assistant that answers questions about experts, pathways and tournaments. Rather than paraphrasing a prompt, it is given actual tools — typed functions that query live platform data — and the model chooses which to call.",
          "Retrieval runs over Gemini embeddings compared by cosine similarity against a cached knowledge base, with a fallback chain across embedding models so a single deprecation doesn't take the feature down. Responses stream, and the endpoint is rate-limited separately from the rest of the API.",
        ],
      },
      {
        heading: "Shipping it",
        body: [
          "The three frontends deploy to Vercel, each choosing its own rendering strategy per route. The API is containerised and deployed as a Docker image to ECR and onto Elastic Beanstalk in ap-south-1, tagged with the git SHA it was built from — and the deploy script refuses to run against a dirty working tree unless explicitly overridden, because an image that doesn't correspond to a commit is impossible to reason about later.",
          "Schema changes ship as numbered migration scripts rather than manual edits, and the applications carry Vitest suites alongside an API test suite.",
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "ping-pilott",
    name: "Ping Pilott",
    tagline:
      "Server uptime monitoring with queued health checks and status-change alerting",
    year: "2025",
    role: "Solo project",
    summary:
      "A monitoring service that runs health checks as background queue jobs, alerts only when a server's status actually changes, and streams results to a live dashboard. Two independent workers, a containerised deploy behind Nginx with automated TLS, and a Jenkins pipeline.",
    stack: [
      "Node.js",
      "Express",
      "Next.js",
      "MongoDB",
      "BullMQ",
      "Redis",
      "Socket.IO",
      "Docker",
      "Nginx",
    ],
    links: [],
    facts: [
      { label: "Role", value: "Solo — design, build, deploy" },
      { label: "Type", value: "Side project" },
      { label: "Focus", value: "Background jobs, alerting, ops" },
      { label: "Source", value: "Private — happy to walk through it" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Uptime monitoring is simple until it isn't. Running checks on a timer inside the web process couples monitoring to request traffic, and a naive per-check alert rule means one outage produces an alert every interval until someone fixes it — which trains you to ignore the alerts entirely.",
        ],
      },
      {
        heading: "Queued checks, separate workers",
        body: [
          "Checks are scheduled as BullMQ jobs on Redis and executed outside the API process entirely. There are two queues and two workers: one that performs health checks, and one that delivers alerts.",
          "Splitting them matters. A slow or failing mail provider stalls only the alert worker; health checks keep running and keep recording state. The two run as independent processes under PM2, so either can be restarted or scaled without touching the other.",
        ],
        diagram: "queue-split",
      },
      {
        heading: "Alerting on change, not on failure",
        body: [
          "An alert fires when a server's status actually transitions — up to down, or back again — rather than on every failed check. A server that has been down for an hour produces one notification, not sixty, so every alert in the inbox means something changed.",
          "Alongside status transitions, checks compare response time against a per-server threshold and can alert on degradation before anything is fully down. Each server also carries a configurable alert time window, so overnight noise can be suppressed without disabling monitoring, and alerts can be delivered to an outbound webhook as well as by email.",
        ],
      },
      {
        heading: "Live dashboard",
        body: [
          "Results publish over Socket.IO to a Next.js dashboard, so status changes appear as they happen rather than on a polling interval. The dashboard charts response-time history from the stored check records, with separate admin and support areas behind role-based access.",
        ],
      },
      {
        heading: "Hardening and deployment",
        body: [
          "The API uses JWT authentication with a role-authorisation middleware, request validation on every route, Helmet headers, query sanitisation against NoSQL injection, rate limiting, and Winston for structured logging. A scheduled retention task prunes old check history so the collection doesn't grow without bound.",
          "Deployment runs as Docker Compose — the API container behind an Nginx reverse proxy, with Certbot alongside it renewing TLS certificates automatically. A Jenkins pipeline handles checkout, install, image build and push. Database and Redis are managed services rather than containers, so data survives any redeploy of the application itself.",
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "social-it-up",
    name: "Social It Up",
    tagline: "An agency site with a full internal operations suite behind it",
    year: "2025",
    role: "Solo project",
    summary:
      "A design agency's public site — work, services and enquiries — backed by a Firestore-powered set of internal tools I built for the team: feedback triage with assignment, client review workflow, a ratings dashboard, and real-time chat between staff and clients.",
    stack: [
      "Next.js",
      "Firebase",
      "Firestore",
      "GSAP",
      "Framer Motion",
      "Nodemailer",
    ],
    links: [
      { label: "Live site", href: "https://social-it-up.vercel.app/" },
      { label: "Source", href: "https://github.com/Jatin-1111/Social-It-Up" },
    ],
    facts: [
      { label: "Role", value: "Solo — design and build" },
      { label: "Type", value: "Agency site + internal tooling" },
      { label: "Focus", value: "Admin workflows, real-time, motion" },
    ],
    sections: [
      {
        heading: "Two products in one codebase",
        body: [
          "The public half is what a design agency needs: a curated work showcase, services, an about page and an enquiry form with reCAPTCHA and automated transactional email. It is deliberately image-led and heavily animated, because that is the pitch.",
          "The larger half is invisible. Behind authentication sits a set of internal tools the team actually runs on, and most of the engineering went there.",
        ],
      },
      {
        heading: "Feedback triage",
        body: [
          "Submitted feedback lands in Firestore and surfaces in an admin panel where each item carries a priority and a status and can be assigned to a specific admin. Non-owner admins see only what is assigned to them, so the queue stays meaningful as the team grows.",
          "Bulk status changes go through Firestore batch writes rather than a loop of individual updates — one atomic round trip instead of one per item, which is the difference between an instant action and a visibly slow one.",
        ],
      },
      {
        heading: "Review, ratings and chat",
        body: [
          "A separate review panel handles client-facing approval flow, with a ratings dashboard aggregating the results into charts for the team.",
          "There is also real-time chat between staff and clients, with a matching admin-side console and a notification system, so an enquiry can become a conversation without leaving the platform.",
        ],
      },
      {
        heading: "Gating the admin surface",
        body: [
          "Every internal route is disabled in production at the edge: middleware checks the environment and rewrites requests to the admin, review, bug, ratings and chat panels to a 404 rather than rendering a login screen.",
          "The reasoning is that a login page is an advertisement — it tells a stranger the tooling exists and invites attempts against it. Returning a 404 means the surface is not discoverable at all in the environments where it isn't in use.",
        ],
        diagram: "edge-gating",
      },
      {
        heading: "Motion as structure",
        body: [
          "The public site animates with GSAP and Framer Motion over smooth scrolling, tied to navigation and state change rather than applied to elements for decoration — motion that tells you where you came from and what just changed.",
        ],
      },
    ],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
