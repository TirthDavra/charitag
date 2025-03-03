"use client";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import Tiptap from "@/components/common/RichTextEditor/RichTextEditor";
import SelectCategories from "@/components/merchant/Custom/SelectCategories";
import { TagsInput } from "react-tag-input-component";
import CheckBox from "@/components/merchant/Custom/CheckBox";
import { usePathname, useRouter } from "next/navigation";
import { IListData } from "@/components/common/NavbarLinkPages/OurCharities/Campaign/PreviousSingleCampaign/types";

const ManageEmailApplication = ({ option }: { option: IListData[] }) => {
  const initialstate = {
    campaign_id: "",
    description:
      "<p></p><p><img src=http://ec2-35-182-192-85.ca-central-1.compute.amazonaws.com/storage/product%2Fsmall%2F1717227422_Today%2C_we_honor_the_invaluable_contributions_of%E2%80%A6.jpg style='width: 184px; height: 184px; cursor: pointer;'></p><p></p><p></p><p><strong><em>Dear Sir/Ma'am,</em></strong></p><p></p><p style='text-align: start'><em>Thank you for being so committed to supporting [organization]monthly. Just this month alone, we&apos;ve been able to [list how your organization has helped]. Thanks to your support, the people you help will be able to continue to receive help from us.</em></p><p style='text-align: start'><em>Thank you,</em></p><p style='text-align: start'></p><p style='text-align: start'><em>Testing</em></p><p style='text-align: start'><em>Test</em></p><p style='text-align: start'><em>Test</em></p>",
  };

  const [emailContent, setEmailContent] = useState(initialstate);
  const [activeCmpaign, setActiveCampaign] = useState(false);
  const [previousCampaign, setPreviousCampaign] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCmpaign) {
      params.set("is_active", "true");
    } else {
      params.set("is_active", "false");
    }
    if (previousCampaign) {
      params.set("is_previous", "true");
    } else {
      params.set("is_previous", "false");
    }
    const queryString = params.toString();
    const newUrl = queryString ? pathname + "?" + queryString : pathname;
    router.push(newUrl, undefined);
  }, [activeCmpaign, previousCampaign]);

  const handleSelectChange = (fieldName: any, selectedValue: any) => {
    setEmailContent((prev) => ({
      ...prev,
      [fieldName]: selectedValue,
    }));
  };

  const handleInputChange = (data: string) => {
    setEmailContent((prev) => {
      return {
        ...prev,
        description: data,
      };
    });
  };

  const handleSaveChanges = () => {
    console.log("emailContetnt", emailContent);
  };

  return (
    <div>
      <span className="text-lg font-semibold text-merchant_sidebar_text">
        Email Application
      </span>
      <div className="grid grid-cols-1 gap-y-3 pt-[22px] md:grid-cols-[170px,1fr] md:gap-y-[45px]">
        <div />
        <div className="flex gap-5">
          <CheckBox
            label="Active Campaign"
            onChange={(e) => setActiveCampaign(e.target.checked)}
            value={activeCmpaign}
          />
          <CheckBox
            label="Previous Campaign"
            onChange={(e) => setPreviousCampaign(e.target.checked)}
            value={previousCampaign}
          />
        </div>
        <div>
          <span className="text-sm font-medium text-merchant_sidebar_text">
            Select Campaign:
          </span>
        </div>
        <div className="max-w-[947px]">
          <SelectCategories
            all={false}
            placeholder="Campaigns"
            value={emailContent.campaign_id}
            productCategories={option}
            labelKey="title"
            handleSelectChange={(selectedValue) =>
              handleSelectChange("campaign_id", selectedValue)
            }
          />
        </div>
        <div>
          <span className="text-sm font-medium text-merchant_sidebar_text">
            Manage Content
          </span>
        </div>
        <div className="max-w-[947px]">
          <Tiptap
            onChange={handleInputChange}
            initContent={emailContent.description}
          />
          <div className="pt-[30px]">
            <ButtonPrimary
              label="Send email"
              className="!h-[34px] rounded-sm px-[10px] py-2 !shadow-none"
              classNameLabel="text-xs font-normal"
              onClick={handleSaveChanges}
            />
          </div>
        </div>
        {/* <div>
          <span className="text-sm font-medium text-merchant_sidebar_text">
            Emails
          </span>
        </div> */}
        {/* <div className="max-w-[947px]">
          <TagsInput
            placeHolder="Emails"
            onChange={setSelected}
            value={selected}
            name="emails"
          /> */}
      </div>
    </div>
  );
};

export default ManageEmailApplication;
