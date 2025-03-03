import React from "react";
import NavOne from "./NavOne";
import NavTwo from "./Navs/NavTwo";

const Header = ({
  className,
  classNameNavTwo,
  classNameSearch,
}: {
  className?: string;
  classNameNavTwo?: string;
  classNameSearch?: string;
}) => {
  return (
    <header
      className={`z-1 flex flex-col justify-center py-1 pb-2 ${className}`}
    >
      <NavOne />
      <NavTwo className={classNameNavTwo} classNameSearch={classNameSearch} />
    </header>
  );
};

export default Header;
