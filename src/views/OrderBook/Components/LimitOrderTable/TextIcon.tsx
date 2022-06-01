import React from 'react'
import { ReactElement } from 'react-markdown'
import { Flex, Text } from '@crosswise/uikit'

interface TextIconProps {
  text: string
  bold?: boolean
  icon: ReactElement
}

const TextIcon: React.FC<TextIconProps> = ({ icon, text, bold = false }) => {
  return (
    <Flex alignItems="center">
      <Text color="text" mr="8px" bold={bold} textTransform="uppercase">
        {text}
      </Text>
      {icon}
    </Flex>
  )
}

export default TextIcon
