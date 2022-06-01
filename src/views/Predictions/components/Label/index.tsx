import React, { useEffect, useRef } from 'react'
import { useCountUp } from 'react-countup'
import styled from 'styled-components'
import { BnbUsdtPairTokenIcon, Box, Flex, PocketWatchIcon, Text } from '@crosswise/uikit'
import { formatBigNumberToFixed } from 'utils/formatBalance'
import { useGetLastOraclePrice } from 'state/predictions/hooks'
import { useTranslation } from 'contexts/Localization'
import { formatRoundTime } from '../../helpers'
import useRoundCountdown from '../../hooks/useRoundCountdown'
import { Token, Title, Price, Interval, Label } from './styled'

export const PricePairLabel: React.FC = () => {
  const price = useGetLastOraclePrice()
  const priceAsNumber = parseFloat(formatBigNumberToFixed(price, 3, 8))
  const { countUp, update } = useCountUp({
    start: 0,
    end: priceAsNumber,
    duration: 1,
    decimals: 3,
  })

  const updateRef = useRef(update)

  useEffect(() => {
    updateRef.current(priceAsNumber)
  }, [priceAsNumber, updateRef])

  return (
    <Box pl="24px" position="relative" display="inline-block">
      <Token left={0}>
        <BnbUsdtPairTokenIcon />
      </Token>
      <Label dir="left">
        <Title bold textTransform="uppercase">
          BNBUSDT
        </Title>
        <Price fontSize="12px">{`$${countUp}`}</Price>
      </Label>
    </Box>
  )
}

interface TimerLabelProps {
  interval: string
  unit: 'm' | 'h' | 'd'
}

export const TimerLabel: React.FC<TimerLabelProps> = ({ interval, unit }) => {
  const seconds = useRoundCountdown()
  const countdown = formatRoundTime(seconds)
  const { t } = useTranslation()

  return (
    <Box pr="24px" position="relative">
      <Label dir="right">
        <Title bold color="secondary">
          {seconds === 0 ? t('Closing') : countdown}
        </Title>
        <Interval fontSize="12px">{`${interval}${t(unit)}`}</Interval>
      </Label>
      <Token right={0}>
        <PocketWatchIcon />
      </Token>
    </Box>
  )
}
