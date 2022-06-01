import React from 'react'
import { Card, Radio } from '@crosswise/uikit'
import { Label, Body, Children, StyledBackgroundImage } from './styled'

interface SelectionCardProps {
  name: string
  value: string | number
  isChecked?: boolean
  onChange: (val: any) => void
  image: string
  disabled?: boolean
}

const SelectionCard: React.FC<SelectionCardProps> = ({
  name,
  value,
  isChecked = false,
  image,
  onChange,
  disabled,
  children,
  ...props
}) => {
  return (
    <Card isSuccess={isChecked} isDisabled={disabled} mb="16px" {...props}>
      <Label isDisabled={disabled}>
        <Body>
          <Radio
            name={name}
            checked={isChecked}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            style={{ flex: 'none' }}
          />
          <Children>{children}</Children>
        </Body>
        <StyledBackgroundImage src={image} />
      </Label>
    </Card>
  )
}

export default SelectionCard
