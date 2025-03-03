"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Title from "@/components/merchant/Title";
import SelectCategories from "@/components/merchant/Custom/SelectCategories";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { IMerchantCharities } from "@/app/merchant/my-campaigns/types";
import { addOrUpdateCorporateCampaigns } from "@/api/corporation/compaigns";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { FeatureImage } from "@/components/merchant/types";
import Tiptap from "@/components/common/RichTextEditor/RichTextEditor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddFeaturedImage from "../../common/AddFeaturedImage";
import AddOrEditImageGallery from "./AddOrEditImageGallery";
import { produce } from "immer";
import * as Yup from "yup";
import { validationSchemaForCorporateCampaign } from "../ValidationCorporate";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseMsg } from "@/utils/basicfunctions";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";

export interface initialState {
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

const AddOrEditCorporateCampaign = ({
  charities,
  initialState,
}: {
  charities: IMerchantCharities[];
  initialState: initialState;
}) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("campaignId");
  const router = useRouter();

  const handleSaveChanges = async (values: initialState) => {
    const _campaign = {
      ...values,
      feature_image: values.feature_image?.id ?? null,
      gallery: values.gallery.map((image) => image.id),
    };

    try {
      const response = await addOrUpdateCorporateCampaigns(
        id !== null ? { data: _campaign, id } : { data: _campaign },
      );

      if (response.error) {
        toast.error(parseMsg(response.data.message));
      } else {
        toast.success(parseMsg(response.data.message));
        router.push("/corporation/my-campaigns");
        router.refresh();
      }
    } catch (error) {
      console.error("Error saving campaign:", error);
    }
  };

  return (
    <div>
      <Title label="Campaigns" />
      <div className="py-4">
        <Formik
          initialValues={initialState}
          validationSchema={validationSchemaForCorporateCampaign}
          onSubmit={handleSaveChanges}
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
                  <span className="text-lg text-merchant_sidebar_text">
                    Manage Campaigns
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-x-[30px] gap-y-3 pt-[22px] md:grid-cols-[135px,1fr] md:gap-y-[45px]">
                  <div className="flex items-center">
                    <span className="text-[15px] font-normal text-merchant_sidebar_text">
                      Title:
                    </span>
                  </div>
                  <div>
                    <Field
                      name="title"
                      component={CustomInputFieldFormik}
                      inputPlaceholder="Title"
                      classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                      styleInput={{ resize: "none" }}
                      classNameWrapper="pt-[5px]"
                      className="!py-2 !text-[13px]"
                    />
                  </div>
                  <div className="md:pt-[2px]">
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
                  <div>
                    <span className="text-[15px] font-normal text-merchant_sidebar_text">
                      Description:
                    </span>
                  </div>
                  <div className="max-w-[947px]">
                    <Tiptap
                      onChange={(data) => setFieldValue("description", data)}
                      initContent={values.description}
                    />{" "}
                    <div className="text-sm text-red-500">
                      <ErrorMessage name="description" />
                    </div>
                  </div>
                  <div className="mt-[10px]">
                    <span className="text-sm font-normal text-merchant_sidebar_text">
                      Total Fund Target:
                    </span>
                  </div>
                  <div>
                    <Field
                      name="total_fund_target"
                      component={CustomInputFieldFormik}
                      inputPlaceholder="Total Fund"
                      type="number"
                      min={0}
                      classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                      styleInput={{ resize: "none" }}
                      classNameWrapper="pt-[5px]"
                      className="!py-2 text-[13px]"
                    />
                    <div className="grid max-w-[947px] grid-cols-2 gap-x-[120px]">
                      <div className="col-span-1">
                        <AddFeaturedImage
                          initialValue={values.feature_image}
                          handleAdd={(images) =>
                            setFieldValue("feature_image", images[0])
                          }
                          handleRemove={() =>
                            setFieldValue("feature_image", null)
                          }
                          setTitle="Add campaign image"
                          removeTitle="Remove campaign image"
                        />
                        <div className="text-sm text-red-500">
                          <ErrorMessage name="feature_image" />
                        </div>
                      </div>
                      <div className="col-span-1">
                        <AddOrEditImageGallery
                          images={values.gallery ?? []}
                          handleAdd={(images) =>
                            setFieldValue("gallery", images)
                          }
                          handleRemove={(index) =>
                            setFieldValue(
                              "gallery",
                              produce(values.gallery, (draft) => {
                                draft.splice(index, 1);
                              }),
                            )
                          }
                          setTitle="Add campaign gallery images"
                        />
                        <div className="text-sm text-red-500">
                          <ErrorMessage name="gallery" />
                        </div>
                      </div>
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
                  <div className="flex items-center">
                    <span className="text-[15px] font-normal text-merchant_sidebar_text">
                      Start Date:
                    </span>
                  </div>
                  <div>
                    <div className="max-w-[360px] !border-[1px] !border-merchant_border">
                      <DatePicker
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
                  <div className="mt-[10px]">
                    <span className="text-[15px] font-normal text-merchant_sidebar_text">
                      End Date:
                    </span>
                  </div>
                  <div>
                    <div className="max-w-[360px] !border-[1px] !border-merchant_border">
                      <DatePicker
                        selected={
                          values.end_date === ""
                            ? null
                            : new Date(values.end_date)
                        }
                        onChange={(date) => {
                          if (date) {
                            setFieldValue("end_date", date);
                          } else {
                            setFieldValue("end_date", "");
                          }
                        }}
                        showTimeSelect
                        filterTime={filterPassedTime}
                        dateFormat="MM/dd/yyyy h:mm aa"
                        placeholderText="MM/DD/YYYY; hh/mm"
                        className="w-full cursor-pointer text-[13px]"
                        minDate={
                          values.start_date && values.start_date === ""
                            ? new Date()
                            : new Date(values.start_date)
                        }
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
                      className="!h-[34px] rounded-sm px-[10px] py-2 !shadow-none"
                      classNameLabel="text-xs font-normal"
                      type="submit"
                      disabled={isSubmitting}
                    />
                    <button
                      type="reset"
                      className="!h-[34px] rounded-sm border border-solid border-merchant_border bg-buttonGradient px-[13px] py-2 text-xs font-medium text-merchant_text_color_blue"
                      onClick={() => router.push("/corporation/my-campaigns")}
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

export default AddOrEditCorporateCampaign;
