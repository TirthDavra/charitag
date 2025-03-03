import Help from "@/components/common/Help";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useContext, useEffect, useState } from "react";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { ProductContext } from "../../store/ProductContext";
import { toast } from "react-toastify";
import {
  IVariationFinal,
  ProductVariation,
} from "@/app/merchant/products/manage/initVal";
import SingleVariation from "./SingleVariation";
import { produce } from "immer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { generateOrderIndependentHash, hashCode } from "@/utils/basicfunctions";

interface IVariationsProps {
  showVariations: boolean;
  setShowVariations: React.Dispatch<React.SetStateAction<boolean>>;
}

const Variations: React.FC<IVariationsProps> = ({
  showVariations,
  setShowVariations,
}) => {
  const {
    processedAttributes,
    setAllVariations,
    allVariations,
    setProductDetails,
    productDetails,
    allAttributes,
  } = useContext(ProductContext);

  const [expandVariations, setExpandVariations] = useState<boolean[]>(
    Array.from({ length: allVariations.length }, () => false),
  ); // Initialize with an empty array
  const initialVairiation = {
    product_id: null,
    variation_combination: Array.from(
      { length: allAttributes.length },
      () => "",
    ),
    description: productDetails.long_description,
    image: "",
    is_manage_stock_enabled: 1,
    sku: productDetails.inventory.sku.toString(),
    stock_quantity: 0,
    stock_status: 1,
    is_stock_management: 0,
    low_stock_threshold: 5,
    backorders_status: 3,
    hashcode: "",
    weight: productDetails.shipping.weight,
    length: productDetails.shipping.length,
    width: productDetails.shipping.width,
    height: productDetails.shipping.height,
    shipping_class: productDetails.shipping.shipping_class,
    regular_price: productDetails.price.regular_price,
    sale_price: productDetails.price.sale_price,
    id: null,
  };
  const generateVariation = () => {
    if (processedAttributes.length < 1) {
      toast.info(
        "You haven't created any attributes yet.\nPlease create one first for variation generation.",
      );
      return;
    }
    if (allVariations.length > 0) {
      setProductDetails((prev) => {
        const newRemovedVariations = new Set(prev.remove_variations);
        allVariations.forEach((x) => {
          if (typeof x.id === "number") {
            newRemovedVariations.add(x.id);
          }
        });

        return {
          ...prev,
          remove_variations: Array.from(newRemovedVariations),
        };
      });
    }
    const variations: ProductVariation[] = processedAttributes.map((attr) => ({
      product_id: null,
      variation_combination: [...attr],
      description: productDetails.long_description,
      image: "",
      is_manage_stock_enabled: 1,
      sku: productDetails.inventory.sku.toString(),
      stock_quantity: 0,
      stock_status: 1,
      is_stock_management: 0,
      low_stock_threshold: 5,
      backorders_status: 3,
      hashcode: "",
      weight: productDetails.shipping.weight,
      length: productDetails.shipping.length,
      width: productDetails.shipping.width,
      height: productDetails.shipping.height,
      shipping_class: productDetails.shipping.shipping_class,
      regular_price: productDetails.price.regular_price,
      sale_price: productDetails.price.sale_price,
      id: null,
    }));

    setAllVariations(variations);
    setShowVariations(true);
  };

  const ExpandCloseComponent = () => (
    <div className="gap-[5px] xl:flex">
      <div className="italic">{allVariations.length} variations</div>
      <div className="text-[14px] italic text-merchant_text_color_blue">
        <span
          className="cursor-pointer"
          onClick={() => setExpandVariations(expandVariations.map(() => true))}
        >
          (Expand)
        </span>{" "}
        /
        <span
          className="cursor-pointer"
          onClick={() => setExpandVariations(expandVariations.map(() => false))}
        >
          (Close)
        </span>
      </div>
    </div>
  );

  function detectDuplicateIndices(productVariations: ProductVariation[]) {
    const seenCombinations = new Map<string, number>(); // Map to store combinationKey and first occurrence index
    const duplicateIndices: number[] = [];

    for (let i = 0; i < productVariations.length; i++) {
      const variation = productVariations[i];
      const combinationKey = [...variation.variation_combination]
        .sort()
        .join("|");

      if (seenCombinations.has(combinationKey)) {
        const firstOccurrenceIndex = seenCombinations.get(combinationKey)!;
        if (!duplicateIndices.includes(firstOccurrenceIndex)) {
          duplicateIndices.push(firstOccurrenceIndex + 1);
        }
        duplicateIndices.push(i + 1);
      } else {
        seenCombinations.set(combinationKey, i);
      }
    }

    return duplicateIndices;
  }

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async () => {
    console.log("allVariations", allVariations);

    for (let i = 0; i < allVariations.length; i++) {
      for (let j = 0; j < allAttributes.length; j++) {
        if (allVariations[i].variation_combination[j] === "") {
          setErrorMsg(
            `Variation #${i + 1} is missing a value for attribute selection dropdown ${j + 1}.`,
          );

          return;
        }
      }
    }

    const duplicateIndices = detectDuplicateIndices(allVariations);

    if (duplicateIndices.length > 0) {
      setErrorMsg(
        `Please remove duplicate variation combinations at indices: ${duplicateIndices.join(", ")}.`,
      );
      return;
    }

    setErrorMsg(null);
    setExpandVariations(
      Array.from({ length: allVariations.length }, () => false),
    );

    const updatedVariations = [...allVariations];
    const newVariations: IVariationFinal = updatedVariations.reduce(
      (acc: IVariationFinal, curr) => {
        const hashid = generateOrderIndependentHash(curr.variation_combination);
        const current = { ...curr };
        current.hashcode = hashid;
        acc[hashid] = current;
        return acc;
      },
      {},
    );

    // Iterate through allVariations using a simple for loop
    // for (let i = 0; i < allVariations.length; i++) {
    //   const variation = { ...allVariations[i] };

    //   const hashid = generateOrderIndependentHash(
    //     variation.variation_combination,
    //   );
    //   variation.hashcode = hashid;
    //   updatedVariations[i] = variation;
    //   newVariations[hashid] = variation;
    // }
    setAllVariations(updatedVariations);

    setProductDetails((prev) => {
      return {
        ...prev,
        variations: newVariations,
      };
    });
    toast.success("Saved Successfully");
  };

  return (
    <div className="h-full">
      <div className="h-full py-[13px] pl-5 pr-[15px] md:py-0 md:pr-0">
        {showVariations && (
          <>
            <div className="flex flex-wrap items-center gap-[18.3px]">
              <div className="font-semibold">Default from values: </div>
              <div className="flex items-center gap-[6px]">
                <Help />
                <Select defaultValue="simple">
                  <SelectTrigger
                    classNameIcon="!text-black font-bold"
                    className="h-[34px] max-w-[212px] rounded-sm border-[1px] border-merchant_border text-[13px] font-normal text-merchant_gray outline-none"
                  >
                    <SelectValue placeholder="No Default Color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="simple"
                      className="text-merchant_text_color_blue"
                    >
                      No Default Color
                    </SelectItem>
                    <SelectItem
                      value="variable"
                      className="text-merchant_text_color_blue"
                    >
                      Variable Product
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-[15px] flex flex-wrap items-center gap-x-4 gap-y-2  border-b border-t border-merchant_border border-opacity-30 py-[10px]">
              <button
                className="h-[34px] justify-center rounded border border-solid border-blue-600 bg-white px-3 text-[10px] text-merchant_text_color_blue sm:text-[13px]"
                onClick={generateVariation}
              >
                Regenerate variations
              </button>
              <button
                className="h-[34px] justify-center rounded border border-solid border-blue-600 bg-white px-3 text-[10px] text-merchant_text_color_blue sm:text-[13px]"
                onClick={() => {
                  setAllVariations([...allVariations, initialVairiation]);
                }}
              >
                Add Variation
              </button>
              <ExpandCloseComponent />
            </div>
            <div className="border-b border-merchant_border pt-[10px]" />
            <div className="pt-[14px]">
              <div className="flex flex-wrap justify-between gap-y-1 ">
                <div className="text-xs sm:max-w-[500px] sm:text-base">
                  Variations without prices will inherit the parent prices.
                </div>
              </div>
            </div>
            <div>
              {allVariations.map((variation, index) => (
                <SingleVariation
                  key={index}
                  value={variation}
                  hashCode={variation.hashcode}
                  index={index}
                  expandVariations={expandVariations[index]}
                  setExpandVariations={() => {
                    setExpandVariations(
                      produce((draft) => {
                        draft[index] = !draft[index];
                      }),
                    );
                  }}
                />
              ))}
            </div>
            {errorMsg && (
              <Alert
                variant="destructive"
                className="mt-2 cursor-pointer"
                onClick={() => setErrorMsg(null)}
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
            )}
            <div className="flex flex-wrap items-center justify-between gap-y-1 pt-[15px]">
              <div className="flex flex-wrap items-center gap-[5px] gap-y-1">
                <ButtonPrimary
                  label="Save Changes"
                  className="rounded-sm px-[10px] py-2 !shadow-none"
                  classNameLabel="text-[13px] font-normal"
                  type="submit"
                  onClick={handleSubmit}
                />
              </div>
              <ExpandCloseComponent />
            </div>
          </>
        )}
        {!showVariations && (
          <div className="flex h-full flex-col">
            <button
              onClick={generateVariation}
              className="h-[34px] max-w-fit justify-center rounded border border-solid border-blue-600 bg-white px-[13px] text-[13px] text-merchant_text_color_blue"
            >
              Generate variations
            </button>
            <div className="flex h-full flex-grow items-center justify-center">
              <p className="text-[14px] text-merchant_text">
                No variations yet. Generate them from all added attributes or
                add a new variation manually.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Variations;
