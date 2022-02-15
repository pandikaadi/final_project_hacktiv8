import React from "react";
import Fade from "react-reveal/Fade";

function AboutUs2() {
  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="flex justify-end">
          <div className="flex h-screen">
            <ul className="flex flex-col m-auto">
              <Fade left cascade>
                <li className="flex justify-center">
                  <img
                    className="w-10/12"
                    alt="about us"
                    src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80"
                  />
                </li>
                <li className="m-auto text-center mr-10 mt-4">
                  <p className="font-bold text-4xl tracking-wider ml-10 mb-4">
                    QUALITY IS OUR MAIN PRIORITY
                  </p>
                  <p className="font-light text-xs ml-10 mb-2">
                    INI LAH KAMI YANG PEDULI DENGAN KUALITAS
                  </p>
                  <p className="font-light text-xs ml-10 mb-2">
                    HASIL POTONGAN RAMBUT UNTUK PARA CUSTOMER KAMI.
                  </p>
                  <p className="font-light text-xs ml-10 mb-2">
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
