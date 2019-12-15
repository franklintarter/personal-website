import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  return <blockquote {...rest}>{children}</blockquote>;
};

Component.defaultClassName = "pl-4 border-brand border-l-2 italic";

export default withTailwindOverload(Component);
