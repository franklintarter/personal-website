import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  return <h2 {...rest}>{children}</h2>;
};

Component.defaultClassName =
  "text-3xl text-body font-body mb-4 leading-snug font-light";

export default withTailwindOverload(Component);
