/* eslint-disable max-len */
import { lighten, linearGradient, normalize, transparentize, em } from 'polished'
import { createGlobalStyle, css } from 'styled-components'
import { theme } from './config'

export const shadow = `1px 1px 2px ${theme.colors.primary}, 1px 1px 2px ${theme.colors.primary}`

// Turn off the native look and feel for input types
export const hideUserAgentApperance = `
  -webkit-appearance: none;
  appearance: none;
  background: none;
`

const rangeTrack = css`
  border-radius: 1em;
  background: ${transparentize(0.96, '#000')};
  height: 4px;
`

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  html {
    /* 适配手机，对于手机设备，按屏幕比例设置字体对应的基准 */
    overflow-x: hidden;

    /* 对于宽于ipad的设备，认为是桌面设备 */
    @media (min-width: 768px) {
    }
  }

  body {
    background: ${props => props.theme.colors.background};
    /* font-size: ${props => props.theme.size.text}rem; */
    font-size: 0.875rem;
    color: ${lighten(0.2, '#000')};
    margin: 0;
    font-family: "PingFang SC", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    /* &::-webkit-scrollbar {
        width: .5em;
    }

  &::-webkit-scrollbar-track {
        background: ${props => props.theme.colors.gray};
        box-shadow: inset 0 0 2px #eee;
        border-radius: .3125em;
  }
  &::-webkit-scrollbar-thumb {
        background: rgba(18, 205, 159, .6);
        box-shadow: inset 0 0 .125em rgba(18, 205, 159, .2);;
        border-radius: 0.3125em;
        cursor: pointer;
  }

  &::-webkit-scrollbar-thumb:hover {
        background:  ${props => props.theme.colors.primary};
  } */
  }

  div, section {
    box-sizing: border-box;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  label {
    display: block;
    margin: 0.5em 0;
  }

  input, textarea {
    height: 2.285em;
    background: #fff;
    box-sizing: border-box;
    color: ${lighten(0.4, '#000')};
    padding: 0 0.8em;
    border: 1px solid ${transparentize(0.85, '#000')};
    outline: none;
    font-size: 0.875rem;
    :hover, :focus {
      border: 1px solid ${props => props.theme.colors.primary};
    }
    :invalid{
      border: 1px solid ${props => props.theme.colors.danger};
      box-shadow: none;
    }
    ::placeholder {
      color: ${transparentize(0.75, '#000')};
    }
    :disabled {
      background: ${transparentize(0.96, '#000')};
      cursor: not-allowed;
      :hover {
        border: 1px solid ${transparentize(0.85, '#000')};
      }
    }
  }

  input[type=file], [type=range], [type=image] {
    border: none;
  }

  button, input[type=button], [type=submit] {
    ${props => linearGradient({
    colorStops: [
      transparentize(1 - props.theme.opacity, props.theme.colors.primary),
      props.theme.colors.primary]
  })}
    color: white;
    box-sizing: border-box;
    cursor: pointer;
    outline: none;
    height: 2.3em;
    border: none;
    :hover {
      opacity: ${props => props.theme.opacity};
    }
    :active {
      background: ${props => props.theme.colors.primaryDark};
    }
    :disabled {
      color: currentColor;
      opacity: ${props => props.theme.opacity};
      background: ${props => props.theme.colors.border};
      border: 1px solid ${props => props.theme.colors.border};
      cursor: not-allowed;
    }
  }

  input[type=submit] {
    :hover {
      border: none;
    }
  }

  input[type=radio],[type=checkbox] {
    ${hideUserAgentApperance}
    width: 1.15em;
    height: 1.15em;
    border: 1px solid ${props => props.theme.colors.border};
    background: transparent;
    vertical-align: middle;
    :disabled {
      border: 1px solid ${transparentize(0.85, '#000')};
      background: ${transparentize(0.96, '#000')};
    }
  }

  input[type=radio] {
    padding: 2px;
    border-radius: 2em;
    :hover {
      border: 1px solid ${props => props.theme.colors.primary};
    }
    :checked {
      background: ${props => props.theme.colors.primary};
      background-clip: content-box;
      border: 1px solid ${props => props.theme.colors.primary};
    }
  }

  input[type=checkbox] {
    :checked {
      background: ${props => props.theme.colors.primary};
      display: inline-flex;
      justify-content: center;
      :after {
        content: "✓";
        color: white;
        font-size: 0.6em;
        font-weight: bold;
        align-self: center;
      }
    }
  }

  input[type=number] {
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
    :disabled {
      background: ${transparentize(0.96, '#000')};
      cursor: not-allowed;
      :hover {
        border: none;
      }
    }
  }

  input[type=file] {
    background: none;
    padding: 0;
  }

  input[type=image] {
    padding: 0;
    :hover {
      border: none;
    }
  }

  input[type=color] {
    width: 2em;
    height: 2em;
    padding: 4px;
    border-radius: 0.325em;
  }

  input[type=range], progress {
    ${hideUserAgentApperance}
    background: transparent;
    padding: 0;
    vertical-align: middle;
    cursor: pointer;
    :hover {
      border: none;
    }

    ::-webkit-slider-runnable-track{
      -webkit-appearance: none;
      ${rangeTrack}
    }
    ::-moz-range-track{
      ${rangeTrack}
    }
    ::-ms-track {
      ${rangeTrack}
    }

    ::-moz-range-thumb {
      -webkit-appearance: none;
      background-color: #fff;
      border: 2px solid ${props => props.theme.colors.primary};
      box-sizing: border-box;
    }
    ::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 1em;
      height: 1em;
      margin-top: -4px;
      background-color: #fff;
      border-radius: 50%;
      border: 2px solid ${props => props.theme.colors.primary};
    }
    ::-moz-range-progress {
      background-color: ${props => props.theme.colors.primary};
      height: 4px;
      border-radius: 1em;
    }
  }

  textarea {
    height: 5em;
    vertical-align: top;
    padding: 0.8em;
  }

  a {
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
    text-decoration: none;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  ul {
    padding-inline-start: 0;
    list-style: none;
    li {
      box-sizing: border-box;
      border-bottom: 1px solid ${props => props.theme.colors.background};
    }
  }

  svg {
    stroke-linecap: round;
    stroke-linejoin: round;
    height: 1em;
    vertical-align: middle;
  }

  .datetime-reset-button {
    fill: currentColor;
    opacity: .5;
    background-color: transparent;
    border: none;
    align-self: center;
    flex: none;
    padding-left: 2px;
    padding-right: 2px;
  }

  table {
    width: 100%;
    table-layout: fixed;
    font-size: 0.875rem;
    border-spacing: 0;
    background-color: #FFFFFF;
    border-collapse: collapse;

    thead {
      background: ${lighten(0.96, '#000')};
      th {
        text-align: left;
      }
    }

    tbody {
      tr:hover {
        background-color: rgba(41, 197, 136, .06);
        cursor: pointer;
      }
  }

    tr {
      height: ${em(54, 14)};
      border-bottom: 2px solid ${lighten(0.94, '#000')};
      td:first-child {
        color: ${lighten(0.2, '#000')};
      }
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,td {
      position: relative;
      color: ${lighten(0.35, '#000')};
      margin: 0;
      padding: 0.5rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;


      :last-child {
        border-right: 0;
      }
    }
  }

`

export default GlobalStyle
