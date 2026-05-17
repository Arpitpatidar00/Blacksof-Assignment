/** Alert notification cards shown in the hero animation */
export const HERO_ALERT_CARDS = [
  {
    id: "overcooled",
    title: "4F NW CORRIDOR AHU AREA OVERCOOLED",
    description:
      "4F NW Corridor area is overcooled where the area temperature is below the setpoint while the valve...",
    position: "left" as const,
  },
  {
    id: "chiller",
    title: "CHILLER 2 250TR SJPL TRIPPED",
    description:
      "Chiller tripped due to high discharge pressure caused by insufficent cooling tower operation...",
    position: "top-right" as const,
  },
  {
    id: "pump",
    title: "CHILLED WATER PUMP 1 MAINTAINANCE REQUIRED",
    description:
      "Low power consumption detected for CHWP possibly due to blocked strainer",
    position: "bottom-right" as const,
  },
] as const;

/** Left-panel feature items for the hero scroll animation (frames 5-8) */
export const HERO_FEATURES = [
  {
    id: "role-based",
    title: "Role-based & SLA-driven",
    description:
      "Get alerts that match your responsibility without any notification clutter. One-click alert subscriptions and SLA-based escalations save time and make everyone efficient.",
  },
  {
    id: "root-cause",
    title: "Root-cause analysis",
    description:
      "Get alerts that tell you the root cause of the problem and history of its occurrence, based on real-time analysis of equipment and building operations.",
  },
  {
    id: "actionable",
    title: "Actionable solutions",
    description:
      "Replace reactive firefighting with direct resolution actions or recommendations to prevent failures, maintain peak performance, and keep your building one step ahead.",
  },
] as const;

export const HERO_LEFT_PANEL = {
  heading: "Redefining what",
  headingBold: "alerts",
  headingEnd: "should do for you",
  description1:
    "Operations teams shouldn't be bombarded with irrelevant, static, and stagnating alerts that increase overhead instead of reducing it.",
  description2:
    "Smart Alerts by DeJoule is redefining how alerts should speak to you—personalized, actionable, and like an intelligent teammate, always guiding you with clear, corrective steps.",
} as const;
