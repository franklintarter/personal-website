import React from "react";
import { SEO } from "gatsby-plugin-seo";
import Layout from "../../components/Layout";
import ArticlePreview from "../../components/UI/ArticlePreview";
import { useArticles } from "../../hooks";

export default () => {
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
        title="Writing"
        description="Franklin Tarter's Writing"
        pagePath="/writing"
        schema={`{
              "@context": "http://schema.org",
              "@type": "WebPage"
            }`}
      />{" "}
      <h1 className="font-light leading-none">
        <span className="text-xl sm:text-5xl xs:text-3xl font-serif text-brand-gray italic">
          Writing
        </span>
      </h1>
      <div className="mt-8">{articleEls}</div>
    </Layout>
  );
};
