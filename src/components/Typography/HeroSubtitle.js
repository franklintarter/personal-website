import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  return <p {...rest}>{children}</p>;
};

Component.defaultClassName = "font-body text-4xl text-body font-light";

export default withTailwindOverload(Component);
