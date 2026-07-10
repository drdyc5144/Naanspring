import { forwardRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      placeholder,
      value,
      onChange,
      error,
      required = false,
      disabled = false,
      className = "",
      icon: Icon,
      iconPosition = "left",
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    const baseStyles =
      "w-full px-4 py-2.5 border rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed";

    const errorStyles = error
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-300";

    const paddingStyles = Icon
      ? iconPosition === "left"
        ? "pl-10"
        : "pr-10"
      : "";

    const classes = `${baseStyles} ${errorStyles} ${paddingStyles} ${className}`;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {Icon && iconPosition === "left" && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon className="w-5 h-5" />
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            className={classes}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="w-5 h-5" />
              ) : (
                <FaEye className="w-5 h-5" />
              )}
            </button>
          )}

          {Icon && iconPosition === "right" && !isPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>

        {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
