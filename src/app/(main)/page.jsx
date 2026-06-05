import CTASection from "@/components/home/CTASection";
import Features from "@/components/home/Features";
import HeroWithStats from "@/components/home/Hero";
import PricingSection from "@/components/home/PricingSection";
import React from "react";

const HomePage = () => {
  return (
    <>
      <HeroWithStats />
      <Features/>
      <PricingSection/>
      <CTASection/>
    </>
  );
};

export default HomePage;
