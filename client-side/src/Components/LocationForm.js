import React from "react";
import Fade from "react-reveal/Fade";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import image7 from "../assets/image7.png";

function LocationForm() {
  const navigate = useNavigate();

  return (
    <>
      <div className=" w-full relative">
        <img
          src={image7}
          alt="form"
          className="w-full h-full object-cover absolute mix-blend-overlay"
        />
        <div className="flex h-screen">
          <Fade top cascade>
            <div className="flex">
              <div className="flex flex-1 items-center mx-4">
                <ul>
                  <li>
                    <p className="text-white text-3xl font-medium">
                      Barbershop is not a{" "}
                      <span className="text-red-500 italic">hobby</span>
                    </p>
                  </li>
                  <li className="pb-2">
                    <p className="text-white text-3xl font-medium">
                      it's a
                      <span className="text-red-500 italic"> lifestyle</span>
                    </p>
                  </li>
                  <li className="tracking-wider bg-red-500 w-fit px-2 py-0.5">
                    <p className="text-white text-sm font-medium mb-0.5">
                      SHAVE8
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </Fade>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default LocationForm;
