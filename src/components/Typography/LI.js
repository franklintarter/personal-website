import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  return <li {...rest}>{children}</li>;
};

Component.defaultClassName =
  "list-disc text-lg list-outside mt-2 text-gray-800";

export default withTailwindOverload(Component);
