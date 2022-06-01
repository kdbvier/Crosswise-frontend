import React from 'react'
// import { useTranslation } from 'contexts/Localization'
import { useMaxSupply, useTotalSupply } from 'hooks/useTokenBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from '../CardValue'

const Circulation = () => {
  // const { t } = useTranslation()
  const maxSupply = useMaxSupply()
  const totalSupply = useTotalSupply()

  const circulation = (getBalanceNumber(totalSupply) / getBalanceNumber(maxSupply)) * 100

  return <>{circulation.toFixed(2)}%</>
}

export default Circulation
