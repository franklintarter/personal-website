import React from "react";

export default ({ children, className = "", maxWidth }) => {
  const maxWidthClass = maxWidth || "max-w-6xl";
  return (
    <section className={`w-full ${className}`}>
      <div className={`${maxWidthClass} px-4 mx-auto`}>{children}</div>
    </section>
  );
};
