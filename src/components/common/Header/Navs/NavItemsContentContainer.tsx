"use client";
import React, { useEffect } from "react";
import NavItemsContent from "./NavItemsContent";
import { useAppDispatch, useAppSelectorCommon } from "@/lib/Store/hooks";
import { setCategories } from "@/lib/Store/slices/commonFeatures/footerSlice";
import { ICategoriesResponse } from "@/api/auth/types";

const NavItemsContentContainer = ({
  response,
}: {
  response: ICategoriesResponse;
}) => {
  const categoriesData = useAppSelectorCommon((state) => state.footer);

  const campaign = categoriesData.categories;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!categoriesData.init) {
      dispatch(setCategories({ data: response.data, init: true }));
    }
  }, [dispatch]);

  return (
    <div>
      <NavItemsContent
        campaign={[
          ...(campaign?.length > 0
            ? campaign.slice(0, 5).map((item) => ({
                title: item.title,
                link: `our-charities?charity_type=${item.id}`,
              }))
            : []),
          { title: "View All", link: "/our-charities" },
        ]}
      />
    </div>
  );
};

export default NavItemsContentContainer;
