import { getCorporateFundraisersBySlug } from "@/api/common/corporateFundraisers";
import SingleCorporate from "@/components/common/NavbarLinkPages/CorporateFundraisers/SingleCorporate";
import React from "react";

const page = async (context: {
  params: { slug: string };
  searchParams: {};
}) => {
  const corporate = await getCorporateFundraisersBySlug(context.params.slug);

  return (
    <div className="pt-[102px]">
      <SingleCorporate corporateDetails={corporate} context={context} />
    </div>
  );
};

export default page;
