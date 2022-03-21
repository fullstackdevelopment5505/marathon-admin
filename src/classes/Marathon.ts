import { GetTokenSilentlyOptions } from '@auth0/auth0-react';
import { Auth0User } from './Auth0User';
import { DataFetcher } from './DataFetcher';
import { AssetType } from './AssetType';

interface MarathonOptions {
  refreshUI?: () => void;
  getToken: (options?: GetTokenSilentlyOptions) => Promise<string>;
}

export class Marathon {
  public activeUser: Auth0User;
  public refreshUI: () => void;
  public fetcher: DataFetcher;
  public assetTypes: Array<AssetType>;
  private getToken: (options?: GetTokenSilentlyOptions) => Promise<string>;

  private refreshTimer: NodeJS.Timeout;

  constructor({ refreshUI = () => null, getToken }: MarathonOptions) {
    this.assetTypes = [];
    this.activeUser = undefined;
    this.refreshUI = refreshUI;
    this.fetcher = new DataFetcher(getToken);
  }

  refresh() {
    if (this.refreshUI && !this.refreshTimer) {
      this.refreshTimer = setTimeout(() => {
        console.log('refreshing Marathon...');
        delete this.refreshTimer;
        this.refreshUI();
      }, 10);
    }
  }
}
