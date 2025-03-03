import React from "react";
import RatingStarFilter from "./RatingStarFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
// import ReactStars from "react-rating-stars-component";

interface Rating {
  title: string;
  value: number;
}

interface FilterParameter {
  ratings: number[];
}

interface RatingsProps {
  filterParameter: FilterParameter;
  handleChangeCheck: (key: string, value: number, checked: boolean) => void;
  firstHalfRatings: Rating[];
  secondHalfRatings: Rating[];
}

const Ratings: React.FC<RatingsProps> = ({
  filterParameter,
  handleChangeCheck,
  firstHalfRatings,
  secondHalfRatings,
}) => {
  return (
    <div className="my-4">
      <h1 className="text-xl font-bold">Ratings</h1>
      <div className="grid grid-cols-2">
        <div>
          {firstHalfRatings.map((rating) => (
            <label key={rating.value} className="text-black-700 relative block">
              <input
                type="checkbox"
                name="dummyRatings"
                value={rating.value}
                checked={filterParameter.ratings.includes(rating.value)}
                onChange={(e) =>
                  handleChangeCheck("ratings", rating.value, e.target.checked)
                }
                className="appearance-none"
              />
              <div className="flex items-center gap-2">
                <div
                  className={`${
                    filterParameter.ratings.includes(rating.value)
                      ? "bg-gradient-to-l from-gradient_color_1 to-gradient_color_2"
                      : "bg-white"
                  } flex h-[25px] w-[25px] items-center justify-center rounded-sm border border-blue-200`}
                >
                  <FontAwesomeIcon icon={faCheck} className="text-white" />
                </div>
                <span>
                  {rating.title === "All" ? (
                    rating.title
                  ) : (
                    <div className="flex items-center gap-2 ">
                      <RatingStarFilter rating={rating.value} />& Up
                    </div>
                  )}
                </span>
              </div>
            </label>
          ))}
        </div>
        <div>
          {secondHalfRatings.map((rating) => (
            <label key={rating.value} className="text-black-700 relative block">
              <input
                type="checkbox"
                name="dummyRatings"
                value={rating.value}
                checked={filterParameter.ratings.includes(rating.value)}
                onChange={(e) =>
                  handleChangeCheck("ratings", rating.value, e.target.checked)
                }
                className="appearance-none"
              />
              <div className="flex items-center gap-2">
                <div
                  className={`${
                    filterParameter.ratings.includes(rating.value)
                      ? "bg-gradient-to-l from-gradient_color_1 to-gradient_color_2"
                      : "bg-white"
                  } flex h-[25px] w-[25px] items-center justify-center rounded-sm border border-blue-200`}
                >
                  <i className="fa-solid fa-check text-white"></i>
                </div>
                <span>
                  {rating.title === "All" ? (
                    rating.title
                  ) : (
                    <div className="flex items-center gap-2 ">
                      <RatingStarFilter rating={rating.value} />& Up
                    </div>
                  )}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ratings;
