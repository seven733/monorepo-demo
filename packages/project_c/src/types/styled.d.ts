// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    opacity: number
    colors: {
      primary: string
      danger: string
      primaryDark: string
      info: string
      warning: string
      border: string
      strong: string
      shadow: string
      assist: string,
      background: string
      gray: string
      white: string
      icon: string
      yellow: string
    },
    size: {
      remBase: string
      text: number
      borderRadius: string // px
      pageMargin: string
    }
  }
}
