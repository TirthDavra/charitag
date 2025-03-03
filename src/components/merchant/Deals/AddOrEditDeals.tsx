"use client";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import Title from "../Title";
import RadioButton from "../Custom/RadioButton";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { useEffect, useRef, useState } from "react";
import {
  addOrUpdateMerchantDeals,
  getProductsVariationsClient,
} from "@/api/merchant/merchantDeals";
import {
  IProductVariationSingle,
  IProductVariationsDataReduced,
  IProductVariationsResponse,
} from "./types";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { FeatureImage } from "../types";
import ProductCategories, {
  ISubCatOptions,
} from "../Products/addProduct/ProductCategories";
import { IAllCategoryResponse } from "@/api/common/types";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import Tiptap from "../../common/RichTextEditor/RichTextEditor";

import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddFeaturedImage from "@/components/common/AddFeaturedImage";
import AddOrEditImageGallery from "@/components/corporate/MyCampaigns/AddOrEditImageGallery";
import { produce } from "immer";
import { useModal } from "@/components/context/ModalContext";
import { parseMsg } from "@/utils/basicfunctions";
import ActionContent from "@/components/common/Modals/actionModal/ActionContent";
import Combobox from "@/components/common/Combobox";
import { MultiValue } from "react-select";
// export interface IMerchantEditDealsState
//   extends Omit<
//     IMerchantDealDetails,
//     "gallery" | "feature_image" | "deal_category_ids" | "deal_sub_category_ids"
//   > {
//   gallery: number[];
//   feature_image: number | null;
//   deal_sub_category_ids: string[];
//   deal_category_ids: string[];
//   price: number;
// }

export interface IInitState {
  id: number | null;
  title: string;
  short_description: string;
  long_description: string;
  deals_expiry_on: 1 | 2;
  qty: number;
  start_date: string | null;
  end_date: string | null;
  feature_image: FeatureImage | null;
  gallery: FeatureImage[];
  deal_category_ids: Option[];
  deal_sub_category_ids: MultiValue<ISubCatOptions>;
  product_id: Option | null;
  product_variation_id: Option | null;
  discount: number;
  price: number | null;
  product_type: 1 | 2;
  variations?: IProductVariationSingle[];
}

