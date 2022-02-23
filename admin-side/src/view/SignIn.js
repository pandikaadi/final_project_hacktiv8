import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../store/actionCreator/actionCreator";
import { toast } from "react-toastify";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(e) {
    const result = e.target.value;
    setEmail(result);
  }
  function handlePassword(e) {
    const result = e.target.value;
    setPassword(result);
  }
  function handleLogin(e) {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };

    dispatch(adminLogin(payload)).then((res) => {
      return res
        .json()
        .then((data) => {
          if (res.ok) {
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("role", data.role);
            toast.success("Login success");
            navigate("/");
          } else {
            return Promise.reject(data);
          }
        })
        .catch((err) => {
          toast.error("Invalid usernmae or password");
        });
    });
  }
  return (
    <>
      <div className="flex justify-center bg-zinc-800 h-screen">
        <div className="m-auto">
          <form
            className="px-6 pb-4 space-y-2 lg:px-8 sm:pb-6 xl:pb-8"
            onSubmit={handleLogin}
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
                value={email}
                onChange={handleEmail}
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
                value={password}
                onChange={handlePassword}
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
            <div className="flex flex-1 justify-center text-sm font-medium text-white dark:text-gray-300"></div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
