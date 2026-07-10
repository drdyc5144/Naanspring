import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Button } from "../../Components/Common";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-primary-600 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            <FaHome className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
