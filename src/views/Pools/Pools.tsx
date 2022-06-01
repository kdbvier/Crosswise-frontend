import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation, useHistory } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import {
  RowType,
  Toggle,
  Text,
  Button,
  Flex,
  TabMenu,
  Tab,
  Dropdown,
  useMatchBreakpoints,
  ExpandableButton,
  darkColors,
} from '@crosswise/uikit'
import { ChainId } from '@crosswise/sdk'
import Page from 'components/Layout/Page'
import { usePools, usePollPoolsData, usePriceCrssBusd } from 'state/pools/hooks'
import usePoolTvl from 'hooks/usePoolTvl'
import useUserPoolStaked from 'hooks/useUserPoolStaked'

import usePersistState from 'hooks/usePersistState'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import { getPoolApr } from 'utils/apr'
import { insertThousandSeparator } from 'utils/other'
import { orderBy } from 'lodash'
import isArchivedPid from 'utils/farmHelpers'
import { latinise } from 'utils/latinise'
import { useUserFarmStakedOnly, useThemeManager } from 'state/user/hooks'
import Loading from 'components/Loading'
import { IconGridOutlined, IconListFill, IconGridFill, IconListOutlined } from 'components/SvgIcons'
import CustomText from 'components/CustomText'

import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import { RowProps } from './components/FarmTable/Row'
import { DesktopColumnSchema, ViewMode } from './components/types'
import useMassFarm from './hooks/useMassFarm'
import {
  FarmHeader,
  FarmHeaderLayout,
  FarmHeadCard,
  HeaderTopBar,
  HeaderInfo,
  HeaderInfoItem,
  HeaderInfoVolumeIcon,
  HeaderInfoTotalValueLockedIcon,
  HeaderInfoTotalLiquidityIcon,
  FarmHeadCardHeader,
  ToggleWrapper,
  StakingToggle,
  MassBtns,
  LabelNameText,
  FarmCardsLayout,
  FarmHeadCardTitle,
  StatsIcon,
  PendingRewardIcon,
  TotalStakedValueIcon,
  FarmHeadCardOperationPanel,
  SearchInputBox,
  SearchIcon,
  SearchInputWrapper,
  ActiveFinishButtons,
  FarmHeadCardEarningPanelWrapper,
  FarmHeadCardEarningPanel,
  TabBox,
  HeadCardOperationPanelWrapper,
  StyledSvgButton,
} from './styled'

const NUMBER_OF_FARMS_VISIBLE = 12

