import { Link } from "react-router-dom";
import { FaLock, FaArrowLeft } from "react-icons/fa";
import { Button } from "../../Components/Common";

const Unauthorized = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaLock className="w-12 h-12 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-500 mb-6">
          You don't have permission to access this page. Please contact your
          administrator if you believe this is an error.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button variant="primary">
              <FaArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
