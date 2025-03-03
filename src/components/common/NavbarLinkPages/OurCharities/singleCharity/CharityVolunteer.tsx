import React from "react";
import CharityDescription from "./CharityDescription";
import VolunteerSlider from "./VolunteerSlider";

const CharityVolunteer = () => {
  return (
    <div className="mt-[109px] grid grid-cols-1 items-center  sm:gap-[23px] md:flex-row lg:grid-cols-4  ">
      <div className="col-span-1">
        <CharityDescription
          className=""
        />
      </div>
      <div className="pt-[75px] sm:pt-0 col-span-3">
        <VolunteerSlider />
      </div>
    </div>
  );
};

export default CharityVolunteer;
