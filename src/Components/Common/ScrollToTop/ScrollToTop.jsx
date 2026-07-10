import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({
  children,
  behavior = "smooth",
  delay = 0,
  excludePaths = [],
}) => {
  const location = useLocation();

  useEffect(() => {
    // Check if current path should be excluded from scroll to top
    const shouldExclude = excludePaths.some(
      (path) =>
        location.pathname === path || location.pathname.startsWith(path + "/"),
    );

    if (!shouldExclude) {
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: behavior,
        });
      };

      // Add delay if specified
      if (delay > 0) {
        const timer = setTimeout(scrollToTop, delay);
        return () => clearTimeout(timer);
      } else {
        scrollToTop();
      }
    }
  }, [location.pathname, behavior, delay, excludePaths]);

  return children || null;
};

export default ScrollToTop;
