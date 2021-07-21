import React, { FC, MouseEventHandler } from 'react'
import styled from 'styled-components'

type Props = {
  children:any
  onClick:MouseEventHandler
  className:string
}

const BaseButton = styled.button`
    background: ${props => props.background || 'grey'};
    border: ${props => props.border || 'none'};
    border-radius: ${props => props.borderRadius || '10px'};
    cursor: ${props => props.cursor || 'pointer'};
    width: ${props => props.width || '90px'};
    height: ${props => props.width || '60px'};

    &:hover {
      background: white
    }
`

const Button:FC<Props> = ({ children, onClick, className }) => {
  return (
    <BaseButton className={className} onClick={onClick}>
      {children}
    </BaseButton>
  )
}

export default Button
