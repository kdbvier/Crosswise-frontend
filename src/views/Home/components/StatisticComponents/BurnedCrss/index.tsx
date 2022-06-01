import React from 'react'
// import { useTranslation } from 'contexts/Localization'
import { useBurnedBalance } from 'hooks/useTokenBalance'
import { getCrssAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from '../CardValue'

const BurnedCrss = () => {
  // const { t } = useTranslation()
  const burnedCrss = useBurnedBalance(getCrssAddress())

  return (
    <>
      <CardValue value={getBalanceNumber(burnedCrss)} isCountUp />
    </>
  )
}

export default BurnedCrss
