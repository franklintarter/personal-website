import React from "react";
import { SEO } from "gatsby-plugin-seo";
import Layout from "../../components/Layout";
import ProjectPreview from "../../components/UI/ProjectPreview";

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
          Other Stuff
        </span>
      </h1>
      <div className="mt-8">
        <div>
          <ProjectPreview
            url="/bubble-sort"
            name="Animated Sorting"
            imgName="animated-sorting.png"
            className="mr-6"
          />
          <ProjectPreview
            url="https://mortar-labs.com"
            name="Mortar Labs"
            imgName="ml-banner.png"
          />
        </div>
      </div>{" "}
    </Layout>
  );
};
