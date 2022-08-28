import React, {useState} from 'react'
import styled from 'styled-components'
import { InputNumber } from '@rocky-fe/widgets'
import { utils } from 'utils'


const Main = styled.main`
  background: snow;
  padding: 16px;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  h3 {
    color: ${props => props.theme.colors.assist};
    font-size: 32px;
  }
  button {
    min-width: 100px;
  }
`
export default () => {
  const [count, setCount ] = useState(0)

  return <Main>
    <h3> This is Project B </h3>
    <h3> count is { count} </h3>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
      <button onClick={() => setCount(count - 1)}> sub </button>
      <InputNumber defaultValue={count} onChange={val => setCount(val)} />
      <button onClick={() => setCount(count + 1)}> add </button>
    </div>

    <h3>
      count + 2 = { utils.add(count , 2)}
    </h3>
  </Main>
}