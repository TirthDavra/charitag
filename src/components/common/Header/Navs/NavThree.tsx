"use client";
import { useEffect, useState } from "react";
import { Button } from "../../ButtonPrimary";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import img from "@images/test.jpg";
import Link from "next/link";
import ConsumerFilter from "../../Modals/filters";
import { useSearchParams } from "next/navigation";

const dealsCategory = [
  "Experiences",
  "Restaurants",
  "Health & Beauty",
  "E-learning",
  "Products",
  "Services",
];

const NavThree = () => {
  const [selectedCategory, setSelectedCategory] = useState("Experiences");
  const [filterModal, setFilterModal] = useState(false);

  // const searchParams = useSearchParams();
  // useEffect(() => {
  //   setFilterModal(searchParams.get("show") === "true");
  // }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center overflow-x-scroll md:overflow-auto  ">
        <div className="flex min-w-[610px] gap-[15px] md:mb-7">
          {dealsCategory.map((item) => (
            <label key={item} className="text-black-700 block cursor-pointer">
              <input
                type="radio"
                name="dealCategory"
                value={item}
                checked={selectedCategory === item}
                onChange={() => handleCategoryChange(item)}
                className="appearance-none"
              />
              <div className="flex flex-col items-center lg:hidden" key={item}>
                <Image
                  alt=""
                  src={img}
                  className="h-[50px] w-[50px] rounded-full"
                />
                <span
                  className={`ml- p-1.5 font-bold ${
                    selectedCategory === item
                      ? "border-b-[2px] border-blue-500 text-blue-500"
                      : ""
                  }`}
                >
                  {item}
                </span>
              </div>
              <span
                className={`px-[15px] hidden min-w-full rounded-md border-[#a7b3ff] whitespace-nowrap bg-white py-[5px] leading-6 tracking-tight text-[20px] font-bold lg:block ${
                  selectedCategory === item
                    ? "border border-blue-500 text-blue-500"
                    : "border border-solid border-[rgba(57,105,224,0.25)]"
                }`}
              >
                {item}
              </span>
            </label>
          ))}
        </div>
        <div className="">
          <Button
            label={"Clear"}
            classNameLabel="text-[14px]"
            className="!mb-[2px] underline"
            onClick={() => setSelectedCategory("")}
          />
        </div>
      </div>
      <div className="mb-5 hidden items-center rounded-full border border-[#bac3fe] outline-none lg:flex">
        <Link href="/all-deals?show=true">
          <Button
            className="text-black h-[50px] gap-4 "
            icon={<FontAwesomeIcon icon={faFilter} />}
            label={"Filters"}
            classNameIcon="text-gray-900"
          />
        </Link>
      </div>
      {filterModal && <ConsumerFilter onClose={() => setFilterModal(false)} />}
    </div>
  );
};

export default NavThree;
