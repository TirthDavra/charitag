"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  addCorporateMembers,
  updateCorporateMembers,
} from "@/api/corporation/manageCorporateStaff";
import { IMercahntRoles } from "@/api/merchant/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { validationSchemaForMember } from "../../ValidationCorporate";
import { parseMsg } from "@/utils/basicfunctions";

interface AddOrEditCorporateMembersProps {
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

const AddOrEditCorporateMembers = ({
  initialState = {
    id: undefined,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role_id: 1,
    password: "",
  },
  roles,
}: AddOrEditCorporateMembersProps) => {
  const router = useRouter();

  return (
    <div>
      <span className="text-lg font-semibold text-merchant_sidebar_text">
        Add New Member
      </span>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchemaForMember}
        onSubmit={async (values, { setSubmitting }) => {
          if (values.id) {
            const response = await updateCorporateMembers({
              data: values,
              id: values.id,
            });
            if (response.error) {
              const errorMessage = Object.values<string>(response.data.message);
              toast.error(errorMessage[0].toString());
            } else {
              toast.success(response.data.message);
              router.push("/corporation/manage-staff?roles=false");
              router.refresh();
            }
          } else {
            const response = await addCorporateMembers(values);
            if (response.error) {
              const errorMessage = parseMsg(response.data.message);
              toast.error(errorMessage);
            } else {
              toast.success(response.data.message);
              router.push("/corporation/manage-staff?roles=false");
              router.refresh();
            }
          }
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="grid grid-cols-1 gap-y-3 pt-[22px] md:grid-cols-[170px,1fr] md:gap-y-[45px]">
            <div className="flex items-center">
              <span className="text-sm font-medium text-merchant_sidebar_text">
                Enter First Name
              </span>
            </div>
            <div>
              <Field
                name="first_name"
                component={CustomInputFieldFormik}
                inputPlaceholder="Wade"
                classNameContainer="max-w-[457px] rounded-sm border-merchant_border"
                className="!py-2 !text-[13px]"
              />
            </div>

            <div className="flex items-center">
              <span className="text-sm font-medium text-merchant_sidebar_text">
                Enter Last Name
              </span>
            </div>
            <div>
              <Field
                name="last_name"
                component={CustomInputFieldFormik}
                inputPlaceholder="Warren"
                classNameContainer="max-w-[457px] rounded-sm border-merchant_border"
                className="!py-2 !text-[13px]"
              />
            </div>

            <div className="flex items-center">
              <span className="text-sm font-medium text-merchant_sidebar_text">
                Enter Email
              </span>
            </div>
            <div>
              <Field
                name="email"
                type="email"
                component={CustomInputFieldFormik}
                inputPlaceholder="wadewarren43@gmail.com"
                classNameContainer="max-w-[457px] rounded-sm border-merchant_border"
                className="!py-2 !text-[13px]"
              />
            </div>

            <div className="flex items-center">
              <span className="text-sm font-medium text-merchant_sidebar_text">
                Enter Phone Number
              </span>
            </div>
            <div>
              <Field
                name="phone"
                type="tel"
                component={CustomInputFieldFormik}
                inputPlaceholder="+(00) 0000 0000"
                classNameContainer="max-w-[457px] rounded-sm border-merchant_border"
                className="!py-2 !text-[13px]"
              />
            </div>

            <div className="flex items-center">
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
                  className="!h-[unset] rounded-sm border-[1px] border-merchant_border !py-2 text-[13px] font-normal text-merchant_gray outline-none"
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
              <ErrorMessage
                name="role_id"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div className="pt-3">
              <span className="text-sm font-medium text-merchant_sidebar_text">
                Enter Password
              </span>
            </div>
            <div className="flex-grow">
              <Field
                name="password"
                type="password"
                component={CustomInputFieldFormik}
                inputPlaceholder="Password"
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
                  onClick={() =>
                    router.push("/corporation/manage-staff?roles=false")
                  }
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

export default AddOrEditCorporateMembers;
