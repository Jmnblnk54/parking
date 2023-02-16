import React from 'react'
import { Wrapper } from './BaseLayout.styled'

export default function BaseLayout({ children }) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}
