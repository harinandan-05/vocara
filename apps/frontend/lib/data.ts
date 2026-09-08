export interface NavItem {
  label: string;
  href: string;
}

export interface StepItem {
  step: string;
  stepNumber: number;
  title: string;
  description: string;
  badge: string;
  highlight: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: "Bot" | "BarChart3" | "Users2" | "Sparkles" | "Video" | "ShieldCheck";
  linkText: string;
  href: string;
  tag: string;
}

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  popular?: boolean;
  ctaText: string;
  features: string[];
}

export interface LogoItem {
  name: string;
  sub: string;
}

export interface DepartmentMetric {
  name: string;
  candidates: number;
  score: number;
  timeToHire: string;
  fillRate: string;
}

export interface HiringReport {
  id: string;
  title: string;
  category: string;
  date: string;
  format: string;
  status: "Completed" | "Ready" | "Updated";
}

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#data-insights" },
  { label: "Pricing", href: "#pricing" },
];

export const TRUSTED_LOGOS: LogoItem[] = [
  { name: "ApexScale", sub: "Cloud Systems" },
  { name: "Synthetix", sub: "Enterprise AI" },
  { name: "TalentGrid", sub: "HR Operations" },
  { name: "Vanguardia", sub: "Global Capital" },
  { name: "OmniTech", sub: "Dev Platforms" },
];

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    step: "01",
    stepNumber: 1,
    title: "Create Your Interview",
    description: "Set up role-specific AI interview flows in minutes with customized criteria, technical questions, and behavioral rubrics.",
    badge: "5 Min Setup",
    highlight: "Role-specific rubrics & dynamic questioning",
  },
  {
    step: "02",
    stepNumber: 2,
    title: "Candidates Get Interviewed",
    description: "AI conducts natural, adaptive conversations anytime across time zones with conversational audio and video intelligence.",
    badge: "24/7 Availability",
    highlight: "Adaptive conversational voice & video",
  },
  {
    step: "03",
    stepNumber: 3,
    title: "Review AI Insights",
    description: "Get scored transcripts, strengths, and red flags instantly alongside unbiased competency breakdowns for fast hiring decisions.",
    badge: "Instant Results",
    highlight: "Automated scoring & verified anti-cheat signals",
  },
];

export const FEATURES: FeatureItem[] = [
  {
    id: "smart-screening",
    title: "Smart Screening",
    description: "Automatically evaluate candidates with AI-driven question flows tailored to role seniority, tech stacks, and domain depth.",
    iconName: "Bot",
    linkText: "Read More",
    href: "#smart-screening",
    tag: "Autonomous AI",
  },
  {
    id: "real-time-insights",
    title: "Real-Time Insights",
    description: "Track interview performance, sentiment, and competency scores with deep semantic audio-visual telemetry and speech speed metrics.",
    iconName: "BarChart3",
    linkText: "Read More",
    href: "#real-time-insights",
    tag: "Predictive Analytics",
  },
  {
    id: "candidate-hub",
    title: "Candidate Hub",
    description: "Manage profiles, recordings, and hiring pipeline in one workspace with seamless collaboration, notes, and ATS integrations.",
    iconName: "Users2",
    linkText: "Read More",
    href: "#candidate-hub",
    tag: "Unified Workspace",
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$29.99",
    period: "/month",
    description: "Ideal for boutique teams and early startups launching their first AI screening pipeline.",
    popular: false,
    ctaText: "Start Free",
    features: [
      "Up to 25 AI candidate interviews / mo",
      "Standard voice & video transcription",
      "Basic competency rubrics & scoring",
      "Sharable candidate video summaries",
      "Email & community support",
      "Standard 7-day analytics retention",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$39.99",
    period: "/month",
    description: "Engineered for scaling talent organizations that require deep evaluation and high volume.",
    popular: true,
    ctaText: "Start Free",
    features: [
      "Up to 150 AI candidate interviews / mo",
      "Adaptive follow-up questions & probes",
      "Real-time sentiment & anti-cheat detection",
      "Automated ATS synchronization (Greenhouse, Lever)",
      "Multi-reviewer calibration notes & scoring",
      "Priority 24/7 Slack & email support",
      "Unlimited analytics history & custom exports",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$59.99",
    period: "/month",
    description: "Full-scale governance, custom rubric training, and dedicated infrastructure for enterprise hiring.",
    popular: false,
    ctaText: "Start Free",
    features: [
      "Unlimited AI candidate interviews",
      "Custom fine-tuned LLM & voice avatars",
      "Custom bias elimination & compliance audits",
      "SSO, SAML & role-based permissions",
      "Dedicated talent analytics engineer",
      "99.9% uptime SLA & bespoke ATS webhooks",
    ],
  },
];

export const DEPARTMENT_METRICS: DepartmentMetric[] = [
  { name: "Engineering", candidates: 642, score: 89, timeToHire: "4.2 days", fillRate: "94%" },
  { name: "Product & Design", candidates: 318, score: 92, timeToHire: "3.8 days", fillRate: "96%" },
  { name: "Growth & Sales", candidates: 468, score: 86, timeToHire: "2.9 days", fillRate: "91%" },
];

export const HIRING_REPORTS: HiringReport[] = [
  {
    id: "rep-1",
    title: "Senior Fullstack Engineer Benchmark",
    category: "Technical Assessment",
    date: "Generated 12m ago",
    format: "PDF • 24 Candidates",
    status: "Completed",
  },
  {
    id: "rep-2",
    title: "Q3 Blind Bias Elimination Audit",
    category: "Compliance & Fairness",
    date: "Generated 2h ago",
    format: "Audit Log • 100% Score",
    status: "Ready",
  },
  {
    id: "rep-3",
    title: "Leadership & Communication Matrix",
    category: "Executive Assessment",
    date: "Generated Today",
    format: "Interactive Matrix",
    status: "Updated",
  },
];

export const FOOTER_LINKS = {
  Product: [
    { label: "AI Screening Flow", href: "#features" },
    { label: "Live Voice Agent", href: "#how-it-works" },
    { label: "Dashboard & Metrics", href: "#data-insights" },
    { label: "ATS Integrations", href: "#features" },
    { label: "Enterprise Security", href: "#pricing" },
  ],
  Company: [
    { label: "About Vocara", href: "#hero" },
    { label: "Customer Stories", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press & News", href: "#" },
    { label: "Security & SOC 2", href: "#" },
  ],
  Resources: [
    { label: "Hiring Benchmark 2026", href: "#" },
    { label: "Interview Question Library", href: "#" },
    { label: "API Documentation", href: "#" },
    { label: "Community & Guides", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};
