import { getUniqueCode } from "@/api/common/common";
import ManageUniqueCode from "@/components/common/ManageUniqueCode";
import React from "react";

const MerchantUniqueCode = async () => {
  const uniqueCode = await getUniqueCode();

  return (
    <div>
      <ManageUniqueCode initialCode={uniqueCode.data} />
    </div>
  );
};

export default MerchantUniqueCode;
