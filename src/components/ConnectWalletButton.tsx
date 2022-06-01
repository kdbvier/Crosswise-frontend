import React from 'react'
import { Button, useWalletModal } from '@crosswise/uikit'
import useAuth from 'hooks/useAuth'

const ConnectWalletButton = (props) => {
  const { btnString } = props
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation()
        onPresentConnectModal()
      }}
      {...props}
    >
      {!btnString ? 'Connect' : btnString}
    </Button>
  )
}

export default ConnectWalletButton
