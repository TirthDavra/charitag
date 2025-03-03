import Link from "next/link";

const NavOne = () => {
  return (
    <nav className="hidden justify-end border-b border-solid border-[rgba(57,105,224,0.25)] font-thin lg:flex">
      <ul className="flex mb-[8px] gap-[25px] font-light">
        <li>
          <Link href="google.com">How it works</Link>
        </li>
        <li>
          <Link href="google.com">About Us</Link>
        </li>
        <li>
          <Link href="google.com">FAQs</Link>
        </li>
        <li>
          <Link href="google.com">Contact Us</Link>
        </li>
        <li>
          <Link href="google.com">FR</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavOne;
