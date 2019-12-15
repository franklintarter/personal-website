import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  return <h4 {...rest}>{children}</h4>;
};

Component.defaultClassName =
  "font-body text-lg uppercase text-gray-600 font-semibold tracking-wide mb-4";

export default withTailwindOverload(Component);
