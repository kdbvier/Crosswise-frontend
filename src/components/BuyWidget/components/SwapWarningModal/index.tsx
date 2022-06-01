import React, { useEffect } from 'react'
// import { Modal, Box, Heading } from '@crosswise/uikit'
import { Modal, Box } from '@crosswise/uikit'
// import useTheme from 'hooks/useTheme'
import { getAddress } from 'utils/addressHelpers'
import { useTranslation } from 'contexts/Localization'
import { WrappedTokenInfo } from 'state/lists/hooks'
import SwapWarningTokensConfig from 'config/constants/swapWarningTokens'
import SafemoonWarning from './SafemoonWarning'
import BondlyWarning from './BondlyWarning'
import Acknowledgement from './Acknowledgement'
// import { StyledModalContainer, MessageContainer } from './styled'
import { MessageContainer } from './styled'

interface SwapWarningModalProps {
  swapCurrency: WrappedTokenInfo
  onDismiss?: () => void
}

// Modal is fired by a useEffect and doesn't respond to closeOnOverlayClick prop being set to false
const usePreventModalOverlayClick = () => {
  useEffect(() => {
    const preventClickHandler = (e) => {
      e.stopPropagation()
      e.preventDefault()
      return false
    }

    document.querySelectorAll('[role="presentation"]').forEach((el) => {
      el.addEventListener('click', preventClickHandler, true)
    })

    return () => {
      document.querySelectorAll('[role="presentation"]').forEach((el) => {
        el.removeEventListener('click', preventClickHandler, true)
      })
    }
  }, [])
}

const SwapWarningModal: React.FC<SwapWarningModalProps> = ({ swapCurrency, onDismiss }) => {
  const { t } = useTranslation()
  // const { theme } = useTheme()
  usePreventModalOverlayClick()

  const TOKEN_WARNINGS = {
    [getAddress(SwapWarningTokensConfig.safemoon.address)]: {
      symbol: SwapWarningTokensConfig.safemoon.symbol,
      component: <SafemoonWarning />,
    },
    [getAddress(SwapWarningTokensConfig.bondly.address)]: {
      symbol: SwapWarningTokensConfig.bondly.symbol,
      component: <BondlyWarning />,
    },
  }

  const SWAP_WARNING = TOKEN_WARNINGS[swapCurrency.address]

  return (
    <Modal
      title={t('Notice for trading %symbol%', { symbol: SWAP_WARNING.symbol })}
      minWidth="280px"
      onDismiss={onDismiss}
    >
      <MessageContainer variant="warning" mb="24px">
        <Box>{SWAP_WARNING.component}</Box>
      </MessageContainer>
      <Acknowledgement handleContinueClick={onDismiss} />
    </Modal>
  )
}

export default SwapWarningModal
