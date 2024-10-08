import React from "react";
import Navbar from "../Components/Navbar/Navbar";

function Homepage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center py-10 px-4">
        <h1 className="text-5xl font-bold text-red-500 mb-4">
          Welcome to EduMessenger
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl">
          Connect with your friends and enhance your learning experience! Chat,
          share resources, and collaborate easily.
        </p>
        <div className="flex space-x-4 ">
          <div className="bg-white shadow-lg rounded-lg p-6 w-[50%] transition-transform ">
            <h2 className="text-xl font-semibold text-red-500">
              Instant Messaging
            </h2>
            <p className="mt-2 text-gray-600">
              Stay connected with real-time messaging features.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 w-[50%] transition-transform ">
            <h2 className="text-xl font-semibold text-red-500">
              Collaborative Learning
            </h2>
            <p className="mt-2 text-gray-600">
              Work together on projects and learn collaboratively within the
              app.
            </p>
          </div>
        </div>
      </main>
      <footer className="bg-red-500 text-white text-center p-4">
        <p>
          &copy; {new Date().getFullYear()} EduMessenger. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Homepage;
