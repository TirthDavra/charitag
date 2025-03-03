import React, { forwardRef, useImperativeHandle, useState } from "react";
import ButtonPrimary from "../../ButtonPrimary";
import { useSearchParams } from "next/navigation";
import { clientCustomFetch } from "@/api/apiConfig";
import { getValueFromObject } from "@/utils/basicfunctions";
import { toast } from "react-toastify";
import Link from "next/link";

type ShowMoreProps<T, R> = (
  | {
      setData: React.Dispatch<React.SetStateAction<T[]>>;
      setDataFunction?: never;
    }
  | {
      setData?: never;
      setDataFunction: (
        data: T[],
        total: number,
        isSelectedRemove: boolean,
      ) => void;
    }
) & {
  accessorKey: string;
  url: string;
  searchParamKey?: string;
  per_page?: number;
  total: number;
  currentLength: number;
  handlePageChange: (page: number) => void;
  page: number;
  label?: string;
  showmoreclass?: string;
};

// Define the ShowMoreHandle interface
export interface ShowMoreHandle<T> {
  handleShowMore: (isSelectedRemove?: boolean) => void;
}

const _ShowMore = <T, R>(
  {
    setData,
    setDataFunction,
    url,
    accessorKey,
    searchParamKey = "page",
    per_page = 1,
    total,
    currentLength,
    page,
    handlePageChange,
    showmoreclass,
    label = "Show More",
  }: ShowMoreProps<T, R>,
  ref: React.Ref<ShowMoreHandle<T>>,
) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const [isLoading, setIsLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    handleShowMore,
  }));

  const handleShowMore = async (isSelectedRemove?: boolean) => {
    setIsLoading(true);

    params.set("per_page", per_page.toString());
    params.set("page", isSelectedRemove ? "1" : (page + 1).toString());
    const newUrl = url + "?" + params.toString();

    const response = await clientCustomFetch<R>({
      url: newUrl,
    });
    setIsLoading(false);
    if (!response.error) {
      const result = getValueFromObject(response.data, accessorKey) as {
        result: T[];
        total: number;
      };

      if (setData) {
        if (isSelectedRemove) {
          setData(result.result ? result.result : []);
        } else {
          setData((prev) => {
            const append = result.result ? result.result : [];
            return [...prev, ...append];
          });
        }
      } else if (setDataFunction) {
        setDataFunction(result.result, result.total, isSelectedRemove || false);
      }

      handlePageChange(page + 1);
    } else {
      console.error("Error fetching data:", response.error);
      toast.error("Failed to load more");
    }
  };

  const redirect_url = params.toString();

  return (
    <>
      {total > currentLength &&
        (!isLoading ? (
          <Link
            href={`?${redirect_url}`}
            shallow={true}
            scroll={false}
            className="w-full justify-center lg:flex"
            onClick={(e) => {
              e.preventDefault();
              handleShowMore();
            }}
          >
            <ButtonPrimary
              label={label}
              className={`h-[50px] w-full justify-center rounded-full px-[15px] py-[25px] md:!w-[131px] ${showmoreclass}`}
            />
          </Link>
        ) : (
          <div className="mx-auto flex items-center justify-center text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-8 border-gray-300 border-t-blue-600" />
          </div>
        ))}
    </>
  );
};

const ShowMore = forwardRef(_ShowMore) as <T, R>(
  props: ShowMoreProps<T, R> & { ref?: React.Ref<ShowMoreHandle<T>> },
) => React.ReactElement;

export default ShowMore;
