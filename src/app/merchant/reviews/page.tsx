import { getProductsCategories } from "@/api/merchant/merchantProducts";
import {
  getMerchantReviews,
  getMerchantReviewsCounts,
} from "@/api/merchant/merchantReviews";
import Await from "@/components/common/Await";
import CustomTable from "@/components/merchant/Custom/Tables/CustomTable";
import TableFilters from "@/components/merchant/Custom/Tables/TableFilters";
import TablePagination from "@/components/merchant/Custom/Tables/TablePagination";
import TableSearch from "@/components/merchant/Custom/Tables/TableSearch";
import FilterReviews from "@/components/merchant/Reviews/FilterReviews";
import MerchantReviewsTable from "@/components/merchant/Reviews/MerchantReviewsTable";
import Title from "@/components/merchant/Title";
import React, { Suspense } from "react";

const page = async (context: {
  searchParams?: {
    search?: string;
    per_page?: number;
    sort_field?: string;
    sort_order?: string;
    rating?: string;
    product_category_id?: string;
    page?: number;
  };
}) => {
  const data = await getMerchantReviewsCounts();
  const reviewsCount = data.data;
  const productCategories = await getProductsCategories();
  const reviews = await getMerchantReviews({
    rating: context.searchParams?.rating || "",
    search: context.searchParams?.search || "",
    per_page: 10,
    sort_field: context.searchParams?.sort_field || "",
    sort_order: context.searchParams?.sort_order || "",
    product_category_id: context.searchParams?.product_category_id || "",
    page: Number(context.searchParams?.page) || 1,
  });

  return (
    <div>
      <Title label="Reviews" />
      <div className="py-4">
        <div className="text-[18px] font-semibold text-merchant_sidebar_text">
          Reviews
        </div>
        <div className="mt-4 inline-block h-[34px] flex-wrap items-center justify-between text-sm lg:flex">
          <div>
            <span className="text-merchant_sidebar_text">
              All ({reviewsCount?.all_count || 0}) |
            </span>{" "}
            <span className="text-merchant_text_color_blue">
              Pending{" "}
              <span className="text-merchant_sidebar_text">
                ({reviewsCount?.pending_count || 0}) |
              </span>
            </span>{" "}
            <span className="text-merchant_text_color_blue">
              Approved{" "}
              <span className="text-merchant_sidebar_text">
                ({reviewsCount?.approved_count || 0}) |
              </span>
            </span>{" "}
            <span className="text-merchant_text_color_blue">
              Spam{" "}
              <span className="text-merchant_sidebar_text">
                ({reviewsCount?.spam_count || 0}) |
              </span>
            </span>{" "}
            <span className="text-merchant_text_color_blue">
              Trash{" "}
              <span className="text-merchant_sidebar_text">
                ({reviewsCount?.trash_count || 0})
              </span>
            </span>{" "}
          </div>
          <div>
            <TableSearch
              label="Search Reviews"
              className="!lg:pt-0 !pt-[10px]"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between pt-5 lg:pt-10 xl:pt-5">
          <FilterReviews productCategories={productCategories.data} />
          <TablePagination
            className="flex items-center gap-[5px] pt-[10px] text-[12px] xs:pt-0"
            itemsPerPage={10}
            totalItems={reviews.total}
          />
        </div>
        <MerchantReviewsTable data={reviews.data} />
        <TablePagination
          className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px] "
          itemsPerPage={10}
          totalItems={reviews.total}
        />
      </div>
    </div>
  );
};

export default page;
