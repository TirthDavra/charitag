import { getMerchantOrder } from "@/api/merchant/merchantOrder";
import OrderDetailsMerchant from "@/components/merchant/Order/SingleOrder/OrderDetailsMerchant";
import OrdersTable from "@/components/merchant/Order/SingleOrder/OrdersTable";
import { SingleOrderColumnDef } from "@/components/merchant/Order/SingleOrder/SingleOrderColumnDef";
import Title from "@/components/merchant/Title";
import React from "react";

interface SingleOrderPageProps {
  params: {
    orderId: string;
  };
}

const SingleOrderPage: React.FC<SingleOrderPageProps> = async ({ params }) => {
  const { orderId } = params;

  const response = await getMerchantOrder(orderId);
  if (response.error) {
    return <>Loading...</>;
  }
  const data = response.data.data.order_items;
  return (
    <div>
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
            orderSubTotal={response.data.data.subtotal}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleOrderPage;
