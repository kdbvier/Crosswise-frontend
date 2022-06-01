import React, { useEffect, useRef } from 'react'
import { useCountUp } from 'react-countup'
import { StyledText } from './styled'

export interface CardValueProps {
  value: number
  decimals?: number
  fontSize?: string
  lineHeight?: string
  prefix?: string
  bold?: boolean
  small?: boolean
  color?: string
  opacity?: string
  suffix?: string
  isCountUp?: boolean
}

const CardValue: React.FC<CardValueProps> = ({
  value,
  decimals,
  fontSize = '20px',
  prefix = '',
  bold = false,
  small = false,
  color = 'text',
  opacity = '1',
  suffix = '',
  isCountUp = false,
}) => {
  const { countUp, update } = useCountUp({
    start: 0,
    end: value,
    duration: 1,
    separator: ',',
    decimals:
      // eslint-disable-next-line no-nested-ternary
      decimals !== undefined ? decimals : value < 0 ? 4 : value > 1e5 ? 0 : 3,
  })

  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(value)
  }, [value, updateValue])

  if (!value) {
    return (
      <StyledText bold={bold} small={small} fontSize={fontSize} color={color} opacity={opacity}>
        {prefix}
        {0}
        {suffix}
      </StyledText>
    )
  }

  return (
    <StyledText bold={bold} small={small} fontSize={fontSize} color={color} opacity={opacity}>
      {prefix}
      {!isCountUp ? value.toFixed(decimals) : typeof countUp === 'number' ? countUp.toFixed(decimals) : countUp}
      {suffix}
    </StyledText>
  )
}

export default CardValue
