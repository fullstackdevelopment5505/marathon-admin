import styled from 'styled-components'
import { Router } from '@reach/router'
import { Flexed } from '../Common/Flexed'

export const FlexedRouter = styled(Flexed(Router))`
  display: flex;

  > * {
    flex: 1;
  }
`
