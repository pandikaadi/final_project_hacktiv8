import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import {
  showRatingForm,
  setRatingStar,
  GetOrders,
  PostVote,
} from "../store/actionCreators/actionCreator";
import { toast } from "react-toastify";

let star = 0;

function RatingModal() {
  const dispatch = useDispatch();
  const { userOrder } = useSelector((state) => state.data);

  const ratingChanged = (newRating) => {
    dispatch(setRatingStar(newRating));
    star = newRating;
    return star;
  };

  const submitButtonHandler = () => {
    if (!star) {
      toast.error("Please vote");
    } else {
      const payload = {
        star: star,
        orderData: userOrder.orders[userOrder.orders.length - 1],
      };
      dispatch(PostVote(payload));
    }
  };
  const { hasOrder } = useSelector((state) => state.client);
  console.log(hasOrder);

  useEffect(() => {
    dispatch(GetOrders(localStorage.getItem("access_token")));
  }, []);

  return (
    <>
      <div className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center">
        <div className="bg-gray-200 max-w-sm py-4 px-3 rounded shadow-xl">
          
            <div className="flex justify-center m-2">
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  HOW WAS YOUR LAST CUT?
                </h3>
                <div className="flex justify-center">
                  <p>Let us know your thought!</p>
                </div>

                <div className="flex justify-center">
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                  />
                </div>

                <div className="flex justify-between">
                  <div className="flex items-start"></div>
                </div>
                <button
                  onClick={submitButtonHandler}
                  type="submit"
                  className="mb-1 w-full text-white bg-black hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  SUBMIT!
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  We're looking forward for your{" "}
                  <span className="text-blue-600">next order!</span>
                </div>
              </div>
            </div>
          
        </div>
      </div>
    </>
  );
}

export default RatingModal;
