import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal, Box, Text, Flex, Input, OpenNewIcon, useMatchBreakpoints, Spinner } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { FarmAuctionBidderConfig } from 'config/constants/types'
import truncateWalletAddress from 'utils/truncateWalletAddress'
import useWhitelistedAddresses from '../../hooks/useWhitelistedAddresses'
import { StyledModal, InputContainer, AddressRowContainer } from './styled'

interface WhitelistedBiddersModalProps {
  onDismiss?: () => void
}

const AddressRow: React.FC<{ bidder: FarmAuctionBidderConfig; isMobile: boolean }> = ({ bidder, isMobile }) => {
  const { farmName, tokenName, account, projectSite } = bidder
  return (
    <a href={projectSite} target="_blank" rel="noopener noreferrer">
      <AddressRowContainer>
        <Flex flexDirection="column" flex="3">
          <Text>{farmName}</Text>
          <Text fontSize="12px" color="textSubtle">
            {tokenName}
          </Text>
        </Flex>
        <Flex justifyContent={['center', null, 'flex-start']} alignItems="center" flex="6">
          <Text mr="8px">{isMobile ? truncateWalletAddress(account) : account}</Text>
        </Flex>
        <OpenNewIcon color="primary" />
      </AddressRowContainer>
    </a>
  )
}

const WhitelistedBiddersModal: React.FC<WhitelistedBiddersModalProps> = ({ onDismiss }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { isXs, isSm } = useMatchBreakpoints()
  const bidders = useWhitelistedAddresses()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredBiders = bidders
    ? bidders.filter(
        ({ farmName, tokenName, account }) =>
          farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tokenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : []

  const modalContent = bidders ? (
    filteredBiders.map((bidder) => <AddressRow key={bidder.account} bidder={bidder} isMobile={isXs || isSm} />)
  ) : (
    <Flex justifyContent="center" alignItems="center" py="24px">
      <Spinner />
    </Flex>
  )

  return (
    <StyledModal
      p="0"
      title={t('All Whitelisted Project Wallets')}
      onDismiss={onDismiss}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      <InputContainer py="16px" px="24px">
        <Input placeholder={t('Search address or token')} value={searchTerm} onChange={handleSearchChange} />
      </InputContainer>

      <Box pb="24px" overflow="scroll" maxHeight="245px">
        {modalContent}
      </Box>
    </StyledModal>
  )
}

export default WhitelistedBiddersModal
