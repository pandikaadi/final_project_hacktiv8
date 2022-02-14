import React from "react";
import Fade from "react-reveal/Fade";

function AboutUs() {
  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="flex justify-end flex-row">
          <div className="flex h-screen flex-col">
            <ul className="flex flex-row m-auto">
              <Fade left cascade>
                <li className="m-auto text-right">
                  <p className="font-bold text-6xl tracking-wider mr-10 mb-4">
                    ABOUT US
                  </p>
                  <p className="font-light text-xl mr-10 mb-2">
                    SHAVETIF8 STUDIO TERBENTUK PADA TAHUN 2017. SHAVETIF8 STUDIO
                  </p>
                  <p className="font-light text-xl mr-10 mb-2">
                    MERUPAKAN TEMPAT CUKUR RAMBUT YANG MEMPUNYAI KONSEP
                  </p>
                  <p className="font-light text-xl mr-10 mb-2">
                    MENGGABUNGKAN ANTARA BARBERSHOP DAN SALON.
                  </p>
                </li>
                <li>
                  <img
                    className="w-auto mr-24"
                    alt="about us"
                    src="https://images.unsplash.com/photo-1578390432942-d323db577792?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                  />
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
