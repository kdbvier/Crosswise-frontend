import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Text,
  TokenPairImage,
  DropDownBottomIcon,
  DropDownUpIcon,
  Flex,
  LiquidityIcon,
  RewardsIcon,
  SectorIcon,
  WalletIcon,
  ClaimIcon,
  useMatchBreakpoints,
} from '@crosswise/uikit'
import useAllStakings from 'views/Home/hooks/useAllStakings'
import useAllLps from 'views/Home/hooks/useAllLps'
import useAllAccRewards from 'views/Home/hooks/useAllAccRewards'
import { farmsConfig, poolsConfig } from 'config/constants'
import useTokenBalance from 'hooks/useTokenBalance'
import { usePriceCrssBusd } from 'state/farms/hooks'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { getCrssAddress } from 'utils/addressHelpers'
import { useTranslation } from 'contexts/Localization'
import {
  Container,
  SubColumn,
  IconButton,
  TokenPairWrapper,
  StyledTitle,
  CardContent,
  StyledText,
  StyledButton,
  StyledFlex,
} from './styled'
import CrssToken from '../SVGs/CrssToken.svg'
import BinanceToken from '../SVGs/BinanceToken.svg'

const CardsArea = () => {
  const [collapseLiquidity, setCollapseLiquidity] = React.useState(true)
  const [collapseRewards, setCollapseRewards] = React.useState(true)
  const allConfig = farmsConfig.concat(poolsConfig)
  const { balance: crssBalance } = useTokenBalance(getCrssAddress())
  const crssTokenPrice = usePriceCrssBusd()
  const allStakings = useAllStakings()
  const allLps = useAllLps()
  const allAccRewards = useAllAccRewards()
  const sumRewards = allAccRewards.reduce((sum, reward) => {
    return sum + reward
  }, 0)
  const { t } = useTranslation()
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm
  const collapseClicked = () => {
    setCollapseRewards(!collapseRewards)
    if (!isMobile) {
      setCollapseLiquidity(!collapseLiquidity)
    }
  }
  const collapseLiquidityClicked = () => {
    setCollapseLiquidity(!collapseLiquidity)
  }
  return (
    <Container>
      <SubColumn>
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          height="40px"
          onClick={isMobile ? collapseLiquidityClicked : collapseClicked}
        >
          <Text fontSize="10px" color="homeTitle" fontWeight={600} display="flex">
            {t('ADD LIQUIDITY')} &nbsp;
            <LiquidityIcon fill="primaryText" width="15px" />
          </Text>
          {isMobile && (
            <IconButton onClick={collapseLiquidityClicked}>
              {collapseLiquidity ? (
                <DropDownBottomIcon width="24px" mr={20} />
              ) : (
                <DropDownUpIcon width="24px" mr={20} />
              )}
            </IconButton>
          )}
        </Flex>
        <StyledTitle onClick={isMobile ? collapseLiquidityClicked : collapseClicked}>
          <Text fontSize="26px" fontWeight={500} lineHeight="29px" mt={10}>
            {t('Receive LP Tokens')}
          </Text>
          <TokenPairWrapper>
            <TokenPairImage primarySrc={CrssToken} secondarySrc={BinanceToken} height={20} width={20} />
          </TokenPairWrapper>
        </StyledTitle>
        <CardContent collapse={!collapseLiquidity}>
          <Flex flexDirection="row" justifyContent="space-between" flexWrap="wrap">
            <StyledFlex flexDirection="column">
              <StyledText fontSize="13px" display="flex">
                {t('Your Total Liquidity')}&nbsp; <WalletIcon fill="primaryText" width="15px" />
              </StyledText>
              {allStakings.map((data, index) => {
                if (data + allLps[index] > 0) {
                  return (
                    <StyledText fontSize="16px" key={allConfig[index].pid}>
                      {(data + allLps[index]).toFixed(2)}$ {allConfig[index].lpSymbol}
                    </StyledText>
                  )
                }
                return null
              })}
            </StyledFlex>
            <StyledFlex flexDirection="column">
              <StyledText fontSize="13px" display="flex">
                {t('Total Staked')}&nbsp;
                <SectorIcon fill="primaryText" width="15px" />
              </StyledText>
              {allStakings.map((data, index) => {
                if (data > 0) {
                  return (
                    <StyledText fontSize="16px" key={allConfig[index].pid}>
                      {data.toFixed(2)}$ {allConfig[index].lpSymbol}
                    </StyledText>
                  )
                }
                return null
              })}
            </StyledFlex>
          </Flex>
          <StyledFlex justifyContent="end">
            <RouterLink to="/liquidity">
              <StyledButton variant="primaryGradient">{t('Add/Remove Liquidity')}</StyledButton>
            </RouterLink>
          </StyledFlex>
        </CardContent>
      </SubColumn>
      <SubColumn>
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          height="40px"
          onClick={collapseClicked}
        >
          <Text fontSize="10px" fontWeight={600} color="homeTitle" display="flex">
            {t('EARN APR REWARDS')} &nbsp;
            <RewardsIcon fill="primaryText" width="15px" />
          </Text>
          <IconButton onClick={collapseClicked}>
            {collapseRewards ? <DropDownBottomIcon width="24px" mr={20} /> : <DropDownUpIcon width="24px" mr={20} />}
          </IconButton>
        </Flex>
        <StyledTitle onClick={collapseClicked}>
          <Text fontSize="26px" fontWeight={500} lineHeight="29px" mt={10}>
            {t('Farms % Staking')}
          </Text>
        </StyledTitle>
        <CardContent collapse={!collapseRewards}>
          <Flex flexDirection="row" justifyContent="space-between" flexWrap="wrap">
            <Flex flexDirection="column" alignItems="center">
              <StyledText fontSize="13px" display="flex">
                <ClaimIcon fill="primaryText" width="15px" /> &nbsp; {t('To Harvest')}
              </StyledText>
              <StyledText fontSize="16px">${sumRewards}</StyledText>
            </Flex>
            <Flex flexDirection="column" alignItems="center">
              <StyledText fontSize="13px" display="flex">
                <WalletIcon fill="primaryText" width="15px" />
                &nbsp; {t('Balances')}
              </StyledText>
              <StyledText fontSize="16px">
                ${getFullDisplayBalance(crssBalance.multipliedBy(crssTokenPrice), 18, 2)}
              </StyledText>
            </Flex>
          </Flex>
          <StyledFlex justifyContent="end">
            <RouterLink to="/farms">
              <StyledButton variant="primaryGradient">{t('Harvest')}</StyledButton>
            </RouterLink>
          </StyledFlex>
        </CardContent>
      </SubColumn>
    </Container>
  )
}

export default CardsArea
