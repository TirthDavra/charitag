import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Deal {
  title: string;
  value: string;
}

interface FilterParameter {
  exceptionalDeals: string[];
}

interface ExceptionalDealsProps {
  dummyDeals: Deal[];
  filterParameter: FilterParameter;
  handleChangeCheck: (key: string, value: string, checked: boolean) => void;
}

const ExceptionalDeals: React.FC<ExceptionalDealsProps> = ({
  dummyDeals,
  handleChangeCheck,
  filterParameter,
}) => {
  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold">Exceptional deals</h1>
      {dummyDeals.map((item) => (
        <label key={item.value} className="text-black-700 relative block">
          <input
            type="checkbox"
            name="dummyDeals"
            value={item.value}
            checked={filterParameter.exceptionalDeals.includes(item.value)}
            onChange={(e) =>
              handleChangeCheck(
                "exceptionalDeals",
                item.value,
                e.target.checked,
              )
            }
            className="appearance-none"
          />
          <div className="flex items-center gap-2">
            <div
              className={`${
                filterParameter.exceptionalDeals.includes(item.value)
                  ? "bg-gradient-to-l from-gradient_color_1 to-gradient_color_2"
                  : "bg-white"
              } flex h-[25px] w-[25px] items-center justify-center rounded-sm border border-blue-200`}
            >
              <FontAwesomeIcon icon={faCheck} className="text-white" />
            </div>
            <span>{item.title}</span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default ExceptionalDeals;
