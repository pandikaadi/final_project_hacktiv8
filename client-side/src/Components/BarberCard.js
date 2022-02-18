import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBarber } from "../store/actionCreators/actionCreator";

function ChooseBarber() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function toNavigate(value) {
    dispatch(setBarber(value));
    navigate("/book");
  }
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col w-full">
          <div
            className="mb-4 bg-no-repeat bg-cover h-48"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1543965170-4c01a586684e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1149&q=80')`,
            }}
            onClick={() => toNavigate(1)}
          >
            <div className="flex justify-center mt-20">
              <p className="text-white text-2xl font-semibold">BAGUS</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col w-full">
          <div
            className="mb-4 bg-no-repeat bg-cover h-48"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1543965170-e3d16958f280?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')`,
            }}
            onClick={() => toNavigate(2)}
          >
            <div className="flex justify-center mt-20">
              <p className="text-white text-2xl font-semibold">BAGUS</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col w-full">
          <div
            className="mb-4 bg-no-repeat bg-cover h-48"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1464890064245-e40511fcf984?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60')`,
            }}
            onClick={() => toNavigate(3)}
          >
            <div className="flex justify-center mt-20">
              <p className="text-white text-2xl font-semibold">BAGUS</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col w-full">
          <div
            className="mb-4 bg-no-repeat bg-cover h-48"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506739882538-768415f14347?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60')`,
            }}
            onClick={() => toNavigate(4)}
          >
            <div className="flex justify-center mt-20">
              <p className="text-white text-2xl font-semibold">BAGUS</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChooseBarber;
