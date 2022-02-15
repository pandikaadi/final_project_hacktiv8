import React from "react";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <>
      <div className="flex justify-center bg-zinc-800 h-screen">
        <Fade>
          <div className="m-auto">
            {/* <div className="flex justify-end">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div> */}
            <form className="px-6 pb-4 space-y-2 lg:px-8 sm:pb-6 xl:pb-8">
              <div className="flex justify-center tracking-widest">
                <h3 className="text-4xl font-light text-white dark:text-white pb-4">
                  SHAVE8
                </h3>
              </div>
              <div className="flex justify-center">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 bloc p-2.5 dkark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-800 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login to your account
              </button>
              <div className="flex justify-center text-sm">
                <label className="flex items-end pt-6 font-medium text-blue-700 dark:text-gray-300 underline-offset-2">
                  Forgot password?
                </label>
              </div>
              <div className="flex flex-1 justify-center text-sm font-medium text-white dark:text-gray-300">
                Not registered?
                <Link
                  to="/signup"
                  className="mx-2 text-blue-700 hover:underline dark:text-blue-500"
                >
                  Create account
                </Link>
              </div>
            </form>
          </div>
        </Fade>
      </div>
    </>
  );
}

export default SignIn;
