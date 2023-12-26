import { useState } from "react";
import { Link } from "react-router-dom";

function ResetPassword() {
  return (
    <>
      <div className="container mx-auto pt-10 pb-20">
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mx-auto px-10 pb-10">
          <div className="flex mx-auto justify-center pt-10">
            <svg fill="#9ca3af" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="60px" height="60px">
              <path d="M 32 9 C 24.832 9 19 14.832 19 22 L 19 27.347656 C 16.670659 28.171862 15 30.388126 15 33 L 15 49 C 15 52.314 17.686 55 21 55 L 43 55 C 46.314 55 49 52.314 49 49 L 49 33 C 49 30.388126 47.329341 28.171862 45 27.347656 L 45 22 C 45 14.832 39.168 9 32 9 z M 32 13 C 36.963 13 41 17.038 41 22 L 41 27 L 23 27 L 23 22 C 23 17.038 27.037 13 32 13 z M 21 31 L 43 31 C 44.105 31 45 31.895 45 33 L 45 49 C 45 50.105 44.105 51 43 51 L 21 51 C 19.895 51 19 50.105 19 49 L 19 33 C 19 31.895 19.895 31 21 31 z" />
            </svg>
          </div>
          <p className="flex mx-auto justify-center text-gray-600 pb-6">Reset Password</p>
          <div className="px-6 pb-6">
            <p className="text-gray-700 text-sm text-center">Enter the email address you signed up with, and we'll send you a reset link.</p>
          </div>

          <div className="mb-2">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="magiqpad@example.com" />
          </div>
          <button className="mgq-bg-primary w-full text-white py-2 px-4 rounded text-sm focus:outline-none focus:shadow-outline" type="button">
            Reset Password
          </button>
        </div>
        <div className="py-6 text-center mgq-primary-light text-xs">
            <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
