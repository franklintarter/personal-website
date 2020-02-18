import React from "react";
import { SEO } from "gatsby-plugin-seo";
import Layout from "../../components/Layout";

export default () => {
  return (
    <Layout>
      <SEO
        title="Animated Algorithms"
        description="Algorithms for the rest of us. Front end devs, full stack devs, or anyone else."
        pagePath="/animated-algorithms"
        schema={`{
              "@context": "http://schema.org",
              "@type": "WebPage"
            }`}
      />{" "}
      <h1 className="font-light leading-none">
        <span className="text-xl sm:text-5xl xs:text-3xl font-serif text-brand-gray italic">
          Animated Algorithms
        </span>
      </h1>
      <div>page init</div>
    </Layout>
  );
};
