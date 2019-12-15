import { graphql, useStaticQuery } from "gatsby";

export default () => {
  const {
    file: {
      childMdx: { frontmatter }
    }
  } = useStaticQuery(
    graphql`
      query GLOBAL_CONTENT_QUERY {
        file(sourceInstanceName: { eq: "global" }) {
          childMdx {
            frontmatter {
              siteName
              twitterUrl
              instagramUrl
            }
          }
        }
      }
    `
  );
  return frontmatter;
};
