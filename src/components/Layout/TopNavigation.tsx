import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '~/hooks/useAuth';
import AccountCircle from '@material-ui/icons/AccountCircle'
import { IconButton } from '../Common/IconButton'
import { NavLink } from '../Common/NavLink'
import { Profile } from '../Common/Profile'
import { HorizontalMenu } from './HorizontalMenu'

const StyledProfileIcon = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
`

const StyledProfileDropDown = styled.div`
  position: absolute;
  top: 4em;
  right: 1.2em;
  border: 0.1em solid lightgrey;
  border-radius: 0.3rem 0.3rem 0.6rem 0.6rem;
  box-shadow: 0 0.1em 2em rgba(0, 0, 0, 0.1);
  z-index: 100;
`

export const TopNavigation = ({ isLoggedIn }) => {
  const { loginWithRedirect: loginAction } = useAuth();
  const [showProfile, setShowProfile] = useState(false)

  const handleProfile = () => {
    setShowProfile(!showProfile)
  }

  return (
    <>
      <HorizontalMenu>
        {isLoggedIn && (
          <>
            <NavLink to="/assets/types">Assets</NavLink>
            <NavLink to="/events/types">Events</NavLink>
            <NavLink to="/tags/types">Tags</NavLink>
            <NavLink to="/models/lists">Models</NavLink>
            <NavLink to="/users/lists">Users</NavLink>
            <NavLink to="/uploads/tags">Uploads</NavLink>
          </>
        )}

        {isLoggedIn ? (
          <StyledProfileIcon>
            <IconButton onClick={handleProfile}>
              <AccountCircle />
            </IconButton>
          </StyledProfileIcon>
        ) : (
          <NavLink to="#" onClick={loginAction}>Sign In</NavLink>
        )}
      </HorizontalMenu>
      {showProfile ? (
        <Profile closeHandler={() => setShowProfile(false)} />
      ) : null}
    </>
  )
}
