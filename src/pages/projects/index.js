import React from "react";
import { SEO } from "gatsby-plugin-seo";
import Layout from "../../components/Layout";

export default () => {
  return (
    <Layout>
      <SEO
        title="Projects"
        description="Franklin Tarter's Personal Projects"
        pagePath="/projects"
        schema={`{
              "@context": "http://schema.org",
              "@type": "WebPage"
            }`}
      />{" "}
      <h1 className="font-light leading-none">
        <span className="text-xl sm:text-5xl xs:text-3xl font-serif text-brand-gray italic">
          Projects
        </span>
      </h1>
      <div>page init</div>
    </Layout>
  );
};
