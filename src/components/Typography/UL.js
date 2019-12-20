import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  return <ul {...rest}>{children}</ul>;
};

Component.defaultClassName = "mt-4 ml-4";

export default withTailwindOverload(Component);