const AddOrEditDeals = ({
  dealCategory,
  initialState,
  productWithVariations,
}: {
  dealCategory: IAllCategoryResponse;
  initialState: IInitState;
  productWithVariations: IProductVariationsResponse;
}) => {
  const [deals, setDeals] = useState<IInitState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { closeModal, openModal, updateSharedState } = useModal();
  const searchParams = useSearchParams();
  const id = searchParams.get("dealId");
  const router = useRouter();

  const [variations, setVaiations] = useState<IProductVariationSingle[]>(
    initialState?.variations ?? [],
  );
  const [allProductList, setAllProductList] = useState<
    IProductVariationsDataReduced[]
  >(productWithVariations?.data ?? []);

  const [selectedProductPrice, setSelectedProductPrice] = useState<
    number | null
  >(initialState.price);
  const [selectedProductType, setSelectedProductType] = useState<1 | 2 | null>(
    initialState.product_type,
  );
  const handleRadioButtonChange = (value: 1 | 2) => {
    setDeals((prev) => ({
      ...prev,
      deals_expiry_on: value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeals((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (data: string) => {
    setDeals((prev) => {
      return {
        ...prev,
        long_description: data,
      };
    });
  };

  interface ValidationRule {
    required: boolean | ((values: typeof deals) => boolean);
    condition?: (value: any) => boolean;
    message: string;
    pair?: string;
  }

  interface ValidationRules {
    [key: string]: ValidationRule;
  }

  const validationRules: ValidationRules = {
    title: {
      required: true,
      message: "Title is required",
    },
    short_description: {
      required: true,
      message: "Short description is required",
    },
    long_description: {
      required: true,
      message: "Long description is required",
    },
    qty: {
      required: (values) => values.deals_expiry_on === 1,
      message: "Quantity is required",
    },

    deals_expiry_on: {
      required: true,
      message: "Deal expiry option is required",
    },

    start_date: {
      required: (values) => values.deals_expiry_on === 2,
      message: "Start date and End date are required",
      pair: "end_date", // specify the related field for the combined condition
    },
    end_date: {
      required: (values) => values.deals_expiry_on === 2,
      message: "Start date and End date are required",
      pair: "start_date", // specify the related field for the combined condition
    },
    feature_image: {
      required: true,
      condition: (value) => value?.thumbnail_path.length,
      message: "Feature image is required",
    },
    gallery: {
      required: true,
      condition: (value) => value?.length,
      message: "Gallery is required",
    },
    deal_category_ids: {
      required: true,
      condition: (value) => value.length,
      message: "At least one deal category is required",
    },
    discount: {
      required: true,
      message: "Discount is required",
    },
  };

  const validateForm = () => {
    let isValid = true;
    const errors: string[] = [];

    Object.keys(validationRules).forEach((field) => {
      const rule = validationRules[field];
      const value = deals[field as keyof IInitState];

      if (
        typeof rule.required === "function"
          ? rule.required(deals)
          : rule.required
      ) {
        const isValidField = rule.condition ? rule.condition(value) : !!value;
        if (!isValidField) {
          errors.push(rule.message);
          isValid = false;
        }
      }
    });

    if (!isValid) {
      toast.error(errors[0]); // Display the first error
    }

    return isValid;
  };

  const filterPassedTime = (time: string | Date) => {
    const currentDate =
      deals.start_date === "" ? new Date() : new Date(deals?.start_date || "");
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleSaveChanges = async () => {
    // setIsSubmitting(true);
    if (!validateForm()) {
      return;
    }
    openModal({
      content: (
        <ActionContent
          cancelLabel="cancel"
          confirmLabel="Save"
          message="If you save this deal, it will be sent for admin review. The deal
            will not be visible to consumers until it has been approved."
          type="info"
          onCancel={closeModal}
          onOk={handleSaveDeal}
          okDisabled={isSubmitting}
        />
      ),
      sharedState: {
        disabled: false,
      },
      crossMarkRight: true,
    });
  };
  const handleSaveDeal = async () => {
    setIsSubmitting(true);
    if (!validateForm()) {
      return;
    }
    updateSharedState({
      disabled: true,
    });
    const handleResponse = (response: any) => {
      if (response.error) {
        const errorMessage = parseMsg(response.data.message);
        toast.error(errorMessage);
      } else {
        toast.success(response.data.message);
        closeModal();
        router.push("/merchant/deals");
        router.refresh();
      }
      setIsSubmitting(false);
    };

    const data = deals.product_variation_id;

    const response = await addOrUpdateMerchantDeals({
      data: {
        id: deals.id,
        title: deals.title,
        short_description: deals.short_description,
        long_description: deals.long_description,
        deals_expiry_on: deals.deals_expiry_on,
        qty: deals.qty,
        start_date: deals.start_date,
        end_date: deals.end_date,
        feature_image: deals.feature_image?.id || null,
        product_id:
          selectedProductType === 1
            ? Number(deals.product_id ? deals.product_id.value : 0)
            : Number(
                deals.product_variation_id !== null
                  ? deals.product_variation_id.value
                  : 0,
              ),
        discount: deals.discount,
        gallery: deals.gallery.map((item) => item.id),
        deal_category_ids: deals.deal_category_ids.map((item) =>
          Number(item.value),
        ),
        deal_sub_category_ids: deals.deal_sub_category_ids.map((item) =>
          Number(item.value),
        ),
      },
    });
    handleResponse(response);
  };
  const lists = productWithVariations.data.map((item) => ({
    label: item.product_name,
    value: item.id.toString(),
  }));
  return (
    <div>
      <Title label="Deals" />
      <div className="py-4">
        <div>
          <span className="text-lg font-medium text-merchant_sidebar_text">
            Manage Deals
          </span>
        </div>
        <div className="grid grid-cols-1 gap-x-[30px] gap-y-3 pb-11 pt-[22px] md:grid-cols-[135px,1fr] md:gap-y-[45px]">
          <div className="flex items-center">
            <span className="text-[15px] font-normal text-merchant_sidebar_text">
              Title Of Deal:
            </span>
          </div>
          <div>
            <CustomInputField
              value={deals.title}
              name="title"
              onChange={handleChange}
              inputPlaceholder="Deals Name"
              type="text"
              classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
              styleInput={{ resize: "none" }}
              classNameWrapper="pt-[5px]"
              className="!py-2"
              textPlaceholder="!text-sm"
            />
          </div>
          <div className="lg:pt-2">
            <span className="text-[15px] font-normal text-merchant_sidebar_text">
              Short Description:
            </span>
          </div>
          <div>
            <CustomInputField
              value={deals.short_description}
              name="short_description"
              onChange={handleChange}
              inputPlaceholder="Write Here Description..."
              classNameContainer="max-w-[947px] rounded-sm border-merchant_border"
              styleInput={{ resize: "none" }}
              classNameWrapper="pt-[5px]"
              className="!py-2"
              textArea={true}
              textAreaRows={2}
              textPlaceholder="!text-sm"
            />
          </div>
          <div className="lg:pt-2">
            <span className="text-[15px] font-normal text-merchant_sidebar_text">
              Long Description:
            </span>
          </div>
          <div className="max-w-[947px]">
            <Tiptap
              onChange={handleInputChange}
              initContent={deals.long_description}
            />
          </div>
          <div>
            <span className="text-[15px] font-normal text-merchant_sidebar_text">
              Deals Expiry:
            </span>
          </div>
          <div>
            <div className="max-w-fit">
              <RadioButton
                name="quantity"
                checked={deals.deals_expiry_on === 1}
                onChange={() => handleRadioButtonChange(1)}
                label="Expiry Within The Given Quantity"
                value="yes"
                classNameContaine="min-h-5 min-5 cursor-pointer"
                classNameLabel="text-merchant_sidebar_text text-[15px] cursor-pointer"
              />
            </div>
            <div className="max-w-fit pt-[45px]">
              <RadioButton
                name="timeframe"
                checked={deals.deals_expiry_on === 2}
                onChange={() => handleRadioButtonChange(2)}
                label="Expiry Within The Given Timeframe"
                value="yes"
                classNameContaine="min-h-5 min-5 cursor-pointer"
                classNameLabel="text-merchant_sidebar_text text-[15px] cursor-pointer"
              />
            </div>
            {deals.deals_expiry_on === 1 ? (
              <div className="flex items-center gap-[34px] pt-[30px]">
                <span className="text-[15px] font-normal text-merchant_sidebar_text">
                  Add Qty:
                </span>
                <div>
                  <CustomInputField
                    name="qty"
                    value={deals.qty}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (/^\d*$/.test(e.target.value)) {
                        setDeals((prev) => ({
                          ...prev,
                          qty: Number(e.target.value),
                        }));
                      }
                    }}
                    inputPlaceholder="456"
                    classNameContainer="max-w-[226px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="pt-[5px]"
                    className="!py-2"
                    textPlaceholder="!text-sm"
                  />
                </div>
              </div>
            ) : (
              <div className="grid-col-1 grid flex-wrap items-center gap-y-2 pt-6 xl:flex xl:gap-6">
                <span className="text-[15px] font-normal text-merchant_sidebar_text">
                  Add Time
                </span>
                <div
                  className="!border-[1px] !border-merchant_border"
                  onClick={() => {
                    if (
                      deals?.start_date
                        ? new Date() > new Date(deals.start_date)
                        : false
                    ) {
                      toast.info(
                        "You can't change start Date once the deal is launched",
                      );
                    }
                  }}
                >
                  <DatePicker
                    selected={
                      deals.start_date === null
                        ? null
                        : new Date(deals.start_date)
                    }
                    onChange={(date) => {
                      setDeals((prev) => {
                        const newStartDate = date ? date.toISOString() : "";
                        if (prev.start_date === newStartDate) {
                          return prev;
                        }
                        return {
                          ...prev,
                          start_date: newStartDate,
                        };
                      });
                    }}
                    showTimeSelect
                    dateFormat="MM/dd/yyyy h:mm aa"
                    placeholderText="MM/DD/YYYY; hh/mm"
                    className="w-full cursor-pointer outline-none"
                    minDate={new Date()}
                    readOnly={
                      deals?.start_date
                        ? new Date() > new Date(deals.start_date)
                        : false
                    }
                  />
                </div>
                <span className="text-[15px] font-normal text-merchant_sidebar_text">
                  To
                </span>
                <div className="!border-[1px] !border-merchant_border">
                  <DatePicker
                    selected={
                      deals.end_date === null ? null : new Date(deals.end_date)
                    }
                    onChange={(date) => {
                      setDeals((prev) => {
                        const newEndDate = date ? date.toISOString() : "";
                        if (prev.end_date === newEndDate) {
                          return prev;
                        }
                        return {
                          ...prev,
                          end_date: newEndDate,
                        };
                      });
                    }}
                    showTimeSelect
                    filterDate={filterPassedTime}
                    dateFormat="MM/dd/yyyy h:mm aa"
                    className="w-full cursor-pointer"
                    placeholderText="MM/DD/YYYY; hh/mm"
                  />
                </div>
              </div>
            )}
            <div className="max-w-[947px] grid-cols-2 gap-x-[80px] md:grid xl:gap-x-[120px]">
              <div className="col-span-1">
                <AddFeaturedImage
                  initialValue={deals.feature_image}
                  handleAdd={(images) => {
                    setDeals((prev) => {
                      return {
                        ...prev,
                        feature_image: images[0],
                      };
                    });
                  }}
                  handleRemove={() => {
                    setDeals((prev) => {
                      return {
                        ...prev,
                        feature_image: null,
                      };
                    });
                  }}
                />
              </div>
              <div className="col-span-1">
                <AddOrEditImageGallery
                  images={deals.gallery ?? []}
                  handleAdd={(images) => {
                    setDeals((prev) => {
                      return {
                        ...prev,
                        gallery: images,
                      };
                    });
                  }}
                  handleRemove={(index) => {
                    setDeals(
                      produce((draft) => {
                        draft.gallery.splice(index, 1);
                      }),
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div className="pt-2">
            <span className="text-[15px] font-normal text-merchant_sidebar_text">
              Deal Category:
            </span>
          </div>
          <div className="max-w-[947px]">
            <ProductCategories
              className="flex-wrap md:flex-nowrap"
              classontainer="!py-[9px]"
              productCategories={dealCategory}
              onCategoryChange={(values) => {
                setDeals((prev) => {
                  return {
                    ...prev,
                    deal_category_ids: values,
                  };
                });
              }}
              onSubCategoryChange={(values) => {
                setDeals((prev) => {
                  return {
                    ...prev,
                    deal_sub_category_ids: values,
                  };
                });
              }}
              selectedCategories={deals.deal_category_ids || []}
              selectedSubCategories={deals.deal_sub_category_ids || []}
              placeholderCategory="Select Deal Main Category."
              placeholderSubCategory="Select Sub-Categories For Your Deals"
            />
          </div>
          <div className="pt-2">
            <span className="text-[15px] font-normal text-merchant_sidebar_text">
              Select A Product:
            </span>
          </div>
          <div className="max-w-[947px]">
            <Combobox
              placeholder={"Search product..."}
              value={deals.product_id}
              // defaultOptions={allProductList.map((item) => ({
              //   label: item.product_name,
              //   value: item.id.toString(),
              // }))}
              onSearch={async (value) => {
                const newSearch = value.trim();
                if (newSearch.length > 2) {
                  const response = await getProductsVariationsClient({
                    search: newSearch,
                  });
                  if (!response.error && response.data.status) {
                    setAllProductList(response.data.data);
                    return response.data.data.map((item) => ({
                      label: item.product_name,
                      value: item.id.toString(),
                    }));
                  }
                }
                return [];
              }}
              loadingIndicator={<div>Loading...</div>}
              emptyIndicator={
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  No results found.
                </p>
              }
              searchPlaceholder="Search Product (min 3 characters)..."
              onChange={(values) => {
                if (values !== null) {
                  const id = Number(values.value);
                  const product = allProductList.find((item) => item.id === id);
                  setVaiations(product?.variations ?? []);
                  setDeals((prev) => ({
                    ...prev,
                    product_id: values,
                    product_variation_id: null,
                  }));
                  if (product?.product_type === 1) {
                    setSelectedProductPrice(
                      product?.price?.sale_price
                        ? Number(product.price.sale_price)
                        : null,
                    );
                  }
                  setSelectedProductType(product?.product_type ?? null);
                } else {
                  setDeals((prev) => ({
                    ...prev,
                    product_variation_id: null,
                  }));
                  setVaiations([]);
                  setSelectedProductPrice(null);
                  setSelectedProductType(null);
                }
              }}
              className="!max-w-[947px] py-[9px]"
              itemElement={(option, index) => {
                return (
                  <div className="flex gap-5">
                    <Image
                      src={
                        allProductList[index].feature_image?.thumbnail_path
                          ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                            encodeURIComponent(
                              allProductList[index].feature_image
                                .thumbnail_path,
                            )
                          : ""
                      }
                      alt=""
                      width={50}
                      height={50}
                    />
                    <p>{option.label}</p>
                  </div>
                );
              }}
            />
          </div>
          {selectedProductType === 2 && (
            <>
              <div className="pt-2">
                <span className="text-[15px] font-normal text-merchant_sidebar_text">
                  Select A Variation:
                </span>
              </div>
              <div className="max-w-[947px]">
                <Combobox
                  value={deals.product_variation_id}
                  defaultOptions={variations.map((item) => ({
                    label: item.product_name,
                    value: item.id.toString(),
                  }))}
                  onSearch={async (value) => {
                    return variations
                      .filter((item) =>
                        item.product_name
                          .toLocaleLowerCase()
                          .includes(value.toLocaleLowerCase()),
                      )
                      .map((item) => ({
                        label: item.product_name,
                        value: item.id.toString(),
                      }));
                  }}
                  triggerSearchOnFocus
                  placeholder={"Select Variation"}
                  onChange={(values) => {
                    if (values !== null) {
                      setDeals((prev) => ({
                        ...prev,
                        product_variation_id: values,
                      }));
                      setSelectedProductPrice(
                        Number(
                          variations.find(
                            (item) => item.id === Number(values.value),
                          )?.price?.sale_price,
                        ) || null,
                      );
                    } else {
                      setSelectedProductPrice(null);
                    }
                  }}
                  className="max-w-[947px] py-[9px]"
                  hidePlaceholderWhenSelected
                  loadingIndicator={
                    <p className="text-center text-sm text-muted-foreground">
                      loading...
                    </p>
                  }
                  emptyIndicator={
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      No results found.
                    </p>
                  }
                />
              </div>
            </>
          )}
          {selectedProductPrice && (
            <>
              <div className="">
                <span className="text-[15px] font-normal text-merchant_sidebar_text">
                  Current Price:
                </span>
              </div>
              <div className="">
                <span className=" text-[15px] font-medium text-merchant_sidebar_text">
                  ${selectedProductPrice}
                </span>
              </div>
            </>
          )}
          <div>
            <div className="lg:pt-[10px]">
              <span className="text-[15px] font-normal text-merchant_sidebar_text">
                Discount:
              </span>
            </div>
          </div>
          <div>
            <CustomInputField
              value={deals.discount}
              name="discount"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (/^\d*$/.test(e.target.value)) {
                  setDeals((prev) => ({
                    ...prev,
                    discount: Number(e.target.value),
                  }));
                }
              }}
              inputPlaceholder="50%"
              classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
              styleInput={{ resize: "none" }}
              classNameWrapper="pt-[5px]"
              className="!py-2"
              textPlaceholder="!text-sm"
            />
            <div className="flex items-center gap-[10px] pt-[30px]">
              <ButtonPrimary
                label="Save Changes"
                className="!h-[34px] rounded-sm px-[10px] py-2 !shadow-none"
                classNameLabel="text-xs font-normal"
                onClick={handleSaveChanges}
                // disabled={isSubmitting}
              />
              <button
                className="!h-[34px] rounded-sm border border-solid border-merchant_border bg-buttonGradient px-[13px] py-2 text-xs font-medium text-merchant_text_color_blue"
                onClick={() => router.back()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrEditDeals;
