import TransactionDetails from "@/components/merchant/Transactions/TransactionDetails.tsx";
import React from "react";

interface TransactionDetailsProps {
  params: {
    transactionsId: string;
  };
}

const page: React.FC<TransactionDetailsProps> = ({ params }) => {
  const { transactionsId } = params;
  console.log("params for transaction", params);

  return (
    <div >
      <TransactionDetails transactionsId={transactionsId} />
    </div>
  );
};

export default page;
