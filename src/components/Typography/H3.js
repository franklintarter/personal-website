import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  return <h3 {...rest}>{children}</h3>;
};

Component.defaultClassName = "text-2xl text-body font-body font-semibold mb-4";

export default withTailwindOverload(Component);
