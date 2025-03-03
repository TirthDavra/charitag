import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Location {
  title: string;
  value: string;
}

interface FilterParameter {
  locations: string[];
}

interface LocationsProps {
  firstHalfLocations: Location[];
  secondHalfLocations: Location[];
  filterParameter: FilterParameter;
  handleChangeCheck: (key: string, value: string, checked: boolean) => void;
}

const Locations: React.FC<LocationsProps> = ({
  firstHalfLocations,
  filterParameter,
  handleChangeCheck,
  secondHalfLocations,
}) => {
  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold">Locations</h1>
      <div className="grid grid-cols-2">
        <div>
          {firstHalfLocations.map((item) => (
            <label key={item.value} className="text-black-700 relative block">
              <input
                type="checkbox"
                name="dummyLocations"
                value={item.value}
                checked={filterParameter.locations.includes(item.value)}
                onChange={(e) =>
                  handleChangeCheck("locations", item.value, e.target.checked)
                }
                className="appearance-none"
              />
              <div className="flex items-center gap-2">
                <div
                  className={`${
                    filterParameter.locations.includes(item.value)
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
        <div>
          {secondHalfLocations.map((item) => (
            <label key={item.value} className="text-black-700 relative block">
              <input
                type="checkbox"
                name="dummyLocations"
                value={item.value}
                checked={filterParameter.locations.includes(item.value)}
                onChange={(e) =>
                  handleChangeCheck("locations", item.value, e.target.checked)
                }
                className="appearance-none"
              />
              <div className="flex items-center gap-2">
                <div
                  className={`${
                    filterParameter.locations.includes(item.value)
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
      </div>
    </div>
  );
};

export default Locations;
