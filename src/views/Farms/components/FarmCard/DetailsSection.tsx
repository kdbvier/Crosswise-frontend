import React, { useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import { Text, Flex, Skeleton } from '@crosswise/uikit'
import {
  StyledLinkExternal,
  DetailsContentWrapper as ContentWrapper,
  DetailSectionWrapper as Wrapper,
  DropDownIcon as Icon,
} from './styled'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  infoAddress?: string
  removed?: boolean
  totalValueFormatted?: string
  lpLabel?: string
  addLiquidityUrl?: string
}

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  infoAddress,
  removed,
  totalValueFormatted,
  lpLabel,
  addLiquidityUrl,
}) => {
  const [expanded, setExpanded] = useState(false)
  const { t } = useTranslation()

  return (
    <Wrapper expanded={expanded}>
      <Icon onClick={() => setExpanded(false)} />

      <ContentWrapper>
        <Flex justifyContent="space-between">
          <Text fontSize="20px" bold>
            {t('Total Liquidity')}
          </Text>
          {totalValueFormatted ? (
            <Text fontSize="20px" bold>
              {totalValueFormatted}
            </Text>
          ) : (
            <Skeleton width={75} height={30} />
          )}
        </Flex>
        {!removed && (
          <StyledLinkExternal href={addLiquidityUrl}>{t('Get %symbol%', { symbol: lpLabel })}</StyledLinkExternal>
        )}
        <StyledLinkExternal href={bscScanAddress}>{t('View Contract')}</StyledLinkExternal>
        <StyledLinkExternal href={infoAddress}>{t('See Pair Info')}</StyledLinkExternal>
      </ContentWrapper>
    </Wrapper>
  )
}

export default DetailsSection
