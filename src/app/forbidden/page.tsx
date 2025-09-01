import React from "react";

const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">
        403 - Forbidden
      </h1>
      <p className="text-lg text-gray-800 dark:text-gray-200 mb-8">
        You do not have permission to access this page.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
      >
        Go to Homepage
      </a>
    </div>
  );
};

export default ForbiddenPage;