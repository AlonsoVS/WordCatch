import React, { FC } from 'react'
import styled from 'styled-components'

const CounterView = styled.a`
  align-self: center;
  color: ${props => props.theme.primaryText};
  font-size: medium;
  text-align: end;
  width: 70%;
  @media (min-height: 328px) {
    font-size: large;
    max-width: 800px;
    min-width: 200px;
  }
`

type Props = {
  points:number
}

const PointsCounterView:FC<Props> = ({points}) => {
  return (
    <CounterView>
      Pts {points}
    </CounterView>
  )
}

export default PointsCounterView
