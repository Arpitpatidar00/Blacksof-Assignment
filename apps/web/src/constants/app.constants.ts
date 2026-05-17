export const APP = {
  NAME: "DeJoule",
  TAGLINE: "INTELLIGENCE MEETS IMPACT",
  HERO_LABEL: "AFDD powered by Smart Alerts",
} as const;

export const NAV_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Resources", href: "#resources" },
  { label: "Operational Excellence", href: "#excellence" },
  { label: "Solutions", href: "#solutions", hasDropdown: true },
  { label: "A Day in a Building", href: "#day-in-building" },
] as const;

export const FOOTER_COMPANY_LINKS = [
  { label: "Operational Excellence", href: "#" },
  { label: "A Day in a Building", href: "#" },
  { label: "Smart Alerts", href: "#" },
  { label: "Analytics & Reporting", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Resources", href: "#" },
] as const;

export const FOOTER_SOLUTION_LINKS = [
  { label: "Full-Stack BMS", href: "#" },
  { label: "Chiller Plant Optimization", href: "#" },
] as const;

export const FOOTER_SOCIAL_LINKS = [
  { label: "YouTube", href: "#", icon: "/images/icon-youtube.svg" },
  { label: "LinkedIn", href: "#", icon: "/images/icon-linkedin.svg" },
  { label: "x.com", href: "#", icon: "/images/icon-x.svg" },
  { label: "Instagram", href: "#", icon: "/images/icon-instagram.svg" },
] as const;
