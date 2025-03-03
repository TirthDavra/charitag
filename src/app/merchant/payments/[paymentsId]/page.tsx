import { getSingleTransaction } from "@/api/merchant/merchantTransaction";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import Details from "@/components/merchant/Payments/PaymentsDetails.tsx/Details";
import PaymentDetails from "@/components/merchant/Payments/PaymentsDetails.tsx/PaymentDetails";
import PaymentMethodDetails from "@/components/merchant/Payments/PaymentsDetails.tsx/PaymentMethodDetails";
import Title from "@/components/merchant/Title";
import Link from "next/link";
import React from "react";

interface TransactionDetailsProps {
  params: {
    transactionsId: string;
  };
}

const page: React.FC<TransactionDetailsProps> = async ({ params }) => {
  const { transactionsId } = params;

  const transaction = await getSingleTransaction(transactionsId);

  return (
    <div>
      <div>
        <Title label="Payments" />
        <div className="max-w-[1213px] py-4">
          <div className="text-[18px] font-medium text-merchant_sidebar_text">
            Payments Details
            <div className="pt-5">
              <Details details={transaction.data} />
            </div>
            <div className="pt-10">
              <PaymentDetails details={transaction.data} />
            </div>
            <div className="pb-4 pt-10">
              <PaymentMethodDetails details={transaction.data} />
            </div>
          </div>
          <Link href={"/merchant/payments"}>
            <ButtonPrimary
              label="Back to Payments"
              classNameLabel="text-[13px] font-normal"
              className="rounded-sm"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
