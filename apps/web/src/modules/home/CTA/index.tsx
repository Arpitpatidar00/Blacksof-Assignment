"use client";

import { useState } from "react";
import { CTA_CONTENT } from "@/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/base/Dialog";
import dynamic from "next/dynamic";
const RequestDemoForm = dynamic(() => import("./RequestDemoForm").then((m) => m.RequestDemoForm));
import { Button } from "@/components/base/Button";

export const CTA = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="w-full px-[120px] py-0">
      <div className="relative rounded-[20px] overflow-hidden">
        {/* Glass Background */}
        <div className="absolute inset-0 cta-section-bg opacity-65 rounded-[20px]" />

        {/* Content */}
        <div className="relative flex flex-col items-center gap-[51px] py-[115px] px-[80px]">
          <h2 className="text-center max-w-[1100px]">
            <span className="font-heading font-light text-[48px] leading-[125%] tracking-[-0.0625em] text-foreground">
              {CTA_CONTENT.heading}{" "}
            </span>

            <span className="font-heading font-semibold text-[48px] leading-[125%] tracking-[-0.0625em] text-foreground">
              {CTA_CONTENT.headingBold1}
            </span>

            <br />

            <span className="font-heading font-light text-[48px] leading-[125%] tracking-[-0.0625em] text-foreground">
              {CTA_CONTENT.headingMid}{" "}
            </span>

            <span className="font-heading font-semibold text-[48px] leading-[125%] tracking-[-0.0625em] text-foreground">
              {CTA_CONTENT.headingBold2}
            </span>

            <span className="font-heading font-light text-[48px] leading-[125%] tracking-[-0.0625em] text-foreground">
              {" "}
              {CTA_CONTENT.headingEnd}
            </span>
          </h2>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="cta" className="rounded-full px-[30px] h-[60px] flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 border border-white/43">
                <span className="text-gradient-cta font-heading font-medium text-[22px] leading-[141%] tracking-[-0.09em]">
                  {CTA_CONTENT.buttonText}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Request a Demo</DialogTitle>
                <DialogDescription>
                  Enter your details below and our team will get back to you within 24 hours.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <RequestDemoForm onSuccess={() => setOpen(false)} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

