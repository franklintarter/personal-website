import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  return <ul {...rest}>{children}</ul>;
};

Component.defaultClassName = "ml-8";

export default withTailwindOverload(Component);
