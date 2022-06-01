import React, { useCallback, useEffect, useMemo, useState, lazy } from 'react'
import { Box, Flex, Text } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { useCurrency, useAllTokens } from 'hooks/Tokens'
import { CurrencyLogo, DoubleCurrencyLogo } from 'components/Logo'

export default function TokenInfo({ token }) {
  const { t } = useTranslation()

  const currency = useCurrency(token)

  return (
    <Flex alignItems="center">
      <Box marginRight="8px">
        <CurrencyLogo currency={currency} />
      </Box>
      <Text fontSize="17px" lineHeight="21px" fontWeight="bold">
        {token}
      </Text>
    </Flex>
  )
}
