import styled from 'styled-components'

// takes a component and returns a "flexed" component that fills its flexed container (display flex, with flex 1)
export const Flexed = (component) => styled(component)`
  display: flex;
  flex: 1;
  width: 100%;
`
