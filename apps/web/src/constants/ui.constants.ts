export const FEATURE_CARDS = [
  {
    id: "analytics",
    icon: "/images/icon-analytics.svg",
    title: "Smart Analytics & Reporting",
    heading: "From raw data to real decisions in real time",
    description:
      "An analytics engine that turns operational data into targeted insights that drive action, not just observation. Built for complex facilities, it empowers your team with clear operational visibility, faster response times, and continuous improvement",
    features: [
      "Auto-generated insights, powered by AWS QuickSight",
      "360° visibility into performance metrics",
      "Built-in actionable intelligence",
    ],
    image: "/images/card-analytics.gif",
    cta: "See how it works",
  },
  {
    id: "alerts",
    icon: "/images/icon-alerts.svg",
    title: "Smart Alerts",
    heading: "More than alerts. Built-in foresight.",
    description:
      "Alerts that offer more than just a warning—delivering precise, actionable intelligence when it matters most. From early fault detection to guided resolution, your team has everything they need to stay ahead of failures and downtime.",
    features: [
      "Automated Fault Detection and Diagnostics",
      "Role-based alerts",
      "Personalized, multichannel communication",
    ],
    image: "/images/card-alerts.gif",
    cta: "See how it works",
  },
  {
    id: "monitoring",
    icon: "/images/icon-monitoring.svg",
    title: "Facility-Wide Monitoring & Control",
    heading: "One intelligent platform. Complete visibility. Seamless control.",
    description:
      "DeJoule acts as your building's central command—integrating data, control, and actions across all systems to ensure your facility runs in perfect sync.",
    features: [
      "Centralized system intelligence",
      "Unified smart control",
      "Proactive maintenance workflows",
    ],
    image: "/images/card-monitoring.gif",
    cta: "See how it works",
  },
  {
    id: "automation",
    icon: "/images/icon-automation.svg",
    title: "Intelligent Automation",
    heading:
      "Your building's intelligence engine. Learning, adapting, and acting in real time.",
    description:
      "Let's bring your systems to life with automation that evolves by the minute, making data-driven decisions to optimize performance without compromise",
    features: [
      "Joule Recipes for routine actions",
      "Dynamic equipment orchestration",
      "Balanced equipment utilization",
    ],
    image: "/images/card-automation.gif",
    cta: "See how it works",
  },
] as const;

export const HERO_CONTENT = {
  label: "AFDD powered by Smart Alerts",
  heading: "Making alerts",
  headingBold: "relevant, personalized,",
  headingContinued: "and",
  headingBold2: "directly actionable",
} as const;

export const FEATURES_HEADER = {
  badge: "Return on intelligence",
  heading: "Smarter buildings don't just function.",
  headingHighlight: "They deliver value.",
  description:
    "When systems think, buildings give back. DeJoule turns every minute into measurable gain across",
  descriptionBold: "energy, uptime, and user satisfaction.",
} as const;

export const CTA_CONTENT = {
  heading: "Let's unlock the",
  headingBold1: "peak performance",
  headingMid: "and",
  headingBold2: "efficiency",
  headingEnd: "of your building.",
  buttonText: "Let's connect",
} as const;
