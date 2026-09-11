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
    context: "Part-time · 2-person team · Reporting to founder",
    href: "https://powermysport.com",
    points: [
      "Built a four-application Next.js monorepo — client, shop, admin and community — on a shared Node.js backend handling auth, bookings, notifications and analytics across all four surfaces.",
      "Integrated PhonePe payments over asynchronous webhooks, Socket.IO live notifications, Google OAuth and the Maps API, sustaining 99% uptime in production.",
      "Implemented multi-role access control for players, coaches and admins using JWT, server-side authorization, input validation and rate limiting.",
      "Deployed the frontends to Vercel across SSR, SSG and ISR, and the API to AWS Elastic Beanstalk with environment-based configuration management.",
    ],
    stack: [
      "Next.js",
      "Node.js",
      "TypeScript",
      "Socket.IO",
      "PhonePe",
      "AWS Elastic Beanstalk",
      "Vercel",
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
      "Designed relational schemas for buyers, carts, invoices and RFQs, and integrated S3 asset storage with pre-signed URLs alongside query-level search optimization.",
      "Handed off with complete Elastic Beanstalk and Vercel deployment guides and a documented migration pipeline.",
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "AWS S3", "Vercel"],
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
