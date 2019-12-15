import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  return <p {...rest}>{children}</p>;
};

Component.defaultClassName =
  "leading-relaxed font-body text-base text-body tracking-tight mb-6";

export default withTailwindOverload(Component);
