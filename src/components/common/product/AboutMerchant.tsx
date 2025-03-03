import React from "react";
import charitagLogoInBadge from "@images/charitag_logo_in_badge.png";
import Heading from "../Heading";
import ButtonPrimary from "../ButtonPrimary";
import Image from "next/image";
import Link from "next/link";

const AboutMerchant: React.FC = () => {
  
  return (
    <div className="mt-[30px] lg:mt-[74px]">
      <span className="text-2xl font-bold text-[#2F2F35] md:text-[34px]">
        About this merchant
      </span>

      <div className="mt-[15px] flex flex-wrap items-center gap-[10px] lg:gap-[25px]">
        <span className="text-lg font-bold md:text-[22px]">
          Name of the merchant
        </span>
        <div className="flex items-center gap-[10px]">
          <Image
            src={charitagLogoInBadge}
            alt=""
            className="h-[20px] w-[16px] object-cover"
          />
          <span className="relative text-[#3969E0]">Best Merchant</span>
        </div>
      </div>

      <div className="mt-[15px]">
        <span className="text-sm text-[#2F2F35] md:text-base">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis,
          iusto aliquid ut explicabo veritatis quam sequi distinctio deleniti,
          architecto ipsum nisi repellat ea nemo quis nostrum. Ratione sit
          tempora hic architecto dolorum consectetur repellendus ipsa tempore
          sunt ullam praesentium consequatur, velit molestias, alias accusantium
          vitae amet voluptates obcaecati assumenda, a et error totam. Earum
          quibusdam illum deserunt blanditiis dolore quae, voluptas iure nobis
          iste quam incidunt voluptatum asperiores sunt pariatur quas esse magni
          animi. Accusantium omnis natus perferendis, quaerat quibusdam odio eos
          aperiam dolore dicta architecto, possimus minima inventore voluptatem
          consequatur? Illum et inventore eligendi enim laborum, ipsam nesciunt
          omnis.
        </span>
      </div>
      <div className="justify-start md:flex">
        <Link href={"/shop?deal=true"}>
          <ButtonPrimary
            label={"View All Merchant Deals"}
            className={
              "mt-[35px] h-[50px] w-full justify-center rounded-full px-[25px] py-[15px] md:w-[217px]"
            }
          />
        </Link>
      </div>
      <div className="mt-[30px] border-b-[2px] border-[#eff3fc] md:mt-[74px]" />
    </div>
  );
};

export default AboutMerchant;
