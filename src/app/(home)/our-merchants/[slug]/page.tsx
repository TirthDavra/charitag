import {
  getMerchantDealsBySlug,
  getSingleMerchant,
} from "@/api/common/merchant";
import { getAllProducts } from "@/api/common/products";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import AboutCharity from "@/components/common/NavbarLinkPages/OurCharities/singleCharity/AboutCharity";
import OurProducts from "@/components/common/NavbarLinkPages/OurCharities/singleCharity/OurProducts";
import MerchantContact from "@/components/common/NavbarLinkPages/OurMerchants/SingleMerchant/MerchantContact";
import MerchantDetails from "@/components/common/NavbarLinkPages/OurMerchants/SingleMerchant/MerchantDetails";
import MerchantSideCard from "@/components/common/NavbarLinkPages/OurMerchants/SingleMerchant/MerchantSideCard";
import NotifyPromotion from "@/components/common/NavbarLinkPages/OurMerchants/SingleMerchant/NotifyPromotion";
import ProductCard from "@/components/common/ProductCardNew";
import { IShopQueryPrams } from "@/components/common/ProductFilter/types";
import ImageSlider2 from "@/components/common/product/ImageSlider2";
import Reviews from "@/components/common/product/Reviews";
import { USER_ROLES } from "@/lib/userRoles";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth } from "auth";
import { AlertCircle, Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import NoDataImage from "@images/No-Data-Found.jpg";
import DataNotAvailable from "@/components/common/DataNotAvailable";
import Await from "@/components/common/Await";
import ReviewsContainer from "@/components/common/Home/ReviewsContainer";
import { getReview } from "@/api/common/review";

const page = async (context: {
  params: { slug: string };
  searchParams: IShopQueryPrams;
}) => {
  const merchantData = getSingleMerchant(context.params.slug);
  const merchantDeals = await getMerchantDealsBySlug(context.params.slug);
  const data = await getAllProducts({
    category_ids: JSON.parse(context.searchParams.category || "{}"),
    max_price: context.searchParams.max_price || "",
    min_price: context.searchParams.min_price || "",
    page: context.searchParams.page || "",
    per_page: "8",
    price: context.searchParams.price || "",
    search: context.searchParams.m_search || "",
    sort: context.searchParams?.sorting || "",
    rating: context.searchParams.rating || "",
    is_deal: context.searchParams.deal || "",
    is_product: context.searchParams.product || "",
    merchant_slug: context.params.slug,
  });

  const reviewData = await getReview({
    page: Number(context.searchParams.page || 1),
    per_page: 4,
  });

  const session = await auth();
  return (
    <div>
      <Suspense key={Math.random()}>
        <Await promise={merchantData}>
          {(merchantData) => {
            if (!merchantData.data)
              return (
                <DataNotAvailable
                  title="Merchnat Data not found"
                  className="mt-20"
                  linkText="Back to all merchants"
                  linkHref="/our-merchants"
                />
              );
            return (
              <>
                <div className="absolute left-0 right-0 top-0 z-[-10] h-[945px] w-full bg-[#f9fafe] md:h-[670px] lg:h-[545px]"></div>
                <div className="container mt-[120px]">
                  <div
                    className="grid grid-cols-1 gap-10 [grid-template-areas:'sideCard''merchant''about''slider''reviews''contact''sideProfuct'] 
                    md:grid-cols-2 md:[grid-template-areas:'merchant_sideCard''about_about''contact_sideProfuct''reviews_sideProfuct''slider_slider'] 
                    lg:grid-cols-3 lg:[grid-template-areas:'merchant_merchant_sideCard''about_about_contact''about_about_sideProfuct''slider_slider_sideProfuct''reviews_reviews_sideProfuct'] "
                  >
                    <div className="[grid-area:merchant]">
                      <MerchantDetails merchant={merchantData.data} />
                    </div>
                    <div className="pt-[20px] [grid-area:sideCard] md:pt-[75px]">
                      <div className="relative">
                        <MerchantSideCard
                          merchantDetails={merchantData?.data?.store}
                        />
                        <div className="absolute bottom-0 left-3 right-5 top-3 block md:hidden">
                          <div className="flex h-[37px] w-[37px] items-center justify-center rounded-full bg-white pl-1">
                            <FontAwesomeIcon icon={faArrowLeft} />
                            <Dot className="ml-[-5px] w-[20px]" />
                            <Dot className="ml-[-15px] w-[20px]" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" [grid-area:about] max-md:mt-[30px] lg:mt-[-20%] ">
                      <AboutCharity
                        aboutCharity={merchantData?.data}
                        label="merchant"
                      />
                    </div>
                    <div className="[grid-area:slider]">
                      {merchantData.data?.store?.gallery.length > 0 ? (
                        <div className="max-w-[800px] md:mt-[45px] ">
                          <ImageSlider2
                            gallery={merchantData?.data?.store?.gallery}
                          />
                        </div>
                      ) : (
                        <Image alt="" src={NoDataImage} />
                      )}
                    </div>
                    <div className="[grid-area:contact] max-lg:my-auto">
                      <MerchantContact
                        contactDetails={merchantData.data?.store}
                        slug={context.params.slug}
                      />
                    </div>
                    <div className="[grid-area:sideProfuct]">
                      <OurProducts
                        product={merchantData.data?.featured_products ?? []}
                        title="Featured products"
                        className="hidden md:block"
                      />
                      <div className="hidden md:block">
                        <NotifyPromotion id={merchantData?.data?.id} />
                      </div>
                    </div>
                    {merchantData.data?.reviews?.length > 0 && (
                      <div className="[grid-area:reviews] md:-mt-48 lg:-mt-20 xl:-mt-0">
                        <div className="mb-4 mt-8 h-px w-full bg-sidebar_devider_color md:mt-4 lg:mb-6 lg:mt-6" />
                        <div className="mt-11 flex flex-wrap items-center gap-[10px]">
                          <FontAwesomeIcon
                            icon={faStar}
                            className="mr-1 text-[20px] text-[#3969E0]"
                          />
                          <span className="text-[22px] font-bold text-[#3969E0]">
                            {" "}
                            {merchantData?.data?.rating || 4.95}
                          </span>
                          <span className="relative text-[22px] font-bold underline">
                            {`${merchantData?.data?.reviews_count || 828} Reviews`}
                          </span>
                        </div>
                        <ReviewsContainer review={reviewData || []} />
                        <div className="max-sm:border-b-2 max-sm:pb-9" />
                      </div>
                    )}
                  </div>
                  <div className="border-b-[2px] border-[#eff3fc] md:mt-[75px]" />
                  <div className="pt-[30px] md:pt-[86px]">
                    <span className="!mb-5 text-2xl font-bold capitalize md:text-4xl lg:text-[45px]">
                      {merchantData?.data?.first_name || ""}{" "}
                      {merchantData?.data?.last_name || ""} Deals / Products
                    </span>

                    {data?.data.data?.length > 0 ? (
                      <div className="mt-[35px] grid gap-3 gap-y-5 py-2  [align-item:strech] [grid-auto-flow:dense] [grid-template-columns:repeat(24,1fr)] [justify-item:strech] sm:mt-[60px]">
                        {data.data.data?.map((item) => {
                          return (
                            <ProductCard
                              key={item.id}
                              className="rounded-xl shadow-md [grid-column:auto/span_24]  sm:[grid-column:auto/span_12] lg:[grid-column:auto/span_8] xl:[grid-column:auto/span_6]"
                              deal={item.status === 4}
                              product={item}
                              showAddToCart={false}
                              showHeart={
                                session?.user.role
                                  ? session?.user.role === USER_ROLES.CONSUMER
                                  : true
                              }
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <DataNotAvailable
                        message="Currently, there are no deals or products available."
                        title="No Deals/Products"
                        claasNameButton="hidden"
                      />
                    )}
                    <Link
                      href={`/shop?merchant=${merchantData.data.id}`}
                      className="mt-6 justify-center sm:flex "
                    >
                      <ButtonPrimary
                        label={`View All ${merchantData?.data?.first_name} ${merchantData?.data?.last_name} Deals / Products`}
                        className="flex !h-[50px] justify-center rounded-full p-4 max-sm:w-full md:h-[50px]"
                      />
                    </Link>
                  </div>
                </div>
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default page;
