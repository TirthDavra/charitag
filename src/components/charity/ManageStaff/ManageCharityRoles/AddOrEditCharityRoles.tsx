"use client";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import {
  addCharityRoles,
  updateCharityRoles,
} from "@/api/charity/charityManageStaff";
import { validationSchemaForRole } from "../../ValidationForCharity";
import { useState } from "react";

interface AddOrEditCharityRolesProps {
  initialState: {
    id?: string;
    name: string;
  };
}

const AddOrEditCharityRoles = ({
  initialState = {
    id: undefined,
    name: "",
  },
}: AddOrEditCharityRolesProps) => {
  const router = useRouter();

  return (
    <div>
      <span className="text-lg font-semibold text-merchant_sidebar_text">
        Add New Role
      </span>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchemaForRole}
        onSubmit={async (values: typeof initialState) => {
          if (values.id) {
            const response = await updateCharityRoles({
              data: values,
              id: values.id,
            });
            if (response.error) {
              const errorMessage = Object.values<string>(response.data.message);
              toast.error(errorMessage[0].toString());
            } else {
              toast.success(response.data.message);
              router.push("/charity/manage-staff");
              router.refresh();
            }
          } else {
            const response = await addCharityRoles(values);
            if (response.error) {
              const errorMessage = Object.values<string>(response.data.message);
              toast.error(errorMessage[0].toString());
            } else {
              toast.success(response.data.message);
              router.push("/charity/manage-staff");
              router.refresh();
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="grid grid-cols-1 gap-y-3 pt-[22px] md:grid-cols-[200px,1fr] md:gap-y-[45px]">
            <div className="pt-[7px]">
              <span className="text-sm font-medium text-merchant_sidebar_text">
                Enter New Role
              </span>
            </div>
            <div>
              <Field
                name="name"
                component={CustomInputFieldFormik}
                inputPlaceholder="Marketing Manager"
                classNameContainer="max-w-[457px] rounded-sm border-merchant_border"
                className="!py-2 !text-[13px]"
              />

              <div className="flex items-center gap-[10px] pt-[30px]">
                <ButtonPrimary
                  label="Save Changes"
                  type="submit"
                  className="!h-[34px] rounded-sm px-[10px] py-2 !shadow-none"
                  classNameLabel="!text-xs font-normal"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="!h-[34px] rounded-sm border border-solid border-merchant_border bg-buttonGradient px-[13px] py-2 text-xs font-medium text-merchant_text_color_blue"
                  onClick={() => router.push("/charity/manage-staff")}
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

export default AddOrEditCharityRoles;
