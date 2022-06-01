import React from 'react'
import { Button, useWalletModal } from '@crosswise/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const ConnectWalletButton = (props) => {
  const { btnString } = props
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button
      onClick={() => {
        onPresentConnectModal()
      }}
      {...props}
    >
      {!btnString ? 'Connect' : btnString}
    </Button>
  )
}

export default ConnectWalletButton
