import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Form } from './Form'
import useAssetType from '~/hooks/useAssetType';
import { StyledPage } from '../../../Common/StyledPage';
import { ASSET_TYPE_PATH } from './index'

export const Edit = (props, RouteComponentProps) => {
  const [errors, setErrors] = useState({});
  const {loading, getAssetTypes, getAssetTypeById} = useAssetType();
  console.log(props.id);
  const guid = props.id;

  useEffect( () => {
    const getAssetType = async () => {
      await getAssetTypes();        
    }
    getAssetType();
  }, []);
  const assetType = getAssetTypeById(guid);
  const formOptions = {
    guid,
    assetType,
    errors,
  }

  return (
    <StyledPage >
      <Form {...formOptions} />
    </StyledPage>
  )
}
