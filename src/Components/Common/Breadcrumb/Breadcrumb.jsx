import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaChevronRight } from "react-icons/fa";

const Breadcrumb = ({
  items = [],
  className = "",
  separator = <FaChevronRight className="w-3 h-3 text-gray-400" />,
  homeIcon = true,
  showCurrent = true,
}) => {
  const location = useLocation();

  // Auto-generate breadcrumb from path if items not provided
  const generateBreadcrumb = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);

    // If it's the home page
    if (pathSegments.length === 0) {
      return [{ label: "Home", path: "/" }];
    }

    const breadcrumbs = [];
    let currentPath = "";

    // Add Home
    breadcrumbs.push({
      label: "Home",
      path: "/",
      icon: homeIcon ? FaHome : undefined,
    });

    // Build breadcrumb from path segments
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Format the segment name
      const label = segment
        .replace(/-/g, " ")
        .replace(/_/g, " ")
        .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());

      // Check if it's an ID (numbers only)
      const isId = /^\d+$/.test(segment);

      breadcrumbs.push({
        label: isId ? `#${segment}` : label,
        path: currentPath,
        isId: isId,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items.length > 0 ? items : generateBreadcrumb();

  // If showing current is disabled, remove the last item
  const displayItems = showCurrent
    ? breadcrumbItems
    : breadcrumbItems.slice(0, -1);

  return (
    <nav
      className={`flex items-center text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center flex-wrap gap-1">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const Icon = item.icon;

          return (
            <li key={item.path || index} className="flex items-center">
              {index > 0 && (
                <span className="mx-1 text-gray-400">{separator}</span>
              )}

              {isLast ? (
                <motion.span
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`
                    flex items-center gap-1.5
                    ${
                      item.isId
                        ? "text-primary-600 font-medium"
                        : "text-gray-700 font-medium"
                    }
                  `}
                  aria-current="page"
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {item.label}
                </motion.span>
              ) : (
                <Link
                  to={item.path}
                  className={`
                    flex items-center gap-1.5
                    text-gray-500 hover:text-primary-600 
                    transition-colors duration-200
                  `}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
