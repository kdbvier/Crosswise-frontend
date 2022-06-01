import React, { useState } from 'react'
import { ExpandableLabel, Flex, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { FoldableTextProps } from './interfaces'
import { Wrapper, StyledExpandableLabelWrapper, StyledChildrenFlex } from './styled'

const FoldableText: React.FC<FoldableTextProps> = ({ title, children, ...props }) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Wrapper {...props} flexDirection="column" onClick={() => setIsExpanded(!isExpanded)}>
      <Flex justifyContent="space-between" alignItems="center" pb="16px">
        <Text fontWeight="bold">{title}</Text>
        <StyledExpandableLabelWrapper>
          <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? t('Hide') : t('Details')}
          </ExpandableLabel>
        </StyledExpandableLabelWrapper>
      </Flex>
      <StyledChildrenFlex isExpanded={isExpanded} flexDirection="column">
        {children}
      </StyledChildrenFlex>
    </Wrapper>
  )
}

export default FoldableText
