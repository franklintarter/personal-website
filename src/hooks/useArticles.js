import { graphql, useStaticQuery } from "gatsby";

export default () => {
  const { result } = useStaticQuery(
    graphql`
      {
        result: allFile(
          filter: { sourceInstanceName: { eq: "articles" } }
          sort: { fields: childMdx___frontmatter___datePublished, order: DESC }
        ) {
          nodes {
            childMdx {
              frontmatter {
                title
                description
                tags
              }
              body
            }
            sourceInstanceName
            name
          }
        }
      }
    `
  );
  return result.nodes.map(n => ({
    slug: `/${n.name}`,
    frontmatter: n.childMdx.frontmatter,
    body: n.childMdx.body
  }));
};
