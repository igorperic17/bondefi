"use client";

import Features from "@/components/bento";
import BondingSection from "@/components/bonding";
import FooterSection from "@/components/footer";
import PartnerSection from "@/components/partners";
import RoadmapSection from "@/components/roadmap";
import TeamSection from "@/components/team";
import { TextRevealSection } from "@/components/text-reveal";
import Hero from "@components/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <TextRevealSection text="Imagine launching an instantly tradable token with built-in guaranteed liquidity... forever." />
      <BondingSection />
      <Features />
      <PartnerSection />
      <RoadmapSection />
      <TeamSection />
      <FooterSection />
    </>
  );
}
