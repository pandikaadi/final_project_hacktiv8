import React from "react";
import Fade from "react-reveal/Fade";

function Review() {
  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="flex justify-center h-screen">
          <div className="flex m-auto flex-col text-center">
            <Fade top cascade>
              <p className="font-light text-xl my-2 px-4">
                Had my hair cut after booking an appointment online today.
              </p>
              <p className="font-semibold text-slate-500 text-xs">
                "I have definitely found my new go-to barbershop.
              </p>
              <p className="font-semibold text-slate-500 text-xs">
                I was totally shocked by their affordable offered services.
              </p>
              <p className="font-semibold text-slate-500 text-xs">
                I am very grateful that I came to this place for my hair.
              </p>
              <p className="font-semibold text-slate-500 text-xs">
                The best of the best place to come for any hairstyle dreams",
              </p>
              <p className="m-auto font-semibold mt-2 text-xs">
                Eugene Delacroix
              </p>
            </Fade>
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
