"use client";

import React, { useContext, useState, useEffect, useRef } from "react";
import { AddMediaContext } from "../../store/AddMediaContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretUp, faImages } from "@fortawesome/free-solid-svg-icons";
import { IconVariationProductImage } from "@/components/svgIcons";
import Image from "next/image";
import { FeatureImage } from "../../types";
import { ProductContext } from "../../store/ProductContext";
import { produce } from "immer";
import { Switch } from "@/components/ui/switch";
import { debounce } from "lodash";
import { IAttributeValues } from "./Attributes";

export interface IColorItem {
  name: string;
  value: string | null;
}

const ColorAttribute = ({
  index,
  values,
  expandAttributes,
  setExpandAttributes,
}: {
  index: number;
  values: IAttributeValues;
  expandAttributes: boolean;
  setExpandAttributes: React.Dispatch<React.SetStateAction<boolean[]>>;
}) => {
  const { setAllAttributes, productDetails } = useContext(ProductContext);
  const { setAddMediaState } = useContext(AddMediaContext);
  // const _newInit = JSON.stringify(values.values);
  // const newInit: IColorItem[] = JSON.parse(_newInit);

  // const initVals: IColorItem[] =
  //   values.values !== ""
  //     ? values.values.split("|").map((item) => JSON.parse(item))
  //     : [];
  const initVals: IColorItem[] = JSON.parse(
    values.values === "" ? "[]" : values.values,
  );
  const [items, setItems] = useState<IColorItem[]>(initVals);
  const [images, setImages] = useState<FeatureImage[]>([]);

  const [switchValue, setSwitchValue] = useState<number>(
    initVals[0]?.value?.startsWith("product") ? 2 : 1,
  );

  const debouncedHandleSave = useRef(
    debounce(async (values: IColorItem[]) => {
      setAllAttributes(
        produce((draft) => {
          draft[index].values = JSON.stringify(values);
        }),
      );
    }, 700),
  );

  useEffect(() => {
    return () => {
      debouncedHandleSave.current.cancel();
    };
  }, [debouncedHandleSave.current]);

  const handleChange = (
    type: "name" | "color" | "image",
    itemIndex: number,
    value: string | FeatureImage,
  ) => {
    const newItems = [...items];
    switch (type) {
      case "name":
        newItems[itemIndex].name = value as string;
        break;
      case "color":
        newItems[itemIndex].value = value as string;
        break;
      case "image":
        newItems[itemIndex].value = (value as FeatureImage).thumbnail_path;
        break;
      default:
        break;
    }
    setItems(newItems);
    debouncedHandleSave.current(newItems);
  };

  const handleAddItem = () => {
    const newItems = [...items, { name: "", value: "#000000" }];
    setItems(newItems);
    debouncedHandleSave.current(newItems);
  };

  const handleRemoveItem = (itemIndex: number) => {
    const newItems = items.filter((_, i) => i !== itemIndex);
    setItems(newItems);
    setImages(
      produce((draft) => {
        draft.splice(itemIndex, 1);
      }),
    );
    debouncedHandleSave.current(newItems);
  };

  const handleAddMedia = (itemIndex: number) => {
    setAddMediaState({
      currentLength: 0,
      limit: 1,
      onSubmit: (images) => {
        if (images.length > 0) {
          handleChange("image", itemIndex, images[0]);
          setImages(
            produce((draft) => {
              draft[itemIndex] = images[0];
            }),
          );
        }
      },
      selectedImages: images[itemIndex] ? [images[itemIndex]] : [],
      isActive: true,
    });
  };

  const handleSwitchChange = () => {
    setSwitchValue((prev) => (prev === 2 ? 1 : 2));
    setItems([]);
    debouncedHandleSave.current([]);
  };
  // return <></>;
  return (
    <>
      <div className="flex flex-grow items-center justify-between border-b border-merchant_border border-opacity-30 py-[15px] text-[14px]">
        <div className="text-sm font-medium">
          {values.name || "New Attribute"}
        </div>
        <div className="flex items-center gap-[14px]">
          <button
            className="cursor-pointer text-red-500"
            onClick={() => {
              setAllAttributes(
                produce((draft) => {
                  draft.splice(index, 1);
                }),
              );
              setExpandAttributes(
                produce((draft) => {
                  draft.splice(index, 1);
                }),
              );
            }}
          >
            Remove
          </button>
          <FontAwesomeIcon icon={faBars} className="cursor-pointer" />
          <FontAwesomeIcon
            icon={faCaretUp}
            className={`cursor-pointer ${expandAttributes ? "rotate-180" : ""}`}
            onClick={() =>
              setExpandAttributes(
                produce((draft) => {
                  if (draft.length > 0) draft[index] = !draft[index];
                }),
              )
            }
          />
        </div>
      </div>
      {expandAttributes && (
        <>
          <div className="pt-2" key={index}>
            <div className="flex items-center justify-end gap-1">
              <span>color</span>
              <Switch
                checked={switchValue === 2}
                onCheckedChange={handleSwitchChange}
              />
              <span>image</span>
            </div>
          </div>
          {switchValue === 2 ? (
            <div>
              {items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="mb-4 flex flex-col xl:flex-row xl:items-center"
                >
                  <div className="my-2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={item.name}
                      onChange={(event) =>
                        handleChange("name", itemIndex, event.target.value)
                      }
                      className="mr-2 rounded border border-gray-300 p-1 text-sm"
                    />
                  </div>
                  <div className="flex items-center">
                    <div onClick={() => handleAddMedia(itemIndex)}>
                      {item.value && !item.value.startsWith("#") ? (
                        <div className="relative">
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                              encodeURIComponent(item?.value || "")
                            }
                            alt=""
                            className="mr-2 aspect-square max-w-[100px] cursor-pointer"
                            width={40}
                            height={40}
                          />
                        </div>
                      ) : (
                        <div className="flex cursor-pointer items-center justify-center">
                          <FontAwesomeIcon
                            icon={faImages}
                            className="mx-4 h-[30px] w-[30px]"
                          />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveItem(itemIndex)}
                      className="h-[24px] w-[24px] items-center rounded bg-red-500 text-white hover:bg-red-700"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={handleAddItem}
                className="mt-2 h-[30px] w-[30px] rounded bg-[linear-gradient(100deg,_#1657D9_-32.11%,_#FFF_220%)] text-white"
              >
                <span className="text-lg">+</span>
              </button>
            </div>
          ) : (
            <div>
              {items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="mb-4 flex flex-col gap-2 xl:flex-row xl:items-center"
                >
                  <div className="my-2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={item.name}
                      onChange={(event) =>
                        handleChange("name", itemIndex, event.target.value)
                      }
                      className="mr-2 rounded border border-gray-300 p-1"
                    />
                  </div>
                  <div className="flex">
                    <div className="mr-3">
                      <input
                        type="color"
                        value={item.value ?? ""}
                        onChange={(event) =>
                          handleChange("color", itemIndex, event.target.value)
                        }
                        className="mr-2 w-[150%] cursor-pointer rounded border border-gray-300"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveItem(itemIndex)}
                      className="h-[24px] w-[24px] rounded bg-red-500 text-white hover:bg-red-700"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={handleAddItem}
                className="mt-2 h-[30px] w-[30px] rounded bg-[linear-gradient(100deg,_#1657D9_-32.11%,_#FFF_220%)] text-white"
              >
                <span className="text-lg">+</span>
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ColorAttribute;
