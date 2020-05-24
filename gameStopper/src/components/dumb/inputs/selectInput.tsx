import * as React from "react";
import Select, { ValueType } from "react-select";
import { withTheme } from "emotion-theming";
import { Theme } from "../../../themes";

type OptionType = { label?: string; value?: string };

export interface ISelectInputProps {
  value: OptionType;
  onChange: (value: OptionType) => any;
  values: OptionType[];
}

const _SelectInput = (props: ISelectInputProps & { theme: Theme }) => {
  const { colors } = props.theme;
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
          color: colors.primary.text,
        }),
        menu: (provided, state) => ({
          ...provided,
          backgroundColor: colors.primary.normal,
          borderRadius: 0,
          color: colors.primary.text,
        }),
        singleValue: (provided, state) => ({
          ...provided,
          color: colors.primary.text,
        }),
        control: (provided, state) => ({
          ...provided,
          backgroundColor: colors.primary.normal,
          borderRadius: 0,
          border: "none",
          outlineWidth: 0,
          outline: `1px solid ${colors.primary.normal} !important`,
          color: colors.primary.text,
        }),
        option: (provided, { isFocused, isSelected }) => ({
          ...provided,
          backgroundColor: isFocused
            ? colors.secondary.bright
            : isSelected
            ? colors.secondary.normal
            : colors.primary.normal,
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

export const SelectInput = withTheme(_SelectInput);
