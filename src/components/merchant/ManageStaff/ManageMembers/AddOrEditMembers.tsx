"use client";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import React, { useState } from "react";
import Help from "@/components/common/Help";
import {
  addMerchantMembers,
  updateMerchantMembers,
} from "@/api/merchant/merchantManageStaff";
import { IMercahntRoles } from "@/api/merchant/types";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchemaForMember } from "../../ValidationForMerchant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddOrEditMembersProps {
  initialState?: {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    role_id: number | string;
    password: string;
  };
  roles?: IMercahntRoles[];
}

const AddOrEditMembers = ({
  initialState = {
    id: undefined,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role_id: "",
    password: "",
  },
  roles,
}: AddOrEditMembersProps) => {
  const router = useRouter();

  return (
    <div>
      <span className="text-lg font-semibold text-merchant_sidebar_text">
        Add New Member
      </span>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchemaForMember}
        onSubmit={async (values: typeof initialState) => {
          if (values.id) {
            const response = await updateMerchantMembers({
              data: values,
              id: values.id,
            });
            if (response.error) {
              const errorMessage = Object.values<string>(response.data.message);
              toast.error(errorMessage[0].toString());
            } else {
              toast.success(response.data.message);
              router.push("/merchant/manage-staff?roles=false");
              router.refresh();
            }
          } else {
            const response = await addMerchantMembers(values);
            if (response.error) {
              const errorMessage = Object.values<string>(response.data.message);
              toast.error(errorMessage[0].toString());
            } else {
              toast.success(response.data.message);
              router.push("/merchant/manage-staff?roles=false");
              router.refresh();
            }
          }
        }}
      >
        {({ values, setFieldValue,isSubmitting }) => {
          return (
            <Form className="grid grid-cols-1 items-center gap-y-3 pt-[22px] md:grid-cols-[170px,1fr] md:gap-y-[45px]">
              <div>
                <span className="text-sm font-medium text-merchant_sidebar_text">
                  Enter First Name
                </span>
              </div>
              <div>
                <Field
                  name="first_name"
                  component={CustomInputFieldFormik}
                  inputPlaceholder="First name"
                  classNameContainer="max-w-[457px] rounded-sm border-merchant_border"
                  className="!py-2 !text-[13px]"
                />
              </div>
              <div>
                <span className="text-sm font-medium text-merchant_sidebar_text">
                  Enter Last Name
                </span>
              </div>
              <div>
                <Field
                  name="last_name"
                  component={CustomInputFieldFormik}
                  inputPlaceholder="Last name"
                  classNameContainer="max-w-[457px] rounded-sm border-merchant_border"
                  className="!py-2 !text-[13px]"
                />
              </div>
              <div>
                <span className="text-sm font-medium text-merchant_sidebar_text">
                  Enter Email
                </span>
              </div>
              <div>
                <Field
                  name="email"
                  type="email"
                  component={CustomInputFieldFormik}
                  inputPlaceholder="Email"
                  classNameContainer="max-w-[457px] rounded-sm border-merchant_border"
                  className="!py-2 !text-[13px]"
                />
              </div>
              <div>
                <span className="text-sm font-medium text-merchant_sidebar_text">
                  Enter Phone Number
                </span>
              </div>
              <div>
                <Field
                  name="phone"
                  type="text"
                  component={CustomInputFieldFormik}
                  inputPlaceholder="Phone number"
                  classNameContainer="max-w-[457px] rounded-sm border-merchant_border"
                  className="!py-2 !text-[13px]"
                />
              </div>
              <div>
                <span className="text-sm font-medium text-merchant_sidebar_text">
                  Manage User Role
                </span>
              </div>
              <div className="max-w-[457px]">
                <Select
                value={values.role_id.toString()}
                onValueChange={(value) => {
                  setFieldValue("role_id", value);
                }}
              >
                <SelectTrigger
                  classNameIcon="!text-black font-bold"
                  className="!h-[unset] !py-2 rounded-sm border-[1px] border-merchant_border text-[13px] font-normal text-merchant_gray outline-none"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="text-merchant_gray">
                  {roles &&
                    roles?.map((item) => {
                      return (
                        <SelectItem
                          key={item.id}
                          value={item.id.toString()}
                          className="text-base"
                        >
                          {item.name}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
                <div className="text-sm text-red-500">
                  <ErrorMessage name="role_id" />
                </div>
              </div>
              <div className="md:pb-14">
                <span className="text-sm font-medium text-merchant_sidebar_text">
                  Enter Password
                </span>
              </div>
              <div className="flex items-center gap-[13px]">
                <div className="flex-grow">
                  <Field
                    name="password"
                    type="password"
                    component={CustomInputFieldFormik}
                    inputPlaceholder="Password"
                    classNameContainer="max-w-[457px] rounded-sm border-merchant_border"
                    className="!py-2 !text-[13px]"
                  />
                  <div className="mb-3 flex items-center gap-[10px] pt-[30px] md:mb-0">
                    <ButtonPrimary
                      label="Save Changes"
                      type="submit"
                      className="!h-[34px] rounded-sm px-[10px] py-2 !shadow-none"
                      classNameLabel="text-xs font-normal"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      className="!h-[34px] rounded-sm border border-solid border-merchant_border bg-buttonGradient px-[13px] py-2 text-xs font-medium text-merchant_text_color_blue"
                      onClick={() =>
                        router.push("/merchant/manage-staff?roles=false")
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddOrEditMembers;
