import React, { useContext, useEffect, useRef, useState } from 'react';
import { AssetTypeData } from '~/classes/AssetType';
import { DataFetcher } from '~/classes/DataFetcher';
import { Marathon } from '~/classes/Marathon';

import {
  ASSETS_API_URL as ASSETS_API_BASE,
  EVENTS_API_URL as EVENTS_API_URL,
  CLIENT_MARATHON_API as MARATHON_API
} from '~/constants';
import { error } from '~/services/messages';
import { useAuth } from '~/hooks/useAuth';
import { MarathonApi } from './api';
import { NavigateFunction, useNavigate } from 'react-router';

const ASSET_TYPES_API_URL = `${ASSETS_API_BASE}/types/admin`;
const DATASOURCES_API_URL = `${ASSETS_API_BASE}/datasources`;
const EVENT_TYPES_API_URL = `${EVENTS_API_URL}/types`;
const UNITS_API_URL = `${MARATHON_API}/api/v1/tags/types/units`;
const ASSET_VIEW_API_URL = `${MARATHON_API}/api/v1/assets/views`;
const GROUP_API_URL = `${MARATHON_API}/api/v1/identity/groups`;
const TAG_TYPE_API_URL = `${MARATHON_API}/api/v1/tags/types`;

let pollingTimer = undefined;

// helper function to simplify fetching code
function loadFromFetcher<T = unknown>(
  fetcher: DataFetcher,
  what: string,
  where: string,
  doAfter: (what: string) => (data: T) => T
): Promise<T> {
  return fetcher
    .get<T>(new URL(where).toString())
    .then(doAfter(what))
    .catch((err) => {
      error(`API ERROR: could not load ${what}`, { autoClose: 30000 });
      console.warn(`API LOAD ERROR: could not load ${what} from ${where}`, err);
      return [] as unknown as T;
    });
}

interface Props {
  assetTypeData: Array<AssetTypeData>;
  dataSources: Array<any>;
  eventTypes: Array<any>;
  units: Array<any>;
  assetViews: Array<any>;
  groups: Array<any>;
  tagTypes: Array<any>;
  marathon: Marathon;
  api: MarathonApi;
  refresh: () => void;
  navigate: NavigateFunction;
  hasChanged: number;
  loading: LoadingState;
}

export const MarathonContext = React.createContext<Props>({} as Props);

interface LoadingState {
  assetTypes: boolean;
  anything: boolean;
}

