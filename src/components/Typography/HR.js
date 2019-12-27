import React from "react";
import { withTailwindOverload } from "tailwindcss-overload";

const Component = ({ ...rest }) => {
  return <hr {...rest} />;
};

Component.defaultClassName = "my-3 mt-6";

export default withTailwindOverload(Component);
