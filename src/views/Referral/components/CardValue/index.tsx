import React, { useEffect, useRef } from 'react'
import { useCountUp } from 'react-countup'

export interface CardValueProps {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  isCountUp?: boolean
}

const CardValue: React.FC<CardValueProps> = ({ value, decimals, prefix = '', suffix = '', isCountUp = false }) => {
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
      <>
        {prefix}
        0.000
        {suffix}
      </>
    )
  }

  return (
    <>
      {prefix}
      {!isCountUp ? value.toFixed(decimals) : typeof countUp === 'number' ? countUp.toFixed(decimals) : countUp}
      {suffix}
    </>
  )
}

export default CardValue
