import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../store/actionCreators/actionCreator";
import FormCard from "../Components/FormCard";
import ChooseBarber from "../Components/BarberCard";
import RatingModal from "../Components/RatingModal";
import { toast } from "react-toastify";
import { GetOrders } from "../store/actionCreators/actionCreator";
import BottomNav from "../Components/BottomNav";
import Sorry from "../Components/Sorry";

function CardForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selector, setSelector] = useState(false);
  const { userOrder } = useSelector((state) => state.data);
  const { isService, loading, error } = useSelector((state) => state.client);

  console.log(isService);

  function handleSelector(e) {
    dispatch(setLocation(e.target.value));
    setSelector(true);
  }

  function handleShowDetailOrder() {
    if (userOrder.orders.length !== 0) {
      if (
        userOrder.orders[userOrder.orders.length - 1].statusBarber !==
          "Finished" &&
        userOrder.orders[userOrder.orders.length - 1].statusBarber !== "Voted"
      ) {
        navigate("/payment");
      } else {
        toast.error("No order is available");
      }
    } else {
      toast.error("No order is available");
    }
  }

  useEffect(() => {
    dispatch(GetOrders(localStorage.getItem("access_token")));
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <p>LOADING..</p>
      </>
    );
  }
  if (error) {
    return (
      <>
        <div className="flex justify-center">
          <p className="font-bold text-white m-auto text-xl">
            SOMETHING WENT WRONG
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex bg-white w-full min-h-screen flex-col">
        <div className="mx-6 mt-16">
          <ul className="flex flex-row justify-between">
            <li>
              <p className="text-zinc-900 text-3xl font-bold tracking-wider">
                Hello, User!
              </p>
              {!isService && (
                <p className="text-zinc-900">Find your personality now!</p>
              )}
              {isService && (
                <p className="text-zinc-900">Find your personal hairdresser!</p>
              )}
            </li>
            <li className="pb-4">
              {!isService && (
                <select
                  onChange={handleSelector}
                  className="flex font-semibold text-white bg-zinc-900 mt-4 px-2 py-1 rounded-lg"
                >
                  <option>My Location</option>
                  <option value="1">Jakarta</option>
                  <option value="2">Bandung</option>
                </select>
              )}
            </li>
          </ul>
        </div>

        <div className="mx-4 mt-4 flex justify-between flex-row mb-4">
          <div className="mr-2 flex flex-col mt-2 border-2 w-fit px-2 py-1 rounded">
            <button className="bg-transparent font-semibold border-1 border-zinc-900 text-zinc-900 text-xs">
              DISCOUNTS
            </button>
          </div>
          <div className="mr-2 flex flex-row mt-2 border-2 w-fit px-2 py-1 rounded">
            <button className="bg-transparent font-semibold border-1 border-zinc-900 text-zinc-900 text-xs">
              MISSIONS
            </button>
          </div>
          <div className="mr-2 flex flex-row mt-2 border-2 w-fit px-2 py-1 rounded">
            <button className="bg-transparent font-semibold border-1 border-zinc-900 text-zinc-900 text-xs">
              VOUCHERS
            </button>
          </div>
          <div className="flex flex-row mt-2 border-2 w-fit px-2 py-1 rounded">
            <button
              className="bg-transparent font-semibold border-1 border-zinc-900 text-zinc-900 text-xs"
              onClick={() => handleShowDetailOrder()}
            >
              MY ORDER
            </button>
          </div>
        </div>
        {!isService &&
          (userOrder.orders.length === 0 ||
            userOrder.orders[userOrder.orders.length - 1].statusBarber ===
              "Voted") && <FormCard isLocated={selector} />}
        {/* {!isService &&
          (userOrder.orders[userOrder.orders.length - 1].statusBarber ===
            "Finished" ||
            userOrder.orders[userOrder.orders.length - 1].statusBarber ===
              "Pending") && <Sorry />} */}
        {isService && <ChooseBarber />}
        {userOrder.orders[userOrder.orders.length - 1].statusBarber ===
          "Finished" && <RatingModal />}
        <BottomNav />
      </div>
    </>
  );
}

export default CardForm;
