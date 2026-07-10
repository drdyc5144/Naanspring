import { motion } from "framer-motion";

const Loader = ({
  size = "md",
  color = "primary",
  fullScreen = false,
  className = "",
  text = "",
}) => {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
    xl: "w-16 h-16 border-4",
  };

  const colors = {
    primary: "border-primary-500 border-t-transparent",
    white: "border-white border-t-transparent",
    gray: "border-gray-300 border-t-transparent",
  };

  const spinner = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        className={`${sizes[size]} ${colors[color]} rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {text && <p className="mt-4 text-sm text-gray-500">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Loader;
