import React from "react";
import charitagNewLogo from "@images/charitag_new_logo.webp";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { getCategories } from "@/api/auth/categories";
import Fundraiser from "./Fundraiser";

const Footer = async () => {
  const response = await getCategories("charity");

  return (
    <div className="container">
      <footer className="relative mx-auto grid max-w-[1550px] grid-cols-2 gap-8 pb-10 pt-[75px] lg:grid-cols-5">
        <div className="col-span-2 flex flex-col items-center gap-[20px] lg:col-span-1 lg:items-start ">
          <div className="h-[45px]">
            <Image
              src={charitagNewLogo}
              alt=""
              className="h-full"
              width={194}
              height={45}
            />
          </div>
          <div className="ml-5 flex gap-[15px] text-2xl text-logo_color">
            <FontAwesomeIcon icon={faFacebookF} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faTwitter} />
          </div>
          <div className="ml-5 hidden flex-col gap-[10px] text-sm lg:flex">
            <p className="text-[#2F2F35]">Charitag &copy; 2022</p>
            <p className="text-[rgba(47,47,53,0.5)]">Terms of use</p>
            <p className="text-[rgba(47,47,53,0.5)]">Privacy policy</p>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <h1 className="pb-2 text-xl font-bold text-blue-500">Learn more</h1>
          <ul className="flex flex-col gap-[10px] font-bold">
            <li>
              <a href="google.com">How it works</a>
            </li>
            <li>
              <a href="google.com">About Charitag</a>
            </li>
            <li>
              <a href="google.com">Refund Policy</a>
            </li>
            <li>
              <a href="google.com">FAQs</a>
            </li>
            <li>
              <a href="google.com">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* {response?.data?.length > 0 && (
          <div className="flex flex-col justify-between">
            <h1 className="pb-2 text-xl font-bold text-blue-500">
              Fundraise for
            </h1>
            <ul className="flex flex-col gap-[10px] font-bold">
              {response.data.slice(0, 5).map((item) => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
          </div>
        )} */}

        <Fundraiser  />

        <div className="col-span-2 flex flex-col justify-between">
          <h1 className="mb-4 text-xl font-bold lg:mb-0">
            Subscribe and stay up-to-date on Charitag news, exclusive offers,
            and more.
          </h1>
          <form
            action=""
            className="lg:shadow-xsm flex flex-col gap-2 rounded-lg p-[5px] lg:flex-row lg:gap-0 lg:rounded-md lg:border-[1.5px] lg:border-[1px_solid_rgba(57,105,224,0.25)]"
          >
            <input
              type="text"
              name="charitag_sub_email"
              placeholder="Enter your Email address"
              className="flex-1 rounded-lg border-[1.5px] border-blue-400 px-5 py-3 outline-none lg:border-none lg:px-3 lg:py-0 "
            />
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-gradient_color_2 to-gradient_color_1 py-3 !text-base font-bold text-white lg:rounded-md lg:px-5 lg:py-3 lg:text-sm"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-5 lg:mt-0">
            This site is protected by reCAPTCHA and Google{" "}
            <strong>Privacy Policy</strong> and{" "}
            <strong>Terms of Service apply.</strong>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
