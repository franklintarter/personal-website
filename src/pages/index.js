import React, { useEffect } from "react";
import { SEO, useSEO } from "gatsby-plugin-seo";
import Prism from "prismjs";
import Layout from "../components/Layout";

const title = "Home";
const lead = "Software development is not writing instructions for computers.";

export default () => {
  const { siteUrl } = useSEO();
  useEffect(() => {
    // call the highlightAll() function to style our code blocks
    Prism.highlightAll();
  });
  const code = `
softwareDevelopment.includes(writingInstructionsForComputuers);
softwareDevelopment !== writingInstructionsForComputers;
  `;
  return (
    <Layout>
      <SEO
        title={title}
        description={lead}
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
      {/* <h1 className="mb-2 text-3xl font-serif">What Will We Build?</h1> */}
      <p className="text-lg text-gray-800 tracking-wide font-light">{lead}</p>
      <pre>
        <code className="language-javascript">{code}</code>
      </pre>
    </Layout>
  );
};
