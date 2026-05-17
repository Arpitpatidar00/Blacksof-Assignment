"use client";

import Image from "next/image";
import { motion, useAnimation, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import {
  HERO_CONTENT,
  APP,
  HERO_ALERT_CARDS,
  HERO_FEATURES,
  HERO_LEFT_PANEL,
} from "@/constants";

/* ───────────────────────────── Alert Card ───────────────────────────── */
const AlertCard = React.memo(({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div
    className="rounded-xl p-6 max-w-[438px]"
    style={{
      background:
        "linear-gradient(179deg, #FFF 33%, #E7ECF2 100%)",
      boxShadow:
        "8px 5px 13px 6px rgba(0,0,0,0.01), inset 0px 2px 20px 0px rgba(222,222,222,0.3)",
      backdropFilter: "blur(1px)",
    }}
  >
    <div className="flex items-center gap-2 mb-3">
      <div
        className="w-[33px] h-[33px] rounded-[3px] flex items-center justify-center"
        style={{
          background:
            "linear-gradient(180deg, #FFE3D7 0%, #FFB28F 100%)",
          border: "0.5px solid rgba(202, 54, 4, 0.23)",
        }}
      >
        <span className="text-primary text-sm font-bold">⚠</span>
      </div>
      <span className="font-heading font-medium text-[16px] leading-[120%] tracking-[-0.05em] text-foreground">
        Smart alert from Dejoule
      </span>
    </div>
    <h4 className="font-body font-semibold text-[16px] leading-[141%] tracking-[-0.0375em] uppercase text-primary mb-1.5">
      {title}
    </h4>
    <p className="font-body text-[16px] leading-[141%] tracking-[-0.0375em] text-muted">
      {description}
    </p>
  </div>
));
AlertCard.displayName = "AlertCard";

/* ──────────────────────── Feature Item (left panel) ──────────────────── */
const FeatureItem = React.memo(({
  title,
  description,
  isActive,
}: {
  title: string;
  description: string;
  isActive: boolean;
}) => (
  <div
    className="flex flex-col gap-1 2xl:gap-3 w-[100%] max-w-[90%] transition-opacity duration-600"
    style={{ opacity: isActive ? 1 : 0.2 }}
  >
    <h3 className="font-heading font-medium text-[26px] 2xl:text-[32px] leading-[118%] tracking-[-0.04em] text-primary">
      {title}
    </h3>
    <p className="font-body text-[16px] 2xl:text-[18px] leading-[141%] tracking-[-0.0375em] text-muted">
      {description}
    </p>
  </div>
));
FeatureItem.displayName = "FeatureItem";

/* ═══════════════════════════════════════════════════════════════════════
   HERO COMPONENT — Load animation (3 frames on mount)
   Frame 1: Hero text + blurred phone
   Frame 2: Phone scales up and clarifies
   Frame 3: Alert cards fly in around phone
   ═══════════════════════════════════════════════════════════════════════ */
export const Hero = () => {
  const heroTextControls = useAnimation();
  const phoneControls = useAnimation();
  const alertCardsControls = useAnimation();
  const phoneScreenControls = useAnimation();
  const bgControls = useAnimation();

  // Scroll animations setup
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 88px", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.5) setActiveIndex(0);
    else if (latest < 0.75) setActiveIndex(1);
    else setActiveIndex(2);
  });

  const initialElementsOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const phoneScrollX = useTransform(scrollYProgress, [0.05, 0.3], ["0vw", "35vw"]);
  const leftPanelOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const leftPanelY = useTransform(scrollYProgress, [0.2, 0.35], [50, 0]);

  useEffect(() => {
    const playAnimation = async () => {
      // ── FRAME 1: Hero text visible, phone blurred and small (0s - 0.6s) ──
      await Promise.all([
        heroTextControls.start({
          y: 0,
          opacity: 1,
          transition: { duration: 0 },
        }),
        phoneControls.start({
          scale: 0.7,
          opacity: 0.2,
          x: "0%",
          y: "30%",
          filter: "blur(8px)",
          transition: { duration: 0 },
        }),
        bgControls.start({
          opacity: 1,
          transition: { duration: 0 },
        }),
      ]);

      // ── FRAME 2: Phone scales and clarifies (0.6s - 1.4s) ──
      await Promise.all([
        heroTextControls.start({
          y: 0,
          opacity: 1,
          transition: { duration: 0.8, ease: "easeInOut" },
        }),
        phoneControls.start({
          scale: 1.0,
          opacity: 1,
          x: "0%",
          y: "10%",
          filter: "blur(0px)",
          transition: { duration: 0.8, ease: "easeInOut" },
        }),
        bgControls.start({
          opacity: 0.2,
          transition: { duration: 0.8, ease: "easeInOut" },
        }),
      ]);

      // ── FRAME 3: Alert cards + phone screen overlay fly in (1.4s - 2.2s) ──
      await Promise.all([
        alertCardsControls.start({
          opacity: 1,
          transition: { duration: 0.8 },
        }),
        phoneScreenControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        }),
      ]);
    };

    playAnimation();
  }, [heroTextControls, phoneControls, alertCardsControls, phoneScreenControls, bgControls]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '300vh', marginTop: '88px', background: 'linear-gradient(169deg, #ffffff 69%, #edf0f5 100%)' }}>
      <section className="sticky top-[88px] w-full overflow-hidden" style={{ height: 'calc(100vh - 88px)' }}>
        {/* Background Image with Gradient Overlays */}
        <motion.div style={{ opacity: initialElementsOpacity, willChange: "opacity" }} className="absolute inset-0 z-0">
          <motion.div className="absolute inset-0" animate={bgControls}>
            <Image
              src="/images/hero-bg-48b4aa.png"
              alt="DeJoule Smart Building"
              fill
              className="object-cover object-center"
              priority
            />
            <div
              className="absolute inset-0"
              style={{ background: "var(--gradient-hero-fade-top)" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "var(--gradient-hero-fade-bottom)" }}
            />
          </motion.div>
        </motion.div>

        {/* ── FRAME 1-3: Hero Text ── */}
        <motion.div style={{ opacity: initialElementsOpacity }}>
          <motion.div
            className="absolute inset-0 z-40 flex flex-col items-center justify-start pt-[4vh] px-4"
            animate={heroTextControls}
          >
            <span className="text-primary text-[20px] font-normal leading-[110%] uppercase tracking-[-0.05em] font-body mb-4">
              {APP.HERO_LABEL}
            </span>
            <h1 className="text-center max-w-[851px]">
              <span className="font-heading font-medium text-[48px] leading-[118%] tracking-[-0.04em] text-[#1B1B1B]">
                {HERO_CONTENT.heading}{" "}
              </span>
              <span className="font-heading font-medium text-[48px] leading-[118%] tracking-[-0.04em] text-[#1B1B1B]">
                {HERO_CONTENT.headingBold}
              </span>
              <span className="font-heading font-medium text-[48px] leading-[118%] tracking-[-0.04em] text-[#1B1B1B]">
                {" "}{HERO_CONTENT.headingContinued}
              </span>
              <span className="font-heading font-medium text-[48px] leading-[118%] tracking-[-0.04em] text-[#1B1B1B]">
                {" "}{HERO_CONTENT.headingBold2}
              </span>
            </h1>
          </motion.div>
        </motion.div>

        {/* ── FRAME 1-3: Phone (scales up, clarifies, positions center) ── */}
        <motion.div style={{ x: phoneScrollX, willChange: "transform" }} className="absolute inset-0 z-20 pointer-events-none">
          <motion.div
            className="absolute z-20 pointer-events-none"
            style={{ left: '20%', top: '0%', transform: 'translateX(-50%)' }}
            initial={{
              scale: 0.7,
              opacity: 0.2,
              x: "0%",
              y: "30%",
              filter: "blur(8px)",
            }}
            animate={phoneControls}
          >
            <div className="relative">
              <Image
                src="/images/mobile-phone-53256e.png"
                alt="DeJoule Smart Alerts on Phone"
                width={500}
                height={614}
                className="object-contain"
                style={{ height: '80vh', width: 'auto' }}
                priority
              />
              {/* ── FRAME 3: Phone screen notification overlay ── */}
              <motion.div
                className="absolute pointer-events-none"
                style={{ top: '35%', left: '27%', width: '22%' }}
                initial={{ opacity: 0, y: 30 }}
                animate={phoneScreenControls}
              >
                <Image
                  src="/images/phone-screen-small.png"
                  alt="Phone Notifications"
                  width={400}
                  height={500}
                  className="object-contain"
                  style={{ width: '100%', height: 'auto' }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── FRAME 3: Alert Cards ── */}
        <motion.div style={{ opacity: initialElementsOpacity }} className="absolute inset-0 z-30 pointer-events-none">
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none"
            animate={alertCardsControls}
            initial={{ opacity: 0 }}
          >
            {/* Card 1: Left - flies in from left */}
            <motion.div
              className="absolute left-[5%] top-[48%]"
              initial={{ x: -80, y: 30, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <AlertCard
                title={HERO_ALERT_CARDS[0].title}
                description={HERO_ALERT_CARDS[0].description}
              />
            </motion.div>

            {/* Card 2: Top-right - flies in from top-right */}
            <motion.div
              className="absolute right-[20%] top-[28%]"
              initial={{ x: 80, y: -30, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <AlertCard
                title={HERO_ALERT_CARDS[1].title}
                description={HERO_ALERT_CARDS[1].description}
              />
            </motion.div>

            {/* Card 3: Bottom-right - flies in from bottom-right */}
            <motion.div
              className="absolute right-[8%] top-[58%]"
              initial={{ x: 80, y: 30, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <AlertCard
                title={HERO_ALERT_CARDS[2].title}
                description={HERO_ALERT_CARDS[2].description}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── FRAMES 4-8: Left Panel Content ── */}
        <motion.div
          className="absolute left-[5%] w-[55%] top-[12vh] z-30 flex flex-col gap-[2vh] 2xl:gap-[4vh]"
          style={{ opacity: leftPanelOpacity, y: leftPanelY, willChange: "transform, opacity" }}
        >
          {/* Top heading and description */}
          <div className="max-w-[100%] pr-[5%]">
            <h2 className="font-heading text-[42px] 2xl:text-[56px] leading-[120%] tracking-[-0.03em] text-foreground mb-3 2xl:mb-6">
              <span className="font-light">{HERO_LEFT_PANEL.heading} </span>
              <span className="font-semibold">{HERO_LEFT_PANEL.headingBold}</span>
              <br />
              <span className="font-light">{HERO_LEFT_PANEL.headingEnd}</span>
            </h2>
            <div className="flex flex-col gap-2 2xl:gap-4">
              <p className="font-body text-[16px] 2xl:text-[18px] leading-[150%] tracking-[-0.02em] text-muted-foreground">
                {HERO_LEFT_PANEL.description1}
              </p>
              <p className="font-body text-[16px] 2xl:text-[18px] leading-[150%] tracking-[-0.02em] text-muted-foreground">
                {HERO_LEFT_PANEL.description2}
              </p>
            </div>
          </div>

          {/* Feature Items */}
          <div className="flex flex-col gap-[1.5vh] 2xl:gap-[3vh]">
            {HERO_FEATURES.map((feature, idx) => (
              <FeatureItem
                key={feature.id}
                title={feature.title}
                description={feature.description}
                isActive={activeIndex === idx}
              />
            ))}
          </div>
        </motion.div>

      </section>
    </div>
  );
};

export default Hero;