import React, { useEffect } from "react";
import { SEO, useSEO } from "gatsby-plugin-seo";
import Prism from "prismjs";
import Layout from "../components/Layout";
import { MemeQuote } from "../components/UI";

const title = "Home";

export default () => {
  const { siteUrl } = useSEO();
  useEffect(() => {
    Prism.highlightAll();
  });
  return (
    <Layout>
      <SEO
        title={title}
        description="Software development includes writing instructions for computers. Software development is not equal to writing instructions for computers."
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
      <p
        className="uppercase font-bold font-oswald text-gray-800 tracking-tight leading-none"
        // style={{ lineHeight: 0.75 }}
      >
        <span className="text-2xl mb-2">Welcome to</span>
        <br />
        <span className="text-3xl sm:text-5xl xs:text-4xl mb-6">
          Franklin Tarter&apos;s
        </span>
        <br />
        <span className="text-xl xs:text-3xl">slice of the internet.</span>
      </p>
      <div className="mt-48">
        <MemeQuote />
      </div>
    </Layout>
  );
};
