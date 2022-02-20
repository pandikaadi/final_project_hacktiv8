import React from "react";
import Fade from "react-reveal/Fade";
import image1 from "../assets/image4.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { Parallax } from "react-parallax";

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
      <div className="relative h-screen">
        <img
          src={image1}
          alt="navbar"
          className="w-full h-3/4 object-cover absolute mix-blend-overlay filter
          "
        />
        <ul className="flex justify-center py-4 flex-row drop-shadow-md relative">
          <li>
            <p className="text-white font-semibold  mx-4">CONTACT</p>
          </li>
          {isAuthen && (
            <li>
              <Link to="/home" className="text-white font-semibold  mx-4">
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
              <Link to="/signup" className="text-white font-semibold  mx-4">
                SIGN UP
              </Link>
            </li>
          )}
        </ul>
        <div className="flex h-screen justify-center">
          <div className="flex items-center">
            <ul className="text-slate-100 font-semibold">
              <Fade left>
                <div className="flex justify-center">
                  <li className="flex items-center tracking-wider">
                    <p className="text-white text-5xl drop-shadow-md mb-2">
                      SHAVE8
                    </p>
                  </li>
                </div>
              </Fade>
              <Fade right cascade>
                <li className="flex flex-col font-medium italic items-center tracking-wider">
                  <p className="text-xl drop-shadow-md">
                    WHERE THE <span className="text-red-500"> BARBER</span>
                  </p>
                  <p className="text-xl drop-shadow-md">
                    COMES TO <span className="text-red-500"> YOU</span>
                  </p>
                </li>
              </Fade>
              <Fade bottom>
                <div className="flex justify-center">
                  <div className="flex">
                    <div className="flex flex-1 items-end pt-10 mt-20 mx-4">
                      <Marquee gradient={false} speed={120}>
                        <p className="text-white font-light mt-10">
                          이발사가 당신에게 오는 곳
                        </p>
                      </Marquee>
                    </div>
                  </div>
                </div>
              </Fade>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpperBody;
