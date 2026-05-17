"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/base/Button";
import React from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  heading: string;
  description: string;
  features: readonly string[];
  image: string;
  cta: string;
  index: number;
}

export const FeatureCard = React.memo(({
  icon,
  title,
  heading,
  description,
  features,
  image,
  cta,
  index,
}: FeatureCardProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div
      className="
        card-gradient
        rounded-[30px]
        relative
        overflow-hidden
        border border-white/10
        backdrop-blur-md
        shadow-[0_8px_30px_rgba(0,0,0,0.08),inset_0_2px_20px_rgba(255,255,255,0.12)]
      "
      style={{
        zIndex: index + 1,
      }}
    >
      <div className="flex h-full">
        {/* LEFT CONTENT */}
        <div
          className="
            w-[40%]
            flex flex-col
            gap-[32px]
            p-[40px]
            relative z-10
          "
        >
          {/* Title */}
          <div className="flex items-center gap-[15px]">
            <Image
              src={icon}
              alt=""
              width={13}
              height={13}
              style={{ width: "auto", height: "auto" }}
              aria-hidden="true"
            />

            <h3 className="font-heading font-medium text-[28px] leading-[118%] tracking-[-0.03em] text-card-foreground">
              {title}
            </h3>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-[15px]">
            <h4 className="font-heading font-medium text-[24px] leading-[127%] tracking-[-0.04em] text-card-foreground max-w-[410px]">
              {heading}
            </h4>

            <p className="font-body text-[18px] leading-[128%] text-card-body/75">
              {description}
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-3">
            {features.map((feature, i) => (
              <div key={i}>
                <button
                  onClick={() =>
                    setExpandedIndex(expandedIndex === i ? null : i)
                  }
                  className="flex items-center justify-between w-full py-[6px] group"
                >
                  <span className="font-body font-medium text-[18px] leading-[138%] text-accordion-text">
                    {feature}
                  </span>

                  <Plus
                    className={`w-[11px] h-[11px] transition-transform duration-200 ${expandedIndex === i ? "rotate-45" : ""
                      }`}
                    strokeWidth={2}
                  />
                </button>

                {i < features.length - 1 && (
                  <div className="h-px w-full bg-black/[0.08] mt-3" />
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <Button variant="see-how" className="rounded-full px-[30px] h-[60px] flex items-center justify-center w-fit mt-auto cursor-pointer">
            <span className="font-heading font-medium text-[20px] text-primary leading-[125%] tracking-[-0.08em]">
              {cta}
            </span>
          </Button>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-[60%] relative">
          {/* Floating image wrapper */}
          <div
            className="
              absolute
              top-[110px]
              left-0
               w-[118%]
               p-5
              
            "
          >
            <div className="overflow-hidden rounded-[12px] relative w-full aspect-[4/3]">
              <Image
                src={image}
                alt={`${title} preview`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized={image.endsWith('.gif')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
FeatureCard.displayName = "FeatureCard";