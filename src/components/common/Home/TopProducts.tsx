import ProductCard from "../ProductCard";
import ButtonPrimary from "../ButtonPrimary";
import { getTopProduct } from "@/api/common/products";
import Link from "next/link";
import { auth } from "auth";
import { USER_ROLES } from "@/lib/userRoles";
import DataNotAvailable from "../DataNotAvailable";
import { Suspense } from "react";
import Await from "../Await";
import ProductCardNew from "../ProductCardNew";

const TopProducts = async () => {
  const topProducts = getTopProduct();
  const session = await auth();

  return (
    <Suspense
      key={Math.random()}
      fallback={
        <div className="ml-2 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
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
      }
    >
      <Await promise={topProducts}>
        {(topProducts) => {
          return (
            <div>
              {topProducts && topProducts?.data?.length > 0 ? (
                <>
                  <div className="mt-14 flex gap-4 scrollbar-track-transparent max-md:overflow-x-auto max-md:scrollbar max-sm:mt-9 md:grid md:grid-cols-2 lg:grid-cols-4">
                    {topProducts &&
                      topProducts.data.map((item) => {
                        return (
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
                          />
                        );
                      })}
                  </div>
                  <div className="mt-6 justify-center sm:flex">
                    <Link href={"/shop?product=true"}>
                      <ButtonPrimary
                        label={"View All Products"}
                        // className={"rounded-full w-full py-3"}
                        className="flex h-[50px] w-full justify-center rounded-full"
                      />
                    </Link>
                  </div>
                </>
              ) : (
                <DataNotAvailable
                  linkHref="/our-charities"
                  linkText="Explore our charities"
                  message="There are no products available at the moment."
                  title="No products available"
                />
              )}
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default TopProducts;
