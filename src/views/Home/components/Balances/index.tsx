import React from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Text, TotalIcon } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import useAllEarnings from 'views/Home/hooks/useAllEarnings'
import useAllStakings from 'views/Home/hooks/useAllStakings'
import useAllVestings from 'views/Home/hooks/useAllVestings'
import { Container, SubColumn, StyledTitle, StyledValue, SubColumnTitle } from './styled'

const Balances = () => {
  const { t } = useTranslation()
  const allEarnings = useAllEarnings()
  const allStakings = useAllStakings()
  const allVestings = useAllVestings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + earning
  }, 0)
  const vestingsSum = allVestings.reduce((sum, vesting) => {
    return sum + vesting
  }, 0)
  const stakingsSum = allStakings.reduce((sum, staking) => {
    return sum + staking
  }, 0)
  const totalValue = earningsSum + vestingsSum + stakingsSum
  return (
    <Container>
      <SubColumnTitle>
        <Text fontSize="10px" color="homeTitle" fontWeight={600} display="flex">
          {t('BALANCES')} &nbsp;
          <TotalIcon fill="primaryText" width="17px" />
        </Text>
        <Text>&nbsp;</Text>
      </SubColumnTitle>
      <SubColumn>
        <StyledTitle>{t('Total Value')} (USD)</StyledTitle>
        <StyledValue>
          $
          {totalValue
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </StyledValue>
      </SubColumn>
      <SubColumn>
        <StyledTitle>{t('Claimable')}</StyledTitle>
        <StyledValue>
          $
          {earningsSum
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </StyledValue>
      </SubColumn>
      <SubColumn>
        <StyledTitle>{t('Total Vested')}</StyledTitle>
        <StyledValue>
          $
          {vestingsSum
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </StyledValue>
      </SubColumn>
      <SubColumn>
        <StyledTitle>{t('Total Staked')} (USD)</StyledTitle>
        <StyledValue>
          $
          {stakingsSum
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </StyledValue>
      </SubColumn>
    </Container>
  )
}

export default Balances
