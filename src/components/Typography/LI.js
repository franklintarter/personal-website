import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  return <li {...rest}>{children}</li>;
};

Component.defaultClassName = "list-disc list-outside mt-2";

export default withTailwindOverload(Component);
