import { useState, useRef } from 'react';
import { useAuth } from '~/hooks/useAuth';
import {
  ASSETS_API_URL as ASSETS_API_BASE,
} from '~/constants';
import { Marathon } from '~/classes/Marathon';

const ASSET_TYPES_API_URL = `${ASSETS_API_BASE}/types/admin`;

const useAssetType = () => {
  const {
    user: AuthUser,
    isAuthenticated: isLoggedIn,
    getAccessTokenSilently,
    isLoading,
  } = useAuth();
  
  const marathonRef = useRef<Marathon>(
    new Marathon({
      getToken: getAccessTokenSilently,
    })
  );
  const [assetTypes, setAssetTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAssetType, setCurrentAssetType] = useState({});

  const getAssetTypes = async () => {
    const asset_types:[] = await marathonRef.current.fetcher.get(
      `${ASSET_TYPES_API_URL}`
    );
    
    if( asset_types ){
      const paths = JSON.parse(localStorage.getItem("path") || "[]");
      var asset_types_data = asset_types.map(myFunction);          

      function myFunction(assetType, index, array) {
        if(paths.length > 0) {
          paths.map( function (path, index, array){
            if(path.id === assetType.id){
              assetType.tableData = { isTreeExpanded:true }; 
            }
          })
        }
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
    setAssetTypes(asset_types_data);
    setLoading(false);
    return (asset_types_data);
  }

  const create  = async (assetType) => {
    await marathonRef.current.fetcher.post(
      `${ASSET_TYPES_API_URL}`,
      JSON.stringify(
        assetType
      )
    );
    await getAssetTypes();
  }

  const update  = async (id, assetType) => {
    await marathonRef.current.fetcher.patch(
      `${ASSET_TYPES_API_URL}/${id}`,
      JSON.stringify(
        assetType
      )
    );
    await getAssetTypes();
  }

  const remove  = async (id: string) => {
    await marathonRef.current.fetcher.delete(
      `${ASSET_TYPES_API_URL}/${id}`
    );
  }

  const getAssetTypeById = (id) => {
    console.log('id => ', id);
    const target = assetTypes.find((el) => el.id === id);
    return target;
  }

  return { assetTypes, loading, currentAssetType, getAssetTypeById, getAssetTypes, create, update, remove};
}

export default useAssetType;