import React from "react";
import { SEO, useSEO } from "gatsby-plugin-seo";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../components/Layout";

import { MdxComponentMap } from "../components/Typography";

export default ({ data }) => {
  const { siteUrl } = useSEO();
  const {
    file: {
      name,
      childMdx: {
        body,
        frontmatter,
        wordCount: { words },
        text
      }
    }
  } = data;
  // TODO add date and modified
  console.log(frontmatter);
  return (
    <Layout>
      <SEO
        pagePath={`${siteUrl}/${name}`}
        title={frontmatter.title}
        description={frontmatter.description}
        ogType="article"
        schema={`
        { "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "${frontmatter.title}",
        "genre": "${frontmatter.genre}",
        "wordcount": "${words}",
        "url": "${siteUrl}/${name}",
        "publisher": { 
          "@type": "Person",
          "name": "Franklin Tarter"
        },
        "mainEntityOfPage": "True",
        "keywords": "${frontmatter.keywords.join(" ")}",
        "datePublished": "${frontmatter.datePublished}",
        "dateCreated": "${frontmatter.datePublished}",
        "dateModified": "${frontmatter.dateModified}",
        "description": "${frontmatter.description}",
        "articleBody": "${text}",
        "author": {
            "@type": "Person",
            "name": "Franklin Tarter",
            "image": {
              "@type": "ImageObject",
              "@id": "${siteUrl}/#franklin",
              "url": "${siteUrl}/img/franklin.png",
              "caption": "Franklin Tarter"
            }
          }
        }
                `}
      />
      <h1 className="font-oswald text-gray-900 text-4xl font-medium uppercase leading-tight mb-8">
        {frontmatter.title}
      </h1>
      <MDXProvider components={MdxComponentMap}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  );
};

export const query = graphql`
  query ArticleQuery($id: String) {
    file(id: { eq: $id }) {
      name
      childMdx {
        body
        frontmatter {
          description
          title
          tags
          keywords
          formattedPublished: datePublished(formatString: "MMMM DD, YYYY")
          formattedModified: dateModified(formatString: "MMMM DD, YYYY")
          datePublished
          dateModified
        }
        wordCount {
          words
        }
        text: excerpt(pruneLength: 1000000)
        timeToRead
      }
    }
  }
`;
