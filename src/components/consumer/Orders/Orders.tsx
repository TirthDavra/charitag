"use client";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCardConsumer";
import { IGetOrdersRespone, IOrder } from "./types";
import OrderDetailsCard from "./OrderDetailsCard";
import { archiveOrder } from "@/api/consumer/order";
import { toast } from "react-toastify";
interface OrdersProps {
  orders: IGetOrdersRespone;
  last_order_id: number;
  onArchive: (id: number) => void;
}

const Order: React.FC<{
  order: IGetOrdersRespone;
  last_order_id: number;
  onArchive: (id: number) => void;
}> = ({ order, last_order_id, onArchive }) => {
  const [detailsHidden, setDetailsHidden] = useState(false);

  useEffect(() => {
    if (order.id === Number(last_order_id)) {
      setDetailsHidden(true);
    }
  }, [order.id, last_order_id]);

  const handleViewDetailsClick = () => {
    setDetailsHidden(!detailsHidden);
  };

  const handleArchiveOrder = async () => {
    try {
      const response = await archiveOrder(order.id);
      if (response.data.status) {
        toast.success(response.data.message);
        onArchive(order.id);
      } else {
        toast.error("Failed to archive order");
      }
    } catch (error) {
      console.error("Error archiving order:", error);
    }
  };
  return (
    <div className="no-scrollbar overflow-x-auto">
      <div onClick={handleViewDetailsClick}>
        <OrderCard
          orderDetails={order}
          label={undefined}
          description={undefined}
          detailsHidden={detailsHidden}
        />
      </div>

      {detailsHidden &&
        order &&
        order.order_details &&
        order.order_details.map((orders) => (
          <div className="border-b-[1px]  border-consumer_order_border py-[30px]" key={orders.id}>
            <OrderDetailsCard
              key={order.id}
              detailsHidden={false}
              orderDetails={orders}
            />
          </div>
        ))}
      {detailsHidden && (
        <>
          <p
            className="pl-[60px] mt-[25px] text-sm text-consumer_order underline hover:cursor-pointer"
            onClick={handleArchiveOrder}
            >
            {`${!order.is_archived ? "Archive order" : "UnArchive order"}`}
          </p>
        </>
      )}
    </div>
  );
};

const Orders: React.FC<OrdersProps> = ({
  orders,
  last_order_id,
  onArchive,
}) => {
  return (
    <main className="overflow-x-auto ">
      <div className="mt-5 flex flex-col rounded-xl border-[1.2px] shadow-[rgba(0,0,0,0.2)] px-3 py-[15px]  md:px-5 ">
        <Order
          order={orders}
          last_order_id={last_order_id}
          onArchive={onArchive}
        />
      </div>
    </main>
  );
};

export default Orders;
