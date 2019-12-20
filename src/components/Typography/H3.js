import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  return <h3 {...rest}>{children}</h3>;
};

Component.defaultClassName =
  "text-2xl text-gray-900 font-semibold font-serif font-semibold mb-4";

export default withTailwindOverload(Component);
