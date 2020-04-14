import { graphql, useStaticQuery } from "gatsby";

export default () => {
  const { result } = useStaticQuery(
    graphql`
      {
        result: allFile(filter: { sourceInstanceName: { eq: "images" } }) {
          nodes {
            relativePath
            childImageSharp {
              fluid(maxWidth: 450) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    `
  );

  return result.nodes.map(n => ({
    name: n.relativePath,
    fluid: n.childImageSharp.fluid
  }));
};
