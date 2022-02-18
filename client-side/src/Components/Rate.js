// import React, { useMemo, useState } from "react";
// import PropTypes from "prop-types";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const Rate = ({ count, rating, color, onRating }) => {
//   const [hoverRating, setHoverRating] = useState(0);
//   const getColor = (index) => {
//     if (hoverRating >= index) {
//       return color.filled;
//     } else if (!hoverRating && rating >= index) {
//       return color.filled;
//     }
//     // return color.unfilled;
//   };

//   const starRating = useMemo(() => {
//     return Array(count)
//       .fill(0)
//       .map((_, i) => i + 1)
//       .map((i) => {
//         <FontAwesomeIcon
//           key={i}
//           className="cursor-pointer"
//           icon="star"
//           onClick={() => onRating(i)}
//           style={{ color: getColor(i) }}
//           onMouseEnter={() => setHoverRating(i)}
//           onMouseLeave={() => setHoverRating(0)}
//         />;
//         // <svg
//         //   key={i}
//         //   onClick={() => onRating(i)}
//         //   xmlns="http://www.w3.org/2000/svg"
//         //   className="h-5 w-5"
//         //   viewBox="0 0 20 20"
//         //   fill="currentColor"
//         // >
//         //   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//         // </svg>;
//       });
//   }, [count, rating]);
//   return <>{starRating}</>;
// };

// Rate.propTypes = {
//   count: PropTypes.number,
//   rating: PropTypes.number,
//   onChange: PropTypes.func,
//   color: {
//     filled: PropTypes.string,
//     unfilled: PropTypes.string,
//   },
// };

// Rate.defaultProps = {
//   count: 5,
//   rating: 0,
//   color: {
//     filled: "#f5eb3b",
//     unfilled: "#DCDCDC",
//   },
// };

// export default Rate;

import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Rate = ({ count, rating, color, onRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const getColor = (index) => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && rating >= index) {
      return color.filled;
    }

    return color.unfilled;
  };

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <FontAwesomeIcon
          key={idx}
          className="cursor-pointer"
          icon="star"
          onClick={() => onRating(idx)}
          style={{ color: getColor(idx) }}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ));
  }, [count, rating, hoverRating]);

  return <div>{starRating}</div>;
};

Rate.propTypes = {
  count: PropTypes.number,
  rating: PropTypes.number,
  onChange: PropTypes.func,
  color: {
    filled: PropTypes.string,
    unfilled: PropTypes.string,
  },
};

Rate.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: "#f5eb3b",
    unfilled: "#DCDCDC",
  },
};

export default Rate;
