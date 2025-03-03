import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Switch } from "@/components/ui/switch";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { SectionConfig } from ".";

const NotificationsAlerts = ({
  selctedOptions,
  onToggle,
  onSelect,
  item,
  isEnabled,
  icon,
  svg,
}: {
  item: SectionConfig;
  selctedOptions: Option[];
  onToggle: (value: boolean) => void;
  onSelect: (selected: Option[]) => void;
  isEnabled: boolean;
  icon?: IconProp;
  svg?: StaticImageData;
}) => {
  return (
    <div className="mb-4 rounded-xl border border-merchant_border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon ? (
            <FontAwesomeIcon
              icon={icon}
              className="text-merchant_text_color_blue h-4"
            />
          ) : (
            <>
              <Image src={svg || ""} width={14} height={16} alt="" />
            </>
          )}
          <span className="text-xl font-bold">{item.title}</span>
        </div>
        <div>
          <Switch
            checked={isEnabled}
            onCheckedChange={(value) => {
              onToggle(value);
            }}
          />
        </div>
      </div>
      <div className="px-7 pt-3">
        <span>{item.description}</span>
        {item.accessorKeyArray && (
          <>
            <div className="pt-6">
              <span>{item.details}</span>
            </div>
            <div className="pt-2">
              <MultipleSelector
                options={item.options}
                value={selctedOptions}
                onChange={onSelect}
                className="rounded-md border-borders_color py-4 text-base"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsAlerts;
