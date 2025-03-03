import React from "react";

interface RadioButtonProps {
  name?: string;
  value: string | number;
  label?: string;
  checked?: boolean;
  onChange: (value: number | string) => void;
  classNameContaine?: string;
  classNameLabel?: string;
  disable?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  value,
  label,
  checked,
  onChange,
  classNameContaine,
  classNameLabel,
  disable,
}) => {
  return (
    <label className="text-black-700 relative block">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="hidden appearance-none"
        disabled={disable}
      />
      <div className="flex items-center gap-2">
        <span
          className={`relative inline-block h-5 w-5 rounded-full border ${
            checked
              ? "border border-merchant_text_color_blue"
              : " border border-merchant_border"
          } bg-white ${classNameContaine}`}
        >
          <span
            className={`${
              checked ? "bg-merchant_text_color_blue " : "bg-white"
            } absolute left-1/2 top-1/2 inline-block  h-3 w-3 -translate-x-1/2 -translate-y-1/2 transform rounded-full`}
          ></span>
        </span>
        <span className={`${classNameLabel}`}>{label}</span>
      </div>
    </label>
  );
};

export default RadioButton;
