import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { AppLayout } from '~/components/Layout/AppLayout';
import { Page } from '~/components/Layout/Page';
import { Button } from '~/components/Common/Button';
import { useAuth } from '~/hooks/useAuth';
import { LoggedIn } from './LoggedIn';
import { MarathonProvider } from '~/contexts';

const StyledPage = styled(Page)`
  margin-bottom: 5rem;
  color: #aaa;
`;

export default function App() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth();

  const MainPage = () => {
    if (isLoading) return null;

    if (!isAuthenticated)
      return (
        <StyledPage centered>
          <h2>Welcome to Marathon Administration</h2>
          <h6>
            Please <Button onClick={loginWithRedirect}>Sign In</Button> to
            continue...
          </h6>
        </StyledPage>
      );
    return <LoggedIn />;
  };

  return (
    <BrowserRouter>
      <MarathonProvider>
        <AppLayout isLoggedIn={isAuthenticated}>
          <MainPage />
        </AppLayout>
      </MarathonProvider>
    </BrowserRouter>
  );
}
