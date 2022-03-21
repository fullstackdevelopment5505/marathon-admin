import React from 'react'
import styled from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip'

const StyledIconButton = styled.span<{
  disabled?: boolean;
  active?: boolean;
  activeColor?: string;
  scaleOnHover?: boolean;
  hoverColor?: string;
  customStyle?: string;
}>`
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  color: ${props => props.active ? props.activeColor : props.color};
  text-transform: titlecase;

  &:hover {
    transform: scale(${props => props.scaleOnHover ? '1.03' : '1'});
    ${props => (props.hoverColor && !props.active && !props.disabled) ? `color: ${props.hoverColor};` : ''}
  }

  ${props => props.customStyle}
`
const StyledIconWithText = styled.span`
  display: flex;
  align-items: center;
  line-height: 1em;
  > *:first-child {
    margin-right: 0.2em;
  }
`
export const IconButton = ({
  icon = undefined,
  iconActive = icon,
  iconDisabled = icon,
  disabled = false,
  active = false,
  onClick = () => {},
  color = '',
  activeColor = '#fb7e23',
  hoverColor = undefined,
  tooltip = undefined,
  tooltipActive = tooltip,
  children,
  customStyle = '',
  scaleOnHover = false,
  visible = true,
  ...props
}) => {
  const Icon = icon;
  const IconActive = iconActive;

  let content:any;

  if (active && iconActive) {
    content = <IconActive fontSize="small" />
  }

  if (!active && icon) {
    content =  <Icon fontSize="small" />
  }

  if (children) {
    content = <StyledIconWithText>{ content }<span>{ children }</span></StyledIconWithText>
  }

  if (tooltip) {
    content = <Tooltip enterDelay={500} title={active ? tooltipActive : tooltip}>{ content }</Tooltip>
  }

  if (!visible) {
    return null
  }

  return (
    <StyledIconButton
      active={active}
      onClick={e => { e.preventDefault(); onClick() }}
      customStyle={customStyle}
      color={color}
      activeColor={activeColor}
      scaleOnHover={scaleOnHover}
      hoverColor={hoverColor}
      disabled={disabled}
    >
      { content }
    </StyledIconButton>
  )
}