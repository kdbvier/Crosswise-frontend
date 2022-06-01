import React, { useState, useEffect, useRef, MouseEvent } from 'react'
import {
  Modal,
  Text,
  // LinkExternal,
  Flex,
  Box,
  CalculateIcon,
  // DropDownUpIcon,
  // DropDownBottomIcon,
  Toggle,
  IconButton,
  Button,
  ExpandableButton,
} from '@crosswise/uikit'
import { IconLink } from 'components/SvgIcons'
import { useTranslation } from 'contexts/Localization'
import useTokenBalance from 'hooks/useTokenBalance'
import { getFullDisplayBalance } from 'utils/formatBalance'
// import { getCrssAddress, getXCrssAddress } from 'utils/addressHelpers'
import { getCrssAddress } from 'utils/addressHelpers'
// import { usdEarnedCompounding, balanceFromUSDEarnedCompounding, getRoi } from 'utils/compoundApyHelpers'
import { usdEarnedCompounding, balanceFromUSDEarnedCompounding } from 'utils/compoundApyHelpers'
import { usePriceCrssBusd } from 'state/farms/hooks'
import ExpandButton from 'components/Modal/ExpandButton'
import BigNumber from 'bignumber.js'
import useTheme from 'hooks/useTheme'
import SvgButton from '../SvgButton'
import {
  RoiModalHeader,
  RoiModalNoPadContainer,
  RoiModalContainer,
  SubTitle,
  RoiButton,
  BalanceText,
  StyledSwapVertIcon,
  StyledPencilIcon,
  StyledCheckmarkIcon,
  TransparentInput,
  MainText,
  SubText,
  BulletList,
  Panel,
  PopupBox,
  Grid,
  GridItem,
  StyledLink,
} from './styled'
import { ApyCalculatorModalProps } from './interfaces'

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({
  onDismiss,
  symbol,
  tokenPrice,
  apr,
  displayApr,
  linkLabel,
  linkHref,
  // earningTokenSymbol = 'CRSS',
  roundingDecimals = 2,
  // compoundFrequency = 1,
  performanceFee = 0,
  isFarm = false,
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const crssPriceUsd = usePriceCrssBusd()
  const { balance: crssBalance } = useTokenBalance(getCrssAddress())
  // const { balance: xcrssBalance } = useTokenBalance(getXCrssAddress())

  const refROIInput = useRef<HTMLInputElement>(null)

  const [popupDescriptionVisible, setPopupDescriptionVisible] = useState(false)
  const [isChkCompound, setIsChkCompound] = useState(true)
  const [inUSD, setInUSD] = useState(true)
  const [value, setValue] = useState<number>()
  const [calculatedValue, setCalculatedValue] = useState<number>(0)
  const [isEditRoi, setEditRoi] = useState<boolean>(false)
  const [roi, setRoi] = useState<number>(0)
  const [roiCSRR, setRoiCSRR] = useState<number>(0)
  const [stakePeriod, setStakePeriod] = useState<number>(365)
  const [compoundPeriod, setCompoundPeriod] = useState<number>(1)

  const dailyCompound = usdEarnedCompounding({
    balance: 100,
    numberOfDays: 365,
    farmApr: apr,
    roundingDecimals,
    compoundFrequency: 1,
    performanceFee,
  })

  const calcPrice = (v: number) => {
    if (tokenPrice !== 0 && !Number.isNaN(v)) {
      return inUSD ? v / tokenPrice : v * tokenPrice
    }

    return 0
  }

  const onChangeValue = (_v: string) => {
    const v = parseFloat(_v)
    setValue(v)
    setCalculatedValue(calcPrice(v))
  }

  const onSwap = () => {
    setInUSD(!inUSD)

    setCalculatedValue(value)
    setValue(calculatedValue)
  }

  useEffect(() => {
    if (value !== undefined && Number.isNaN(value) === false && Number.isFinite(value) === false) {
      const usdEarned = usdEarnedCompounding({
        balance: inUSD ? value : calculatedValue,
        numberOfDays: stakePeriod,
        farmApr: apr,
        roundingDecimals,
        compoundFrequency: isChkCompound ? 1 / compoundPeriod : 0,
        performanceFee,
      })
      setRoi(usdEarned)
    }
  }, [
    apr,
    tokenPrice,
    performanceFee,
    roundingDecimals,
    inUSD,
    value,
    calculatedValue,
    isChkCompound,
    stakePeriod,
    compoundPeriod,
  ])

  useEffect(() => {
    setRoiCSRR(roi !== 0 ? new BigNumber(roi).div(crssPriceUsd).toNumber() : 0)
  }, [roi, crssPriceUsd])

  useEffect(() => {
    if (isEditRoi && refROIInput.current) {
      refROIInput.current.focus()
    }
  }, [isEditRoi])

  const onUpdateROI = (v: number) => {
    const balance = balanceFromUSDEarnedCompounding({
      usdEarn: v,
      numberOfDays: stakePeriod,
      farmApr: apr,
      roundingDecimals,
      compoundFrequency: isChkCompound ? 1 / compoundPeriod : 0,
      performanceFee,
    })

    setRoi(v)
    if (Number.isNaN(balance) === false && Number.isFinite(balance) === false) {
      if (inUSD) {
        setValue(balance)
      } else {
        setValue(balance * tokenPrice)
      }
    }
  }

  const activeVariant = (isActive: boolean) => (isActive ? 'primaryGradient' : 'primaryGradientOutline')

  return (
    <Modal
      title={t('ROI Calculator')}
      icon={<CalculateIcon color={theme.isDark ? 'contrast' : 'bluePalette.accent'} />}
      onDismiss={onDismiss}
      width="346px"
      onClick={() => setPopupDescriptionVisible(false)}
    >
      <RoiModalNoPadContainer>
        <RoiModalContainer>
          <Flex alignItems="center" justifyContent="space-between" style={{ marginBottom: '20px' }}>
            <SubTitle>{t('%symbol% Staked', { symbol })}</SubTitle>
            <SvgButton
              onClick={(e: MouseEvent<HTMLDivElement>) => {
                e.stopPropagation()
                setPopupDescriptionVisible(!popupDescriptionVisible)
              }}
            >
              <ExpandableButton direction="up" />
            </SvgButton>
          </Flex>

          <Panel justifyContent="space-between" alignItems="center" style={{ marginBottom: '16px' }}>
            <Box>
              <TransparentInput
                type="number"
                placeholder="0.00"
                value={value}
                onChange={(e) => onChangeValue(e.target.value)}
              />
              <SubText style={{ marginBottom: '20px' }}>{inUSD ? 'USD' : symbol}</SubText>
              <SubText>{`${calculatedValue} ${inUSD ? symbol : 'USD'}`}</SubText>
            </Box>
            <IconButton variant="text" scale="sm" onClick={onSwap}>
              <StyledSwapVertIcon />
            </IconButton>
          </Panel>

          <Flex mb="16px">
            <Button variant="primaryGradient" scale="sm" onClick={() => onChangeValue('100')}>
              $100
            </Button>
            <Button variant="primaryGradient" scale="sm" ml="16px" onClick={() => onChangeValue('1000')}>
              $1000
            </Button>
            <Button variant="primaryGradient" scale="sm" ml="auto">
              {t('My Balance')}
            </Button>
          </Flex>

          {!isFarm && <BalanceText>( {getFullDisplayBalance(crssBalance, 18, 2)} CRSS )</BalanceText>}

          <SubTitle style={{ marginBottom: '10px' }}>{t('Staked For')}</SubTitle>
          <Flex justifyContent="space-between" style={{ marginBottom: '10px' }}>
            <RoiButton variant={activeVariant(stakePeriod === 1)} scale="sm" onClick={() => setStakePeriod(1)}>
              {t('%num% Day', { num: 1 })}
            </RoiButton>
            <RoiButton variant={activeVariant(stakePeriod === 7)} scale="sm" onClick={() => setStakePeriod(7)}>
              {t('%num% Day', { num: 7 })}
            </RoiButton>
            <RoiButton variant={activeVariant(stakePeriod === 30)} scale="sm" onClick={() => setStakePeriod(30)}>
              {t('%num% Day', { num: 30 })}
            </RoiButton>
            <RoiButton variant={activeVariant(stakePeriod === 365)} scale="sm" onClick={() => setStakePeriod(365)}>
              {t('%num% Year', { num: 1 })}
            </RoiButton>
          </Flex>

          {isFarm && (
            <>
              <Flex alignItems="center" style={{ marginBottom: '10px' }}>
                <SubTitle style={{ marginRight: '10px' }}>{t('Compouding every')}</SubTitle>
                <Toggle checked={isChkCompound} onChange={() => setIsChkCompound(!isChkCompound)} scale="sm" />
              </Flex>
              <Flex justifyContent="space-between" style={{ marginBottom: '25px' }}>
                <RoiButton
                  variant={activeVariant(compoundPeriod === 1)}
                  onClick={() => setCompoundPeriod(1)}
                  scale="sm"
                  disabled={!isChkCompound}
                >
                  {t('%num% Day', { num: 1 })}
                </RoiButton>
                <RoiButton
                  variant={activeVariant(compoundPeriod === 7)}
                  onClick={() => setCompoundPeriod(7)}
                  scale="sm"
                  disabled={!isChkCompound}
                >
                  {t('%num% Day', { num: 7 })}
                </RoiButton>
                <RoiButton
                  variant={activeVariant(compoundPeriod === 14)}
                  onClick={() => setCompoundPeriod(14)}
                  scale="sm"
                  disabled={!isChkCompound}
                >
                  {t('%num% Day', { num: 14 })}
                </RoiButton>
                <RoiButton
                  variant={activeVariant(compoundPeriod === 30)}
                  onClick={() => setCompoundPeriod(30)}
                  scale="sm"
                  disabled={!isChkCompound}
                >
                  {t('%num% Day', { num: 30 })}
                </RoiButton>
              </Flex>
            </>
          )}

          <SubTitle style={{ marginBottom: '20px' }}>{t('ROI At Current Rate')}</SubTitle>
          <Panel justifyContent="space-between" alignItems="center">
            <Box>
              {isEditRoi ? (
                <TransparentInput
                  ref={refROIInput}
                  type="number"
                  placeholder="0.00"
                  value={roi}
                  onChange={(e) => onUpdateROI(parseFloat(e.target.value))}
                />
              ) : (
                <MainText>{(roi || 0).toFixed(roundingDecimals)}</MainText>
              )}
              <SubText style={{ marginBottom: '20px' }}>USD</SubText>
              <SubText>{`${roiCSRR || 0} CSRR (0.00%)`}</SubText>
            </Box>
            <IconButton variant="text" scale="sm" onClick={() => setEditRoi(!isEditRoi)}>
              {isEditRoi ? <StyledCheckmarkIcon /> : <StyledPencilIcon />}
            </IconButton>
          </Panel>
        </RoiModalContainer>
        <ExpandButton width="100%" title={t('Additional details')} />
      </RoiModalNoPadContainer>

      {popupDescriptionVisible && (
        <PopupBox>
          {!isFarm && (
            <Grid>
              <GridItem>{t('APR')}</GridItem>
              <GridItem bold>{apr.toFixed(roundingDecimals)}%</GridItem>

              <GridItem>{t('APY (1x daily compound)')}</GridItem>
              <GridItem bold>{dailyCompound.toFixed(roundingDecimals)}%</GridItem>
            </Grid>
          )}
          {isFarm && (
            <Grid>
              <GridItem>{t('APR (incl. LP rewards)')}</GridItem>
              <GridItem bold>{displayApr}%</GridItem>

              <GridItem>{t('Base APR (CSRR yield only)')}</GridItem>
              <GridItem bold>{apr.toFixed(roundingDecimals)}%</GridItem>

              <GridItem>{t('APY (1x daily compound)')}</GridItem>
              <GridItem bold>{dailyCompound.toFixed(roundingDecimals)}%</GridItem>
            </Grid>
          )}
          <Flex justifyContent="center">
            <Box mb="28px">
              <BulletList>
                <li>{t('Calculated based on current rates.')}</li>
                {isFarm && (
                  <li>{t('LP rewards: 0.17% trading fees, distributed proportionally among LP token holders.')}</li>
                )}
                <li>
                  {t(
                    'All figures are estimates provided for your convenience only, and by no means represent guaranteed returns.',
                  )}
                </li>
                {performanceFee > 0 && (
                  <li>
                    {t('All estimated rates take into account this pool’s %fee%% performance fee', {
                      fee: performanceFee,
                    })}
                  </li>
                )}
              </BulletList>
            </Box>
          </Flex>
          <Flex justifyContent="center">
            <StyledLink href={linkHref} target="_blank">
              {linkLabel}
              <Box ml={2}>
                <IconLink />
              </Box>
            </StyledLink>
          </Flex>
        </PopupBox>
      )}
    </Modal>
  )
}

export default ApyCalculatorModal
