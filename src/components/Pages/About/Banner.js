import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const Banner = () => {
  // Fluid Image
  const { file } = useStaticQuery(graphql`
    query BannerImageQuery {
      file(relativePath: { eq: "banner.png" }) {
        childImageSharp {
          fluid(maxWidth: 1600, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);
  // Fixed Image
  // const data = useStaticQuery(graphql`
  //   query BannerImageQuery {
  //     file(relativePath: { eq: "banner.png" }) {
  //       childImageSharp {
  //         # Specify the image processing specifications right in the query.
  //         # Makes it trivial to update as your page's design changes.
  //         fixed(width: 400, height: 112) {
  //           ...GatsbyImageSharpFixed
  //         }
  //       }
  //     }
  //   }
  // `);
  return (
    <div>
      <Img
        fluid={file.childImageSharp.fluid}
        // fixed={data.file.childImageSharp.fixed}
      />
    </div>
  );
};

export default Banner;
