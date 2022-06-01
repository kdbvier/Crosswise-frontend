import React, { useState, useMemo } from 'react'
import { Box, IconButton } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { CopyAddressProps } from './interfaces'
import { IconCopyGradient, IconCopy } from '../../SvgIcons'
import { Wrapper, Address, AddressBox, Tooltip } from './styled'

const CopyAddress: React.FC<CopyAddressProps> = ({ account, ...props }) => {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)
  const { t } = useTranslation()
  const { theme } = useTheme()

  const copyAddress = () => {
    if (navigator.clipboard && navigator.permissions) {
      navigator.clipboard.writeText(account).then(() => displayTooltip())
    } else if (document.queryCommandSupported('copy')) {
      const ele = document.createElement('textarea')
      ele.value = account
      document.body.appendChild(ele)
      ele.select()
      document.execCommand('copy')
      document.body.removeChild(ele)
      displayTooltip()
    }
  }

  function displayTooltip() {
    setIsTooltipDisplayed(true)
    setTimeout(() => {
      setIsTooltipDisplayed(false)
    }, 1000)
  }

  const shortedAccount = useMemo(() => {
    if (account) return `${account?.slice(0, 5)}...${account?.slice(-7)}`
    return ''
  }, [account])

  return (
    <AddressBox {...props}>
      <Address>
        <input type="text" readOnly value={shortedAccount} />
      </Address>
      <IconButton variant="text" onClick={copyAddress}>
        {theme.isDark ? <IconCopy /> : <IconCopyGradient />}
      </IconButton>
      <Tooltip isTooltipDisplayed={isTooltipDisplayed}>{t('Copied')}</Tooltip>
    </AddressBox>
  )
}

export default CopyAddress
