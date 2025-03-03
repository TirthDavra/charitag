import ButtonPrimary from "@/components/common/ButtonPrimary";
import {
  faChevronRight,
  faHeart,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Navigate = () => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center justify-center gap-2">
        <span className="text-[#2F2F35] underline">...</span>
        <FontAwesomeIcon icon={faChevronRight} className="text-[#cdd9f7]" />
        <span className="text-[#2F2F35] underline">Medical</span>
        <FontAwesomeIcon icon={faChevronRight} className="text-[#cdd9f7]" />
        <span className="text-[#2F2F35] underline">
          Lorem ipsum dolor sit amet.
        </span>
      </div>
      <div className="flex gap-5">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faShareNodes} />
          <ButtonPrimary
            label={"Share"}
            classNameLabel="text-black underline"
            className="bg-gradient-to-r from-transparent to-transparent !px-2 !shadow-none"
          />
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faHeart} />
          <ButtonPrimary
            label={"Save"}
            classNameLabel="text-black underline"
            className="bg-gradient-to-r from-transparent to-transparent !px-2 !shadow-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Navigate;
