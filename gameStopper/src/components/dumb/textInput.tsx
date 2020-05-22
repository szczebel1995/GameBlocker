import * as React from "react";
import { styled } from "../../themes";
import { InputProps } from "react-select";

export interface ITextInputProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "onChange"> {
  onChange: (value: string) => any;
}

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 38px;
  background-color: ${(props) => props.theme.colors.primary.normal};
  border: none;
  color: ${(props) => props.theme.colors.primary.text};
  padding-left: 10px;
`;

export const TextInput = (props: ITextInputProps) => {
  return (
    <Input
      {...props}
      onChange={(e) => props.onChange(e.target.value)}
      type="text"
    />
  );
};
