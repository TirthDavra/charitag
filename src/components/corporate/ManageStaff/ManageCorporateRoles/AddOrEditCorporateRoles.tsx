"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  addCorporateRoles,
  updateCorporateRoles,
} from "@/api/corporation/manageCorporateStaff";
import { validationSchemaForRole } from "../../ValidationCorporate";

interface AddOrEditCorporateRolesProps {
  initialState?: {
    id?: string;
    name: string;
  };
}

const AddOrEditCorporateRoles = ({
  initialState = {
    id: undefined,
    name: "",
  },
}: AddOrEditCorporateRolesProps) => {
  const router = useRouter();

  return (
    <div>
      <span className="text-lg font-semibold text-merchant_sidebar_text">
        Add New Role
      </span>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchemaForRole}
        onSubmit={async (values, { setSubmitting }) => {
          if (values.id) {
            const response = await updateCorporateRoles({
              data: values,
              id: values.id,
            });
            if (response.error) {
              const errorMessage = Object.values<string>(response.data.message);
              toast.error(errorMessage[0].toString());
            } else {
              toast.success(response.data.message);
              router.push("/corporation/manage-staff");
              router.refresh();
            }
          } else {
            const response = await addCorporateRoles(values);
            if (response.error) {
              const errorMessage = Object.values<string>(response.data.message);
              toast.error(errorMessage[0].toString());
            } else {
              toast.success(response.data.message);
              router.push("/corporation/manage-staff");
              router.refresh();
            }
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="grid grid-cols-1 gap-y-3 pt-[22px] md:grid-cols-[200px,1fr] md:gap-y-[45px]">
            <div className="mt-[7px]">
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
                  className="rounded-sm px-[10px] py-2 !shadow-none"
                  classNameLabel="text-[13px] font-normal"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="rounded-sm border border-solid border-merchant_border bg-buttonGradient px-[13px] py-2 text-[13px] font-medium text-merchant_text_color_blue"
                  onClick={() => router.push("/corporation/manage-staff")}
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

export default AddOrEditCorporateRoles;
