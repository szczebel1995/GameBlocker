import * as React from "react";
import Select, { ValueType } from "react-select";
import { ColorE } from "../../enums/color";

type OptionType = { label?: string; value?: string };

export interface ISelectInputProps {
  value: OptionType;
  onChange: (value: OptionType) => any;
  values: OptionType[];
}

export const SelectInput = (props: ISelectInputProps) => {
  return (
    <Select
      isSearchable={false}
      styles={{
        indicatorSeparator: (provided, state) => ({
          ...provided,
          display: "none",
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          color: ColorE.TEXT_COLOR,
        }),
        menu: (provided, state) => ({
          ...provided,
          backgroundColor: ColorE.LIST_ITEM_BGD,
          borderRadius: 0,
          color: ColorE.TEXT_COLOR,
        }),
        singleValue: (provided, state) => ({
          ...provided,
          color: ColorE.TEXT_COLOR,
        }),
        control: (provided, state) => ({
          ...provided,
          backgroundColor: ColorE.LIST_ITEM_BGD,
          borderRadius: 0,
          border: "none",
          outlineWidth: 0,
          outline: `1px solid ${ColorE.LIST_ITEM_BGD} !important`,
          color: ColorE.TEXT_COLOR,
        }),
        option: (provided, { isFocused, isSelected }) => ({
          ...provided,
          backgroundColor: isFocused
            ? ColorE.LIST_ITEM_HOVERED_BGD
            : isSelected
            ? ColorE.LIST_ITEM_ACTIVE_BGD
            : ColorE.LIST_ITEM_BGD,
        }),
      }}
      value={props.value}
      onChange={(value) => {
        if (value) {
          props.onChange(value as OptionType);
        }
      }}
      options={[{ value: "", label: "None" }, ...props.values]}
    />
  );
};
