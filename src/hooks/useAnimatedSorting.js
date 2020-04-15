import { graphql, useStaticQuery } from "gatsby";

export default () => {
  const { result } = useStaticQuery(
    graphql`
      {
        result: allFile(
          filter: { sourceInstanceName: { eq: "animated-sorting" } }
        ) {
          nodes {
            name
            childMdx {
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
      }
    `
  );
  console.log(result);
  return result.nodes.map(n => ({
    slug: `/${n.name}`,
    frontmatter: n.childMdx.frontmatter
  }));
};
