import React from "react";
import { Link } from "gatsby";

export default ({ title, description, slug, tags }) => {
  const tagEls = tags.map(t => (
    <div
      key={t}
      className="transition hover:bg-brand-gray bg-brand-light-gray py-1 px-2 text-sm text-gray-100 mt-2 mb-1 mr-2 inline-block"
    >
      {t}
    </div>
  ));

  return (
    <Link to={slug}>
      <div className="mb-6 pb-1 border-b-2 border-gray-200 hover:border-brand-light-gray transition">
        <h3 className="text-3xl text-brand-gray font-serif leading-tight mb-2">
          {title}
        </h3>
        <p className="text-gray-700">{description}</p>
        {tagEls}
      </div>
    </Link>
  );
};
