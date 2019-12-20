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
  "underline transition text-gray-800 hover:text-brand leading-none";

export default withTailwindOverload(Component);
