import { forwardRef } from "react";
import { FaChevronDown } from "react-icons/fa";

const Select = forwardRef(
  (
    {
      label,
      options = [],
      value,
      onChange,
      placeholder = "Select an option",
      error,
      required = false,
      disabled = false,
      className = "",
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "w-full px-4 py-2.5 pr-10 border rounded-md appearance-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed";

    const errorStyles = error
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-300";

    const classes = `${baseStyles} ${errorStyles} ${className}`;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            className={classes}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            {...props}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <FaChevronDown className="w-4 h-4" />
          </div>
        </div>

        {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
