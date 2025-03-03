"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import React, { useState } from "react";
import dummy from "@images/campaign.png";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import RatingStar from "../Reviews/RatingStar";
import { addReviewData } from "@/api/consumer/review";
import { IGerReviewData, IReview } from "./types";
import { toast } from "react-toastify";
import { parseMsg } from "@/utils/basicfunctions";
import { useRouter } from "next/navigation";

const SingleReview = ({ data }: { data: IGerReviewData }) => {
  const [rating, setRating] = useState<number>(Number(data.rating) || 0);
  const [description, setDescription] = useState<string>(
    data?.description || "",
  );

  const router = useRouter();
  const handleRatingClick = (rate: number) => {
    setRating(rate);
  };

  const handleSubmit = async () => {
    try {
      const response = await addReviewData({
        data: {
          rating: rating.toString(),
          description: description,
          product_id: data?.product_id,
        },
      });
      if (response.error) {
        const errorMessage = parseMsg(response.data.message);
        toast.error(errorMessage);
      } else {
        toast.success(response.data.message);
        router.refresh();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="mt-[65px]">
      <h2 className="text-2xl font-semibold">Create Review</h2>
      <div className="mb-[60px] mt-[30px] flex items-center">
        <div className="max-h-[50px] min-w-[50px] max-w-[50px] overflow-hidden rounded-lg md:max-h-[101px] md:min-w-[100px] md:max-w-[114px]">
          <Image
            src={
              data?.product_image
                ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                  data?.product_image
                : dummy
            }
            alt={data?.product_image}
            className="h-full w-full object-cover"
            width={200}
            height={200}
          />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-bold">{data?.product_name}</h3>
          <p className="text-base text-consumer_order_text">
            By {data?.merchant_name}
          </p>
        </div>
      </div>
      <div className="mb-[60px]">
        <h4 className="mb-2 text-lg font-medium">Overall rating</h4>
        <div className="flex gap-2">
          <RatingStar
            activeColor="#ffd700"
            edit={true}
            review={{ rating: Number(data.rating) || rating }}
            isHalf={false}
            handleStarchanege={handleRatingClick}
          />
        </div>
      </div>
      <div className="mb-4">
        <h4 className="mb-2 text-lg font-medium">Add a written review</h4>
        <CustomInputField
          value={data?.description || description}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setDescription(event.target.value);
          }}
          styleInput={{ resize: "none" }}
          classNameContainer="h-[166px] !items-start rounded-sm border-merchant_border"
          classNameWrapper="md:pt-[5px]"
          className="!py-2 !text-[13px]"
          textArea={true}
          textAreaRows={7}
          inputPlaceholder="What did you like or dislike? What do you use this product for?"
        />
      </div>
      <div className="flex justify-end">
        <ButtonPrimary
          label="Submit"
          type="submit"
          onClick={handleSubmit}
          className="rounded-full bg-blue-500 px-4 py-2 text-white"
          disabled={data?.rating !== null}
        />
      </div>
    </div>
  );
};

export default SingleReview;
