import React from 'react'
import { SectionProps } from '../../../types'
import { BackgroundColorWrapper, ChildrenWrapper } from './styled'

const Section: React.FC<SectionProps> = ({ children, backgroundStyle = '#faf9fa' }) => {
  return (
    <BackgroundColorWrapper backgroundStyle={backgroundStyle}>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </BackgroundColorWrapper>
  )
}

export default Section
