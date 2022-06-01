import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal, Box, Text, Flex, Input, OpenNewIcon, useMatchBreakpoints, Spinner } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { FarmAuctionBidderConfig } from 'config/constants/types'
import truncateWalletAddress from 'utils/truncateWalletAddress'
import useWhitelistedAddresses from '../../hooks/useWhitelistedAddresses'

export const StyledModal = styled(Modal)`
  & > div:nth-child(2) {
    padding: 0;
  }
`

export const InputContainer = styled(Flex)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

export const AddressRowContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 5fr 0.5fr;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 8px 24px;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`
