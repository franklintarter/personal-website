import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const Image = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "franklin.png" }) {
        childImageSharp {
          fluid(maxWidth: 950, grayscale: true) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div>
      <Img
        fluid={data.placeholderImage.childImageSharp.fluid}
        className="w-20 shadow-xl rounded-full"
      />
    </div>
  );
};

export default Image;
