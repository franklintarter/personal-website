import React from "react";
import { SEO } from "gatsby-plugin-seo";
import Layout from "../../components/Layout";

import { Section } from "../../components/UI";
import { H1 } from "../../components/Typography";
import { ContactForm } from "../../components/Pages/Contact";

export default () => {
  return (
    <Layout>
      <SEO title="Contact" description="Contact Us" pagePath="/contact" />
      <Section className="py-12">
        <H1>Contact Us</H1>
        <ContactForm />
      </Section>
    </Layout>
  );
};
