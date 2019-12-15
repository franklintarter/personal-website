import React from "react";
import { SEO } from "gatsby-plugin-seo";
import Layout from "../components/Layout";
import { Section } from "../components/UI";

export default ({ pageContext, children }) => {
  return (
    <Layout>
      <SEO
        title={pageContext.frontmatter.title}
        description={pageContext.frontmatter.description}
        pagePath={pageContext.frontmatter.pagePath}
      />
      <Section className="py-12" maxWidth="max-w-3xl">
        {children}
      </Section>
    </Layout>
  );
};
