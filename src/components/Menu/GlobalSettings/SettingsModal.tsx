import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { Box, Text, Toggle, Flex, InjectedModalProps, ChartLIcon } from '@crosswise/uikit'
import { useAudioModeManager, useExpertModeManager, useUserSingleHopOnly } from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
import { useSwapActionHandlers } from 'state/swap/hooks'
import usePersistState from 'hooks/usePersistState'
// import QuestionHelper from '../../QuestionHelper'
import TransactionSettings from './TransactionSettings'
import ExpertModal from './ExpertModal'
import { CrosswiseToggleWrapper, StyledModal, Divider } from './styled'

const SettingsModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const { isDark } = useTheme()
  const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  const [rememberExpertModeAcknowledgement, setRememberExpertModeAcknowledgement] = usePersistState(false, {
    localStorageKey: 'pancake_expert_mode_remember_acknowledgement',
  })
  const [expertMode, toggleExpertMode] = useExpertModeManager()
  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly()
  const [audioPlay, toggleSetAudioMode] = useAudioModeManager()
  const { onChangeRecipient } = useSwapActionHandlers()

  const { t } = useTranslation()

  if (showConfirmExpertModal) {
    return (
      <ExpertModal
        setShowConfirmExpertModal={setShowConfirmExpertModal}
        onDismiss={onDismiss}
        setRememberExpertModeAcknowledgement={setRememberExpertModeAcknowledgement}
      />
    )
  }

  const handleExpertModeToggle = () => {
    if (expertMode) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else if (rememberExpertModeAcknowledgement) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else {
      setShowConfirmExpertModal(true)
    }
  }

  return (
    <StyledModal title=" " onDismiss={onDismiss} style={{ width: '346px' }} noPadding>
      <Flex px="25px" pt="8px" pb="12px" alignItems="center">
        <Text
          fontSize="10px"
          fontWeight="600"
          color="primaryGray"
          letterSpacing="0.04em"
          textTransform="uppercase"
          mr="4px"
        >
          {t('Transaction Settings')}
        </Text>
        <ChartLIcon color={isDark ? 'contrast' : 'primary'} />
      </Flex>
      <Divider />
      <Flex flexDirection="column" pb="30px">
        {/* <Flex flexDirection="column">
          <Text bold textTransform="uppercase" fontSize="12px" color="secondary" mb="24px">
            {t('Swaps & Liquidity')}
          </Text>
        </Flex> */}
        <TransactionSettings />
        <Divider />
        <Box px="25px" py="20px">
          <Flex justifyContent="flex-end" alignItems="center" mb="16px">
            <Text fontSize="10px" color="text" fontWeight="600" textTransform="uppercase" mr="2">
              {t('Expert Mode')}
            </Text>
            <Toggle id="toggle-expert-mode-button" scale="sm" checked={expertMode} onChange={handleExpertModeToggle} />
          </Flex>
          <Flex justifyContent="flex-end" alignItems="center" mb="16px">
            <Text fontSize="10px" color="text" fontWeight="600" textTransform="uppercase" mr="2">
              {t('Disable Multihops')}
            </Text>
            <Toggle
              id="toggle-disable-multihop-button"
              checked={singleHopOnly}
              scale="sm"
              onChange={() => {
                setSingleHopOnly(!singleHopOnly)
              }}
            />
          </Flex>
          <Flex justifyContent="flex-end" alignItems="center">
            <Text fontSize="10px" color="text" fontWeight="600" textTransform="uppercase" mr="2">
              {t('Audio')}
            </Text>
            <CrosswiseToggleWrapper>
              <Toggle checked={audioPlay} onChange={toggleSetAudioMode} scale="sm" />
            </CrosswiseToggleWrapper>
          </Flex>
        </Box>
        <Divider />
      </Flex>
    </StyledModal>
  )
}

export default SettingsModal
