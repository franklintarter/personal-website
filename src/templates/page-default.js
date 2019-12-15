import React from "react";
import { SEO } from "gatsby-plugin-seo";
import Layout from "../components/Layout";

export default ({ pageContext, children }) => {
  return (
    <Layout>
      <SEO
        title={pageContext.frontmatter.title}
        description={pageContext.frontmatter.description}
      />
      {children}
    </Layout>
  );
};
