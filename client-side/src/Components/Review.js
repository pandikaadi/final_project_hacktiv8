import React from "react";
import Fade from "react-reveal/Fade";

function Review() {
  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="flex justify-center h-screen">
          <div className="flex m-auto flex-col text-center">
            <Fade top cascade>
              <p className="font-light text-5xl p-6">
                Had my hair cut after booking an appointment online today.
              </p>
              <p className="font-semibold text-slate-400">
                "I have definitely found my new go-to barbershop. I was totally
                shocked by their affordable offered services. Despite their
              </p>
              <p className="font-semibold text-slate-400">
                affordable rate, they still provided their fellow customers a
                high-quality haircut. I am very grateful that I came to this
                place
              </p>
              <p className="font-semibold text-slate-400">
                for my hair. The best of the best place to come for any
                hairstyle dreams",
              </p>
              <p className="m-auto font-semibold mt-2">Eugene Delacroix</p>
            </Fade>
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
