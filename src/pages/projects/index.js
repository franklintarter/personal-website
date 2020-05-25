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
      <h1 className="font-light leading-none invisible xs:visible">
        <span className="text-xl sm:text-5xl xs:text-3xl font-serif text-brand-gray italic">
          Projects
        </span>
      </h1>
      <div className="xs:mt-8">
        <div className="flex flex-wrap justify-center xs:justify-start">
          <ProjectPreview
            url="/bubble-sort"
            name="Animated Sorting"
            imgName="animated-sorting.png"
            className="xs:mr-6 xs:mb-0 mb-8"
          />
          <ProjectPreview
            url="https://mortar-labs.com"
            name="Mortar Labs"
            imgName="ml-banner.png"
          />
          <ProjectPreview
            url="https://github.com/franklintarter/nodejs-cube"
            name="Console Cube"
            imgName="cube.png"
          />
        </div>
      </div>{" "}
    </Layout>
  );
};
