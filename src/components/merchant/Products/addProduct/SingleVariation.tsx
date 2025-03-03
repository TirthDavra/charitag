"use client";
import Help from "@/components/common/Help";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import { IconVariationProductImage } from "@/components/svgIcons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../store/ProductContext";
import { ProductVariation } from "@/app/merchant/products/manage/initVal";
import { produce } from "immer";
import CheckBox from "../../Custom/CheckBox";
import Image from "next/image";
import { AddMediaContext } from "../../store/AddMediaContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { FeatureImage } from "../../types";

interface ISingleVariationProps {
  index: number;
  hashCode: string;
  value: ProductVariation;
  expandVariations: boolean;
  handleVariationRemove?: () => void;
  setExpandVariations: () => void;
}
const SingleVariation = ({
  index,
  value,
  expandVariations,
  setExpandVariations,
  hashCode,
  handleVariationRemove,
}: ISingleVariationProps) => {
  // const [showVariationInfo, setShowVariationInfo] = useState(expandVariations);

  const {
    allVariations,
    setAllVariations,
    productDetails,
    allAttributes,
    setProductDetails,
  } = useContext(ProductContext);
  const { setAddMediaState, AddMediaState } = useContext(AddMediaContext);

  const [image, setImage] = useState<FeatureImage | null>(
    value?.init_image || null,
  );

  const handleAddMedia = () => {
    setAddMediaState({
      currentLength: 0,
      limit: 1,
      onSubmit: (images) => {
        if (images.length > 0) {
          setImage(images[0]);
          setAllVariations(
            produce((draft) => {
              draft[index].image = images[0].id.toString();
            }),
          );
        }
      },
      selectedImages: image ? [image] : [],
      isActive: true,
    });
  };
  const [errorMsg, setErrorMsg] = useState(false);
  return (
    <div>
      <div>
        <div className="grid flex-wrap items-center justify-between gap-y-1 border-b border-blue-600 border-opacity-30 pb-[10px] pt-[21px] xl:flex">
          <div className="flex flex-wrap items-center gap-[11px] gap-y-1 overflow-x-auto sm:flex-nowrap">
            <span className="text-[12px] font-medium  text-merchant_text">
              #{index + 1}
            </span>
            <div className="flex flex-1 overflow-x-auto">
              <div className="flex gap-3 overflow-x-auto  [min-width:content]">
                {allAttributes.map((attr, indexAtt) => {
                  const initValue =
                    allVariations[index].variation_combination[indexAtt] ||
                    undefined;
                  return (
                    <>
                      {attr.values.length > 0 ? (
                        <Select
                          key={indexAtt}
                          // defaultValue={defaultVal}
                          value={initValue}
                          onValueChange={(value) => {
                            setAllVariations((prevVariations) => {
                              const newVariations = [...prevVariations];
                              newVariations[index].variation_combination[
                                indexAtt
                              ] = value;
                              return newVariations;
                            });
                          }}
                        >
                          <SelectTrigger
                            classNameIcon="!text-black font-bold"
                            className={`h-[34px] min-w-[135px] rounded-sm border-[1px] border-merchant_border text-[13px] font-normal  text-merchant_gray outline-none ${!initValue ? "border-red-600" : ""}`}
                          >
                            <SelectValue placeholder={`Any ${attr.name}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {attr.name === "Color"
                              ? attr.arrayValues &&
                                attr.arrayValues.map((val: string) => (
                                  <SelectItem
                                    value={val}
                                    className="text-merchant_gray"
                                    key={val}
                                  >
                                    {val}
                                  </SelectItem>
                                ))
                              : attr.values.split("|").map((val) => (
                                  <SelectItem
                                    value={val}
                                    className="text-merchant_gray"
                                    key={val}
                                  >
                                    {val}
                                  </SelectItem>
                                ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <span>No attributes values are provided</span>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[14px]">
            {/* <FontAwesomeIcon icon={faBars} className="cursor-pointer" /> */}
            <button
              className="cursor-pointer text-[14px] text-red-500"
              onClick={() => {
                const var_id = allVariations[index].id;
                if (var_id) {
                  setProductDetails((prev) => {
                    return {
                      ...prev,
                      remove_variations: [...prev.remove_variations, var_id],
                    };
                  });
                }
                setAllVariations(
                  produce((draft) => {
                    draft.splice(index, 1);
                  }),
                );
                handleVariationRemove && handleVariationRemove();
              }}
            >
              Remove
            </button>
            <button
              className="cursor-pointer text-[12px] text-merchant_text_color_blue"
              onClick={() => setExpandVariations()}
            >
              {expandVariations ? "Close" : "Edit"}
            </button>
          </div>
        </div>
        {expandVariations && (
          <div>
            <div className="flex flex-wrap items-center gap-[72px] gap-y-2 border-b border-blue-600 border-opacity-30 py-[23px] pt-[14px] sm:flex-nowrap">
              <div className="">
                <div onClick={handleAddMedia}>
                  {image ? (
                    <div className="group relative">
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                          encodeURIComponent(image.medium_path)
                        }
                        alt={`product variation ${index}`}
                        className="aspect-square max-w-[100px] cursor-pointer"
                        width={200}
                        height={200}
                      />
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="invisible absolute right-0 top-0 h-6 w-6 -translate-y-1/3 translate-x-1/3 cursor-pointer   text-red-600 group-hover:visible"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImage(null);
                          setAllVariations(
                            produce((draft) => {
                              draft[index].image = "";
                            }),
                          );
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="flex h-[100px] w-[100px] cursor-pointer items-center justify-center"
                      onClick={handleAddMedia}
                    >
                      <IconVariationProductImage className="" />
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full">
                <div className="flex max-w-[427px] items-center justify-between">
                  <span className="text-[12px] text-merchant_text">SKU</span>{" "}
                  <Help />
                </div>
                <CustomInputField
                  value={value.sku}
                  onChange={(e: { target: { value: string } }) =>
                    setAllVariations(
                      produce((draft) => {
                        draft[index].sku = e.target.value;
                      }),
                    )
                  }
                  className="!py-1 "
                  classNameContainer="border-merchant_border rounded-sm max-w-[427px]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 gap-y-2 border-b border-blue-600 border-opacity-30 py-[10px]">
              <CheckBox
                value={value.is_manage_stock_enabled === 1}
                onChange={() => {
                  const bool: number =
                    value.is_manage_stock_enabled === 1 ? 0 : 1;
                  setAllVariations((prevVariations) => {
                    return produce(prevVariations, (draft) => {
                      draft[index].is_manage_stock_enabled = bool;
                      if (bool === 0) {
                        draft[index].is_stock_management = 0;
                      }
                    });
                  });
                }}
                label="Enabled"
              />
              <CheckBox
                value={value.is_stock_management === 1}
                onChange={() =>
                  setAllVariations(
                    produce((draft) => {
                      draft[index].is_stock_management =
                        value.is_stock_management === 0 ? 1 : 0;
                    }),
                  )
                }
                label="Manage Stocks"
              />
            </div>
            <div className="gap-x-[60px]  gap-y-[20px] pt-[20px] xl:grid xl:grid-cols-2">
              <div className="col-span-1 pb-2 text-[12px] text-merchant_text xl:pb-0">
                Regular price($)
                <CustomInputField
                  value={value.regular_price}
                  onChange={(e: { target: { value: string } }) => {
                    if (/^\d*\.?\d{0,2}$/.test(e.target.value)) {
                      setAllVariations(
                        produce((draft) => {
                          draft[index].regular_price = e.target.value;
                        }),
                      );
                    }
                  }}
                  className="flex !h-[30px] justify-center !py-[3px]"
                  classNameContainer="border-merchant_border rounded-sm"
                  classNameWrapper="flex-grow"
                  inputPlaceholder="Variation price (required)"
                />
              </div>
              <div className="col-span-1 pb-2 text-[12px] text-merchant_text xl:pb-0">
                Sale price($)
                <CustomInputField
                  value={value.sale_price}
                  onChange={(e: { target: { value: string } }) => {
                    // const newSalePrice = parseFloat(e.target.value);
                    const regularPrice = allVariations[index].regular_price;

                    if (/^\d*\.?\d{0,2}$/.test(e.target.value)) {
                      if (Number(regularPrice) >= Number(e.target.value)) {
                        setErrorMsg(false);
                        setAllVariations((prevVariations) =>
                          produce(prevVariations, (draft) => {
                            draft[index].sale_price = e.target.value;
                          }),
                        );
                      } else {
                        setErrorMsg(true);
                      }
                    }
                  }}
                  className="flex !h-[30px] justify-center !py-[3px]"
                  classNameContainer="border-merchant_border rounded-sm"
                  classNameWrapper="flex-grow"
                />
                {errorMsg && (
                  <div className="text-red-500">
                    Sale price should be less than regular price.
                  </div>
                )}
              </div>

              {value.is_manage_stock_enabled === 1 &&
                (value.is_stock_management === 1 ? (
                  <>
                    <div className="col-span-1 pb-2 text-[12px] text-merchant_text xl:pb-0">
                      <div className="flex justify-between">
                        Stock Quantity <Help />
                      </div>
                      <CustomInputField
                        value={value.stock_quantity}
                        onChange={(e: { target: { value: number } }) =>
                          setAllVariations(
                            produce((draft) => {
                              draft[index].stock_quantity = e.target.value;
                            }),
                          )
                        }
                        className="flex !h-[30px] justify-center !py-[3px]"
                        classNameContainer="border-merchant_border rounded-sm"
                        classNameWrapper="flex-grow"
                        inputPlaceholder="store-wide threshold (2)"
                      />
                    </div>
                    {/* <div className="col-span-1 pb-2 text-[12px] text-merchant_text xl:pb-0">
                      <div className="flex justify-between">
                        Allow Backorders <Help />
                      </div>

                      <Select
                        value={`${value.backorders_status}`}
                        onValueChange={(val) => {
                          //  = `${value.backorders_status}`;
                          setAllVariations(
                            produce((draft) => {
                              draft[index].backorders_status = Number(val);
                            }),
                          );
                        }}
                      >
                        <SelectTrigger
                          classNameIcon="!text-black font-bold"
                          className="text-merchant_select h-[30px] rounded-sm border-[1px] border-merchant_border text-[13px] font-normal text-merchant_gray outline-none"
                        >
                          <SelectValue placeholder="Do Not Allow" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1" className="text-merchant_gray">
                            Do Not Allow
                          </SelectItem>
                          <SelectItem value="2" className="text-merchant_gray">
                            Allow but notify customer
                          </SelectItem>
                          <SelectItem value="3" className="text-merchant_gray">
                            Allow
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}
                    <div className="col-span-1 pb-2 text-[12px] text-merchant_text xl:pb-0">
                      <span className="">low stock threshold</span>
                      <CustomInputField
                        value={value.low_stock_threshold}
                        onChange={(e: { target: { value: number } }) =>
                          setAllVariations(
                            produce((draft) => {
                              draft[index].low_stock_threshold = e.target.value;
                            }),
                          )
                        }
                        type="number"
                        min={0}
                        className="flex !h-[30px] justify-center !py-[3px]"
                        classNameContainer="border-merchant_border rounded-sm"
                        classNameWrapper="flex-grow"
                        inputPlaceholder="store-wide threshold (2)"
                      />
                    </div>
                  </>
                ) : (
                  <div className="col-span-2 pb-2 text-[12px] text-merchant_text xl:pb-0">
                    <div className="flex justify-between">
                      stock status <Help />
                    </div>

                    <Select
                      onValueChange={(value) => {
                        setAllVariations(
                          produce((draft) => {
                            draft[index].stock_status = Number(value);
                          }),
                        );
                      }}
                      value={value.stock_status.toString()}
                    >
                      <SelectTrigger
                        classNameIcon="!text-black font-bold"
                        className="text-merchant_select h-[30px] rounded-sm border-[1px] border-[#d9e2f9] text-[13px] font-normal text-merchant_gray outline-none"
                      >
                        <SelectValue placeholder="InStock" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1" className="text-merchant_gray">
                          InStock
                        </SelectItem>
                        <SelectItem value="0" className="text-merchant_gray">
                          Out Of Stock
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}

              {/* {value.is_stock_management === 1 && (
                <div className="col-span-2 pb-2 text-[12px] text-merchant_text xl:pb-0">
                  <span className="">low stock threshold</span>
                  <CustomInputField
                    value={value.low_stock_threshold}
                    onChange={(e: { target: { value: number } }) =>
                      setAllVariations(
                        produce((draft) => {
                          draft[index].low_stock_threshold = e.target.value;
                        }),
                      )
                    }
                    className="flex !h-[30px] justify-center !py-[3px]"
                    classNameContainer="border-merchant_border rounded-sm"
                    classNameWrapper="flex-grow"
                    inputPlaceholder="store-wide threshold (2)"
                  />
                </div>
              )} */}
              <div className="col-span-1 pb-2 text-[12px] text-merchant_text xl:pb-0">
                <div className="flex justify-between">
                  Weight (kg) <Help />
                </div>
                <CustomInputField
                  value={value.weight}
                  onChange={(e: { target: { value: string } }) => {
                    if (/^\d*\.?\d{0,3}$/.test(e.target.value))
                      setAllVariations(
                        produce((draft) => {
                          draft[index].weight = e.target.value;
                        }),
                      );
                  }}
                  type="number"
                  min={0}
                  className="flex !h-[30px] justify-center !py-[3px]"
                  classNameContainer="border-merchant_border rounded-sm"
                  classNameWrapper="flex-grow"
                />
              </div>
              <div className="col-span-1 pb-2 text-[12px] text-merchant_text xl:pb-0">
                <div className="flex justify-between">
                  Dimensions (L*W*H)(cm) <Help />
                </div>
                <div className="flex gap-[19px]">
                  <div>
                    <CustomInputField
                      value={value.length}
                      onChange={(e: { target: { value: string } }) => {
                        if (/^\d*\.?\d{0,2}$/.test(e.target.value))
                          setAllVariations(
                            produce((draft) => {
                              draft[index].length = e.target.value;
                            }),
                          );
                      }}
                      className="flex !h-[30px] justify-center !py-[3px]"
                      classNameContainer="border-merchant_border rounded-sm"
                      classNameWrapper="flex-grow"
                      inputPlaceholder="Length"
                    />
                  </div>
                  <div>
                    <CustomInputField
                      value={value.width}
                      onChange={(e: { target: { value: string } }) => {
                        if (/^\d*\.?\d{0,2}$/.test(e.target.value))
                          setAllVariations(
                            produce((draft) => {
                              draft[index].width = e.target.value;
                            }),
                          );
                      }}
                      className="flex !h-[30px] justify-center !py-[3px]"
                      classNameContainer="border-merchant_border rounded-sm"
                      classNameWrapper="flex-grow"
                      inputPlaceholder="Width"
                    />
                  </div>
                  <div>
                    <CustomInputField
                      value={value.height}
                      onChange={(e: { target: { value: string } }) => {
                        if (/^\d*\.?\d{0,2}$/.test(e.target.value))
                          setAllVariations(
                            produce((draft) => {
                              draft[index].height = e.target.value;
                            }),
                          );
                      }}
                      className="flex !h-[30px] justify-center !py-[3px]"
                      classNameContainer="border-merchant_border rounded-sm"
                      classNameWrapper="flex-grow"
                      inputPlaceholder="Height"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2 pb-2 text-[12px] text-merchant_text xl:pb-0">
                Shipping class
                <Select
                  onValueChange={(value) => {
                    setAllVariations(
                      produce((draft) => {
                        draft[index].shipping_class = value;
                      }),
                    );
                  }}
                >
                  <SelectTrigger
                    classNameIcon="!text-black font-bold"
                    className="text-merchant_select h-[30px] rounded-sm border-[1px] border-merchant_border text-[13px] font-normal text-merchant_gray outline-none"
                  >
                    <SelectValue placeholder="same as parent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="same_as_parent"
                      className="text-merchant_gray"
                    >
                      same as parent
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 border-b border-blue-600 border-opacity-30 pb-5 text-[12px] text-merchant_text">
                Description
                <CustomInputField
                  value={value.description}
                  onChange={(e: { target: { value: string } }) =>
                    setAllVariations(
                      produce((draft) => {
                        draft[index].description = e.target.value;
                      }),
                    )
                  }
                  classNameContainer="border-merchant_border rounded-sm"
                  errorMessage=""
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleVariation;
