import React from "react";
import { useState } from "react";
import Fade from "react-reveal/Fade";
import image1 from "../assets/image1.png";
import SignIn from "./SignIn";

function UpperBody({ payload }) {
  const [signIn, setSignIn] = useState(false);

  function signInButtonHandler() {
    setSignIn(true);
    payload(true);
  }

  function pageHandler() {
    setSignIn(false);
    payload(false);
  }

  return (
    <>
      <div className="">
        <div className="w-full h-screen relative">
          <img
            src={image1}
            // src="https://images.unsplash.com/photo-1532710093739-9470acff878f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            className="w-full h-screen object-cover absolute mix-blend-overlay filter saturate-0"
          />
          <ul className="flex justify-center py-4 flex-row drop-shadow-md relative">
            <li>
              <p className="text-white font-semibold  mx-4">ABOUT US</p>
            </li>
            <li>
              <p className="text-white font-semibold  mx-4">CONTACT</p>
            </li>
            <li>
              <p className="text-yellow-400 font-semibold mx-4">SHAVETIF8</p>
            </li>
            <li>
              <button
                className="text-white font-semibold  mx-4"
                onClick={signInButtonHandler}
              >
                SIGN IN
              </button>
            </li>
            <li>
              <p className="text-white font-semibold  mx-4">SIGN UP</p>
            </li>
          </ul>
          <div className="flex justify-center">
            <div className="flex h-screen">
              <ul className="text-slate-100 font-semibold m-auto">
                <Fade left cascade>
                  <li className="flex justify-center tracking-wider m-8">
                    <p className="text-white text-5xl drop-shadow-md">
                      "BARBERSHOP IS NOT A HOBBY
                    </p>
                  </li>
                </Fade>
                <Fade right cascade>
                  <li className="flex justify-center tracking-wider m-8">
                    <p className="text-5xl drop-shadow-md">
                      IT'S A
                      <span className="font-semibold text-yellow-500 drop-shadow-md">
                        LIFESTYLE
                      </span>
                      "
                    </p>
                  </li>
                </Fade>
              </ul>
            </div>
          </div>
          {signIn && <SignIn closeModal={pageHandler} />}
        </div>
      </div>
    </>
  );
}

export default UpperBody;
