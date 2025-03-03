import { getOrders } from "@/api/consumer/order";
import Await from "@/components/common/Await";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import FilterOrders from "@/components/consumer/Orders/FilterOrders";
import Orders from "@/components/consumer/Orders/Orders";
import OrdersContainer from "@/components/consumer/Orders/OrdersContainer";
import { IGetOrdersRespone } from "@/components/consumer/Orders/types";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    last_order_id: number;
    per_page: number;
    page: number;
    filter: string;
  };
}) => {
  const orders = getOrders({
    page: Number(searchParams.page || 1),
    per_page: 5,
    filter: searchParams?.filter || "",
  });
  return (
    <div className="pt-7">
      <div className="mt-[20px] w-full">
        <h1 className="mb-[10px] text-[34px] font-bold text-[#2F2F35]">
          My orders
        </h1>
        <div className="items-center justify-between md:flex">
          <p className="text-[#2F2F35] max-md:mb-[25px]">
            Find your order details here. Billing details and returns are placed
            inside each order.
          </p>
          <FilterOrders />
        </div>
        <Suspense
          key={Math.random()}
          fallback={
            <div className="animate-pulse space-y-6">
              {Array.from({ length: 2 }, (_, index) => (
                <div key={index} className="space-y-4 rounded-lg mt-5 border p-4">
                  <div className="h-4 w-1/4 rounded bg-gray-200"></div>
                  <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                  <div className="p-4">
                    <div className="flex justify-between  gap-4">
                      {/* Skeleton for Image */}
                      <div className=" flex mt-5 gap-5">
                        <div className="h-16 w-16 animate-pulse rounded-lg bg-gray-200"></div>
                        <div className="">
                          <div className="mb-2 h-6 w-3/4 animate-pulse rounded-lg bg-gray-200"></div>
                          <div className="mb-4 h-6 w-1/2 animate-pulse rounded-lg bg-gray-200"></div>
                          <div className="flex gap-4">
                            <div className="h-4 w-20 animate-pulse rounded-lg bg-gray-200"></div>
                            <div className="h-4 w-16 animate-pulse rounded-lg bg-gray-200"></div>
                            <div className="h-4 w-20 animate-pulse rounded-lg bg-gray-200"></div>
                          </div>
                        </div>
                      </div>
                      {/* Skeleton for Status and Delivered On */}
                      <div className="mt-5">
                        <div className="flex flex-col">
                          <div className="mb-2 h-4 w-24 animate-pulse rounded-lg bg-gray-200"></div>
                          <div className="h-4 w-32 animate-pulse rounded-lg bg-gray-200"></div>
                        </div>
                        <div className="mt-4">
                          <div className="mb-2 h-4 w-24 animate-pulse rounded-lg bg-gray-200"></div>
                          <div className="h-4 w-32 animate-pulse rounded-lg bg-gray-200"></div>
                        </div>
                      </div>
                      {/* Skeleton for Buttons and Invoice */}
                      <div className=" mt-5 text-right">
                        <div className="flex flex-col gap-3">
                          <div className="h-10 w-32 animate-pulse rounded-full bg-gray-200"></div>
                          <div className="h-10 w-32 animate-pulse rounded-full bg-gray-200"></div>
                          <div className="h-10 w-32 animate-pulse rounded-full bg-gray-200"></div>
                          <div className="h-4 w-24 animate-pulse rounded-md bg-gray-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <Await promise={orders}>
            {(orders) => {
              return (
                <>
                  <OrdersContainer
                    ordersProps={orders.data}
                    searchParams={searchParams}
                  />
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default page;
