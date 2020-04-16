import React from "react";
import { SEO, useSEO } from "gatsby-plugin-seo";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import { useArticles } from "../hooks";
import ProjectPreview from "../components/UI/ProjectPreview";
import ArticlePreview from "../components/UI/ArticlePreview";
import { A } from "../components/Typography";
import ChevronRight from "../img/svg/ui/chevron-right.svg";

const pageTitle = "Home";

export default () => {
  const { siteUrl } = useSEO();
  const articles = useArticles().slice(0, 3);

  const articleEls = articles.map(article => (
    <ArticlePreview
      key={article.slug}
      title={article.frontmatter.title}
      tags={article.frontmatter.tags}
      slug={article.slug}
      description={article.frontmatter.description}
    />
  ));
  return (
    <Layout>
      <SEO
        title={pageTitle}
        description="Franklin Tarter's Personal Website"
        pagePath="/"
        schema={`{
              "@context": "http://schema.org",
              "@type": "WebPage",
              "mainEntity": {
                "@type": "Person",
                "name": "Franklin Tarter",
                "image": {
                  "@type": "ImageObject",
                  "@id": "${siteUrl}/#franklin",
                  "url": "${siteUrl}/img/franklin.png",
                  "caption": "Franklin Tarter"
                },
                "jobTitle": "Software Developer"
              }
            }`}
      />
      <h1 className="uppercase font-bold text-gray-800 leading-none">
        <span className="text-xl sm:text-2xl xs:text-3xl mb-2 font-oswald tracking-wide">
          Welcome to
        </span>
        <br />
        <span
          className="text-4xl sm:text-5xl xs:text-5xl mb-6 font-oswald"
          style={{ lineHeight: 0.9 }}
        >
          Franklin Tarter&apos;s
        </span>
        <br />
        <span className="text-xl sm:text-2xl xs:text-3xl font-oswald">
          slice of the internet.
        </span>
      </h1>
      <div className="mt-16">
        {/* <h2 className="text-2xl text-brand-gray uppercase mb-4">Writing</h2> */}
        <h2 className="text-lg uppercase text-brand-gray font-serif mb-3 font-light">
          ~ Writing ~
        </h2>
        <div className="mb-4">{articleEls}</div>
        <div className="flex items-end">
          <A
            to="/writing"
            className="text-lg py-4 text-gray-700 text-right ml-auto block flex align-center"
            // className="underline text-gray-800 hover:text-brand-faded"
          >
            <span className="mr-3">More writing</span>
            <ChevronRight className="w-2 fill-current" />
          </A>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-lg uppercase text-brand-gray font-serif mb-3 font-light">
          ~ Other ~
        </h2>
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
      </div>
    </Layout>
  );
};
