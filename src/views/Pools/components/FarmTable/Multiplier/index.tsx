import React from 'react'
// import { Skeleton, useTooltip } from '@crosswise/uikit'
import { Skeleton } from '@crosswise/uikit'
// import { useTranslation } from 'contexts/Localization'
// import MultiplierTag from 'components/MultiplierTag'
// import { MultiplierWrapper, Container } from './styled'
import { StyledMultiplierTag as MultiplierTag } from './styled'

export interface MultiplierProps {
  multiplier: string
}

const Multiplier: React.FunctionComponent<MultiplierProps> = ({ multiplier }) => {
  // const displayMultiplier = multiplier ? multiplier.toLowerCase() : <Skeleton width={30} />
  // const { t } = useTranslation()
  // const tooltipContent = (
  //   <>
  //     {t('The multiplier represents the amount of CRSS rewards each farm gets.')}
  //     <br />
  //     <br />
  //     {t('For example, if a 1x farm was getting 1 CRSS per block, a 30x farm would be getting 30 CRSS per block.')}
  //   </>
  // )
  // const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, {
  //   placement: 'top-end',
  //   tooltipOffset: [20, 10],
  // })

  return (
    // <Container ref={targetRef}>
    // <Container>
    //   <MultiplierWrapper>{displayMultiplier}</MultiplierWrapper>
    //   {/* {tooltipVisible && tooltip} */}
    // </Container>
    multiplier ? <MultiplierTag multiValue={multiplier.toLowerCase()} /> : <Skeleton width={30} />
  )
}

export default Multiplier
