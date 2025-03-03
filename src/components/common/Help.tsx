import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

interface IHelpProps {
  classNameIcon?: string;
  className?: string;
  label?: string;
  classNameLabel?: string;
}
const Help = ({
  classNameIcon,
  label = "This is demo msg.",
  className,
  classNameLabel,
}: IHelpProps) => {
  return (
    <div className={className}>
      <TooltipProvider delayDuration={1}>
        <Tooltip>
          <TooltipTrigger>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className={`${classNameIcon}`}
            />
          </TooltipTrigger>
          <TooltipContent className={classNameLabel}>{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Help;
