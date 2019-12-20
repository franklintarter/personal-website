import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  return <p {...rest}>{children}</p>;
};

Component.defaultClassName =
  "leading-relaxed text-gray-800 text-base tracking-tight mb-3 font-sans";

export default withTailwindOverload(Component);
