import React from 'react'
import { Modal, Text, Image, Button, Link, OpenNewIcon } from '@crosswise/uikit'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { Token } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'

interface Props {
  currency: Token
  onDismiss?: () => void
}

const GetLpModal: React.FC<Partial<Props>> = ({ currency, onDismiss }) => {
  const { t } = useTranslation()
  return (
    <Modal title={t('LP Tokens required')} maxWidth="288px" onDismiss={onDismiss}>
      <Image
        src={`/images/farms/${currency.symbol.split(' ')[0].toLocaleLowerCase()}.svg`}
        width={72}
        height={72}
        margin="auto"
        mb="24px"
      />
      <Text mb="16px">{t('You’ll need CAKE-BNB LP tokens to participate in the IFO!')}</Text>
      <Text mb="24px">{t('Get LP tokens, or make sure your tokens aren’t staked somewhere else.')}</Text>
      <Button
        as={Link}
        external
        href={`${BASE_ADD_LIQUIDITY_URL}/BNB/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82`}
        endIcon={<OpenNewIcon color="white" />}
        minWidth="100%" // Bypass the width="fit-content" on Links
      >
        {t('Get LP tokens')}
      </Button>
    </Modal>
  )
}

export default GetLpModal
