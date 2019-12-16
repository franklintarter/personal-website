import React, { useEffect } from "react";
import { SEO, useSEO } from "gatsby-plugin-seo";
import Prism from "prismjs";
import Layout from "../components/Layout";
import { Profile } from "../components/UI";

const title = "Home";
// const lead = "";
// const lead2 = "";

export default () => {
  const { siteUrl } = useSEO();
  useEffect(() => {
    Prism.highlightAll();
  });
  const code = `softwareDev.includes(writingInstructionsForComputuers)
softwareDev !== writingInstructionsForComputers`;
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
      {/* <h1 className="mb-2 text-3xl font-serif">What Will We Build?</h1> */}
      <p className="text-3xl text-gray-800 tracking-wide font-light mb-4">
        Software development{" "}
        <span className="text-red-700 font-bold uppercase bg-gray-300 text-sm p-1">
          includes
        </span>{" "}
        writing instructions for computers.
      </p>
      <p className="text-3xl font-serif text-gray-800 tracking-wide font-light">
        Software development{" "}
        <span className="text-red-700 font-bold uppercase bg-gray-300 text-sm p-1">
          is not equal to
        </span>{" "}
        writing instructions for computers.
      </p>
      {/* <div className="flex">
        </div> */}
      {/* <div className="mr-2">
          <Profile />
        </div> */}
      {/* </div> */}
      {/* <div> */}
      {/* <pre>
        <code className="language-javascript">{code}</code>
      </pre> */}
    </Layout>
  );
};
