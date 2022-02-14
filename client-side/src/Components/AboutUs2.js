import React from "react";
import Fade from "react-reveal/Fade";

function AboutUs2() {
  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="flex justify-start flex-row">
          <div className="flex h-screen flex-col">
            <ul className="flex flex-row m-auto">
              <Fade right cascade>
                <li>
                  <img
                    className="w-auto ml-24"
                    alt="about us"
                    src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80"
                  />
                </li>
                <li className="m-auto text-left">
                  <p className="font-bold text-6xl tracking-wider ml-10 mb-4">
                    QUALITY IS OUR MAIN PRIORITY
                  </p>
                  <p className="font-light text-xl ml-10 mb-2">
                    INI LAH KAMI YANG PEDULI DENGAN KUALITAS
                  </p>
                  <p className="font-light text-xl ml-10 mb-2">
                    HASIL POTONGAN RAMBUT UNTUK PARA CUSTOMER KAMI.
                  </p>
                  <p className="font-light text-xl ml-10 mb-2">
                    RAMBUT ADALAH KANVAS KAMI UNTUK MEMBUAT SEBUAH KARYA.
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

export default AboutUs2;
