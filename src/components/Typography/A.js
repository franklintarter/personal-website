import React from "react";
import { Link } from "gatsby";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  if (rest.to) {
    return <Link {...rest}>{children}</Link>;
  }
  return <a {...rest}>{children}</a>;
};

Component.defaultClassName =
  "underline text-gray-600 transition text-brand font-body hover:text-brand-darken";

export default withTailwindOverload(Component);
