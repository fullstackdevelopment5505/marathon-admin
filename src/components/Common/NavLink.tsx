import React from 'react'
import { Link } from '@reach/router'
import styled from 'styled-components'

const StyledLink = styled.a<{
  styles?: any;
}>`
  ${(props) => props.styles || ''}
`

export const NavLink = ({ children, exact = false, to, ...other }) => {

  const isActive = exact
    ? window.location.pathname === to
    : window.location.pathname.indexOf(to) === 0;

  const LinkComponent = to ? Link : StyledLink

  let className = isActive ? 'active' : undefined
  if (
    typeof children === 'string' &&
    window.location.pathname.split('/')[1] === children.toLowerCase()
  ) {
    className = 'active'
  }

  return (
    <LinkComponent to={to} className={className} {...other}>
      {children}
    </LinkComponent>
  )
}
