import {
  getDealBySlug,
  getMerchantProductCategories,
  getProductBySlug,
} from "@/api/common/products";
import DealProduct from "@/components/common/product";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dot, Heart } from "lucide-react";
import Image from "next/image";
import share from "@images/share.svg";
import ProductDetails from "@/components/common/product/ProductDetails";
import SingleProductDetails from "@/components/common/product/SingleProductDetails";
import SingleDealDetails from "@/components/common/deal/SingleDealDetails";
import AboutDeal from "@/components/common/product/AboutDeal";
import AboutMerchant from "@/components/common/product/AboutMerchant";
import Reviews from "@/components/common/product/Reviews";
import profile1 from "@images/profile1.jpeg";
import Heading from "@/components/common/Heading";
import ProductCard from "@/components/common/ProductCard";
import DealSlider from "@/components/common/Home/DealSlider";
import { getTopDeal } from "@/api/common/deals";
import Error404 from "@/app/(home)/404/page";
import FailedToLoadPage from "@/components/FailedToLoad";
import CartProvider from "@/components/context/CartContext";
import { auth } from "auth";
import { USER_ROLES } from "@/lib/userRoles";
import ReviewsContainer from "@/components/common/Home/ReviewsContainer";
import { getReview } from "@/api/common/review";
import ProductCardNew from "@/components/common/ProductCardNew";

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { preview: string; page: string };
}) => {
  if (params.slug === "undefined") {
    return (
      <div className="mt-10 h-full">
        <Error404 />;
      </div>
    );
  }
  const deal = await getDealBySlug({
    slug: params.slug,
    preview: searchParams?.preview || "",
  });
  if (deal.error) {
    return <FailedToLoadPage />;
  }
  const similarDeals = await getTopDeal();

  const categories = await getMerchantProductCategories();
  const reviewData = await getReview({
    page: Number(searchParams.page || 1),
    per_page: 4,
  });
  const session = await auth();

  const dealData = deal.data.data;

  return (
    <div className="container">
      <div className="">
        <div>
          <div className="relative block sm:hidden">
            <div className="absolute bottom-0 left-3 right-5 top-3 flex justify-between">
              <div className="flex h-[37px] w-[37px] items-center justify-center rounded-full  pl-1">
                <FontAwesomeIcon icon={faArrowLeft} />
                <Dot className="ml-[-5px] w-[20px]" />
                <Dot className="ml-[-15px] w-[20px]" />
              </div>
              <div className="flex justify-center gap-2">
                <Image
                  src={share}
                  alt=""
                  className="h-9 w-11 rounded-full bg-white p-[10px]"
                />

                {session?.user.role === USER_ROLES.CONSUMER && (
                  <Heart className="h-[37px] w-[37px] rounded-full bg-white pb-2 pl-[9px] pr-2 pt-[9px]" />
                )}
              </div>
            </div>
          </div>
        </div>
        <ProductDetails
          product={{
            id: dealData?.product?.id || -1,
            merchant: {
              businessName: "",
              city: "",
              country: "",
              first_name: "",
            },
            product_name: dealData?.deal?.title ?? "",
            slug: dealData?.deal?.slug || "",
          }}
          className="!pt-[180px]"
        />
        <div className="">
          <SingleDealDetails deal={deal.data} />
        </div>

        <div className="mt-[50px] max-w-[786px]">
          <div className="">
            {dealData.deal.long_description && (
              <AboutDeal
                description={dealData.deal.long_description || ""}
                typeOf="deal"
              />
            )}
            <AboutMerchant />
            {dealData.deal?.reviews && (
              <div>
                <div className="mt-11 flex flex-wrap items-center gap-[10px]">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="mr-1 text-[20px] text-[#3969E0]"
                  />
                  <span className="text-[22px] font-bold text-[#3969E0]">
                    {" "}
                    {4.95}
                  </span>
                  <span className="relative text-[22px] font-bold underline">
                    {`${828} Reviews`}
                  </span>
                </div>
                {/* <Reviews review={dealData.deal?.reviews || []} /> */}
                <ReviewsContainer review={reviewData || []} />
              </div>
            )}
          </div>
          <div className="hidden lg:block"></div>
        </div>
        {dealData.deal.reviews && (
          <div className="mt-[30px] border-b-[2px] border-[#eff3fc] md:mt-[75px]" />
        )}

        <div className="mt-[30px] md:mt-[74px]">
          <Heading
            content={"Similar deals"}
            className="!text-[34px] font-bold text-[#2F2F35]"
          />
          <div className="mt-[43px] flex gap-4 scrollbar-track-transparent max-md:overflow-x-auto max-md:scrollbar md:grid md:grid-cols-2 lg:grid-cols-4">
            {similarDeals.data &&
              similarDeals.data.map((item) => (
                <ProductCardNew
                  key={item.id}
                  product={item}
                  showAddToCart={false}
                  deal
                />
              ))}
          </div>
        </div>
        <div className="mt-[74px] hidden border-b-[2px] border-[#eff3fc] md:block" />
        <div className="mt-[90px] hidden md:block">
          <Heading
            content={"Keep exploring deals"}
            className="!text-[34px] font-bold text-[#2F2F35]"
          />
          <div>
            <DealSlider
              productCategories={categories.data.data}
              label="deals"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
