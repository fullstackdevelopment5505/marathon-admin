import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { DataFetcher } from './classes/DataFetcher';
import { Marathon } from './classes/Marathon';
import { AssetTypeData } from './classes/AssetType';
import App from './components/App';
import { AUTH0_AUDIENCE, AUTH0_DOMAIN, AUTH0_CLIENT_ID } from './constants';

import './styles/app.scss';

// Declare window object. For TypeScript only
declare global {
  interface Window {
    dataSources: Array<any>;
    assetTypes: Array<AssetTypeData>;
    eventTypes: Array<any>;
    units: Array<any>;
    assetViews: Array<any>;
    groups: Array<any>;
    tagTypes: Array<any>;
    fetcher: DataFetcher;
    marathon: Marathon;
    containerRef: HTMLDivElement;
    setParam: (name: string) => (value: string) => void;
  }
}

ReactDOM.render(
  <Auth0Provider
    audience={AUTH0_AUDIENCE}
    domain={AUTH0_DOMAIN}
    clientId={AUTH0_CLIENT_ID}
    redirectUri={`${window.location.origin}/connect/auth0/callback`}
    onRedirectCallback={(appState) => {
      window.history.replaceState(null, null, appState?.returnTo ?? '/');
    }}
    cacheLocation="localstorage"
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
