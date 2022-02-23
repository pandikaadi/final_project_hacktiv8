import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setRegisterAdmin,
  postAdmin,
} from "../store/actionCreator/actionCreator";
import { toast } from "react-toastify";

function AdminModal() {
  const dispatch = useDispatch();
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleChangeInput = (e) => {
    setNewAdmin({
      ...newAdmin,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostAdmin = (e) => {
    e.preventDefault();

    const payload = {
      username: newAdmin.username,
      email: newAdmin.email,
      password: newAdmin.password,
      phoneNumber: newAdmin.phoneNumber,
      isAdmin: true,
    };
    dispatch(postAdmin(payload))
      .then((res) => {
        return res.json().then((data) => {
          if (res.ok) {
            dispatch(setRegisterAdmin(false));
            setNewAdmin({
              username: "",
              email: "",
              password: "",
              phoneNumber: "",
            })
            toast.success("New admin registered");
          } else {
            return Promise.reject(data);
          }
        });
      })
      .catch((err) => {
        toast.error("Invalid requirement");
      });
  };

  return (
    <>
      <div className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center">
        <div className="bg-gray-200 max-w-sm py-2 px-3 rounded shadow-xl">
          <div className="items-center">
            <div className="flex justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => dispatch(setRegisterAdmin(false))}
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div>
            <form
              className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
              onSubmit={handlePostAdmin}
            >
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                REGISTER NEW ADMIN
              </h3>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleChangeInput}
                  value={newAdmin.username}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="username"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChangeInput}
                  value={newAdmin.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={handleChangeInput}
                  value={newAdmin.password}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  onChange={handleChangeInput}
                  value={newAdmin.phoneNumber}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="xxx-xxx-xxx"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-black hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminModal;
