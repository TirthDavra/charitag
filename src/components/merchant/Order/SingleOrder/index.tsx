import React from "react";
import OrderDetailsMerchant from "./OrderDetailsMerchant";
import { SingleOrderColumnDef } from "./SingleOrderColumnDef";
import { getMerchantOrder } from "@/api/merchant/merchantOrder";
import Title from "@/components/merchant/Title";
import OrdersTable from "./OrdersTable";
import { ISOrder } from "./types";

const SingleOrder = async ({ orderId }: { orderId: string }) => {
  const response = await getMerchantOrder(orderId);
  if (response.error) {
    return <>Loading...</>;
  }
  const data = response.data.data.order_details;

  return (
    <div>
      <Title label="Orders" />
      <div className="my-4">
        <span className="text-lg font-[500] text-[#2F2F35]">Detail</span>
      </div>

      <div className="">
        <OrderDetailsMerchant order={response.data.data} />
      </div>

      <div className="max-w-[1213px]">
        <OrdersTable
          columns={SingleOrderColumnDef}
          data={data}
          orderMeta={response.data.data.total}
        />
      </div>
    </div>
  );
};

export default SingleOrder;
