import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../store/actionCreators/actionCreator";
import FormCard from "../Components/FormCard";
import ChooseBarber from "../Components/BarberCard";
import RatingModal from "../Components/RatingModal";
import { showRatingForm } from "../store/actionCreators/actionCreator";

function CardForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selector, setSelector] = useState(false);
  const { showRating } = useSelector((state) => state.data);
  const { isService } = useSelector((state) => state.client);

  function handleSelector(e) {
    dispatch(setLocation(e.target.value));
    setSelector(true);
  }

  function handleShowRating() {
    dispatch(showRatingForm(true));
  }

  return (
    <>
      <div className="flex bg-zinc-800 w-full min-h-screen flex-col">
        <div className="mx-4 mt-4">
          <div className="flex flex-row justify-between">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mt-4 mb-4 h-12 w-12 stroke-white"
              onClick={() => navigate("/")}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mt-4 mb-4 h-11 w-11 fill-white"
              onClick={() => navigate("/")}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <p className="text-white text-3xl font-bold tracking-wider">
            Hello User
          </p>
          <p className="text-white">Find your personality now!</p>
          <select
            onChange={handleSelector}
            className="flex font-semibold bg-white mt-4 px-2 pb-1 rounded"
          >
            <option>Your Location</option>
            <option value="1">Jakarta</option>
            <option value="2">Bandung</option>
          </select>
        </div>

        <div className="mx-4 mt-4 flex justify-center flex-row mb-4">
          <div className="mr-2 flex flex-col mt-2 border-2 w-fit px-2 py-1 rounded">
            <button className="bg-transparent font-semibold border-1 border-white text-white text-xs">
              DISCOUNTS
            </button>
          </div>
          <div className="mr-2 flex flex-row mt-2 border-2 w-fit px-2 py-1 rounded">
            <button className="bg-transparent font-semibold border-1 border-white text-white text-xs">
              MISSIONS
            </button>
          </div>
          <div className="mr-2 flex flex-row mt-2 border-2 w-fit px-2 py-1 rounded">
            <button className="bg-transparent font-semibold border-1 border-white text-white text-xs">
              VOUCHERS
            </button>
          </div>
          <div className="flex flex-row mt-2 border-2 w-fit px-2 py-1 rounded">
            <button
              className="bg-transparent font-semibold border-1 border-white text-white text-xs"
              onClick={() => handleShowRating()}
            >
              MY ORDER
            </button>
          </div>
        </div>
        {!isService && <FormCard isLocated={selector} />}
        {isService && <ChooseBarber />}
        {showRating && <RatingModal />}
      </div>
    </>
  );
}

export default CardForm;
