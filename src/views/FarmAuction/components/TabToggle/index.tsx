import React from 'react'
import { Wrapper, Inner } from './styled'

interface TabToggleGroupProps {
  children: React.ReactElement[]
}

// There is very similar component on Info site, once we migrate it we can refactor them and put into UIKit.
// UIKit has TabMenu component which is kinda similar but quite different in visuals and usage.
export const TabToggleGroup: React.FC<TabToggleGroupProps> = ({ children }) => {
  return (
    <Wrapper p={['0 4px', '0 16px']}>
      <Inner>{children}</Inner>
    </Wrapper>
  )
}
