import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setService,
  isServiceSelected,
} from "../store/actionCreators/actionCreator";
import pictures from "../assets/images.json";

function FormCard({ isLocated }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function toNavigate(value) {
    if (value && isLocated) {
      dispatch(setService(value));
      dispatch(isServiceSelected(true));
    }
  }
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col w-full">
          {pictures.images.map((x) => (
            <div
              key={x.id}
              className="mb-4 bg-no-repeat bg-cover h-48"
              style={{ backgroundImage: `url(${x.image})` }}
              onClick={() => toNavigate(x.id)}
            >
              <div className="flex justify-center mt-20">
                <p className="text-white text-2xl font-semibold">{x.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FormCard;
