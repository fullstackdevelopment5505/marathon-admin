import React from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { TopNavigation } from './TopNavigation'
import { NavLink } from '../Common/NavLink'
import logo from '~/images/logo.svg'

const StyledAppLayout = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: stretch;
`

const BelowHeader = styled.section<{
  padding?: boolean;
}>`
  flex: auto;
  overflow-y: hidden;
  display: flex;
  flex-flow: row;
  padding: ${props => !props.padding ? 0 : (props.padding === true ? '1.5rem' : props.padding)};
`

const PageContent = styled.div`
  overflow-y: hidden;
  flex: auto;
  display: flex;
`

export const AppLayout = ({ children, isLoggedIn }) => {
  return (
    <StyledAppLayout>
      <Header >
        <NavLink to="/assets"><img src={logo} /></NavLink>
        <TopNavigation isLoggedIn={isLoggedIn} />
      </Header>
      <BelowHeader className="page-content">
        <PageContent>
          { children }
        </PageContent>
      </BelowHeader>
    </StyledAppLayout>
  )
}
