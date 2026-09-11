export type Experience = {
  company: string;
  role: string;
  period: string;
  /** Sort key — ISO start date, newest first */
  start: string;
  context: string;
  href?: string;
  points: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "PowerMySport",
    role: "Lead Full-Stack Engineer",
    period: "Jan 2026 — Present",
    start: "2026-01-01",
    context: "Part-time · Leading 2 developers · Reporting to the founder",
    href: "https://powermysport.com",
    points: [
      "Lead engineering on a Turborepo monorepo of three Next.js applications — client, admin and community — over a single domain-organised TypeScript API and a shared types package.",
      "Built PhonePe payment reconciliation that survives failure: HMAC-verified webhooks, idempotent event storage keyed by event id, and a transactional outbox whose worker claims messages atomically and retries on exponential backoff.",
      "Scaled Socket.IO across instances with the Redis adapter, and implemented layered authorization — player, parent, coach, venue-lister and expert accounts alongside five permission-templated admin roles.",
      "Shipped an AI assistant with typed tool access over live platform data, using Gemini embeddings and cosine-similarity retrieval with a model fallback chain.",
      "Deployed the frontends to Vercel and the containerised API to AWS Elastic Beanstalk via ECR, with git-SHA-tagged images and numbered schema migrations.",
    ],
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
  },
  {
    company: "Zeerostock Ventures",
    role: "Full-Stack Developer",
    period: "Dec 2025 — Feb 2026",
    start: "2025-12-01",
    context: "Freelance",
    points: [
      "Delivered a B2B wholesale marketplace covering supplier onboarding, a product catalog with variants, RFQ and quoting, and order management with admin controls.",
      "Modelled buyers, carts, invoices and RFQs as relational schemas in PostgreSQL with Sequelize, and integrated S3 asset storage using pre-signed URLs alongside query-level search optimization.",
      "Added generated PDF invoicing, spreadsheet-based bulk catalog import and export, and SMS notification via Twilio.",
      "Handed off with complete Elastic Beanstalk and Vercel deployment guides and a documented migration pipeline.",
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Sequelize", "AWS S3", "Vercel"],
  },
  {
    company: "Uniqus Edutech Solutions",
    role: "Full-Stack Developer",
    period: "Jan 2025 — Jul 2025",
    start: "2025-01-01",
    context: "Part-time · 5-person team · Reporting to founder",
    points: [
      "Developed a student management platform with real-time features over Socket.IO, AI-generated feedback via Google Generative AI, and Razorpay payment integration.",
      "Reached 99.5% uptime with Docker and held 85%+ Jest test coverage, with zero production incidents across six months.",
      "Secured 15+ API routes across three user roles using JWT auth, RBAC and S3-backed file storage.",
    ],
    stack: ["React", "Node.js", "Socket.IO", "Razorpay", "Docker", "Jest"],
  },
];

export type Involvement = {
  role: string;
  org: string;
  period: string;
};

export const involvement: Involvement[] = [
  {
    role: "Web Development Team Lead",
    org: "GDSC, UIET Panjab University",
    period: "Sep 2025 — Present",
  },
  {
    role: "Web Development Team Member",
    org: "GDSC, UIET Panjab University",
    period: "Dec 2024 — Sep 2025",
  },
  {
    role: "Social Media Sub-Head",
    org: "Euphoria, UIET",
    period: "Jul 2025 — May 2026",
  },
  {
    role: "Member",
    org: "Euphoria, UIET",
    period: "Oct 2024 — Jul 2025",
  },
];

export const education = {
  degree: "B.E. Information Technology",
  school: "UIET, Panjab University, Chandigarh",
  period: "Expected June 2028",
};

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "SQL"] },
  {
    group: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Redux"],
  },
  {
    group: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "WebSockets",
      "Socket.IO",
      "BullMQ",
      "JWT",
    ],
  },
  {
    group: "Databases",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Firestore", "Redis"],
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS (S3, EC2, Elastic Beanstalk)", "Vercel", "Docker", "Nginx", "CI/CD"],
  },
  {
    group: "Tooling",
    items: ["Git", "GitHub", "Postman", "ESLint", "Nodemailer", "Winston"],
  },
];
