import { Router, Redirect } from '@reach/router'
import React from 'react';
import { Flexed } from './Common/Flexed';
import { Assets } from './Pages/Assets';

const StyledRouter = Flexed(Router);

export const LoggedIn = () => {

  return <StyledRouter>
    <Redirect from="/" to="/assets/types" />
    <Assets path="/assets/*" />    
  </StyledRouter>
};
