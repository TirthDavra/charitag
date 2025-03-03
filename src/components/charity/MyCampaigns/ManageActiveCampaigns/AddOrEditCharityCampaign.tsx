"use client";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import Tiptap from "@/components/common/RichTextEditor/RichTextEditor";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import Title from "@/components/merchant/Title";
import React, { useState } from "react";
import { FeatureImage } from "@/components/merchant/types";
import { produce } from "immer";
import { addOrUpdateCharityCampaigns } from "@/api/charity/charityCampaign";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import AddFeaturedImage from "@/components/common/AddFeaturedImage";
import AddOrEditImageGallery from "@/components/corporate/MyCampaigns/AddOrEditImageGallery";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import { validationSchemaForCharityCampaign } from "../../ValidationForCharity";
export interface IInitialState {
  title: string;
  description: string;
  short_description: string;
  feature_image: FeatureImage | null;
  gallery: FeatureImage[];
  total_fund_target: string | number;
  start_date: string;
  end_date: string;
}

const AddOrEditCharityCampaign = ({
  initialState,
}: {
  initialState: IInitialState;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("campaignId");
  const prevcampaign = searchParams.get("prev_campaign");
  const router = useRouter();

  const handleSaveChanges = async (values: IInitialState) => {
    setIsSubmitting(true);
    const _campaign = {
      ...values,
      feature_image: values.feature_image?.id ?? null,
      gallery: values.gallery.map((image) => image.id),
    };
    if (id) {
      const response = await addOrUpdateCharityCampaigns({
        data: _campaign,
        id: id,
      });
      if (response.error) {
        const errorMessage = Object.values<string>(response.data.message);
        toast.error(errorMessage[0].toString());
        setIsSubmitting(false);
      } else {
        toast.success(response.data.message);
        router.push("/charity/my-campaigns");
        router.refresh();
      }
    } else {
      const response = await addOrUpdateCharityCampaigns({ data: _campaign });
      if (response.error) {
        const errorMessage = Object.values<string>(response.data.message);
        toast.error(errorMessage[0].toString());
        setIsSubmitting(false);
      } else {
        toast.success(response.data.message);
        router.push("/charity/my-campaigns");
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
          validationSchema={validationSchemaForCharityCampaign}
          onSubmit={handleSaveChanges}
        >
          {({ values, setFieldValue,isSubmitting }) => {
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
                  <span className="text-lg font-medium text-merchant_sidebar_text">
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
                      inputPlaceholder="Charitag"
                      type="text"
                      classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                      styleInput={{ resize: "none" }}
                      classNameWrapper="pt-[5px]"
                      className="!py-2 !text-[13px]"
                    />
                  </div>
                  <div className="lg:pt-2">
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
                  <div className="lg:pt-3">
                    <span className="text-[15px] font-normal text-merchant_sidebar_text">
                      Total Fund Target:
                    </span>
                  </div>
                  <div>
                    <Field
                      name="total_fund_target"
                      component={CustomInputFieldFormik}
                      inputPlaceholder="Total Fund"
                      type="number"
                      value={values.total_fund_target}
                      classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                      styleInput={{ resize: "none" }}
                      classNameWrapper="pt-[5px]"
                      className="!py-2 !text-[13px]"
                    />
                    <div className="grid max-w-[947px] grid-cols-1 gap-x-[70px] md:grid-cols-2 xl:gap-x-[120px]">
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
                        wrapperClassName="!border-[1px] w-full !border-merchant_border"
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
                        placeholderText="MM/DD/YYYY hh/mm"
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
                        wrapperClassName="!border-[1px] !border-merchant_border w-full"
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
                        dateFormat="MM/dd/yyyy h:mm aa"
                        placeholderText={
                          values.start_date === ""
                            ? "Please select start date first."
                            : "MM/DD/YYYY hh/mm"
                        }
                        className="w-full cursor-pointer text-[13px]"
                        minDate={
                          values.start_date === ""
                            ? null
                            : new Date(values.start_date)
                        }
                        filterTime={filterPassedTime}
                        disabled={values.start_date === ""}
                      />
                    </div>
                    <div className="text-sm text-red-500">
                      <ErrorMessage name="end_date" />
                    </div>
                  </div>
                  <div />
                  <div className="flex items-center gap-[10px]">
                    <ButtonPrimary
                      label="Save Changes"
                      className="!h-[34px] rounded-sm px-[10px] py-2 !shadow-none"
                      classNameLabel="text-xs font-normal"
                      type="submit"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      className="!h-[34px] rounded-sm border border-solid border-merchant_border bg-buttonGradient px-[13px] py-2 text-xs font-medium text-merchant_text_color_blue"
                      onClick={() => router.push("/charity/my-campaigns")}
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

export default AddOrEditCharityCampaign;
