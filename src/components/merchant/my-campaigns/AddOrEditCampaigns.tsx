"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Title from "../Title";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import SelectCategories from "../Custom/SelectCategories";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { IMerchantCharities } from "@/app/merchant/my-campaigns/types";
import { addOrUpdateMerchantCampaigns } from "@/api/merchant/merchantCampaigns";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { FeatureImage } from "../types";
import Tiptap from "../../common/RichTextEditor/RichTextEditor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddFeaturedImage from "@/components/common/AddFeaturedImage";
import AddOrEditImageGallery from "@/components/corporate/MyCampaigns/AddOrEditImageGallery";
import { produce } from "immer";
import { validationSchemaForCampaign } from "../ValidationForMerchant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";

export interface IInitState {
  title: string;
  description: string;
  short_description: string;
  feature_image: FeatureImage | null;
  charity_id: string | number;
  campaign_type: string | number;
  gallery: FeatureImage[];
  total_fund_target: string | number;
  main_image?: FeatureImage | null;
  start_date: string;
  end_date: string;
}

const AddOrEditCampaigns = ({
  charities,
  initialState,
}: {
  charities: IMerchantCharities[];
  initialState: IInitState;
}) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("campaignId");
  const router = useRouter();

  const handleSave = async (values: IInitState) => {
    const _campaign = {
      ...values,
      feature_image: values.feature_image?.id ?? null,
      gallery: values.gallery.map((image) => image.id),
    };
    if (id) {
      const response = await addOrUpdateMerchantCampaigns({
        data: _campaign,
        id: id,
      });
      if (response.error) {
        const errorMessage = Object.values<string>(response.data.message);
        toast.error(errorMessage[0].toString());
      } else {
        toast.success(response.data.message);
        router.push("/merchant/my-campaigns");
        router.refresh();
      }
    } else {
      const response = await addOrUpdateMerchantCampaigns({ data: _campaign });
      if (response.error) {
        const errorMessage = Object.values<string>(response.data.message);
        toast.error(errorMessage[0].toString());
      } else {
        toast.success(response.data.message);
        router.push("/merchant/my-campaigns");
        router.refresh();
      }
    }
  };

  return (
    <div>
      <Title label="Campaigns" />
      <div className="py-4">
        <Formik
          initialValues={initialState}
          validationSchema={validationSchemaForCampaign}
          onSubmit={handleSave}
        >
          {({ values, setFieldValue, isSubmitting }) => {
            const filterPassedTime = (time: string | Date) => {
              const currentDate =
                values.start_date === ""
                  ? new Date()
                  : new Date(values.start_date);
              const selectedDate = new Date(time);

              return currentDate.getTime() < selectedDate.getTime();
            };
            return (
              <Form>
                <div>
                  <span className="text-lg !font-medium text-merchant_sidebar_text">
                    Manage Campaigns
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-x-[30px] gap-y-3 pt-[22px]  md:grid-cols-[135px,1fr] md:gap-y-[45px]">
                  <div className="flex items-center">
                    <span className="text-[15px] font-normal text-merchant_sidebar_text">
                      Title:
                    </span>
                  </div>
                  <div>
                    <Field
                      name="title"
                      component={CustomInputFieldFormik}
                      inputPlaceholder="Charitag"
                      type="text"
                      classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                      styleInput={{ resize: "none" }}
                      classNameWrapper="pt-[5px]"
                      className="!py-2 !text-[13px]"
                    />
                  </div>
                  <div className="md:pt-2">
                    <span className="text-[15px] font-normal text-merchant_sidebar_text">
                      Short Description:
                    </span>
                  </div>
                  <div>
                    <CustomInputField
                      value={values.short_description}
                      name="short_description"
                      onChange={(e: { target: { value: string } }) =>
                        setFieldValue("short_description", e.target.value)
                      }
                      inputPlaceholder="Write Here Description..."
                      classNameContainer="max-w-[947px] rounded-sm border-merchant_border"
                      styleInput={{ resize: "none" }}
                      classNameWrapper="pt-[5px]"
                      className="!py-2 !text-[13px]"
                      textArea={true}
                      textAreaRows={2}
                    />
                    <div className="text-sm text-red-500">
                      <ErrorMessage name="short_description" />
                    </div>
                  </div>
                  <div className="lg:pt-2">
                    <span className="text-[15px] font-normal text-merchant_sidebar_text">
                      Description:
                    </span>
                  </div>
                  <div className="max-w-[947px]">
                    <Tiptap
                      onChange={(data) => setFieldValue("description", data)}
                      initContent={values.description}
                    />
                    <div className="text-sm text-red-500">
                      <ErrorMessage name="description" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[15px] font-normal text-merchant_sidebar_text">
                      Select Charity:
                    </span>
                  </div>
                  <div className="max-w-[360px]">
                    <Select
                      value={values.charity_id.toString()}
                      onValueChange={(value) => {
                        setFieldValue("charity_id", value);
                      }}
                    >
                      <SelectTrigger
                        classNameIcon="!text-black font-bold"
                        className="h-11 rounded-sm border-[1px] border-merchant_border text-[13px] font-normal text-merchant_gray outline-none"
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="text-merchant_gray">
                        {charities &&
                          charities?.map((item) => {
                            return (
                              <SelectItem
                                key={item.id}
                                value={item.id.toString()}
                                className="text-base"
                              >
                                {item.charity_name}
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    </Select>
                    <div className="text-sm text-red-500">
                      <ErrorMessage name="charity_id" />
                    </div>
                  </div>
                  <div className="lg:pt-[12px]">
                    <span className="text-[15px] font-normal text-merchant_sidebar_text">
                      Total Fund Target:
                    </span>
                  </div>
                  <div>
                    <Field
                      name="total_fund_target"
                      component={CustomInputFieldFormik}
                      inputPlaceholder="Total Fund"
                      type="text"
                      value={Number(values.total_fund_target)}
                      classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                      styleInput={{ resize: "none" }}
                      classNameWrapper="pt-[5px]"
                      className="!py-2 !text-[13px]"
                    />

                    <div className="max-w-[947px] grid-cols-2 gap-x-[120px] md:grid">
                      <div className="col-span-1">
                        <AddFeaturedImage
                          title="Campaign Image"
                          setTitle="Set Campaign Image"
                          removeTitle="Remove Campaign Image"
                          initialValue={values.feature_image}
                          handleAdd={(images) =>
                            setFieldValue("feature_image", images[0])
                          }
                          handleRemove={() =>
                            setFieldValue("feature_image", null)
                          }
                        />
                        <div className="text-sm text-red-500">
                          <ErrorMessage name="feature_image" />
                        </div>
                      </div>
                      <div className="col-span-1">
                        <AddOrEditImageGallery
                          setTitle="Add Campaign gallery images"
                          images={values.gallery ?? []}
                          handleAdd={(images) =>
                            setFieldValue("gallery", images)
                          }
                          handleRemove={(index) => {
                            setFieldValue(
                              "gallery",
                              produce(values.gallery, (draft) => {
                                draft.splice(index, 1);
                              }),
                            );
                          }}
                        />
                        <div className="text-sm text-red-500">
                          <ErrorMessage name="gallery" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[15px] font-normal text-merchant_sidebar_text">
                      Start Date:
                    </span>
                  </div>
                  <div>
                    <div className="max-w-[360px] !border-[1px] !border-merchant_border">
                      <DatePicker
                        wrapperClassName="!border-[1px] !border-merchant_border"
                        selected={
                          values.start_date === ""
                            ? null
                            : new Date(values.start_date)
                        }
                        onChange={(date) => {
                          if (date) {
                            setFieldValue("start_date", date);
                            setFieldValue("end_date", "");
                          } else {
                            setFieldValue("start_date", "");
                            setFieldValue("end_date", "");
                          }
                        }}
                        showTimeSelect
                        dateFormat="MM/dd/yyyy h:mm aa"
                        placeholderText="MM/DD/YYYY; hh/mm"
                        className="w-full cursor-pointer text-[13px]"
                        minDate={new Date()}
                      />
                    </div>
                    <div className="text-sm text-red-500">
                      <ErrorMessage name="start_date" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[15px] font-normal text-merchant_sidebar_text">
                      End Date:
                    </span>
                  </div>
                  <div>
                    <div className="max-w-[360px] !border-[1px] !border-merchant_border">
                      <DatePicker
                        wrapperClassName="!border-[1px] !border-merchant_border"
                        selected={
                          values.end_date === ""
                            ? null
                            : new Date(values.end_date)
                        }
                        onChange={(date) => setFieldValue("end_date", date)}
                        showTimeSelect
                        minDate={
                          values.start_date === ""
                            ? null
                            : new Date(values.start_date)
                        }
                        filterTime={filterPassedTime}
                        disabled={values.start_date === ""}
                        dateFormat="MM/dd/yyyy h:mm aa"
                        placeholderText={
                          values.start_date === ""
                            ? "Please select start date first."
                            : "MM/DD/YYYY hh/mm"
                        }
                        className="w-full cursor-pointer text-[13px]"
                      />
                    </div>
                    <div className="text-sm text-red-500">
                      <ErrorMessage name="end_date" />
                    </div>
                  </div>
                  <div />
                  <div className="flex items-center gap-[10px] pt-[30px]">
                    <ButtonPrimary
                      label="Save Changes"
                      className="rounded-xs !h-[34px] px-[10px] py-2 !shadow-none"
                      classNameLabel="text-xs font-normal"
                      type="submit"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      className="!h-[34px] rounded border border-solid border-merchant_border bg-buttonGradient px-[13px] py-2 text-xs font-medium text-merchant_text_color_blue"
                      onClick={() => router.push("/merchant/my-campaigns")}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddOrEditCampaigns;
