"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import dealImg from "@images/top_deal_img1.jpg";
import Image, { StaticImageData } from "next/image";
import { FeatureImage } from "@/components/merchant/types";

const ImageSlider2 = ({
  image,
  gallery,
  classImg,
  classDots,
}: {
  image?: StaticImageData;
  gallery: FeatureImage[];
  classImg?:string;
  classDots?:string;
}) => {
  const [current, setCurrent] = React.useState(0);
  const [api, setApi] = React.useState<CarouselApi>();
  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div className="relative">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {gallery?.map((item, index) => (
            <CarouselItem key={index}>
              <Image
                src={
                  item?.medium_path
                    ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                      item?.medium_path
                    : dealImg
                }
                width={500}
                height={500}
                alt=""
                className={`aspect-[10/7] w-full rounded-lg ${classImg}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {gallery.length > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
        <div className={`absolute bottom-[-8%] left-0 right-0  flex items-center justify-center gap-[6px] md:bottom-[4%] md:gap-4 ${classDots}`}>
          {gallery.length > 1 &&
            gallery?.map((_, index) => (
              <div
                key={index}
                className={`h-[8px] cursor-pointer rounded-full ${current - 1 === index ? "w-[22px]  bg-blue-600" : "w-[8px] bg-blue-200"}`}
                onClick={() => api?.scrollTo(index)}
              ></div>
            ))}
        </div>
      </Carousel>
    </div>
  );
};

export default ImageSlider2;
