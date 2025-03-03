"use client";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import React, { useContext, useState } from "react";
import { ProductContext } from "../../store/ProductContext";
import { addProductApi } from "@/api/merchant/merchantProducts";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { parseMsg, validateFormValues } from "@/utils/basicfunctions";
import { useModal } from "@/components/context/ModalContext";
import ActionContent from "@/components/common/Modals/actionModal/ActionContent";
import { productValidationSchema } from "./ValidationSchema";

const Publish = () => {
  const { productDetails, setProductDetails } = useContext(ProductContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { openModal, closeModal, updateSharedState } = useModal();

  const validateProduct = async () => {
    const validationResult = await validateFormValues(
      productValidationSchema,
      productDetails,
    );
    if (!validationResult.isValid) {
      toast.error(validationResult.errorMessage);
      return false;
    }
    return true;
  };

  const saveDraft = async () => {
    if (!(await validateProduct())) {
      return;
    }
    const response = await addProductApi({
      ...productDetails,
      linked_products: {
        cross_sells: productDetails.linked_products.cross_sells.map(
          (val) => val.value,
        ),
        up_sells: productDetails.linked_products.up_sells.map(
          (val) => val.value,
        ),
      },
      is_draft: true,
      product_category_ids: productDetails.product_category_ids.map(
        (cat) => cat.value,
      ),
      product_sub_category_ids: productDetails.product_sub_category_ids.map(
        (cat) => cat.value,
      ),
      variations: Object.values(productDetails.variations),
    });
    return response;
  };

  const handleSaveDraft = async () => {
    setIsSubmitting(true);

    if (!productDetails.product_name) {
      toast.error("Please add product name.");
      setIsSubmitting(false);
      return;
    }
    if (
      Number(productDetails.price.sale_price) >
      Number(productDetails.price.regular_price)
    ) {
      toast.error(
        "Regular price should be greater than or equal to sale price",
      );
      setIsSubmitting(false);
      return;
    }
    const response = await saveDraft();
    if (response?.data.status) {
      if (productDetails?.product_id) {
        toast.success("Product is updated successfully.");
      } else {
        toast.success("Product is saved to draft.");
      }
      setProductDetails((prev) => ({
        ...prev,
        product_id: response?.data.product_id,
        product_slug: response?.data.product_slug,
      }));
      router.push("/merchant/products/all");
      router.refresh();
    } else {
      if (typeof response?.data.message === "object") {
        const errorMessage = Object.values<string[]>(response?.data.message);
        toast.error(errorMessage[0][0]);
      } else {
        toast.error(response?.data.message);
      }
    }
    setIsSubmitting(false);
  };

  const handlePreview = async () => {
    setIsSubmitting(true);
    try {
      if (!(await validateProduct())) {
        setIsSubmitting(false);
        return;
      }
      const response = await saveDraft();
      if (response && response.data.status) {
        toast.success("Product is saved to draft.");
        setProductDetails((prev) => ({
          ...prev,
          product_id: response.data.product_id,
          product_slug: response.data.product_slug,
        }));
        window.open(
          process.env.NEXT_PUBLIC_CLIENT_URL +
            `/shop/${response.data.product_slug}?preview=true`,
          "_blank",
        );
      } else if (response) {
        if (typeof response.data.message === "object") {
          const errorMessage = Object.values<string[]>(response.data.message);
          toast.error(errorMessage[0][0]);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("An error occurred while preparing the preview.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveChanges = async () => {
    setIsSubmitting(true);
    if (!(await validateProduct())) {
      setIsSubmitting(false);
      return;
    }
    updateSharedState({
      disabled: true,
    });
    if (
      Number(productDetails.price.sale_price) >
      Number(productDetails.price.regular_price)
    ) {
      toast.error(
        "Regular price should be greater than or equal to sale price",
      );
      setIsSubmitting(false);
      return;
    }
    const product = {
      ...productDetails,
      is_draft: false,
      linked_products: {
        cross_sells: productDetails.linked_products.cross_sells.map(
          (val) => val.value,
        ),
        up_sells: productDetails.linked_products.up_sells.map(
          (val) => val.value,
        ),
      },
      product_category_ids: productDetails.product_category_ids.map(
        (cat) => cat.value,
      ),
      product_sub_category_ids: productDetails.product_sub_category_ids.map(
        (cat) => cat.value,
      ),
      variations: Object.values(productDetails.variations),
    };

    const response = await addProductApi(product);

    if (response.error) {
      const errorMessage = parseMsg(response.data.message);
      if (errorMessage) {
        toast.error(errorMessage);
      }
      setIsSubmitting(false);
    } else {
      toast.success(response.data.message);
      router.push(
        "/merchant/products/all?page=1&sort_field=created_at&sort_order=desc",
      );
      router.refresh();
    }
    setIsSubmitting(false);
    closeModal();
  };

  return (
    <div className="mt-10 md:mt-0">
      <div className="w-full text-lg font-medium text-zinc-800">Publish</div>
      <div className="mt-4 flex w-full flex-col rounded border border-merchant_border pb-2.5 pt-4">
        <div className="ml-3 flex gap-2.5 self-start text-xs font-medium text-blue-600">
          <button
            className={`justify-center rounded border border-solid border-blue-600 bg-white px-3.5 py-2 ${isSubmitting ? "cursor-not-allowed !border-blue-200 !text-blue-200" : ""}`}
            onClick={handleSaveDraft}
            disabled={isSubmitting}
          >
            Save Draft
          </button>
          <button
            onClick={handlePreview}
            className={`justify-center rounded border border-solid border-blue-600 bg-white px-3.5 py-2 ${isSubmitting ? "cursor-not-allowed !border-blue-200 !text-blue-200" : ""}`}
            disabled={isSubmitting}
          >
            Preview
          </button>
        </div>
        <div className="mt-4 min-h-[1px] w-full border-b border-merchant_border" />
        <div className="mx-3 mt-2 text-sm text-gray-600">
          <p className="mb-2 font-medium">Please Note:</p>
          <ul className="list-disc pl-4">
            <li>
              Selecting <strong>Save Draft</strong> will save your product as a
              draft, visible only to you.
            </li>
            <li>
              Selecting <strong>Save Changes</strong> will submit your product
              for admin review. It will be visible to consumers only after
              approval.
            </li>
          </ul>
        </div>

        <div className="mx-3 mt-9 flex items-center justify-end gap-1 sm:gap-0">
          <ButtonPrimary
            disabled={isSubmitting}
            label="Save Changes"
            className="rounded-sm px-[13px] !shadow-none"
            classNameLabel="text-[12px] font-normal"
            onClick={async () => {
              const isValid = await validateProduct();
              if (isValid) {
                openModal({
                  content: (
                    <ActionContent
                      cancelLabel="Cancel"
                      confirmLabel="Save"
                      message="If you save this product, it will be sent for admin
                        review. The product will not be visible to consumers until
                        it has been approved."
                      type="info"
                      onCancel={closeModal}
                      onOk={handleSaveChanges}
                      okDisabled={isSubmitting}
                    />
                  ),
                  sharedState: {
                    disabled: false,
                  },
                  crossMarkRight: true,
                });
              } else {
                setIsSubmitting(false);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Publish;
