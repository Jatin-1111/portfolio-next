export type ProjectLink = { label: string; href: string };

export type CaseSection = {
  heading: string;
  body: string[];
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
    tagline: "A four-application sports booking platform on one shared backend",
    year: "2026",
    role: "Lead Full-Stack Engineer",
    summary:
      "A sports booking and community product split across four Next.js applications — client, shop, admin and community — served by a single Node.js API. I lead the engineering: system design, payments, real-time notifications, access control and deployment.",
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Socket.IO",
      "PhonePe",
      "Google OAuth",
      "AWS Elastic Beanstalk",
      "Vercel",
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
          "Four distinct audiences needed four distinct products: players booking sessions, customers buying gear, admins managing operations, and a community feed tying them together. Building four independent stacks would have meant four copies of authentication, four notification pipelines and four sets of deployment config to keep in sync.",
          "The constraint was a two-person team. Whatever the architecture, it had to be maintainable by very few people.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "I structured the system as a Next.js monorepo with four applications sharing a common UI layer and API client, backed by a single Node.js service. Auth, bookings, notifications and analytics live once in the backend and are consumed by all four frontends, so a change to booking rules ships to every surface at once.",
          "Frontends deploy to Vercel, each application choosing its own rendering strategy — SSR where data is per-user, static generation and ISR where content is shared and cacheable. The API deploys separately to AWS Elastic Beanstalk with environment-based configuration, which keeps the backend's scaling and release cycle independent of the frontends.",
        ],
      },
      {
        heading: "Payments and real-time",
        body: [
          "Payments run through PhonePe over asynchronous webhooks rather than relying on the browser redirect. The client-side return is treated as a hint, not as truth: order state only advances when the webhook is received and verified, so a user closing the tab mid-payment does not lose a confirmed booking.",
          "Socket.IO carries live notifications across the applications — booking confirmations, admin alerts and community activity — so operational changes surface without a refresh. Google OAuth and the Maps API handle sign-in and venue location.",
        ],
      },
      {
        heading: "Access control",
        body: [
          "The platform has three roles with genuinely different permissions: players, coaches and admins. Authorization is enforced server-side on every route rather than in the UI — JWT for identity, role checks at the handler, schema validation on every input, and rate limiting on the endpoints that touch money or authentication.",
          "The frontend hides what a role cannot do, but the backend is the thing that decides. That split is what makes a multi-role product safe to extend.",
        ],
      },
      {
        heading: "Where it stands",
        body: [
          "The platform is live and has sustained 99% uptime in production. The monorepo has held up as the product grew from one application to four, which was the original bet.",
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "ping-pilott",
    name: "Ping Pilott",
    tagline: "Server uptime monitoring with queued health checks and alert deduplication",
    year: "2025",
    role: "Solo project",
    summary:
      "A monitoring tool that runs scheduled health checks through BullMQ workers, deduplicates alerts so one outage does not become fifty emails, and streams status to a live Socket.IO dashboard. Containerized with Docker Compose behind an Nginx reverse proxy.",
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
      { label: "Focus", value: "Background jobs, reliability, ops" },
      { label: "Source", value: "Private — happy to walk through it" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Uptime monitoring is simple until it is not. Running checks on a naive interval inside the web process couples monitoring to request traffic, and the moment a service goes down, a per-check alert rule floods the inbox with identical messages — which trains you to ignore the alerts entirely.",
        ],
      },
      {
        heading: "Queued checks instead of timers",
        body: [
          "Health checks are scheduled as BullMQ jobs on Redis and executed by separate workers, not by the API process. That separation means check execution does not compete with user requests, failed checks retry with backoff on the queue rather than being lost, and adding capacity is a matter of running more workers.",
        ],
      },
      {
        heading: "Alert deduplication",
        body: [
          "Alerts fire on state transition, not on every failed check. A monitor going from healthy to down produces one notification; continued failures update the incident instead of opening a new one, and recovery closes it. The result is an inbox where every email means something changed.",
          "Email delivery runs through the queue as well, so a mail provider being slow or briefly unavailable does not stall the check pipeline.",
        ],
      },
      {
        heading: "Live dashboard",
        body: [
          "Workers publish results over Socket.IO to a Next.js dashboard, so status changes appear as they happen rather than on a polling interval. The dashboard reads from the same MongoDB store that holds check history.",
        ],
      },
      {
        heading: "Hardening and deployment",
        body: [
          "The API is secured with JWT auth and role-based access control, with Zod validation on inputs, Helmet for headers, rate limiting on the public routes, and Winston for structured logging.",
          "The whole system — API, workers, Redis, MongoDB — runs under Docker Compose behind an Nginx reverse proxy, which makes the deployment reproducible rather than a set of instructions I have to remember.",
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "social-it-up",
    name: "Social It Up",
    tagline: "A digital agency platform with per-client routing and an internal bug tracker",
    year: "2025",
    role: "Solo project",
    summary:
      "An agency site where each client gets their own portfolio route, paired with an admin dashboard and a Firestore-backed bug tracker with Kanban-style workflow. Mobile-first, with motion used as a structural device rather than decoration.",
    stack: [
      "Next.js",
      "Firebase",
      "Firestore",
      "Framer Motion",
      "GSAP",
      "Nodemailer",
    ],
    links: [
      { label: "Live site", href: "https://social-it-up.vercel.app/" },
      { label: "Source", href: "https://github.com/Jatin-1111/Social-It-Up" },
    ],
    facts: [
      { label: "Role", value: "Solo — design and build" },
      { label: "Type", value: "Client-facing agency platform" },
      { label: "Focus", value: "Content routing, admin tooling, motion" },
    ],
    sections: [
      {
        heading: "Per-client routing",
        body: [
          "Rather than one flat portfolio page, each client has a dedicated route generated from Firestore content. Adding a client is a data operation, not a code change — which is the difference between a site the agency can run and one that needs a developer for every update.",
        ],
      },
      {
        heading: "Internal bug tracker",
        body: [
          "The admin side includes a Firestore-backed bug tracker with a Kanban workflow, built because the team was tracking issues in chat and losing them. Status changes sync live across anyone with the board open.",
          "Transactional email runs through Nodemailer, so inquiries and status notifications leave the system automatically.",
        ],
      },
      {
        heading: "Motion as structure",
        body: [
          "The interface is mobile-first and animated with Framer Motion and GSAP. Motion is tied to navigation and state change — it tells you where you came from and what just changed, rather than being applied to elements for its own sake.",
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
