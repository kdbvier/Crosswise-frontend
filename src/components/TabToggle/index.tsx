import React from 'react'
import { TabToggleGroupProps } from './interfaces'
import { Wrapper, Inner } from './styled'

export { TabToggle } from './styled'

export const TabToggleGroup: React.FC<TabToggleGroupProps> = ({ children }) => {
  return (
    <Wrapper p={['0 4px', '0 16px']}>
      <Inner>{children}</Inner>
    </Wrapper>
  )
}
