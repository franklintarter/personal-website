import React from "react";
import Image from "gatsby-image";
import { Link } from "gatsby";
import { useImages } from "../../hooks";

export default ({ name, imgName, url }) => {
  const { fluid } = useImages().find(img => img.name === imgName);
  return (
    <Link
      to={url}
      className="border border-solid border-gray-100 inline-block hover:neo-glow hover:transform-scale-102 transition shadow-xl hover:shadow-2xl hover:cursor-pointer transition"
    >
      <div className="w-64">
        <h3 className="text-center px-2 pt-2 text-2xl text-brand-gray font-serif leading-tight mb-2">
          {name}
        </h3>
        <div className="w-64">
          <Image fluid={fluid} />
        </div>
      </div>
    </Link>
  );
};
