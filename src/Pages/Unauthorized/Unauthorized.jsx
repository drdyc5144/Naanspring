import { Link } from "react-router-dom";
import { FaLock, FaArrowLeft } from "react-icons/fa";
import { Button } from "../../Components/Common";

const Unauthorized = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6">
      <div className="text-center max-w-md w-full">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <FaLock className="w-10 h-10 sm:w-12 sm:h-12 text-red-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Access Denied
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mb-6">
          You don't have permission to access this page. Please contact your
          administrator if you believe this is an error.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="w-full sm:w-auto">
            <Button
              variant="primary"
              className="w-full sm:w-auto flex items-center justify-center"
            >
              <FaArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
