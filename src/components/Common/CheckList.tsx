import React, { memo } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { DelayedProgress } from './DelayedProgress'

export const CheckList = memo(
  ({ data, loading, checked = [], toggle = () => {} }:any) => {
    if (loading) {
      return <DelayedProgress loading />
    }

    if (!data) {
      return null
    }

    return (
      <List>
        {data.map((item) => {
          const { id, name: primary, description } = item
          const itemProps = {
            id,
            primary,
            secondary:''
          }

          if (description) {
            itemProps.secondary = description
          }

          return (
            <ListItem key={id} dense button onClick={() => toggle(id)}>
              <ListItemIcon>
                <Checkbox checked={checked.indexOf(id) !== -1} />
              </ListItemIcon>
              <ListItemText {...itemProps} />
            </ListItem>
          )
        })}
      </List>
    )
  }
)
