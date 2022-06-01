import React from 'react'
import { useWeb3React } from '@web3-react/core'
// import { useTranslation } from 'contexts/Localization'
import CopyToClipboard from '../CopyToClipboard'
import { Block, LinkLabel } from './styled'

const GetReferralLinkCard = () => {
  const { account } = useWeb3React()
  // const { t } = useTranslation()

  const toCopy = account
  const copyText = window.btoa(toCopy)

  return (
    <Block>
      <LinkLabel>{`${window.location.protocol}//${window.location.host}/farms/?ref=${copyText}`}</LinkLabel>
      <CopyToClipboard toCopy={`${window.location.protocol}//${window.location.host}/farms/?ref=${copyText}`}>
        Copy
      </CopyToClipboard>
    </Block>
  )
}

export default GetReferralLinkCard
