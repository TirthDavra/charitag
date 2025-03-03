"use client";
import React, { useEffect } from "react";
import NotificationsAlerts from "./NotificationsAlerts";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { ICharitiesForHome } from "@/api/common/types";
import { IProductCategory } from "@/api/merchant/types";
import { Option } from "@/components/ui/multiple-selector";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { INotificationsAlert } from "./types";
import { postNotificationSettings } from "@/api/consumer/notification";
import { toast } from "react-toastify";
import logo from "@images/blue_charitag_logo.svg";
import { StaticImageData } from "next/image";
import {
  setNotifications,
  updateNotificationSettings,
} from "@/lib/Store/slices/consumerFeatures/notification/notificationSlice";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelectorConsumer } from "@/lib/Store/hooks";

export interface SectionConfig {
  id: number;
  title: string;
  description: string;
  options: Option[];
  selectedOptions: Option[];
  isEnabled: boolean;
  icon?: IconProp;
  svg?: StaticImageData;
  details: string;
  accessorKeyBoolean:
    | "is_newsletter"
    | "is_deals"
    | "is_charity"
    | "is_volunteer_missions";
  accessorKeyArray:
    | "newsletter_charity_ids"
    | "category_ids"
    | "charity_ids"
    | null;
}

export interface NotificationsSettingsState {
  newsletter_charity_ids: Option[];
  category_ids: Option[];
  charity_ids: Option[];
  is_newsletter: boolean;
  is_deals: boolean;
  is_charity: boolean;
  is_volunteer_missions: boolean;
}

const ConsumerNotifications = ({
  charities,
  categories,
  initSettings,
}: {
  charities: ICharitiesForHome[];
  categories: IProductCategory[];
  initSettings: INotificationsAlert;
}) => {
  const initialConfig: SectionConfig[] = [
    {
      accessorKeyBoolean: "is_newsletter",
      accessorKeyArray: "newsletter_charity_ids",
      id: 1,
      title: "My newsletters",
      description:
        "I want to know everything! You can keep me informed every month of Charitag news, exclusive offers, and more.",
      options: charities.map((item) => ({
        label: item.charity_name,
        value: item.id.toString(),
      })),
      selectedOptions: [],
      isEnabled: true,
      icon: faEnvelopeOpenText,
      details:
        "In more details, please select what will you be interested to read about:",
    },
    {
      accessorKeyBoolean: "is_deals",
      accessorKeyArray: "category_ids",
      id: 2,
      title: "My deals alert",
      description: "Keep me informed on latest deals.",
      options: categories.map((item) => ({
        label: item.name,
        value: item.id.toString(),
      })),
      selectedOptions: [],
      isEnabled: true,
      icon: faEnvelopeOpenText,
      details:
        "In more details, please select what will you be interested to read about:",
    },
    {
      accessorKeyBoolean: "is_charity",
      accessorKeyArray: "charity_ids",
      id: 3,
      title: "My charities alert",
      description: "Keep me informed on my supported Charities.",
      options: charities.map((item) => ({
        label: item.charity_name,
        value: item.id.toString(),
      })),
      selectedOptions: [],
      isEnabled: false,
      svg: logo,
      details:
        "In more details, please select what will you be interested to read about:",
    },
    {
      accessorKeyBoolean: "is_volunteer_missions",
      accessorKeyArray: null,
      id: 4,
      title: "My volunteer missions",
      description: "Keep me informed on volunteer missions nearby.",
      options: [],
      selectedOptions: [],
      isEnabled: false,
      svg: logo,
      details:
        "In more details, please select what will you be interested to read about:",
    },
  ];

  const dispatch = useAppDispatch();
  const _sectionValues = useAppSelectorConsumer(
    (state) => state.ConsumerNotifications,
  );

  const sectionValues = _sectionValues.consumerNotifications;

  const router = useRouter();

  useEffect(() => {
    if (!_sectionValues.init) {
      dispatch(
        setNotifications({
          data: {
            newsletter_charity_ids: initSettings.newsletters.map((item) => ({
              label: item.charity_name,
              value: item.id.toString(),
            })),
            category_ids: initSettings.deals_alerts.map((item) => ({
              label: item.name,
              value: item.id.toString(),
            })),
            charity_ids: initSettings.charity_alerts.map((item) => ({
              label: item.charity_name,
              value: item.id.toString(),
            })),
            is_newsletter: Boolean(
              initSettings.notification_setting.is_newsletter,
            ),
            is_deals: Boolean(initSettings.notification_setting.is_deals),
            is_charity: Boolean(initSettings.notification_setting.is_charity),
            is_volunteer_missions: Boolean(
              initSettings.notification_setting.is_volunteer_missions,
            ),
          },
          init: true,
        }),
      );
    }
  }, [dispatch, initSettings]);

  const handleChange = (
    key: keyof NotificationsSettingsState,
    value: boolean | Option[],
  ) => {
    dispatch(updateNotificationSettings({ [key]: value }));
  };

  return (
    <div>
      {initialConfig.map((item) => (
        <NotificationsAlerts
          key={item.id}
          item={item}
          icon={item.icon}
          svg={item.svg}
          isEnabled={sectionValues[item.accessorKeyBoolean]}
          onSelect={(values) => {
            handleChange(
              item.accessorKeyArray ?? "newsletter_charity_ids",
              values,
            );
          }}
          onToggle={(value) => {
            handleChange(item.accessorKeyBoolean ?? "is_newsletter", value);
          }}
          selctedOptions={
            sectionValues[item.accessorKeyArray ?? "newsletter_charity_ids"]
          }
        />
      ))}

      <div className="mt-8">
        <ButtonPrimary
          label="Save Changes"
          className="h-[50px] rounded-full"
          onClick={async (values) => {
            console.log("ndfjkhbsdfhdsf", values);
            const response = await postNotificationSettings({
              ...sectionValues,
              category_ids: sectionValues.category_ids.map(
                (item: Option) => item.value,
              ),
              charity_ids: sectionValues.charity_ids.map(
                (item: Option) => item.value,
              ),
              newsletter_charity_ids: sectionValues.newsletter_charity_ids.map(
                (item: Option) => item.value,
              ),
            });
            if (!response.error) {
              toast.success(response.data.message);
              router.push("/consumer/dashboard");
            } else {
              if (typeof response.data.message === "object") {
                const errorMessage = Object.values<string[]>(
                  response.data.message,
                );
                toast.error(errorMessage[0][0]);
              } else {
                toast.error(response.data.message);
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default ConsumerNotifications;
