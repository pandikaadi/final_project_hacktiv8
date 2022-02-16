import React from "react";
import Fade from "react-reveal/Fade";
import image1 from "../assets/image1.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function UpperBody() {
  const [isAuthen, setIsAuthen] = useState(false);

  const authenCheck = () => {
    const authen = localStorage.getItem("access_token");
    if (authen) {
      setIsAuthen(true);
    } else {
      setIsAuthen(false);
    }
  };

  useEffect(() => {
    authenCheck();
  }, []);

  return (
    <>
      <div className="">
        <div className="w-full relative">
          <img
            src={image1}
            alt="navbar"
            className="w-full h-screen object-cover absolute mix-blend-overlay filter saturate-0"
          />
          <ul className="flex justify-center py-4 flex-row drop-shadow-md relative">
            <li>
              <p className="text-white font-semibold  mx-4">CONTACT</p>
            </li>
            {isAuthen && (
              <li>
                <Link to="/" className="text-white font-semibold  mx-4">
                  BOOKING
                </Link>
              </li>
            )}
            {!isAuthen && (
              <li>
                <Link to="/signin" className="text-white font-semibold  mx-4">
                  SIGN IN
                </Link>
              </li>
            )}
            {!isAuthen && (
              <li>
                <p className="text-white font-semibold  mx-4">SIGN UP</p>
              </li>
            )}
          </ul>
          <div className="flex justify-center">
            <div className="flex h-screen">
              <ul className="text-slate-100 font-semibold m-auto">
                <Fade left cascade>
                  <li className="flex justify-center tracking-wider m-2">
                    <p className="text-white text-xl drop-shadow-md">
                      "BARBERSHOP IS NOT A HOBBY
                    </p>
                  </li>
                </Fade>
                <Fade right cascade>
                  <li className="flex justify-center tracking-wider m-2">
                    <p className="text-xl drop-shadow-md">
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
        </div>
      </div>
    </>
  );
}

export default UpperBody;