const getDisplayApr = (cakeRewardsApr?: number, lpRewardsApr?: number) => {
  if (cakeRewardsApr && lpRewardsApr) {
    return (cakeRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  if (cakeRewardsApr) {
    return cakeRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  return null
}

const Farms: React.FC = () => {
  const { isXs, isSm } = useMatchBreakpoints()
  const { path, url } = useRouteMatch()
  const { pathname } = useLocation()
  const history = useHistory()
  const { t } = useTranslation()
  const { data: pools, userDataLoaded } = usePools()
  const crssPrice = usePriceCrssBusd()
  const [, setCrssTokenPrice] = useState(new BigNumber(0))

  const [farmTvl] = useState(new BigNumber(0))
  const [totalTvl] = useState(new BigNumber(0))
  const poolTvltmp = usePoolTvl()
  const userStakedVal = useUserPoolStaked()
  const [CrssTokenEarned, setCrssTokenEarned] = useState(0)
  const [, setPendingTx] = useState(false)

  const [query] = useState('')
  const [headCardExpanded, setHeadCardExpanded] = useState(true)
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, { localStorageKey: 'crosswise_farm_view' })
  const { account, library } = useWeb3React()
  const chosenFarmsLength = useRef(0)

  const [isDark] = useThemeManager()

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  usePollPoolsData(isArchived)

  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useUserFarmStakedOnly(isActive)
  const { onMassHarvest } = useMassFarm()

  const activeFarms = pools.filter((farm) => farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
  const inactiveFarms = pools.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X' && !isArchivedPid(farm.pid))
  const archivedFarms = pools.filter((farm) => isArchivedPid(farm.pid))

  const tabs = [t('Farm'), t('Pools')]

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.lpTotalInQuoteToken || !farm.quoteToken.busdPrice) {
        //   return farm
        // }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)

        const apr = getPoolApr(
          getBalanceNumber(crssPrice, 0),
          getBalanceNumber(crssPrice, 0),
          getBalanceNumber(new BigNumber(farm.userData.stakedBalance), 18),
        )
        return { ...farm, apr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [crssPrice, query],
  )

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)

  const sortOpts = [
    {
      label: t('Hot'),
      value: 'hot',
    },
    {
      label: t('APR'),
      value: 'apr',
    },
    {
      label: t('Multiplier'),
      value: 'multiplier',
    },
    {
      label: t('Earned'),
      value: 'earned',
    },
    {
      label: t('Liquidity'),
      value: 'liquidity',
    },
  ]
  const [sortOption, setSortOption] = useState(sortOpts[0])

  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = []

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption.value) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr + farm.lpRewardsApr, 'desc')
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          )
        case 'earned':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
            'desc',
          )
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
        default:
          return farms
      }
    }

    if (isActive) {
      chosenFarms = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      chosenFarms = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }
    if (isArchived) {
      chosenFarms = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
    }

    return sortFarms(chosenFarms).slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])

  const activePids = useMemo(() => {
    let activeFarmPids = []
    activeFarmPids = stakedOnlyFarms.map((farm) => farm.pid)
    return activeFarmPids
  }, [stakedOnlyFarms])

  chosenFarmsLength.current = chosenFarmsMemoized.length
  useEffect(() => {
    const showMoreFarms = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfFarmsVisible((farmsCurrentlyVisible) => {
          if (farmsCurrentlyVisible <= chosenFarmsLength.current) {
            return farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE
          }
          return farmsCurrentlyVisible
        })
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreFarms, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }

    let temp = new BigNumber(0)
    const getStakedVal = () => {
      chosenFarmsMemoized.map((farm) => {
        // const lpPrice = useLpTokenPrice(farm.lpSymbol)
        temp = temp.plus(farm.userData?.earnings)
        return temp
      })
      if (!crssPrice.isNaN()) {
        setCrssTokenEarned(getBalanceNumber(temp.times(crssPrice).dividedBy(2)))
      }
    }
    getStakedVal()
  }, [chosenFarmsMemoized, observerIsSet, crssPrice])

  useEffect(() => {
    setCrssTokenPrice(crssPrice)
  }, [crssPrice])

  const handleMassHarvest = async () => {
    setPendingTx(true)
    await onMassHarvest(library, activePids)
    setPendingTx(false)
  }
  const rowData = chosenFarmsMemoized.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('CROSSWISE', '')

    const row: RowProps = {
      apr: {
        value: getDisplayApr(farm.apr, farm.lpRewardsApr),
        multiplier: farm.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        crssPrice,
        originalValue: farm.apr,
      },
      farm: {
        label: lpLabel,
        pid: farm.pid,
        token: farm.token,
        quoteToken: farm.quoteToken,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      depositFee: {
        depositFee: farm.depositFee,
      },
      farmOption: {
        pid: farm.pid,
        isAuto: farm.userData.isAuto,
        isVest: farm.userData.isVest,
      },
      staked: {
        staked: new BigNumber(farm.userData?.stakedBalance),
        userDataReady,
      },
      details: farm,
      userData: {
        accumulatedRewards: getBalanceNumber(new BigNumber(farm.userData.accumulatedRewards)),
        pendingCrss: getBalanceNumber(new BigNumber(farm.userData.pendingCrss)),
        vestingRewards: getBalanceNumber(new BigNumber(farm.userData.vestingRewards)),
      },
      account,
    }

    return row
  })
  const handleToggle = (mode: ViewMode) => {
    if (viewMode !== mode) {
      setViewMode(mode)
    }
  }

  const handleItemClick = (index: number) => {
    if (index === 0) {
      history.push('/farms')
    }
  }

  const handleClickFarmHeadCardHeader = () => {
    setHeadCardExpanded(!headCardExpanded)
  }

  const onChangeFilterOpt = (item: any) => {
    // setFilterOpt({ ...item })
    setSortOption({ ...item })
  }

  const isMobile = isXs || isSm

  const ActiveFinishButtonsContainer: JSX.Element = (
    <>
      <ActiveFinishButtons
        scale="xs"
        variant="primaryGradientOutline"
        mr={10}
        checked={isActive}
        onClick={() => history.push(url)}
      >
        Active
      </ActiveFinishButtons>
      <ActiveFinishButtons
        scale="xs"
        variant="primaryGradientOutline"
        checked={isInactive}
        onClick={() => history.push(`${url}/history`)}
      >
        Finished
      </ActiveFinishButtons>
    </>
  )

  const SortButtonContainer: JSX.Element = (
    <Dropdown list={sortOpts} current={sortOption} placement="bottom-end" onClickItem={onChangeFilterOpt} />
  )

  const StakedOnlyToggleButtonContainer: JSX.Element = (
    <Flex justifyContent="flex-end">
      <StakingToggle>
        <ToggleWrapper>
          <LabelNameText
            // fontSize="12px"
            fontSize="10px"
            pr="15px"
          >
            {t('Staked only')}
          </LabelNameText>
          <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />
        </ToggleWrapper>
      </StakingToggle>
    </Flex>
  )

  const HeadCardOperationPanelContainer: JSX.Element = (
    <HeadCardOperationPanelWrapper isMobile={isMobile}>
      <FarmHeadCardOperationPanel>
        <Flex justifyContent="space-between">
          <Flex alignItems="center">
            <StyledSvgButton onClick={() => handleToggle(ViewMode.CARD)}>
              <CustomText>
                {viewMode === ViewMode.CARD ? (
                  <IconGridFill fillcolor={darkColors.primaryGray} />
                ) : (
                  <IconGridOutlined fillcolor={darkColors.primaryGray} />
                )}
              </CustomText>
            </StyledSvgButton>

            <StyledSvgButton onClick={() => handleToggle(ViewMode.TABLE)}>
              <CustomText>
                {viewMode === ViewMode.TABLE ? (
                  <IconListFill fillcolor={darkColors.primaryGray} />
                ) : (
                  <IconListOutlined fillcolor={darkColors.primaryGray} />
                )}
              </CustomText>
            </StyledSvgButton>
            {!isMobile && ActiveFinishButtonsContainer}
          </Flex>
          {isMobile ? StakedOnlyToggleButtonContainer : SortButtonContainer}
        </Flex>

        <SearchInputWrapper>
          <SearchInputBox placeholder="Please type here to search..." />
          <SearchIcon />
        </SearchInputWrapper>
        {isMobile ? (
          <Flex justifyContent="space-between" alignItems="center">
            <div>{ActiveFinishButtonsContainer}</div>
            {SortButtonContainer}
          </Flex>
        ) : (
          StakedOnlyToggleButtonContainer
        )}
      </FarmHeadCardOperationPanel>
    </HeadCardOperationPanelWrapper>
  )

  const renderContent = (): JSX.Element => {
    if (!isMobile && viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} userDataReady={userDataReady} account={account} />
    }

    return (
      <FarmCardsLayout isMobile={isMobile}>
        <Route exact path={`${path}`}>
          {chosenFarmsMemoized.map((farm, index) => (
            <FarmCard
              viewMode={viewMode}
              index={index}
              key={farm.pid}
              farm={farm}
              displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              crssPrice={crssPrice}
              account={account}
              removed={false}
            />
          ))}
        </Route>
        <Route exact path={`${path}/history`}>
          {chosenFarmsMemoized.map((farm, index) => (
            <FarmCard
              viewMode={viewMode}
              index={index}
              key={farm.pid}
              farm={farm}
              displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              crssPrice={crssPrice}
              account={account}
              removed
            />
          ))}
        </Route>
        <Route exact path={`${path}/archived`}>
          {chosenFarmsMemoized.map((farm, index) => (
            <FarmCard
              viewMode={viewMode}
              index={index}
              key={farm.pid}
              farm={farm}
              displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
              crssPrice={crssPrice}
              account={account}
              removed
            />
          ))}
        </Route>
      </FarmCardsLayout>
    )
  }

  return (
    <>
      <FarmHeader>
        <HeaderTopBar isMobile={isMobile}>
          <Text bold gradient={isDark ? undefined : 'btngradprimary'} color="white" mb="12px" fontSize="57px">
            Pools
          </Text>
          <Text>Stake LP tokens to Earn CRSS</Text>
          {isMobile && (
            <HeaderInfo>
              <HeaderInfoItem>
                <HeaderInfoVolumeIcon />
                <Text fontSize="10px" mt={13} mb={13} color="#7a8596">
                  VOLUME 24H
                </Text>
                <Text fontSize="12px">0</Text>
              </HeaderInfoItem>
              <HeaderInfoItem>
                <HeaderInfoTotalValueLockedIcon />
                <Text fontSize="10px" mt={13} mb={13} color="#7a8596">
                  TOTAL VALUE LOCKED
                </Text>
                <Text fontSize="12px">$ {totalTvl.toFixed(2)}</Text>
              </HeaderInfoItem>
              <HeaderInfoItem>
                <HeaderInfoTotalLiquidityIcon />
                <Text fontSize="10px" mt={13} mb={13} color="#7a8596">
                  TOTAL LIQUIDITY
                </Text>
                <Text fontSize="12px">$ {farmTvl.toFixed(2)}</Text>
              </HeaderInfoItem>
            </HeaderInfo>
          )}
        </HeaderTopBar>
      </FarmHeader>

      <FarmHeaderLayout>
        <TabBox isMobile={isMobile}>
          <TabMenu activeIndex={1} onItemClick={handleItemClick} variant="primaryGradient" fullWidth>
            {tabs.map((tabText) => {
              return <Tab key={tabText}>{tabText}</Tab>
            })}
          </TabMenu>
        </TabBox>
        <FarmHeadCard isDarkTheme={isDark} expanded={isMobile || headCardExpanded} isMobile={isMobile}>
          <FarmHeadCardHeader onClick={handleClickFarmHeadCardHeader}>
            <div />
            <FarmHeadCardTitle>
              <StatsIcon />
              <Text color={isDark ? '#fff' : '#060514'} fontWeight={700}>
                Pool Stats
              </Text>
            </FarmHeadCardTitle>
            <ExpandableButton direction={headCardExpanded ? 'up' : 'down'} />
          </FarmHeadCardHeader>

          <Flex justifyContent="space-evenly" alignItems="center" mt={19} mb={30}>
            <Flex flexDirection="column" alignItems="center" justifyContent="space-between">
              <Flex alignItems="center" flexDirection="column">
                <TotalStakedValueIcon />
                <Text color={isDark ? '#BFC8DA' : '#7A8596'} fontSize={isMobile ? '10px' : '13px'} fontWeight={600}>
                  Total Staked
                </Text>
              </Flex>
              <Text color={isDark ? '#fff' : '#060514'} fontWeight={700} fontSize={isMobile ? '16px' : '17px'}>
                {poolTvltmp}
              </Text>
              <Text color={isDark ? '#BFC8DA' : '#7A8596'} fontSize={isMobile ? '10px' : '16px'} fontWeight={600}>
                {`~ ${insertThousandSeparator(poolTvltmp)} USD`}
              </Text>
            </Flex>
            {!isMobile && !!account && (
              <FarmHeadCardEarningPanelWrapper justifyContent="center" alignItems="center">
                <FarmHeadCardEarningPanel>
                  <Flex flexDirection="column" justifyContent="space-between" alignItems="center">
                    <LabelNameText fontSize="13px" pr="8px">
                      $CRSS Earned
                    </LabelNameText>
                    <Text color={isDark ? '#fff' : '#060514'} fontWeight={700} fontSize="17px" mr="24px">
                      {insertThousandSeparator(CrssTokenEarned?.toFixed(2))}
                    </Text>
                    <Text color={isDark ? '#BFC8DA' : '#7A8596'} fontSize="13px" mr="24px">
                      {`~ ${insertThousandSeparator(CrssTokenEarned?.toFixed(2))} USD`}
                    </Text>
                  </Flex>
                </FarmHeadCardEarningPanel>
              </FarmHeadCardEarningPanelWrapper>
            )}
            <Flex flexDirection="column" alignItems="center" justifyContent="space-between">
              <Flex alignItems="center" flexDirection="column">
                <PendingRewardIcon />
                <Text color={isDark ? '#BFC8DA' : '#7A8596'} fontSize={isMobile ? '10px' : '13px'} fontWeight={600}>
                  Pending Rewards
                </Text>
              </Flex>
              <Text color={isDark ? '#fff' : '#060514'} fontWeight={700} fontSize={isMobile ? '16px' : '17px'}>
                {userStakedVal.toLocaleString(undefined, { maximumFractionDigits: 6 })}
              </Text>
              <Text color={isDark ? '#BFC8DA' : '#7A8596'} fontSize={isMobile ? '10px' : '16px'} fontWeight={600}>
                {`~ ${insertThousandSeparator(userStakedVal.toFixed(2))} USD`}
              </Text>
            </Flex>
            <MassBtns>
              <Button
                variant="primaryGradient"
                mr="18px"
                onClick={account ? () => handleMassHarvest() : null}
                disabled={!account}
              >
                Mass Harvest
              </Button>
            </MassBtns>
          </Flex>
          {isMobile && HeadCardOperationPanelContainer}
        </FarmHeadCard>
      </FarmHeaderLayout>

      {!isMobile && HeadCardOperationPanelContainer}
      <Page>
        {renderContent()}
        {account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center">
            <Loading />
          </Flex>
        )}
        <div ref={loadMoreRef} />
      </Page>
    </>
  )
}

export default Farms
