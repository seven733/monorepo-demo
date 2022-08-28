import { DefaultTheme } from "styled-components"
import { transparentize } from "polished"

export const theme: DefaultTheme = {
  opacity: 0.6,
  colors: {
    primary: "#29c588",
    primaryDark: "#29c588",
    info: "#6492FF",
    warning: "#FFB931",
    danger: "#FF5F5F",
    background: "#F5F5F5",
    strong: "#333333",
    border: transparentize(0.85, "#000"),
    shadow: "#EEEEEE",
    assist: "#999999",
    gray: "#EEEEEE",
    white: "#FFFFFF",
    icon: "#CCCCCC",
    yellow: "#FEB857"
  },
  size: {
    remBase: "16px",
    text: 0.875,
    borderRadius: "4px", // 单位px
    pageMargin: "3rem 2rem"
  }
}
