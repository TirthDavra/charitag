import React from "react";
import Image from "next/image";
import profileImage from "@images/profile1.jpeg";

const data = [
  {
    id: 1,
    image: profileImage,
    title: "New order recieved from",
    name: "Taryan Kub",
    label: "View order details",
    date: "2 days ago",
  },
  {
    id: 2,
    image: profileImage,
    title: "New order recieved from",
    name: "Taryan Kub",
    label: "View order details",
    date: "2 days ago",
  },
  {
    id: 3,
    image: profileImage,
    title: "New order recieved from",
    name: "Taryan Kub",
    label: "View order details",
    date: "2 days ago",
  },
  {
    id: 4,
    image: profileImage,
    title: "New order recieved from",
    name: "Taryan Kub",
    label: "View order details",
    date: "2 days ago",
  },
  {
    id: 5,
    image: profileImage,
    title: "New order recieved from",
    name: "Taryan Kub",
    label: "View order details",
    date: "2 days ago",
  },
];

const NotificationsModal = () => {
  return (
    <div className="">
      <div className="thin_scrollbar relative w-[450px] overflow-y-scroll rounded-[10px] bg-white px-5">
        <div className="pb-4">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-merchant_border bg-white pb-5">
            <span className="text-lg font-medium"> Notifications</span>
            <button className="text-sm text-merchant_text_color_blue">
              Mark As All Read{" "}
            </button>
          </div>
          <div className="mb-10 flex max-h-[450px] flex-col justify-between">
            {data.map((item) => (
              <div
                className="border-b border-merchant_border py-5"
                key={item.id}
              >
                <div className="flex items-center gap-[10px] ">
                  <div>
                    <Image
                      src={item.image}
                      alt=""
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div>
                    <span className="text-[15px] text-merchant_sidebar_text">
                      {item.title}{" "}
                      <span className="text-[15px] text-merchant_text_color_blue">
                        {item.name}
                      </span>{" "}
                    </span>
                    <div className="text-sm text-merchant_text_color_blue underline">
                      {item.label}
                    </div>
                  </div>
                </div>
                <div className="pl-12">
                  <span className="text-[10px] text-merchant_sidebar_text">
                    {item.date}
                  </span>
                </div>
              </div>
            ))}
            <div className="sticky bottom-0 z-10 mb-2 w-[418px] bg-white pt-[15px] text-end">
              <button className="text-sm text-merchant_text_color_blue underline">
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
