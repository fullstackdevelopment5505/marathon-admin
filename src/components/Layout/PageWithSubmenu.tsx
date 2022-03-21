import React from 'react'
import styled from 'styled-components'
import { Router } from '@reach/router'
import { Submenu } from './Submenu'
import { NavLink } from '../Common/NavLink'
import { Flexed } from '../Common/Flexed'

const StyledPage = styled.div`
  width: 100%;
`

const StyledRouter = Flexed(Router)

export const PageWithSubmenu = ({
  children,
  menuItems = [],
  ...props
}) => {
  return (
    <StyledPage {...props}>
      <Submenu>
        {
          menuItems.map((item, key) => <NavLink to={item.to} key={key}>{ item.label }</NavLink>)
        }
      </Submenu>
      <StyledRouter>
      { children }
      </StyledRouter>
    </StyledPage>
  )
}
