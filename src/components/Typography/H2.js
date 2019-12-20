import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  return <h2 {...rest}>{children}</h2>;
};

Component.defaultClassName =
  "text-3xl text-gray-900 font-serif mb-1 leading-snug font-light";

export default withTailwindOverload(Component);
