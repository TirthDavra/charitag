import React from "react";
import Title from "../../Title";
import { getSingleTransaction } from "@/api/merchant/merchantTransaction";
import Details from "./Details";
import PaymentDetails from "./PaymentDetails";
import PaymentMethodDetails from "./PaymentMethodDetails";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import Link from "next/link";

const TransactionDetails = async ({
  transactionsId,
}: {
  transactionsId: string;
}) => {
  const transaction = await getSingleTransaction(transactionsId);

  return (
    <div>
      <Title label="Transactions" />
      <div className="max-w-[1213px] py-4">
        <div className="text-[18px] font-medium text-merchant_sidebar_text">
          Transactions Details
          <div className="pt-5">
            <Details details={transaction.data} />
          </div>
          <div className="pt-10">
            <PaymentDetails details={transaction.data} />
          </div>
          <div className="pt-10 pb-4">
            <PaymentMethodDetails details={transaction.data} />
          </div>
        </div>
        <Link href={"/merchant/transactions"}>
          <ButtonPrimary
            label="Back to Transactions"
            classNameLabel="text-[13px] font-normal"
            className="rounded-sm"
          />
        </Link>
      </div>
    </div>
  );
};

export default TransactionDetails;
