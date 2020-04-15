import React from "react";
import { SEO } from "gatsby-plugin-seo";
import Layout from "../../../components/Layout";

export default () => {
  return (
    <Layout>
      <SEO
        title="Animated Sorting"
        description="Visualize how sorting algorithms work. A quick reference for the rest of us."
        pagePath="/projects/animated-sorting"
        schema={`{
              "@context": "http://schema.org",
              "@type": "WebPage"
            }`}
      />{" "}
      <h1 className="font-light leading-none">
        <span className="text-xl sm:text-5xl xs:text-3xl font-serif text-brand-gray italic">
          Animated Sorting
        </span>
      </h1>
      <div>page init</div>
    </Layout>
  );
};
