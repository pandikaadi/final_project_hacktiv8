import React from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import {
  showRatingForm,
  setRatingStar,
} from "../store/actionCreators/actionCreator";

function RatingModal() {
  const dispatch = useDispatch();
  const ratingChanged = (newRating) => {
    if (!newRating) {
      dispatch(showRatingForm(false));
    } else {
      dispatch(setRatingStar(newRating));
    }
  };
  const { hasOrder } = useSelector((state) => state.client);

  return (
    <>
      <div className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center">
        <div className="bg-gray-200 max-w-sm py-2 px-3 rounded shadow-xl">
          <div className="items-center">
            <div className="flex justify-end">
              <svg
                onClick={() => ratingChanged()}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {hasOrder && (
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
                  onClick={() => dispatch(showRatingForm(false))}
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
          )}
          {!hasOrder && (
            <div className="p-10">
              <p className="text-md font-medium">SORRY NO ORDER IS AVAILABLE</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default RatingModal;
