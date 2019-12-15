/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Link } from "gatsby";
import css from "./Button.module.css";

export default (
  props = {
    className: "",
    loading: false,
    buttonStyle: "solid"
  }
) => {
  const {
    children,
    to,
    href,
    buttonStyle,
    loading,
    className,
    type,
    ...passProps
  } = props;
  const defaultClasses =
    "inline-flex uppercase font-semibold tracking-wide rounded-none py-3 px-8 shadow transition h-12";
  let buttonClasses = "";

  switch (buttonStyle) {
    case "outlined":
      buttonClasses =
        "bg-transparent border-2 border-brand hover:brand-darken text-brand hover:text-brand-darken";
      break;
    case "outlined-white":
      buttonClasses = "bg-transparent border-2 border-white text-white";
      break;
    default:
      buttonClasses =
        "bg-brand hover:bg-brand-darken text-white hover:text-white";
      break;
  }

  buttonClasses = `${buttonClasses} ${className} ${defaultClasses}`;

  if (loading) {
    buttonClasses = `${buttonClasses} ${css.loading}`;
  }

  if (to) {
    return (
      <Link {...passProps} className={buttonClasses} to={to}>
        {props.children}
      </Link>
    );
  }
  if (href) {
    return (
      <a {...props} className={buttonClasses}>
        {props.children}
      </a>
    );
  }
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type || "button"} {...passProps} className={buttonClasses}>
      {children}
    </button>
  );
};
