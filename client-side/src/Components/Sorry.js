import React from "react";

function Sorry() {
  return (
    <>
      <div>
        <div className="flex justify-center">
          <div className="flex align-center">
            <p className="font-bold text-slate-300">
              Sorry, you can't order a new service unless you've "Finished" and
              "Vote" your service
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sorry;
