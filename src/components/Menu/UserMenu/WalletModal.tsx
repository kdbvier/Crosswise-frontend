import React, { useState } from 'react'
// import { ButtonMenu, ButtonMenuItem, Heading, IconButton, Modal } from '@crosswise/uikit'
import { ButtonMenu, ButtonMenuItem, Flex, Modal, Text, Button } from '@crosswise/uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { FetchStatus, useGetBnbBalance } from 'hooks/useTokenBalance'
import useTheme from 'hooks/useTheme'
import WalletInfo from './WalletInfo'
import WalletTransactions from './WalletTransactions'
import { WalletView } from './enums'
import { WalletModalProps } from './interfaces'
import { IconWallet } from '../../SvgIcons'
import { Tabs, WalletModalBody, StyledIconWallet } from './styled'

export const LOW_BNB_BALANCE = new BigNumber('2000000000') // 2 Gwei

const WalletModal: React.FC<WalletModalProps> = ({ initialView = WalletView.WALLET_INFO, onDismiss }) => {
  const [view, setView] = useState(initialView)
  const { t } = useTranslation()
  const { balance, fetchStatus } = useGetBnbBalance()
  const { theme } = useTheme()
  const hasLowBnbBalance = fetchStatus === FetchStatus.SUCCESS && balance.lte(LOW_BNB_BALANCE)

  const handleClickWalletInfo = () => {
    setView(WalletView.WALLET_INFO)
  }

  const handleClickTransactions = () => {
    setView(WalletView.TRANSACTIONS)
  }

  return (
    <Modal
      title={t('Your Wallet')}
      icon={<StyledIconWallet />}
      minWidth="320px"
      maxWidth="400px"
      width="100%"
      onDismiss={onDismiss}
    >
      <Flex mt="24px">
        <Button
          variant={
            view === WalletView.WALLET_INFO
              ? theme.isDark
                ? 'primaryGradient'
                : 'secondaryGradient'
              : 'primaryGradientOutline'
          }
          onClick={handleClickWalletInfo}
          width="100%"
          mr="16px"
        >
          {t('Wallet')}
        </Button>
        <Button
          variant={
            view === WalletView.TRANSACTIONS
              ? theme.isDark
                ? 'primaryGradient'
                : 'secondaryGradient'
              : 'primaryGradientOutline'
          }
          onClick={handleClickTransactions}
          width="100%"
        >
          {t('Transactions')}
        </Button>
      </Flex>
      <WalletModalBody>
        {view === WalletView.WALLET_INFO && <WalletInfo hasLowBnbBalance={hasLowBnbBalance} onDismiss={onDismiss} />}
        {view === WalletView.TRANSACTIONS && <WalletTransactions />}
      </WalletModalBody>
    </Modal>
  )
}

export default WalletModal
