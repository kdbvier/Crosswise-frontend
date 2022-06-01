import React from 'react'
import { Flex, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { ORDER_CATEGORY } from '../../types'

import { CrosswisePlaceholderIcon } from './styled'

const NoOrdersMessage: React.FC<{ orderCategory: ORDER_CATEGORY }> = ({ orderCategory }) => {
  const { t } = useTranslation()

  return (
    <Flex p="24px" justifyContent="center" alignItems="center" flexDirection="column">
      <CrosswisePlaceholderIcon />
      <Text>
        {orderCategory === ORDER_CATEGORY.Open
          ? t("It looks like you haven't got any Open Orders")
          : t("It looks like you haven't got any Orders History")}
      </Text>
    </Flex>
  )
}

export default NoOrdersMessage
