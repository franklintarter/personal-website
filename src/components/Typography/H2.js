import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  return <h2 {...rest}>{children}</h2>;
};

Component.defaultClassName =
  "text-4xl text-gray-900 font-serif mt-8 leading-snug font-light -mb-3";

export default withTailwindOverload(Component);
