import { Navbar, Hero, Footer } from "@/modules";
import dynamic from "next/dynamic";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Features = dynamic(() => import("@/modules/home/Features").then((m) => m.Features));
const CTA = dynamic(() => import("@/modules/home/CTA").then((m) => m.CTA));

import { getQueryClient } from "@/lib";

export default async function Home() {
  const queryClient = getQueryClient();

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Features />
      </HydrationBoundary>
      <CTA />
      <Footer />
    </main>
  );
}
