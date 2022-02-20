import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setService,
  isServiceSelected,
} from "../store/actionCreators/actionCreator";
import { GetAllService } from "../store/actionCreators/actionCreator";

function FormCard({ isLocated }) {
  const dispatch = useDispatch();
  const { serviceDatas } = useSelector((state) => state.data);
  
  function toNavigate(value) {
    if (value && isLocated) {
      dispatch(setService(value));
      dispatch(isServiceSelected(true));
    }
  }

  useEffect(() => {
    dispatch(GetAllService());
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col w-full">
          {serviceDatas.map((x) => (
            <div
              key={x.id}
              className="mb-4 bg-no-repeat bg-cover h-48"
              style={{ backgroundImage: `url(${x.image})` }}
              onClick={() => toNavigate(x)}
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
