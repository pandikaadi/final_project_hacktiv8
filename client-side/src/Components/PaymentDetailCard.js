import React from "react";
import { useDispatch } from "react-redux";
import Bounce from "react-reveal/Bounce";
import { showTheDetail } from "../store/actionCreators/actionCreator";
import image from "../assets/image3.png";

function PaymentDetailCard() {
  const dispatch = useDispatch();
  return (
    <>
      <Bounce top>
        <div className="flex flex-col m-auto bg-white p-8 rounded-md">
          <div className="flex justify-center mb-4">
            <p className="text-xl font-bold tracking-wider">MY ORDER</p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Service:</span> Hair cut
            </p>
            <p>
              <span className="font-semibold">Date:</span> 22 January 2022, 8 pm
            </p>
            <p>
              <span className="font-semibold">Payment Status:</span> Not yet
              paid
            </p>
            <p>
              <span className="font-semibold">Status Order:</span> Ongoing
            </p>
            <img src={image} alt="icon" />
            <div className="flex justify-center">
              <p className="text-sm">Pandika is comming in 2 minutes</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => dispatch(showTheDetail(false))}
                className="bg-green-400 hover:bg-green-200 shadow-lg shadow-green-500/50 px-4 py-2 text-white text-sm font-semibold tracking-wider rounded"
              >
                SHOW ME THE MAP!
              </button>
            </div>
          </div>
        </div>
      </Bounce>
    </>
  );
}

export default PaymentDetailCard;
