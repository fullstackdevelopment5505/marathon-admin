import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button<{
  vertical?: boolean;
}>`
  background-color: var(--${props => props.color}-color);
  border: none;
  border-radius: 0.3rem;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  line-height: 1.1em;
  letter-spacing: 0.02857em;
  min-width: ${props => props.vertical ? '100%' : '10rem'};
  max-width: calc(100% - 2em);
  min-height: 2.5em;
  padding: 0.5em 1em;
  text-transform: uppercase;
  transition: all 0.2s ease;

  &:not(:disabled):hover {
    background-color: var(--${props => props.color}-hover);
    box-shadow: 0.15rem 0.15rem 0.3rem rgba(0,0,0,0.4);
  }

  &:disabled {
    background-color: #777;
    opacity: 0.2;
    cursor: default;
  }

  & + button {
    margin: ${props => props.vertical ? '0.4rem' : 0} 0 0 ${props => props.vertical ? 0 : '0.8rem'};
  }
`

export const Button = ({
  secondary = false,
  // vertical = false,
  ...props
}) => {
  const color = secondary ? 'secondary' : 'primary'

  return (
    <StyledButton color={color} {...props} />
  )
}