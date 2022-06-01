import React, { useState } from 'react'
import { Modal, Text, Button, Flex, InjectedModalProps, Checkbox, ModalTitle, Heading, Box } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { GradientModalHeader } from './styled'

interface RiskDisclaimerProps extends InjectedModalProps {
  onSuccess: () => void
}

const RiskDisclaimer: React.FC<RiskDisclaimerProps> = ({ onSuccess, onDismiss }) => {
  const [acknowledgeRisk, setAcknowledgeRisk] = useState(false)
  const [acknowledgeBeta, setAcknowledgeBeta] = useState(false)
  const { t } = useTranslation()

  const handleSetAcknowledgeRisk = () => {
    setAcknowledgeRisk(!acknowledgeRisk)
  }

  const handleSetAcknowledgeBeta = () => {
    setAcknowledgeBeta(!acknowledgeBeta)
  }

  const handleConfirm = () => {
    onSuccess()
    onDismiss()
  }

  return (
    <Modal title={t('Welcome!')} minWidth="320px" maxWidth="400px" hideCloseButton onDismiss={onDismiss}>
      <Box maxHeight="300px" overflowY="auto">
        <Heading as="h3" mb="24px">
          {t('This Product is in beta.')}
        </Heading>

        <Text as="p" color="textSubtle" mb="24px">
          {t('Once you enter a position, you cannot cancel or adjust it.')}
        </Text>

        <label htmlFor="checkbox" style={{ display: 'block', cursor: 'pointer', marginBottom: '24px' }}>
          <Flex alignItems="center">
            <div style={{ flex: 'none' }}>
              <Checkbox id="checkbox" scale="sm" checked={acknowledgeRisk} onChange={handleSetAcknowledgeRisk} />
            </div>
            <Text ml="8px">
              {t(
                'I understand that I am using this product at my own risk. Any losses incurred due to my actions are my own responsibility.',
              )}
            </Text>
          </Flex>
        </label>
        <label htmlFor="checkbox1" style={{ display: 'block', cursor: 'pointer', marginBottom: '24px' }}>
          <Flex alignItems="center">
            <div style={{ flex: 'none' }}>
              <Checkbox id="checkbox1" scale="sm" checked={acknowledgeBeta} onChange={handleSetAcknowledgeBeta} />
            </div>
            <Text ml="8px">
              {t('I understand that this product is still in beta. I am participating at my own risk')}
            </Text>
          </Flex>
        </label>
      </Box>
      <Button width="100%" onClick={handleConfirm} disabled={!acknowledgeRisk || !acknowledgeBeta}>
        {t('Continue')}
      </Button>
    </Modal>
  )
}

export default RiskDisclaimer
