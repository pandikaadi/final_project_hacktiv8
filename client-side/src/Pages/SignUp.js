import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CreateNewClient } from "../store/actionCreators/actionCreator";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
  });

  const handleChangeInput = (e) => {
    const result = e.target.value;
    const field = e.target.name;

    setNewUser({
      ...newUser,
      [field]: result,
    });
  };

  const signUpHandler = (e) => {
    e.preventDefault();

    const payload = {
      email: newUser.email,
      username: newUser.username,
      password: newUser.password,
      phoneNumber: newUser.phoneNumber,
    };

    // console.log(payload);
    dispatch(CreateNewClient(payload));
    // .then((res) => {
    //   console.log(res);
    // });
    // navigate("/signin");
  };

  return (
    <>
      <div className="flex justify-center bg-zinc-800 h-screen">
        <Fade>
          <div className="m-auto">
            <form
              onSubmit={signUpHandler}
              className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
            >
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
                  value={newUser.email}
                  onChange={handleChangeInput}
                  className="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 bloc p-2.5 dkark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={newUser.username}
                  onChange={handleChangeInput}
                  placeholder="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={newUser.password}
                  onChange={handleChangeInput}
                  placeholder="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={newUser.phoneNumber}
                  onChange={handleChangeInput}
                  placeholder="phone number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-800 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign up
              </button>
              <div className="flex flex-1 justify-center text-sm font-medium text-white dark:text-gray-300">
                Already have account?
                <Link
                  to="/signin"
                  className="mx-2 text-blue-700 hover:underline dark:text-blue-500"
                >
                  Sign in here!
                </Link>
              </div>
            </form>
          </div>
        </Fade>
      </div>
    </>
  );
}

export default SignUp;
