import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  return <p {...rest}>{children}</p>;
};

Component.defaultClassName =
  "leading-relaxed text-gray-800 text-base mt-5 font-sans text-lg";

export default withTailwindOverload(Component);
