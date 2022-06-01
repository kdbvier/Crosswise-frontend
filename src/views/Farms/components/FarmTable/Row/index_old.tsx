import React, { useEffect, useState } from 'react'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { useMatchBreakpoints, Flex, Text, Toggle } from '@crosswise/uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import { useFarmUser } from 'state/farms/hooks'
import { useThemeManager } from 'state/user/hooks'
import { TokenPairImage } from 'components/TokenImage'
// import GradientText from 'components/GradientText'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'

import Apr, { AprProps } from '../Apr'
import { FarmProps } from '../Farm'
import { EarnedProps } from '../Earned'
import { DepositFeeProps } from '../DepositFee'
// import Details from '../Details'
import Multiplier, { MultiplierProps } from '../Multiplier'
import Liquidity, { LiquidityProps } from '../Liquidity'
import Staked, { StakedProps } from '../Staked'
import { FarmOptionProps } from '../FarmOption'
import ActionPanel from '../Actions/ActionPanel'
import CellLayout from '../CellLayout'
// import { DesktopColumnSchema, MobileColumnSchema } from '../../types'
import {
  CellInner,
  StyledTr,
  // EarnedMobileCell,
  // AprMobileCell,
  // FarmMobileCell,
  // RowHeader,
  // GearIcon,
  OptionContainer,
  ToggleWrapper,
  RowBody,
  TokenWrapper,
  DropDownIcon,
} from './styled'

export interface RowProps {
  apr: AprProps
  farm: FarmProps
  earned: EarnedProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  staked: StakedProps
  depositFee: DepositFeeProps
  farmOption: FarmOptionProps
  details: FarmWithStakedValue
  account: string
  index?: number
}

interface RowPropsWithLoading extends RowProps {
  userDataReady: boolean
}

// const cells = {
//   apr: Apr,
//   farm: Farm,
//   earned: Earned,
//   details: Details,
//   multiplier: Multiplier,
//   depositFee: DepositFee,
//   liquidity: Liquidity,
//   test: false,
// }

// const renderOrder = ['liquidity', 'apr']

