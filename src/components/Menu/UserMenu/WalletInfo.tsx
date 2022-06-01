import React from 'react'
import { Box, Button, Flex, LinkExternal, Message, Text } from '@crosswise/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance, { useGetBnbBalance } from 'hooks/useTokenBalance'
import { getCrssAddress } from 'utils/addressHelpers'
import useAuth from 'hooks/useAuth'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'
import { getBscScanLink } from 'utils'
import { getFullDisplayBalance } from 'utils/formatBalance'
import CopyAddress from './CopyAddress'
import { IconLinkTo } from '../../SvgIcons'
import { WalletInfoProps } from './interfaces'

const WalletInfo: React.FC<WalletInfoProps> = ({ hasLowBnbBalance, onDismiss }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { balance } = useGetBnbBalance()
  const { balance: crssBalance } = useTokenBalance(getCrssAddress())
  const { logout } = useAuth()
  const { theme } = useTheme()

  const handleLogout = () => {
    onDismiss()
    logout()
  }

  return (
    <>
      <Text color="primaryGray" fontSize="12px" textTransform="uppercase" fontWeight="bold" mb="8px">
        {t('Your Address')}
      </Text>
      <CopyAddress account={account} mb="24px" />
      {hasLowBnbBalance && (
        <Message variant="warning" mb="24px">
          <Box>
            <Text fontWeight="bold">{t('BNB Balance Low')}</Text>
            <Text as="p">{t('You need BNB for transaction fees.')}</Text>
          </Box>
        </Message>
      )}
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="success">{t('BNB Balance')}</Text>
        <Text color="primaryGray">{getFullDisplayBalance(balance, 18, 6)}</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="24px">
        <Text color="success">{t('CRSS Balance')}</Text>
        <Text color="primaryGray">{getFullDisplayBalance(crssBalance, 18, 3)}</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="24px">
        <Text fontSize="13px" color="contrast" mr="8px">
          {t('View on BscScan')}
        </Text>
        <a href={getBscScanLink(account, 'address')} target="_blank" rel="noreferrer">
          <IconLinkTo />
        </a>
      </Flex>
      <Button variant={theme.isDark ? 'primaryGradient' : 'secondaryGradient'} width="100%" onClick={handleLogout}>
        {t('Disconnect Wallet')}
      </Button>
    </>
  )
}

export default WalletInfo
