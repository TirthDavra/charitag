"use client";
import React, { useState } from "react";
import Orders from "./Orders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { IGetOrdersRespone } from "./types";
import ShowMore from "@/components/common/NavbarLinkPages/CorporateFundraisers/ShowMore";

const OrdersContainer = ({
  ordersProps,
  searchParams,
}: {
  ordersProps: IGetOrdersRespone[];
  searchParams: { last_order_id: number };
}) => {
  const [ordersData, setOrdersData] = useState(ordersProps);

  const [curPage, setCurPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurPage(newPage);
  };

  const handleArchive = (id: number) => {
    setOrdersData(ordersData.filter((order) => order.id !== id));
  };

  return (
    <div>
      {ordersData && ordersData?.length > 0 ? (
        <div>
          {ordersData.map((order) => (
            <div className="flex flex-col gap-5" key={order.id}>
              <Orders
                orders={order}
                last_order_id={searchParams.last_order_id}
                onArchive={handleArchive}
              />
            </div>
          ))}
          <div className="flex justify-center lg:justify-start">
            <ShowMore
              label="Load More"
              page={curPage}
              handlePageChange={handlePageChange}
              setData={setOrdersData.bind(null, ordersData)}
              url="/store/orders"
              accessorKey="data"
              total={ordersData.length}
              currentLength={ordersData.length}
              per_page={5}
            />
          </div>
        </div>
      ) : (
        <div className="flex h-80 flex-col items-center justify-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-400">
            <FontAwesomeIcon icon={faCartArrowDown} className="text-8xl" />
          </h1>
          <p className="text-2xl text-gray-400">No orders available</p>
        </div>
      )}
    </div>
  );
};

export default OrdersContainer;
