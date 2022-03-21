import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { PageWithSubmenu } from '../../Layout/PageWithSubmenu'
import { Page } from '../../Layout/Page'
import { AssetType } from './AssetType'


const AssetsWelcome = (props: RouteComponentProps) => {
  return <Page>Welcome to assets...</Page>
}

export const Assets = (props: RouteComponentProps) => {
  return (
    <PageWithSubmenu
      menuItems={[
        { label: 'Types', to: '/assets/types' },
      ]}
    >
      <AssetType path="/types/*" /> 
      <AssetsWelcome path="*" />
    </PageWithSubmenu>
  )
}
