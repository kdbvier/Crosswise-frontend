import React from 'react'
import { Label, ContentContainer } from './styled'

interface CellLayoutProps {
  label?: string
  textAlign?: string
}

const CellLayout: React.FC<CellLayoutProps> = ({ label = '', children, textAlign = 'left' }) => {
  return (
    <div>
      {label && <Label textAlign={textAlign}>{label}</Label>}
      <ContentContainer>{children}</ContentContainer>
    </div>
  )
}

export default CellLayout
