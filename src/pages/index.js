import React from "react";
import { Link } from "gatsby";
import { SEO, useSEO } from "gatsby-plugin-seo";
import { useArticles } from "../hooks";
import Layout from "../components/Layout";

const ArticlePreview = ({ title, description, slug, tags }) => {
  const tagEls = tags.map(t => (
    <div
      key={t}
      className="hover:bg-brand-gray bg-brand-light-gray py-1 px-2 text-sm text-gray-100 mt-2 mb-1 mr-2 inline-block"
    >
      {t}
    </div>
  ));

  return (
    <Link to={slug}>
      <div className="mb-6 pb-1 border-b-2 border-gray-200 hover:border-brand-light-gray transition">
        <h3 className="text-3xl text-brand-gray font-serif leading-tight mb-2">
          {title}
        </h3>
        <p className="text-gray-700">{description}</p>
        {tagEls}
      </div>
    </Link>
  );
};

const pageTitle = "Home";

export default () => {
  const { siteUrl } = useSEO();
  const articles = useArticles();

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
        <h2 className="text-xl text-gray-700 uppercase mb-1">Writing</h2>
        {articleEls}
      </div>
    </Layout>
  );
};
