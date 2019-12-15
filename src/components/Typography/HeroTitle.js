import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  return <h1 {...rest}>{children}</h1>;
};

Component.defaultClassName = "text-6xl text-body font-heading leading-tight";

export default withTailwindOverload(Component);
