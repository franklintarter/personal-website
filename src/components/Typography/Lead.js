import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  return <p {...rest}>{children}</p>;
};

Component.defaultClassName = "font-light text-lg tracking-wide mb-6 text-body";

export default withTailwindOverload(Component);
