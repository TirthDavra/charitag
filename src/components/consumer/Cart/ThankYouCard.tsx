import React from "react";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import Heading from "@/components/common/Heading";
import Link from "next/link";
import { auth } from "auth";
import Description from "@/components/common/NavbarLinkPages/AllDeals/Description";
import Slider, {
  SliderNew,
} from "@/components/common/NavbarLinkPages/AllDeals/Slider";
import { getAllProducts } from "@/api/common/products";

// import Heading from "@/components/Heading";

const ThankYouCard = async () => {
  // const user = useAuth();
  const user = await auth();
  const data = await getAllProducts({
    category_ids: {},
    max_price: "",
    min_price: "",
    page: "",
    per_page: "12",
    price: "",
    search: "",
    sort: "",
    rating: "",
    is_deal: "",
    is_product: "",
  });
  return (
    <>
      <div className="mx-auto flex h-[340px] w-full max-w-[90vh] flex-col items-center justify-center gap-5 rounded-xl bg-white shadow-equally_distributed_bluish max-lg:px-7 max-lg:py-[58px] lg:p-[58px]">
        <Heading
          varient={"3xl"}
          content={"Thank you for shopping with Charitag!"}
        />
        <p className="text-center">
          We are getting started on your order right away, and you will receive
          an order confirmation email shortly to {user?.user.email}. In the
          meantime, explore the latest deals and get inspired by our charities,
          just head over to{" "}
          <Link href={"/our-charities"} className="text-blue-500 underline">
            charities page.
          </Link>
        </p>
        <Link href={"/consumer/orders"}>
          <ButtonPrimary
            label={"View order confirmation"}
            className={"mx-auto max-w-fit rounded-full"}
          />
        </Link>
      </div>
      <div className="container mt-[102px] flex flex-col items-center md:flex-row md:gap-6 lg:gap-[138px]">
        <Description
          className=" lg:w-[40%]"
          classNameHeading="!text-[45px ] leading-[34px] !md:text-[45px] md:leading-[56px] mt-5 md:mt-0 mb-5 md:mb-0"
          classNamePara="mb-10 md:mb-0 md:mt-5 text-[#87878d] font-medium "
        />
        <SliderNew
          className={""}
          showAddToCart={false}
          showHeart={true}
          allDeals={data.data.data}
          deal={false}
        />
      </div>
    </>
  );
};

export default ThankYouCard;
