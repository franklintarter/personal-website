import React from "react";
import { SEO, useSEO } from "gatsby-plugin-seo";

import { Hero } from "../components/Pages/Home";
import { Section } from "../components/UI";
import { H1, Lead, H3 } from "../components/Typography";
import Layout from "../components/Layout";

const title = "Home";
const description = "This is the description of the page.";
const subheading = "This is the punchy subheading.";
const heroTitle = "This is a hero title.";
const heroSubtext = "This is the hero subtext.";

export default () => {
  const { siteUrl } = useSEO();
  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        pagePath="/about"
        schema={`{
              "@context": "http://schema.org",
              "@type": "WebPage",
              "mainEntity": {
                "@type": "Organization",
                "name": "Example Company",
                "image": "${siteUrl}/img/logo.png"
              }
            }`}
      />
      <Section>
        <H1>Headline</H1>
        <Lead>{subheading}</Lead>
      </Section>

      <Hero heroTitle={heroTitle} heroSubtext={heroSubtext} />

      <Section className="py-12">
        <H3>I resolve to the H3 Component</H3>
        <p>{description}</p>
      </Section>
    </Layout>
  );
};
