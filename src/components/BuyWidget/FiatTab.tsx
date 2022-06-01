import React, { useState } from 'react'
import styled from 'styled-components'
import {
  // Text,
  Box,
  Button,
  Flex,
  BalanceInput,
  // UsdtTokenIcon,
  BscTokenIcon,
  UsdIcon,
  IconButton,
  ExpandableButton,
} from '@crosswise/uikit'
// import { useTranslation } from 'contexts/Localization'
import { IconRefresh, IconSetting } from 'components/SvgIcons'

export const IconButtonContainer = styled.div<{ marginLeft?: string }>`
  cursor: pointer;
  margin-left: ${({ marginLeft }) => marginLeft};
`

const FiatTab = () => {
  // const { t } = useTranslation()

  const [fromValue, setFromValue] = useState('0')
  const [toValue, setToValue] = useState('0')

  return (
    <>
      <Flex alignItems="center" my="16px">
        <ExpandableButton direction="left" />
        <IconButton variant="text" scale="sm" ml="auto">
          <IconSetting />
        </IconButton>
        <IconButton variant="text" scale="sm">
          <IconRefresh />
        </IconButton>
      </Flex>
      <Box>
        <BalanceInput
          onUserInput={setFromValue}
          value={fromValue}
          label="Amount"
          placeholder="0.0"
          unit="USD"
          unitIcon={<UsdIcon />}
        />

        <Box color="textSecondary" height="48px" />

        <BalanceInput
          onUserInput={setToValue}
          value={toValue}
          label="Received"
          placeholder="0.0"
          unit="BNB"
          unitIcon={<BscTokenIcon />}
        />
      </Box>
      <Button variant="primaryGradient" width="100%" my="40px">
        Buy Tokens
      </Button>
    </>
  )
}

export default FiatTab
