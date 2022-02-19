import React from "react";
import Fade from "react-reveal/Fade";
import { Link, useNavigate, } from "react-router-dom";
import { useState, } from "react";
import { useDispatch } from "react-redux";
import { doLogin } from "../store/actionCreators/actionCreator";
import { toast } from "react-toastify";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    localStorage.setItem("access_token", "access_token");
    dispatch(
      doLogin({
        email,
        password,
      }),
    )
    .then(() => {
      toast.success('You are logged in', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/home");
    })
    .catch((err) => {
      toast.error(`${err}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    
  }

  return (
    <>
      <div className="flex justify-center bg-zinc-800 h-screen">
        <Fade>
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
