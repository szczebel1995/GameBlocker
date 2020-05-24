import Styled, { CreateStyled } from "@emotion/styled";

export const themes: { dark: Theme } = {
  dark: {
    colors: {
      primary: {
        bright: "#383838",
        normal: "#2A2A2A",
        dim: "#191919",
        text: "white",
      },
      secondary: {
        bright: "#c90003",
        normal: "#9E0101",
        dim: "#420808",
        text: "white",
      },
    },
  },
};

export type Theme = {
  colors: {
    primary: {
      bright: string;
      normal: string;
      dim: string;
      text: string;
    };
    secondary: {
      bright: string;
      normal: string;
      dim: string;
      text: string;
    };
  };
};

export const styled = Styled as CreateStyled<Theme>;
