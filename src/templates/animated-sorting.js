import React from "react";
import { SEO, useSEO } from "gatsby-plugin-seo";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { useAnimatedSorting } from "../hooks";
import { P, MdxComponentMap } from "../components/Typography";

import Layout from "../components/Layout";

const SortingLinks = ({ active }) => {
  const sorts = useAnimatedSorting();

  const sortEls = sorts.map(s => {
    let classes =
      "transition hover:cursor-pointer hover:border-brand-gray p-4 pb-3 border-b-2 mr-2 border-gray-400 bold text-gray-800";
    if (s.slug === `/${active}`) {
      classes += " border-brand-gray";
    }
    return (
      <Link to={s.slug} className={classes}>
        {s.frontmatter.title}
      </Link>
    );
  });

  return <div className="mt-6 mb-16">{sortEls}</div>;
};

export default ({ data }) => {
  const { siteUrl } = useSEO();

  const {
    file: {
      name,
      childMdx: { body, frontmatter }
    }
  } = data;

  return (
    <Layout>
      <SEO
        pagePath={`${siteUrl}/${name}`}
        title={frontmatter.title}
        description={frontmatter.description}
        schema={`{
              "@context": "http://schema.org",
              "@type": "WebPage"
            }`}
      />{" "}
      <h1 className="font-light leading-none">
        <span className="text-xl sm:text-5xl xs:text-3xl font-serif text-brand-gray italic">
          Animated Sorting
        </span>
      </h1>
      <SortingLinks active={name} />
      {/* <h2 className="font-light leading-none tracking-wider">
        <span className="sm:text-5xl text-3xl font-serif text-brand-gray italic">
          {frontmatter.title}
        </span>
      </h2> */}
      <MDXProvider components={MdxComponentMap}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
      <div className="mt-12">
        <p className="font-sans font-bold text-lg text-gray-800">
          Running Time
        </p>
        <p className="text-brand-gray font-serif text-2xl font-italic">
          {frontmatter.runningTime}
        </p>
      </div>
      <div className="mt-12">
        <p className="font-sans font-bold text-lg text-gray-800">
          Data Structures
        </p>
        {frontmatter.dataStructures.map(ds => (
          <p
            key={ds}
            className="text-brand-gray font-serif text-2xl font-italic"
          >
            {ds}
          </p>
        ))}
      </div>
      {/* {frontmatter.constraints && (
        <div className="mt-12">
          <p className="font-sans font-bold text-lg text-gray-800">
            Constraints
          </p>
          <p className="text-brand-gray font-serif text-xl">
            {frontmatter.constraints}
          </p>
        </div>
      )} */}
    </Layout>
  );
};

export const query = graphql`
  query AnimatedAlgorithmQuery($id: String) {
    file(id: { eq: $id }) {
      name
      childMdx {
        body
        frontmatter {
          description
          title
          keywords
          runningTime
          dataStructures
        }
      }
    }
  }
`;

// name: GS Stable Matching
// description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
// runningTime: O(n^2)
// Data Structures:
//   - Applicant Preferences - Array ()
//   - Employer Preferences - Array ()
//   - Ranking Matrix - Heap ()
// Constraints: Lorem ipsum dolor sit amet, consectetur adipiscing elit
