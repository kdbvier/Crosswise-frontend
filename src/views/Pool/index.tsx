import React, { useMemo } from 'react'
import { Pair } from '@crosswise/sdk'
import { Text, Box, Flex, Button, AddIcon } from '@crosswise/uikit'
import { Link } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import FullPositionCard from 'components/PositionCard'
import Dots from 'components/Loader/Dots'
import QuestionHelper from 'components/QuestionHelper'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import { usePairs } from 'hooks/usePairs'
import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
import { Body, ControlContainer } from './styled'

export default function Pool() {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens,
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const renderBody = () => {
    if (!account) {
      return (
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="13px" fontWeight="600">
            {t('Connect to a wallet to view your liquidity.')}
          </Text>
          <ConnectWalletButton
            variant="primaryGradient"
            padding="0px 24px"
            scale="sm"
            btnString={t('Connect Wallet')}
          />
        </Flex>
      )
    }
    if (v2IsLoading) {
      return (
        <Text textAlign="center">
          <Dots>{t('Loading')}</Dots>
        </Text>
      )
    }
    if (allV2PairsWithLiquidity?.length > 0) {
      return allV2PairsWithLiquidity.map((v2Pair, index) => (
        <FullPositionCard
          key={v2Pair.liquidityToken.address}
          pair={v2Pair}
          mb={index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0}
        />
      ))
    }
    return <Text textAlign="center">{t('No liquidity found.')}</Text>
  }

  return (
    <Flex flexDirection="column" padding="30px" height="100%">
      {/* <Flex>
        <Button
          // as={Link}
          // to="/liquidity/add"
          variant="primaryGradient"
          marginRight="30px"
          padding="0px 24px"
          scale="sm"
        >
          {t('LP Migration')}
        </Button>
      </Flex> */}
      <Flex mb="30px" alignItems="center">
        <Text fontSize="16px" fontWeight="bold">
          {t('Your Liquidity')}
        </Text>
        <QuestionHelper text={t('Liquidity Help')} ml="4px" />
      </Flex>

      <Body>{renderBody()}</Body>

      {account && !v2IsLoading && (
        <Box mt="auto" paddingTop="30px">
          <Flex>
            <Text fontSize="17px">{t("Don't see a pool you joined?")}</Text>
            <Link to="/liquidity/find">
              <Text fontSize="17px" color="textSubtle" ml="8px">
                Import it
              </Text>
            </Link>
          </Flex>
          <Text fontSize="17px">
            {t('Or, if you staked your PANTHER-LP tokens in a farm, unstake them to see them here.')}
          </Text>
        </Box>
      )}
    </Flex>
  )
}
