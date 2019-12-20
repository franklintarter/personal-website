import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  return <h1 {...rest}>{children}</h1>;
};

Component.defaultClassName =
  "text-5xl text-body font-heading mt-4 leading-tight";

export default withTailwindOverload(Component);
