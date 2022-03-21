import React, { memo } from 'react'
import Fade from '@material-ui/core/Fade'
import LinearProgress from '@material-ui/core/LinearProgress'

export const DelayedProgress = memo(({ loading }:any) => (
  <Fade
    in={loading}
    style={{ transitionDelay: loading ? '200ms' : '0ms' }}
    unmountOnExit
    children={<LinearProgress variant="query" />}
  />
))
