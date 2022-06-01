import React from 'react'
import { Text, TextProps } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { TranslatableText as AchievementDescriptionType } from 'state/types'
import { Description } from './styled'

interface AchievementDescriptionProps extends TextProps {
  description?: AchievementDescriptionType
}

const AchievementDescription: React.FC<AchievementDescriptionProps> = ({ description, ...props }) => {
  const { t } = useTranslation()

  if (!description) {
    return null
  }

  if (typeof description === 'string') {
    return (
      <Text as="p" color="textSubtle" fontSize="14px" {...props}>
        {description}
      </Text>
    )
  }

  const { key, data = {} } = description

  return (
    <Description color="textSubtle" {...props}>
      {t(key, data)}
    </Description>
  )
}

export default AchievementDescription
