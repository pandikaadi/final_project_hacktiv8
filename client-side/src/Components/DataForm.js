import React from "react";

function DataForm() {
  return (
    <>
      <div className="flex justify-center bg-zinc-800">
        <div className="m-auto">
          <form className="px-6 pb-4 space-y-2 lg:px-8 sm:pb-6 xl:pb-8">
            <div className="flex justify-center">
              <input
                type="date"
                name="name"
                id="name"
                className="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 bloc p-2.5 dkark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Date"
                required
              />
            </div>
            <div className="flex justify-center">
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="time"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div className="flex justify-center">
              <input
                type="textarea"
                name="address"
                id="address"
                placeholder="address"
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
          </form>
        </div>
      </div>
    </>
  );
}

export default DataForm;
