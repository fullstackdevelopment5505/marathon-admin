import React from 'react'

export function StyledPage({ children, style }:any) {
  return (
    <div className='page' style={{ ...style, padding: '3em 5em' }}>
      {children}
    </div>
  )
}
