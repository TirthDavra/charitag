import ButtonPrimary from "@/components/common/ButtonPrimary";
import React, { Suspense } from "react";
import Title from "@/components/merchant/Title";
import {
  getMerchantProductsList,
  getProductsCategories,
  getProductsCount,
} from "@/api/merchant/merchantProducts";
import FilterProducts from "@/components/merchant/Products/allProduct/FilterProducts";
import TableSearch from "@/components/merchant/Custom/Tables/TableSearch";
import TablePagination from "@/components/merchant/Custom/Tables/TablePagination";
import Link from "next/link";
import AllProductsTable from "@/components/merchant/Products/AllProductsTable";
import Await from "@/components/common/Await";

const page = async (context: {
  searchParams?: {
    product_category_id?: string;
    product_type?: string;
    stock_status?: string;
    search?: string;
    page?: string;
    per_page?: number;
    sort_field?: string;
    sort_order?: string;
  };
}) => {
  const allProducts = getMerchantProductsList({
    stock_status: context.searchParams?.stock_status || "",
    product_type: Number(context.searchParams?.product_type) || "",
    product_category_id:
      Number(context.searchParams?.product_category_id) || "",
    search: context.searchParams?.search || "",
    page: Number(context.searchParams?.page) || 1,
    per_page: 10,
    sort_field: context.searchParams?.sort_field || "",
    sort_order: context.searchParams?.sort_order || "",
  });

  const productCountResponse = await getProductsCount();
  const productCount = productCountResponse?.data?.data;
  const productCategories = await getProductsCategories();

  return (
    <div>
      <Title label="Products" />
      <div className="py-4">
        <div className="flex gap-[10px]">
          <div className="text-[18px]  font-medium text-merchant_sidebar_text">
            Products
          </div>
          <Link href="manage">
            <ButtonPrimary
              label="Add New"
              className="rounded-sm px-[13px] py-2 !shadow-none"
              classNameLabel="text-[12px] font-normal"
            />
          </Link>
        </div>
        <div className="mt-4 inline-block h-[34px] flex-wrap items-center justify-between md:flex">
          <div className="text-[14px]">
            <span className="text-merchant_sidebar_text">
              {" "}
              All <span>({productCount?.all_count || 0}) |</span>{" "}
            </span>
            <span className="text-merchant_text_color_blue ">Published</span>{" "}
            <span className="text-merchant_sidebar_text">
              ({productCount?.published_count || 0})
            </span>
          </div>
          <div>
            <TableSearch label="Search products" />
          </div>
        </div>
        <Suspense
          key={Math.random()}
          fallback={
            <div className="h-[500px] animate-pulse">
              <div className="my-[13px] h-[20px] bg-gray-100"></div>
              <div className="my-[13px] h-[20px] bg-gray-100"></div>
              {Array.from({ length: 2 }, (_, index) => (
                <div key={index}>
                  <div className="animate-pulse">
                    <div className="my-16 h-[113px] bg-gray-100"></div>
                    <div className="my-16 h-[113px] bg-gray-100"></div>
                    <div className="my-16 h-[113px] bg-gray-100"></div>
                    <div className="my-16 h-[113px] bg-gray-100"></div>
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <Await promise={allProducts}>
            {(allProducts) => {
              return (
                <>
                  <div className="mt-[10px] flex-wrap items-center justify-between pt-[10px] md:flex md:pt-0">
                    <FilterProducts
                      productCategories={productCategories.data}
                      defaultValues={{
                        stock_status: context.searchParams?.stock_status ?? "",
                        product_type: context.searchParams?.product_type ?? "",
                        product_category_id:
                          context.searchParams?.product_category_id ?? "",
                      }}
                    />
                    <TablePagination
                      className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px] md:pt-0"
                      totalItems={allProducts.total}
                      itemsPerPage={10}
                    />
                  </div>

                  <AllProductsTable data={allProducts.data} />
                  <TablePagination
                    className="flex items-center justify-end gap-[5px] pt-5 text-[12px]"
                    totalItems={allProducts.total}
                    itemsPerPage={10}
                  />
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default page;
