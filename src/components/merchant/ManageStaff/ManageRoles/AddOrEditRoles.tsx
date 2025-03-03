"use client";
import {
  addMerchantRoles,
  updateMerchantRoles,
} from "@/api/merchant/merchantManageStaff";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import { validationSchemaForRole } from "../../ValidationForMerchant";

interface AddOrEditRolesProps {
  initialState: {
    id?: string;
    name: string;
  };
}

const AddOrEditRoles = ({
  initialState = {
    id: undefined,
    name: "",
  },
}: AddOrEditRolesProps) => {
  const router = useRouter();

  return (
    <div>
      <span className="text-lg font-semibold text-merchant_sidebar_text">
        Add New Role
      </span>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchemaForRole}
        onSubmit={async (values: { id?: string; name: string }) => {
          if (values.id) {
            const response = await updateMerchantRoles({
              data: values,
              id: values.id,
            });
            if (response.error) {
              const errorMessage = Object.values<string>(response.data.message);
              toast.error(errorMessage[0].toString());
            } else {
              toast.success(response.data.message);
              router.push("/merchant/manage-staff");
              router.refresh();
            }
          } else {
            const response = await addMerchantRoles(values);
            if (response.error) {
              const errorMessage = Object.values<string>(response.data.message);
              toast.error(errorMessage[0].toString());
            } else {
              toast.success(response.data.message);
              router.push("/merchant/manage-staff");
              router.refresh();
            }
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className="grid grid-cols-1 gap-y-3 pt-[22px] md:grid-cols-[200px,1fr] md:gap-y-[45px]">
            <div className="!pt-[7px]">
              <span className="text-sm font-medium text-merchant_sidebar_text">
                Enter New Role
              </span>
            </div>
            <div>
              <Field
                name="name"
                component={CustomInputFieldFormik}
                inputPlaceholder="Marketing Manager"
                value={values.name}
                type="text"
                classNameContainer="max-w-[475px] rounded-sm border-merchant_border"
                className="!py-2 !text-[13px]"
              />

              <div className="flex items-center gap-[10px] pt-[30px]">
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
                  onClick={() => router.push("/merchant/manage-staff")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddOrEditRoles;
