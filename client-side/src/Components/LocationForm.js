import React from "react";
import Fade from "react-reveal/Fade";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import image2 from "../assets/image2.png";

function LocationForm() {
  const navigate = useNavigate();

  return (
    <>
      <div className=" w-full h-screen relative">
        <img
          src={image2}
          alt="form"
          className="w-full h-full object-cover absolute mix-blend-overlay"
        />
        <div className="flex h-screen">
          <Fade top cascade>
            <form className="m-auto relative">
              <p className="text-2xl font-bold text-white mb-6">
                SHAVE <span className="text-yellow-500">WITH US !</span>
              </p>
              <div className="flex flex-col">
                <select className="px-4 border-2 rounded border-yellow-900">
                  <option value={"jakarta"}>Jakarta</option>
                  <option value={"bandung"}>Bandung</option>
                </select>
                <button
                  onClick={() => navigate("/map")}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white rounded mt-4"
                >
                  SHAVE IT
                </button>
              </div>
            </form>
          </Fade>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default LocationForm;
