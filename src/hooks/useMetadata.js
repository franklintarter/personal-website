import { graphql, useStaticQuery } from "gatsby";

export default () => {
  const { site } = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            twitterUrl
            linkedInUrl
            githubUrl
          }
        }
      }
    `
  );
  return site.siteMetadata;
};
