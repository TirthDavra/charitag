import ProductCard from "../ProductCard";
import ButtonPrimary from "../ButtonPrimary";
import { getTopProduct } from "@/api/common/products";
import Link from "next/link";
import { getTopDeal } from "@/api/common/deals";
import { auth } from "auth";
import { USER_ROLES } from "@/lib/userRoles";
import DataNotAvailable from "../DataNotAvailable";
import { Suspense } from "react";
import Await from "../Await";
import { Item } from "react-stately";
import ProductCardNew from "../ProductCardNew";

const TopDeal = async () => {
  const topDeals = getTopDeal();
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
      <Await promise={topDeals}>
        {(topDeals) => {
          return (
            <div>
              {topDeals?.data?.length > 0 ? (
                <>
                  <div className="mt-14 flex gap-[21px] scrollbar-track-transparent max-md:overflow-x-auto max-md:scrollbar md:grid md:grid-cols-2 lg:grid-cols-4">
                    {topDeals.data &&
                      topDeals.data.map((item) => {
                        return (
                          <ProductCardNew
                            key={item.id}
                            product={item}
                            deal
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
                  <div className="mt-6 justify-center sm:flex ">
                    <Link href={"/shop?deal=true"}>
                      <ButtonPrimary
                        label={"View All Deals"}
                        className="flex h-[50px] w-full justify-center rounded-full p-4"
                      />
                    </Link>
                  </div>
                </>
              ) : (
                <DataNotAvailable
                  linkHref="/shop"
                  linkText="Explore our products"
                  message="There are no deals available at the moment."
                  title="No deals available"
                />
              )}
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default TopDeal;