const Row: React.FunctionComponent<RowPropsWithLoading> = (props) => {
  const [isDark] = useThemeManager()
  const { details, userDataReady, index, farm, multiplier, account, staked, liquidity, apr } = props
  const hasStakedAmount = !!useFarmUser(details.pid).stakedBalance.toNumber()
  const [autoVal, setAutoVal] = useState(false)
  const [vestVal, setVestVal] = useState(false)
  const [actionPanelExpanded, setActionPanelExpanded] = useState(hasStakedAmount)
  const shouldRenderChild = useDelayedUnmount(true, 300)
  const { t } = useTranslation()

  const toggleActionPanel = () => {
    setActionPanelExpanded(!actionPanelExpanded)
  }

  useEffect(() => {
    setActionPanelExpanded(hasStakedAmount)
  }, [hasStakedAmount])

  const changeVest = () => {
    setVestVal(!vestVal)
  }

  const changeAuto = () => {
    setAutoVal(!autoVal)
  }

  // const { isXl, isXs } = useMatchBreakpoints()
  const { isXs, isSm } = useMatchBreakpoints()

  const isMobile = isXs || isSm
  // const tableSchema = isMobile ? MobileColumnSchema : DesktopColumnSchema
  // const columnNames = tableSchema.map((column) => column.name)

  let stakedBalance = BIG_ZERO
  const stakedBalanceBigNumber = new BigNumber(details.userData.stakedBalance)
  // If user didn't connect wallet default balance will be 0
  if (!stakedBalanceBigNumber.isZero()) {
    stakedBalance = getBalanceAmount(stakedBalanceBigNumber)
  }

  /**
  const handleRenderRow = () => {
    if (!isXs) {
      return (
        <StyledTr index={index} onClick={toggleActionPanel}>
          {Object.keys(props).map((key) => {
            const columnIndex = columnNames.indexOf(key)
            if (columnIndex === -1) {
              return null
            }
            switch (key) {
              case 'details':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout>
                        <Details actionPanelToggled={actionPanelExpanded} />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'apr':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout textAlign="center" label={t('APR')}>
                        <Apr {...props.apr} hideButton={isMobile} />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              default:
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label={t(tableSchema[columnIndex].label)}>
                        {React.createElement(cells[key], { ...props[key], userDataReady })}
                      </CellLayout>
                    </CellInner>
                  </td>
                )
            }
          })}
        </StyledTr>
      )
    }

 */

  /**
    return (
      <StyledTr index={index} onClick={toggleActionPanel}>
        <td>
          <tr>
            <FarmMobileCell>
              <CellLayout>
                <Farm {...props.farm} />
              </CellLayout>
            </FarmMobileCell>
          </tr>

          <tr>
            <EarnedMobileCell>
              <CellLayout label={t('Earned')}>
                <Earned {...props.earned} userDataReady={userDataReady} />
              </CellLayout>
            </EarnedMobileCell>
            <AprMobileCell>
              <CellLayout textAlign="center" label={t('APR')}>
                <Apr {...props.apr} hideButton />
              </CellLayout>
            </AprMobileCell>
          </tr>
        </td>
        <td>
          <CellInner>
            <CellLayout>
              <Details actionPanelToggled={actionPanelExpanded} />
            </CellLayout>
          </CellInner>
        </td>
      </StyledTr>
    )
  }
   */

  /**
  return (
    <>
      {handleRenderRow()}
      {shouldRenderChild && (
        <tr>
          <td colSpan={7}>
            <ActionPanel {...props} expanded={actionPanelExpanded} />
          </td>
        </tr>
      )}
    </>
  )
   */
  return (
    <StyledTr index={index} onClick={toggleActionPanel}>
      {/* <RowHeader>
        <GearIcon />
        <Flex justifyContent="space-between" alignItems="center">
          <TokenWrapper>
            <TokenPairImage primaryToken={farm.token} secondaryToken={farm.quoteToken} width={40} height={40} />
          </TokenWrapper>
          <GradientText fontWeight="bold">{farm.label}</GradientText>
          <Multiplier {...multiplier} />
          <MultiplierWrapper>{multiplier}</MultiplierWrapper>
        </Flex>
        <div />
      </RowHeader> */}
      <RowBody>
        <Flex alignItems="center">
          <TokenWrapper>
            <TokenPairImage primaryToken={farm.token} secondaryToken={farm.quoteToken} width={40} height={40} />
          </TokenWrapper>
          {/* <GradientText fontWeight="bold">{farm.label}</GradientText> */}
          <Text fontWeight="bold" fontSize="16px" color={isDark ? '#fff' : '#060514'}>
            {farm.label}
          </Text>
          <Multiplier {...multiplier} />
        </Flex>
        <CellInner>
          <CellLayout label="Total Liquidity">
            <Liquidity liquidity={liquidity.liquidity} />
          </CellLayout>
        </CellInner>
        <CellInner alignItems="flex-start">
          <CellLayout label="APR">
            <Apr {...apr} hideButton={isMobile} />
            {/* <Apr {...props.apr} hideButton /> */}
          </CellLayout>
        </CellInner>
        <CellInner>
          <CellLayout label="STAKED">
            <Staked staked={staked?.staked ?? BIG_ZERO} userDataReady={userDataReady} />
          </CellLayout>
        </CellInner>
        <OptionContainer>
          <ToggleWrapper>
            <Text fontSize="14px" pr="15px">
              {t('Auto-compound')}
            </Text>
            <Toggle
              scale="sm"
              disabled={!userDataReady || !stakedBalance.eq(0)}
              checked={autoVal}
              onChange={() => changeAuto()}
            />
          </ToggleWrapper>

          <ToggleWrapper>
            <Text fontSize="14px" pr="15px">
              {t('Vesting')}
            </Text>
            {/* <Toggle checked={vesting} scale="sm" onChange={() => setVesting(!vesting)} /> */}
            <Toggle
              scale="sm"
              disabled={!userDataReady || !stakedBalance.eq(0)}
              checked={vestVal}
              onChange={() => changeVest()}
            />
          </ToggleWrapper>
        </OptionContainer>
        <DropDownIcon />
      </RowBody>
      {shouldRenderChild && <ActionPanel {...props} expanded={actionPanelExpanded} account={account} />}
    </StyledTr>
  )
}

export default Row
