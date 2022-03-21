
import {
  ASSETS_API_URL as ASSETS_API_BASE,
  EVENTS_API_URL as EVENTS_API_URL,
  CLIENT_MARATHON_API as MARATHON_API
} from '~/constants';
import { Marathon } from '~/classes/Marathon';

const ASSET_TYPES_API_URL = `${ASSETS_API_BASE}/types/admin`;

export class MarathonApi {
  private marathon: Marathon;
  public constructor(marathon: Marathon) {
    this.marathon = marathon;
  }

  public getAssetTypeApi = (
    id: string
  ) => ({
    create: async ( assetType, url ) => {
      await this.marathon.fetcher.post(
        `${ASSET_TYPES_API_URL}`,
        JSON.stringify(
          assetType
        )
      );
      window.location = url;
    },
    delete: async (id: string) => {
      await this.marathon.fetcher.delete(
        `${ASSET_TYPES_API_URL}/${id}`
      );
    },
  });
}
