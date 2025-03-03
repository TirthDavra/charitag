import ProductDetails from "@/components/common/product/ProductDetails";
import AboutDeal from "@/components/common/product/AboutDeal";
import AboutMerchant from "@/components/common/product/AboutMerchant";
import Reviews from "@/components/common/product/Reviews";

import Heading from "../Heading";
import DealSlider from "../Home/DealSlider";
import profile1 from "@images/profile1.jpeg";
import ProductCard from "../ProductCard";
import ImageSlider2 from "./ImageSlider2";
import { Dot, Heart } from "lucide-react";
import Image from "next/image";
import share from "@images/share.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import {
  getMerchantProductCategories,
  getTopProduct,
} from "@/api/common/products";
import { ISingleProduct } from "@/api/common/productTypes";
import SingleProductDetails from "./SingleProductDetails";
import { auth } from "auth";
import { USER_ROLES } from "@/lib/userRoles";
import ReviewsContainer from "../Home/ReviewsContainer";
import { getReview } from "@/api/common/review";
import ProductCardNew from "../ProductCardNew";

const reviews = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  product_id: 1,
  customer_id: 1,
  rating: 1,
  description: "",
  status: "2",
  created_at: "",
  updated_at: "",
  customer: {
    id: 1,
    type: "",
    email: "example@example.com",
    first_name: "John",
    last_name: "Doe",
    about: null,
    businessName: null,
    city: null,
    country: null,
    postal_code: null,
    website: null,
    phone: "1234567890",
    dob: null,
    account_status: "",
    email_verified_at: null,
    created_at: new Date(),
    updated_at: new Date(),
    is_active: 1,
    merchant_id: null,
    profile_image: {
      id: 1,
      filename: "profile_image.jpg",
      reference_id: 1,
      type: 1,
      action_by: 1,
      created_at: new Date(),
      updated_at: new Date(),
      gallery_type: 1,
      is_remove: 0,
      last_updated_by: null,
      medium_path: "path/to/medium/profile_image.jpg",
      path: "path/to/original/profile_image.jpg",
      thumbnail_path: "path/to/small/profile_image.jpg",
    },
    slug: null,
  },
}));

const deals = [
  {
    id: 1,
    name: "Experinces",
    products_count: "56",
  },
  {
    id: 2,
    name: "Restaurants",
    products_count: "154",
  },
  {
    id: 3,
    name: "Health & Beauty",
    products_count: "36",
  },
  {
    id: 4,
    name: "E-Learning",
    products_count: "6",
  },
  {
    id: 5,
    name: "products",
    products_count: "256",
  },
  {
    id: 6,
    name: "Service",
    products_count: "16",
  },
  {
    id: 7,
    name: "Fashion",
    products_count: "36",
  },
  {
    id: 8,
    name: "Fashion",
    products_count: "36",
  },
];

const selectedProduct = {
  product_name: "Testing",
  merchant_name: "Merchant name",
  location: "Address of the merchant",
  rating: "4.95",
  reviews: "828 ",
  bestMerchant: "Best Merchants ",
  city: "Toronto",
};

const DealProduct = async ({
  product,
  page,
}: {
  product: ISingleProduct;
  page?: string;
}) => {
  const similarDeals = await getTopProduct();
  const categories = await getMerchantProductCategories();
  const reviewData = await getReview({
    page: Number(page || 1),
    per_page: 4,
  });
  const session = await auth();

  return (
    <div className="container">
      <div className="">
        <div>
          <div className="relative block sm:hidden">
            <div className="absolute bottom-0 left-3 right-5 top-7 flex justify-between">
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
            id: product.id,
            slug: product.slug,
            product_name: product.product_name,
            merchant: {
              businessName: product.merchant?.businessName || "",
              first_name: product.merchant?.first_name || "",
              city: product.merchant?.city || "",
              country: product.merchant?.country || "",
            },
          }}
        />
        <div className="">
          <SingleProductDetails product={product} />
        </div>

        <div className="mt-[50px] max-w-[786px]">
          <div className="">
            <AboutDeal
              description={product.long_description}
              typeOf={"product"}
            />
            <AboutMerchant />
            {product?.reviews && (
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
                {/* <Reviews review={product?.reviews || []} /> */}
                <ReviewsContainer review={reviewData || []} />
              </div>
            )}
          </div>
          <div className="hidden lg:block"></div>
        </div>
        {product?.reviews && (
          <div className="mt-[75px] border-b-[2px] border-[#eff3fc]" />
        )}

        <div className="mt-[84px] max-w-[100%]">
          <Heading
            content={"Similar products"}
            className="!text-[34px] font-bold text-[#2F2F35]"
          />
          <div className="mt-[43px] flex scrollbar-track-transparent max-md:overflow-x-auto max-md:scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {similarDeals &&
              similarDeals.data.map((item) => (
                <ProductCardNew
                  key={item.id}
                  product={item}
                  showAddToCart={false}
                  deal={false}
                  showHeart={
                    session?.user.role
                      ? session?.user.role === USER_ROLES.CONSUMER
                      : true
                  }
                  // classNameImage=""
                />
              ))}
          </div>
        </div>
        <div className="mt-[74px] hidden border-b-[2px] border-[#eff3fc] md:block" />
        <div className="mt-[90px] hidden md:block">
          <Heading
            content={"Keep exploring products"}
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

export default DealProduct;
