import React from 'react'
import styled from 'styled-components'

const Main = styled.main`
  background: snow;
  padding: 16px;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  div {
    /* border: 1px solid  ${props => props.theme.colors.primary}; */
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.assist};
    font-size: 32px;
  }
`
export default () => {

  return <Main>
    <div>
      This is Project A
    </div>
  </Main>
}