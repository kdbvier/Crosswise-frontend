import React from 'react'
import { ChevronDownIcon, ChevronUpIcon, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { ExpandableSectionButtonProps } from './interfaces'
import { Wrapper } from './styled'

const ExpandableSectionButton: React.FC<ExpandableSectionButtonProps> = ({ onClick, expanded }) => {
  const { t } = useTranslation()

  return (
    <Wrapper aria-label={t('Hide or show expandable content')} role="button" onClick={() => onClick()}>
      <Text color="textSecondary">{expanded ? t('HIDE DETAILS') : t('MORE DETAILS')}</Text>
      {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </Wrapper>
  )
}

ExpandableSectionButton.defaultProps = {
  expanded: false,
}

export default ExpandableSectionButton
