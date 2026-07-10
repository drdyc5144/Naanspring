import { forwardRef } from "react";
import { motion } from "framer-motion";
import Loader from "../Loader/Loader";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      disabled = false,
      className = "",
      type = "button",
      onClick,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-primary-800 text-white hover:bg-primary-700 focus:ring-primary-500",
      secondary:
        "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-400",
      accent:
        "bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-400",
      outline:
        "border-2 border-primary-800 text-primary-800 hover:bg-primary-800 hover:text-white focus:ring-primary-500",
      ghost: "text-primary-800 hover:bg-primary-50 focus:ring-primary-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      success:
        "bg-success-500 text-white hover:bg-success-600 focus:ring-success-500",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-6 py-3 text-lg",
      xl: "px-8 py-4 text-xl",
    };

    const classes = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

    return (
      <motion.button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled || isLoading}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader size="sm" color="white" className="mr-2" />
            Loading...
          </>
        ) : (
          children
        )}
      </motion.button>
    );
  },
);

Button.displayName = "Button";

export default Button;
