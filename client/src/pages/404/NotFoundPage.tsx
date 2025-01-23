import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
        404
      </h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-gray-400 max-w-[250px] text-center">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 focus:ring focus:ring-blue-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
