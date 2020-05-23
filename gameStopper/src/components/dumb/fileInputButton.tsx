import * as React from "react";
import { StyledButton } from "./button";

export interface IFileInputProps {
  icon: any;
  onFileChosen: (path: string) => any;
}

const Label = StyledButton.withComponent("label");

export const FileInputButton = (props: IFileInputProps) => {
  return (
    <Label primary title={undefined} onClick={() => undefined}>
      <input
        hidden
        type="file"
        onChange={(e) => {
          const filePath = e.target.files?.item(0)?.path;
          if (filePath) {
            props.onFileChosen(filePath);
          }
        }}
      />
      {props.icon}
    </Label>
  );
};
