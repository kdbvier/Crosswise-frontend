import React from 'react'
import BigNumber from 'bignumber.js'
import { useModal } from '@crosswise/uikit'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import { useTranslation } from 'contexts/Localization'
import { CalculatorIcon } from './styled'

export interface ApyButtonProps {
  lpLabel?: string
  crssPrice?: BigNumber
  apr?: number
  displayApr?: string
  addLiquidityUrl?: string
  className?: string
}

const ApyButton: React.FC<ApyButtonProps> = ({ lpLabel, crssPrice, apr, displayApr, addLiquidityUrl }) => {
  const { t } = useTranslation()
  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal
      symbol={lpLabel}
      linkLabel={t('Get %symbol%', { symbol: lpLabel })}
      tokenPrice={crssPrice.toNumber()}
      apr={apr}
      displayApr={displayApr}
      linkHref={addLiquidityUrl}
      isFarm
    />,
  )

  const handleClickButton = (event): void => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return <CalculatorIcon onClick={handleClickButton} style={{ marginLeft: 10 }} />
}

export default ApyButton
