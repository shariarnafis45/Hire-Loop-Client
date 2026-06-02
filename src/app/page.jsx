import CTASection from "@/components/home/CTASection";
import Features from "@/components/home/Features";
import HeroWithStats from "@/components/home/Hero";
import React from "react";

const HomePage = () => {
  return (
    <>
      <HeroWithStats />
      <Features/>
      <CTASection/>
    </>
  );
};

export default HomePage;
