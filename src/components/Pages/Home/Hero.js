import React from "react";
import { Section } from "../../UI";
import { HeroTitle, HeroSubtitle } from "../../Typography";

const Hero = ({ heroTitle, heroSubtext }) => {
  return (
    <div className="bg-gray-700 h-64 w-full text-white flex items-center">
      <Section>
        <HeroTitle>{heroTitle}</HeroTitle>
        <HeroSubtitle className="text-white">{heroSubtext}</HeroSubtitle>
      </Section>
    </div>
  );
};

export default Hero;
