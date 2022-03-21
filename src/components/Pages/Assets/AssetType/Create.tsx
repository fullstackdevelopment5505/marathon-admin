import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Form } from './Form'
import { StyledPage } from '../../../Common/StyledPage'

export const Create = (props: RouteComponentProps) => {
  const [errors, setErrors] = useState({})
  const assetType = {
    name: '',
    slug: '',
    plural: '',
    dataSourceId: '',
    assetViewId: '',
    parentId: '',
    styles: [],
    colors: [],
    units: [],
    eventTypeId: '',
  };
  const guid = null;


  const formOptions = {
    guid,
    assetType,
    errors,
  }
  return (
    <StyledPage>
      <Form
        {...formOptions}
      />
    </StyledPage>
  )
}
