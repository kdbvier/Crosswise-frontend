import React from 'react'
import { Text } from '@crosswise/uikit'
import { useThemeManager } from 'state/user/hooks'
import { MultiplierTagContainer, MultiplierTagContent } from './styled'

interface MultiplierTagProps {
  multiValue: string
  className?: string
}

const MultiplierTag: React.FC<MultiplierTagProps> = (props) => {
  const { multiValue, className } = props
  const [isDark] = useThemeManager()

  return (
    <MultiplierTagContainer className={className}>
      <MultiplierTagContent isDarkTheme={isDark}>
        <Text fontSize="11px" fontWeight="600" color={isDark ? '#ffffff' : 'primaryGray'}>
          {multiValue}
        </Text>
      </MultiplierTagContent>
    </MultiplierTagContainer>
  )
}

export default MultiplierTag
