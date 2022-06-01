import React from 'react'
import { IconModalExpandBg } from '../SvgIcons'
import { ExpandButtonText, ExpandButtonWrapper } from './styled'

interface Props {
  title: string
  width?: string | number
  onClick?: () => void
}

const ExpandButton: React.FC<Props> = ({ title, width, onClick }) => {
  return (
    <ExpandButtonWrapper width={width} onClick={onClick}>
      <IconModalExpandBg width="100%" />
      <ExpandButtonText>{title}</ExpandButtonText>
    </ExpandButtonWrapper>
  )
}

export default ExpandButton
