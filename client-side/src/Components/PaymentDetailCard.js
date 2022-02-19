import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Bounce from "react-reveal/Bounce";
import { showTheDetail } from "../store/actionCreators/actionCreator";
import image from "../assets/image3.png";

function PaymentDetailCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backHome = () => {
    navigate("/home");
  };

  return (
    <>
      <Bounce top>
        <div className="flex flex-col m-auto bg-white p-8 rounded-md">
          <div className="flex justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              onClick={backHome}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
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
            <div className="flex justify-center pt-2 space-x-2">
              <button className="pb-2 rounded bg-slate-300 hover:bg-slate-200 shadow-lg shadow-slate-500/50 px-4 pt-2 text-xs font-semibold">
                Pay order
              </button>
              <button className="pb-2 rounded bg-red-400 hover:bg-red-300 shadow-lg shadow-red-700/50 px-2 pt-2 text-xs text-white font-semibold">
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </Bounce>
    </>
  );
}

export default PaymentDetailCard;
