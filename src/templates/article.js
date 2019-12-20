import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../components/Layout";

import { MdxComponentMap } from "../components/Typography";

export default ({ data }) => {
  const {
    file: {
      name,
      childMdx: { body, frontmatter }
    }
  } = data;
  return (
    <Layout>
      <h1 className="font-oswald text-gray-900 text-4xl font-medium uppercase leading-tight mb-4">
        {frontmatter.title}
      </h1>
      {/* <p>{name}</p> */}
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
        }
      }
    }
  }
`;
