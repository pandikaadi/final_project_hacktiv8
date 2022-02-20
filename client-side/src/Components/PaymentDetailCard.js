import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Bounce from "react-reveal/Bounce";
import {
  cancelOrder,
  GetOrders,
  showTheDetail,
} from "../store/actionCreators/actionCreator";
import { formatDate, currency } from "../helper/helper";
import image from "../assets/image3.png";
function PaymentDetailCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userOrder } = useSelector((state) => state.data);
  const { loading, error } = useSelector((state) => state.client);

  const backHome = () => {
    navigate("/home");
  };
  console.log(userOrder.orders);
  function handleCancelOrder(){
    dispatch(cancelOrder(userOrder.orders[userOrder.orders.length - 1].id))
    .then(() => {
      navigate("/home")
    })
    .catch((err) => {
      console.log(err, `>>>>`);
    })
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex justify-center mb-4">
            <p className="text-xl font-bold tracking-wider">MY ORDER</p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Service: </span>
              {userOrder.orders[userOrder.orders.length - 1].Service.name}
            </p>
            <p>
              <span className="font-semibold">Date: </span>
              {formatDate(userOrder.orders[userOrder.orders.length - 1].date)}
            </p>
            <p>
              <span className="font-semibold">Time: </span>
              {userOrder.orders[userOrder.orders.length - 1].hour}
            </p>
            <p>
              <span className="font-semibold">Payment Status: </span>
              {!userOrder.orders[userOrder.orders.length - 1].statusPayment && <span>Not paid</span>}
              {userOrder.orders[userOrder.orders.length - 1].statusPayment && <span>Paid</span>}
            </p>
            <p>
              <span className="font-semibold">Status Order: </span>
              {userOrder.orders[userOrder.orders.length - 1].statusBarber}
            </p>
            <p>
              <span className="font-semibold">Price: </span>
              {currency(userOrder.orders[userOrder.orders.length - 1].price)}
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
              { !loading && userOrder.orders[userOrder.orders.length - 1].statusPayment === false ?
                <a
                  href={userOrder.orders[userOrder.orders.length - 1].paymentUrl}
                  className="pb-2 rounded bg-slate-300 hover:bg-slate-200 shadow-lg shadow-slate-500/50 px-4 pt-2 text-xs font-semibold"
                >
                  Pay Order
                </a> : null

              }
              { !loading && userOrder.orders[userOrder.orders.length - 1].statusPayment === false ?
                <button onClick={handleCancelOrder} className="pb-2 rounded bg-red-400 hover:bg-red-300 shadow-lg shadow-red-700/50 px-2 pt-2 text-xs text-white font-semibold">
                Cancel Order
              </button> : null

              }
              
            </div>
          </div>
        </div>
      </Bounce>
    </>
  );
}

export default PaymentDetailCard;
