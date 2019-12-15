import React from "react";
import PropTypes from "prop-types";
import css from "./TextInput.module.css";

const TextInput = props => {
  const {
    value,
    isValid,
    label,
    validationMessage,
    className,
    ...passProps
  } = props;

  let labelClasses = value ? css.shrink : "";
  if (!isValid) {
    labelClasses = `${labelClasses} text-red-700`;
  }
  return (
    <div className={`${css.container} ${className}`}>
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...passProps}
        id={label}
        type="text"
        value={value}
        className={`transition outline-none w-full pt-4 h-12 pb-1 px-4 text-base border border-body bg-white focus:border-blue-700 active:bg-white ${css.input}`}
      />
      <label
        htmlFor={label}
        className={`font-thin text-gray-600 uppercase hover:cursor-text ${css.label} ${labelClasses}`}
      >
        {label}
      </label>
      {!isValid && validationMessage && (
        <span className="text-xs text-red-700 pt-2 tracking-wider">
          {validationMessage}
        </span>
      )}
    </div>
  );
};

TextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  validationMessage: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

TextInput.defaultProps = {
  isValid: true,
  validationMessage: "",
  onFocus: () => {},
  onBlur: () => {}
};

export default TextInput;
