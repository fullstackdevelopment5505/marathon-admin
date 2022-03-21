import React from 'react'
import { Create } from './Create'
import { Edit } from './Edit'
import { Form } from './Form'
import { Table } from './Table'
import { FlexedRouter } from '../../../Layout/FlexedRouter'
import { RouteComponentProps } from '@reach/router'

export const ASSET_TYPE_PATH = '/assets/types'

export const AssetType = (props: RouteComponentProps) => {

  return (
    <FlexedRouter>
      <Create path="/create" />
      <Edit path="/edit/:id" />
      <Form path="/form/*" />
      <Table path="/" />
    </FlexedRouter>
  )
}
