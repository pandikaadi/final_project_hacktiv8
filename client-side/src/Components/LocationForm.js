import React from "react";
import Fade from "react-reveal/Fade";
import Footer from "./Footer";
import image2 from "../assets/image2.png";

function LocationForm() {
  return (
    <>
      <div className=" w-full h-screen relative">
        <img
          src={image2}
          //   src="https://images.unsplash.com/photo-1561889053-c22fe12cce8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1132&q=80"
          className="w-full h-full object-cover absolute mix-blend-overlay"
        />
        <div className="flex h-screen">
          <Fade top cascade>
            <form className="m-auto relative">
              <p className="text-5xl font-bold text-white mb-6">
                SHAVE <span className="text-yellow-500">WITH US !</span>
              </p>
              <div className="flex flex-col">
                <select className="px-4 border-2 rounded border-yellow-500">
                  <option value={"jakarta"}>Jakarta</option>
                  <option value={"bandung"}>Bandung</option>
                </select>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded mt-4">
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
