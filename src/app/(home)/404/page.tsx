import Link from "next/link";
import React from "react";

const Error404 = () => {
  return (
    <div className="container mt-[102px] flex flex-1 flex-col items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center">
          <h1 className="mb-4 text-5xl font-bold text-red-500">404</h1>
          <h1 className="mb-4 text-5xl font-bold text-slate-800">
            {" "}
            - Not Found
          </h1>
        </div>
        <p className="mb-6 text-lg text-gray-800">
          Oops! It seems this page doesn&apos;t exist.
        </p>
        <Link href="/" shallow className="text-blue-500 hover:underline">
          Return to home
        </Link>
      </div>
    </div>
  );
};

export default Error404;