export const MarathonProvider = ({ children }) => {
  const {
    user: AuthUser,
    isAuthenticated: isLoggedIn,
    getAccessTokenSilently,
    isLoading,
  } = useAuth();
  const navigate = useNavigate();

  const USER_ID_KEY = 'https://arundo.com/claim/employeeId';
  const pinnedStorageKey =
    '!ush::(' + AuthUser?.[USER_ID_KEY] + ')asset:pinned';
  const pinnedAssetStorage = localStorage.getItem(pinnedStorageKey);

  const marathonRef = useRef<Marathon>(
    new Marathon({
      getToken: getAccessTokenSilently,
    })
  );

  const [hasChanged, setHasChanged] = useState(+new Date());

  const [loading, setLoading] = useState<LoadingState>({
    assetTypes: true,
    anything: true,
  });

  const doneLoading =
    (what: string) =>
    <T,>(data: T) => {
      if (loading[what]) {
        setLoading((state) => ({ ...state, [what]: false }));
      }
      return data;
    };

  const refresh = () => setHasChanged(+new Date());

  useEffect(() => {
    const loadFromApi = async () => {
      // register refresh event with assets
      const [
        assetTypesData,
        dataSources,
        eventTypes,
        units,
        assetViews,
        groups,
        tagTypes
      ] = await Promise.all([
        loadFromFetcher<AssetTypeData[]>(
          marathonRef.current.fetcher,
          'assetTypes',
          ASSET_TYPES_API_URL,
          doneLoading
        ),
        loadFromFetcher<[]>(
          marathonRef.current.fetcher,
          'dataSources',
          DATASOURCES_API_URL,
          doneLoading
        ),
        loadFromFetcher<[]>(
          marathonRef.current.fetcher,
          'eventTypes',
          EVENT_TYPES_API_URL,
          doneLoading
        ),
        loadFromFetcher<[]>(
          marathonRef.current.fetcher,
          'units',
          UNITS_API_URL,
          doneLoading
        ),
        loadFromFetcher<[]>(
          marathonRef.current.fetcher,
          'assetViews',
          ASSET_VIEW_API_URL,
          doneLoading
        ),
        loadFromFetcher<[]>(
          marathonRef.current.fetcher,
          'groups',
          GROUP_API_URL,
          doneLoading
        ),
        loadFromFetcher<[]>(
          marathonRef.current.fetcher,
          'tagTypes',
          TAG_TYPE_API_URL,
          doneLoading
        ),
      ]);

      if( assetTypesData ){
        var assetTypes = assetTypesData.map(myFunction);          
        
        function myFunction(assetType, index, array) {
          assetType.createdDate = assetType.createdDate
          ? new Date(assetType.createdDate)
          : new Date('1970-01-01T00:00-0500')
          assetType.assetViewId = assetType.assetView ? assetType.assetView.id : ''
          assetType.dataSourceId = assetType.dataSource ? assetType.dataSource.id : ''
          assetType.eventTypeId = assetType.eventType ? assetType.eventType.id : ''
          assetType.notificationGroupId = assetType.notificationGroup ? assetType.notificationGroup.id : ''
          assetType.unitId = assetType.unit ? assetType.unit.id : ''
          assetType.assetViewName = assetType.assetView ? assetType.assetView.name : ''
          assetType.dataSourceName = assetType.dataSource ? assetType.dataSource.name : ''
          assetType.eventTypeName = assetType.eventType ? assetType.eventType.name : ''
          assetType.notificationGroupName = assetType.notificationGroup ? assetType.notificationGroup.name : ''
          assetType.unitName = assetType.unit ? assetType.unit.name : ''
          assetType.hasParent = assetType.parentId ? true : false
          assetType.key = assetType.id
          assetType.value = assetType.slug
          return assetType
        }
      }
      window.assetTypes = assetTypes;
      window.dataSources = dataSources;
      window.eventTypes = eventTypes;
      window.units = units;
      window.assetViews = assetViews;
      window.groups = groups;
      window.tagTypes = tagTypes;

      marathonRef.current.refreshUI = refresh;
      marathonRef.current.activeUser = AuthUser;

      console.log('setting polling interval...');

      // done bootstrap
      console.log('done with data bootstrap, refreshing app state...');
      setHasChanged(+new Date());
      setLoading((state) => ({ ...state, anything: false }));

    };

    isLoggedIn && !isLoading && AuthUser && loadFromApi();    

    window.marathon = marathonRef.current;
    return () => {
      console.log('clearing event polling timer.');
      clearInterval(pollingTimer);
    };
  }, [isLoggedIn, isLoading, AuthUser?.userId]);

  const assetTypeData = window.assetTypes;
  const dataSources = window.dataSources;
  const eventTypes = window.eventTypes;
  const units = window.units;
  const assetViews = window.assetViews;
  const groups = window.groups;  
  const tagTypes = window.tagTypes;
 
  return (
    <MarathonContext.Provider
      value={{
        assetTypeData,
        dataSources,
        eventTypes,
        units,
        assetViews,
        groups,
        tagTypes,
        marathon: marathonRef.current,
        api: new MarathonApi(marathonRef.current),
        hasChanged,
        loading,
        navigate,
        refresh,
      }}
    >
      {children}
    </MarathonContext.Provider>
  );
};

export const useMarathon = () => useContext(MarathonContext);

