// SvgComponent.jsx
import ActionContent, { ActionType } from "@/components/common/Modals/actionModal/ActionContent";
import { faExclamation, faQuestion, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

const SvgComponent = ({ type }:{ type: ActionType }) => {
  const properties = {
    "info": {
      icon: faExclamation,
      primary: "bg-[#386ADD]/20",
      secondary: "bg-[#386ADD]/25",
      main: "bg-[#386ADD]",
    },
    "question": {
      icon: faQuestion,
      primary: "bg-[#386ADD]/20",
      secondary: "bg-[#386ADD]/25",
      main: "bg-[#386ADD]",
    },
    "error": {
      icon: faExclamationTriangle,
      primary: "bg-red-500/20",
      secondary: "bg-red-500/25",
      main: "bg-red-500",
    },
  };

  return (
    <div className="relative h-[110px] w-[110px] flex mx-auto">
      {/* Outer circle */}
      <div className={`absolute top-0 left-0 right-0 bottom-0 rounded-full m-auto flex justify-center items-center w-[107px] h-[107px] animate-pulse ${properties[type].primary}`} ></div>

      {/* Middle circle */}
      <div className={`absolute top-0 left-0 right-0 bottom-0 rounded-full flex m-auto justify-center items-center w-[92px] h-[92px] animate-pulse ${properties[type].secondary} `} ></div>

      {/* Inner circle with icon */}
      <div className={`absolute top-0 left-0 right-0 bottom-0 m-auto flex items-center  w-[78px] h-[78px] justify-center rounded-full ${properties[type].main}`}>
        <FontAwesomeIcon icon={properties[type].icon} className="text-white text-xl" />
      </div>
    </div>
  );
};

export default SvgComponent;
