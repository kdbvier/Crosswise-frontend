import React from 'react'
import { Flex } from '@crosswise/uikit'
import { Token } from 'config/constants/types'
import { TokenPairImage } from 'components/TokenImage'
// import MultiplierTag from 'components/MultiplierTag'
import { Wrapper, StyledMultiplierTag as MultiplierTag, StyledHeading } from './styled'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  token: Token
  quoteToken: Token
  onClick: React.MouseEventHandler<HTMLDivElement>
}

const CardHeading: React.FC<ExpandableSectionProps> = ({ lpLabel, multiplier, token, quoteToken, onClick }) => {
  return (
    <>
      <Wrapper onClick={onClick} justifyContent="flex-start" alignItems="center" mb="12px">
        <TokenPairImage
          style={{ width: '66px' }}
          primaryToken={token}
          secondaryToken={quoteToken}
          width={44}
          height={44}
        />
        <Flex flexDirection="column" alignItems="flex-end" ml="10px" mr="10px">
          <StyledHeading>{lpLabel.split(' ')[0]}</StyledHeading>
        </Flex>
        {/* <MultiplierTag variant="success">{multiplier}</MultiplierTag> */}
        <MultiplierTag multiValue={multiplier} />
      </Wrapper>
    </>
  )
}

export default CardHeading
