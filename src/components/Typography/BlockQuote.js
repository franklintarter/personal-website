import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ children, ...rest }) => {
  return <blockquote {...rest}>{children}</blockquote>;
};

Component.defaultClassName =
  "py-2 mt-4 border-brand-light-gray bg-gray-200 border-l-2 italic -mx-2 px-2";

export default withTailwindOverload(Component);
