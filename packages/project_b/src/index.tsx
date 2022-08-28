import React  from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from './config'
import GlobalStyle from './GlobalStyle'
import APP from './App'

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <APP />
      </>
    </ThemeProvider>
  ,
  document.getElementById('root')
)

window.history.scrollRestoration = 'manual'
