import React from 'react'
import { ArrowBackIcon, ArrowForwardIcon, BunnyCardsIcon, Flex, IconButton } from '@crosswise/uikit'
import { useGetCurrentEpoch, useGetSortedRounds } from 'state/predictions/hooks'
import useSwiper from '../../hooks/useSwiper'
import { StyledPrevNextNav, Icon } from './styled'

const PrevNextNav = () => {
  const { swiper } = useSwiper()
  const currentEpoch = useGetCurrentEpoch()
  const rounds = useGetSortedRounds()

  const handlePrevSlide = () => {
    swiper.slidePrev()
  }

  const handleNextSlide = () => {
    swiper.slideNext()
  }

  const handleSlideToLive = () => {
    const currentEpochIndex = rounds.findIndex((round) => round.epoch === currentEpoch)

    swiper.slideTo(currentEpochIndex - 1)
    swiper.update()
  }

  return (
    <StyledPrevNextNav>
      <IconButton variant="text" scale="sm" onClick={handlePrevSlide}>
        <ArrowBackIcon color="primary" width="24px" />
      </IconButton>
      <Icon onClick={handleSlideToLive}>
        <BunnyCardsIcon width="64px" />
      </Icon>
      <IconButton variant="text" scale="sm" onClick={handleNextSlide}>
        <ArrowForwardIcon color="primary" width="24px" />
      </IconButton>
    </StyledPrevNextNav>
  )
}

export default PrevNextNav
