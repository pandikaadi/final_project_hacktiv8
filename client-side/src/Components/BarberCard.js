import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setBarber } from "../store/actionCreators/actionCreator";
import { GetBarberData } from "../store/actionCreators/actionCreator";

function ChooseBarber() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { barberDatas } = useSelector((state) => state.data);

  function toNavigate(value) {
    dispatch(setBarber(value));
    navigate("/book");
  }
  console.log(barberDatas);
  useEffect(() => {
    dispatch(GetBarberData());
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col w-full">
          {barberDatas.map((x) => (
            <div
              key={x.id}
              className="mb-4 bg-no-repeat bg-cover h-48"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1543965170-4c01a586684e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1149&q=80')`,
              }}
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

export default ChooseBarber;
