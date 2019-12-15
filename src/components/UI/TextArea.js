import React, { useRef } from "react";
import css from "./TextInput.module.css";

export default props => {
  const { className, label, value, ...passProps } = props;
  const el = useRef(null);
  const labelClasses = value ? css.shrink : "";
  const focus = () => {
    el.current.focus();
  };
  return (
    <div className={`${css.container} ${className}`}>
      <textarea
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...passProps}
        id={label}
        ref={el}
        rows="4"
        cols="40"
        className="w-full transition outline-none w-full pt-4 pb-1 px-4 text-base border border-body bg-white focus:border-blue-700 active:bg-white"
      />
      <label
        onClick={focus}
        htmlFor={label}
        className={`font-thin text-gray-600 uppercase hover:cursor-text ${css.label} ${labelClasses}`}
      >
        {label}
      </label>
    </div>
  );
};
