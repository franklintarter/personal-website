import React from "react";
import { SEO } from "gatsby-plugin-seo";
import { A, H1, Lead } from "../components/Typography";
import Layout from "../components/Layout";
import { Section } from "../components/UI";

export default () => (
  <Layout pageTitle="Not Found">
    <SEO title="Not Found" description="Page not found" pagePath="/404" />
    <Section className="py-12">
      <H1>Page Not Found</H1>
      <Lead>
        The page you are looking for doesn&#39;t exist.{" "}
        <A to="/">Go to home page.</A>
      </Lead>
    </Section>
  </Layout>
);
