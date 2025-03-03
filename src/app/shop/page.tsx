import ProductCard from "@/components/common/ProductCardNew";
// import { getProduct } from "@/api/common/deals";
import Animate from "@/components/common/Animate";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { getAllCategories, getAllProducts } from "@/api/common/products";
import ProductFilter from "@/components/common/ProductFilter/ProductFilter";
import { IShopQueryPrams } from "@/components/common/ProductFilter/types";
import Pagination from "@/components/common/Pagination";
import { Suspense } from "react";
import Await from "@/components/common/Await";
import ResponsiveProdoctFillter from "@/components/common/ProductFilter/ResponsiveProdoctFillter";
import ScrollContainer from "@/components/common/ScrollContainer";
import { USER_ROLES } from "@/lib/userRoles";
import { auth } from "auth";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import ProductCardNew from "@/components/common/ProductCardNew";
// import { IProduct } from "@/api/common/types";
interface SearchParams {
  searchParams: Record<string, string> | null | undefined;
}

const products = async ({
  searchParams,
}: {
  searchParams: IShopQueryPrams;
}) => {
  const categories = await getAllCategories();
  const session = await auth();

  const data = getAllProducts({
    category_ids: JSON.parse(searchParams.category || "{}"),
    max_price: searchParams.max_price,
    min_price: searchParams.min_price,
    page: searchParams.page,
    per_page: "12",
    price: searchParams.price,
    search: searchParams.m_search,
    sort: searchParams?.sorting,
    rating: searchParams.rating,
    is_deal: searchParams.deal,
    is_product: searchParams.product,
    merchant: searchParams.merchant,
  });

  return (
    <Suspense
      key={Math.random()}
      fallback={
        <div className="container mt-10 flex w-full flex-grow animate-pulse">
          <div className="hidden w-[275px] min-w-[235px] max-w-[235px] space-y-3 md:block">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index}>
                <div className="animate-pulse">
                  <div className="mb-4 h-4 w-32 rounded bg-gray-200"></div>
                  <div className="mb-4 h-4 w-48 rounded bg-gray-200"></div>
                  <div className="mb-4 h-4 w-40 rounded bg-gray-200"></div>
                  <div className="mb-4 h-4 w-48 rounded bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="ml-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 16 }, (_, index) => (
              <div
                key={index}
                className="w-full min-w-[300px] flex-grow rounded-md p-4 shadow md:min-w-[250px]"
              >
                <div className="animate-pulse space-x-4">
                  <div className="h-[250px] rounded-md bg-slate-200"></div>
                  <div className="flex-1 space-y-4 py-2">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-3 rounded bg-slate-200"></div>
                      <div className="col-span-1 h-3 rounded bg-slate-200"></div>
                    </div>
                    <div className="h-3 rounded bg-slate-200 p-1"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1 h-3 rounded bg-slate-200"></div>
                        <div className="col-span-1 h-3 rounded bg-slate-200"></div>
                        <div className="col-span-1 h-3 rounded bg-slate-200"></div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1 h-3 rounded bg-slate-200"></div>
                        <div className="col-span-1 h-3 rounded bg-slate-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <Await promise={data}>
        {(data) => {
          const product = data.data;
          return (
            <>
              <Animate>
                <div className="container relative mx-auto my-5 mt-11 flex w-full gap-6 overflow-hidden lg:gap-10">
                  <div className="hidden md:block">
                    <ProductFilter
                      categories={categories?.data}
                      searchParam={searchParams}
                      className=""
                    />
                  </div>
                  <ScrollContainer className="right-[22px] top-[80px] z-50 max-w-fit backdrop-blur-none  md:hidden">
                    <ResponsiveProdoctFillter
                      categories={categories?.data}
                      searchParams={searchParams}
                    />
                  </ScrollContainer>
                  <main className="w-full">
                    {/* <div className="flex flex-col items-center md:flex-row md:gap-6 lg:gap-[138px]">
            <Description
              className=" lg:w-[40%]"
              classNameHeading="!text-[45px ] leading-[34px] !md:text-[45px] md:leading-[56px] mt-5 md:mt-0 mb-5 md:mb-0"
              classNamePara="mb-10 md:mb-0 md:mt-5 text-[#87878d] font-medium "
            />
            <Slider
              className={""}
              showAddToCart={false}
              showHeart={true}
              allDeals={product}
              deal={false}
            />
          </div> */}
                    {/* <div className="mt-8 sm:mt-14">
          <h1 className="text-3xl font-bold">
            Deals
            <span className="text-md font-normal">(6)</span>
          </h1>
          <p className="my-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div> */}

                    {product?.data && product.data.length > 0 ? (
                      <div className="grid gap-3 gap-y-5 py-2 [align-item:strech] [grid-auto-flow:dense] [grid-template-columns:repeat(24,1fr)] [justify-item:strech]">
                        {product.data.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-xl shadow-md [grid-column:auto/span_24]  sm:[grid-column:auto/span_12] lg:[grid-column:auto/span_8] xl:[grid-column:auto/span_6]"
                          >
                            <ProductCardNew
                              product={item}
                              deal={item.status === 4}
                              showAddToCart={false}
                              classnameDeal="!w-[80%] !left-[1.6rem]"
                              showHeart={
                                session?.user.role
                                  ? session?.user.role === USER_ROLES.CONSUMER
                                  : true
                              }
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-10 flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="text-3xl font-semibold text-gray-700">
                          No products available
                        </div>
                        <div className="w-[50%] text-gray-500">
                          We&apos;re sorry, but there are currently no products
                          available. Please check back later or explore our
                          other categories.
                        </div>
                        <div className="my-4">
                          {/* <Image
                            src={NoProduct}
                            alt="No products"
                            className="h-64 w-64 "
                          /> */}
                          <FontAwesomeIcon
                            icon={faBoxOpen}
                            className="text-[256px] text-gray-400"
                          />
                          {/* <IconBoxPackageIcon className="h-64 w-64  text-gray-400"/> */}
                        </div>
                        <Link href={"/our-charities"}>
                          <ButtonPrimary
                            label={"Explore Charities"}
                            className="h-[50px] w-[166px] rounded-full px-[25px] py-[15px]"
                          />
                        </Link>
                      </div>
                    )}
                    {/* {show && <ShowCartModal product={product} />} */}
                  </main>
                </div>
                <div className="mt-[77px] flex items-center justify-center">
                  {/* <ButtonPrimary
              label={"Load More Products"}
              className="h-[50px] w-[166px] rounded-full px-[25px] py-[15px]"
            /> */}
                  <Pagination
                    currentPage={Number(searchParams.page) || 1}
                    // onPageChange={(value) => {}}
                    totalPages={Math.ceil(product.total / 12) || 0}
                  />
                </div>
              </Animate>
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default products;
