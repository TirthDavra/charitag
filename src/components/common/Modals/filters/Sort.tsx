import React from "react";

interface SortItem {
  title: string;
  value: string;
}

interface SortProps {
  firstHalfSort: SortItem[];
  secondHalfSort: SortItem[];
  filterParameter: {
    sort: string;
  };
  handleChangeRadio: (value: string) => void;
}

const Sort: React.FC<SortProps> = ({
  firstHalfSort,
  secondHalfSort,
  filterParameter,
  handleChangeRadio,
}) => {
  return (
    <div>
      <h1 className="text-xl font-bold">Sort by</h1>
      <div className="grid grid-cols-2">
        <div>
          {firstHalfSort.map((item) => (
            <label key={item.value} className="text-black-700 relative block">
              <input
                type="radio"
                name="dummySort"
                value={item.value}
                checked={filterParameter.sort === item.value}
                onChange={() => handleChangeRadio(item.value)}
                className="appearance-none"
              />
              <div className="flex items-center gap-2">
                <span
                  className={`relative inline-block h-6 w-6 rounded-full border border-gray-300 bg-white`}
                >
                  <span
                    className={`${
                      filterParameter.sort === item.value
                        ? "bg-gradient-to-l from-gradient_color_1 to-gradient_color_2"
                        : "bg-white"
                    } absolute left-1/2 top-1/2 inline-block  h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform rounded-full`}
                  ></span>
                </span>
                <span>{item.title}</span>
              </div>
            </label>
          ))}
        </div>
        <div>
          {secondHalfSort.map((item) => (
            <label key={item.value} className="text-black-700 relative block">
              <input
                type="radio"
                name="dummySort"
                value={item.value}
                checked={filterParameter.sort === item.value}
                onChange={() => handleChangeRadio(item.value)}
                className="appearance-none"
              />
              <div className="flex items-center gap-2">
                <span
                  className={`relative inline-block h-6 w-6 rounded-full border border-gray-300 bg-white`}
                >
                  <span
                    className={`${
                      filterParameter.sort === item.value
                        ? "bg-gradient-to-l from-gradient_color_1 to-gradient_color_2"
                        : "bg-white"
                    } absolute left-1/2 top-1/2 inline-block  h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform rounded-full`}
                  ></span>
                </span>
                <span>{item.title}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sort;
