import React from "react";
import Fade from "react-reveal/Fade";
import image5 from "../assets/image5.png";

function AboutUs() {
  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="flex justify-end">
          <div className="flex h-screen">
            <ul className="flex flex-col m-auto">
              <Fade right cascade>
                <li className="flex justify-center">
                  <img className="w-10/12" alt="about us" src={image5} />
                </li>
                <li className="m-auto text-center ml-8 mt-4">
                  <p className="font-bold text-4xl tracking-wider mr-10 mb-4">
                    ABOUT US
                  </p>
                  <p className="font-light text-xs mr-10 mb-2">
                    SHAVETIF8 STUDIO TERBENTUK PADA TAHUN 2017.
                  </p>
                  <p className="font-light text-xs mr-10 mb-2">
                    SHAVETIF8 STUDIO MERUPAKAN TEMPAT CUKUR RAMBUT
                  </p>
                  <p className="font-light text-xs mr-10 mb-2">
                    YANG MEMPUNYAI KONSEP MENGGABUNGKAN ANTARA
                  </p>
                  <p className="font-light text-xs mr-10 mb-2">
                    BARBERSHOP DAN SALON.
                  </p>
                </li>
              </Fade>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
