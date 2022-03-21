import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import useStore from 'use-store'
import { green } from '@material-ui/core/colors'
import { orange } from '@material-ui/core/colors'
import { makeStyles, Theme } from '@material-ui/core/styles';

export const EventConfig = (eventConfigOptions) => {
  const [theme] = useStore('theme')
  const useStyles = makeStyles<Theme>((theme) => ({
    icon: {
      position: 'relative',
      top: theme.spacing(0.3),
      right: theme.spacing(0.6),
      width: theme.typography.h6.fontSize,
      height: theme.typography.h6.fontSize,
    }
  }))


  const classes = useStyles(theme)

  const {
    isActivated,
  } = eventConfigOptions;

  return (
    <Tooltip title={isActivated ? 'True' : 'False'}>
      <Typography
        variant="body2"
      >
        {
          (isActivated ?
            <CheckCircleIcon
              className={classes.icon}
              style={{ color: green[500] }}
            />
            :
            <ErrorIcon
              className={classes.icon}
              style={{ color: orange[500] }}
            />
          )
        }
      </Typography>
    </Tooltip>
  )
}
