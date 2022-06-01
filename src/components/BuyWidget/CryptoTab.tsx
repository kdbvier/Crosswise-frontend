import React, { useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Text, Box, Button, Flex, ExpandableButton, Dropdown, DropdownItem, useModal } from '@crosswise/uikit'
import { CurrencyAmount, JSBI, Price, Token, Trade } from '@crosswise/sdk'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import SwapWarningTokens from 'config/constants/swapWarningTokens'
import { getAddress } from 'utils/addressHelpers'
import { GreyCard } from 'components/Card'
import Column, { AutoColumn } from 'components/Layout/Column'
import { AutoRow, RowBetween } from 'components/Layout/Row'
import CircleLoader from 'components/Loader/CircleLoader'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import GlobalSettings from 'components/Menu/GlobalSettings'
import Transactions from 'components/App/Transactions'
import MaxButton from 'components/MaxButton'
import UnsupportedCurrencyFooter from 'components/UnsupportedCurrencyFooter'
import { useCurrency, useAllTokens } from 'hooks/Tokens'
import { ApprovalState, useApproveCallbackFromTrade } from 'hooks/useApproveCallback'
import { useSwapCallback } from 'hooks/useSwapCallback'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import useBUSDPrice from 'hooks/useBUSDPrice'
import { Field } from 'state/swap/actions'
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import { useExpertModeManager, useUserSlippageTolerance, useUserSingleHopOnly } from 'state/user/hooks'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { computeTradePriceBreakdown, warningSeverity } from 'utils/prices'
import SwapWarningModal from './components/SwapWarningModal'
import ConfirmSwapModal from './components/ConfirmSwapModal'
import confirmPriceImpactWithoutFee from './components/confirmPriceImpactWithoutFee'
import { SwapCallbackError } from './components/styleds'
import ProgressSteps from './components/ProgressSteps'
import AdvancedSwapDetailsDropdown from './components/AdvancedSwapDetailsDropdown'
import { WarningPad } from './styled'

export const IconButtonContainer = styled.div<{ marginLeft?: string }>`
  cursor: pointer;
  margin-left: ${({ marginLeft }) => marginLeft};
`
const CryptoTab = () => {
  const { t } = useTranslation()

  const { account, chainId } = useActiveWeb3React()

  const loadedUrlParams = useDefaultsFromURLSearch()
  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
    [loadedInputCurrency, loadedOutputCurrency],
  )

  // dismiss warning if all imported tokens are in active lists
  const defaultTokens = useAllTokens()
  const importTokensNotInDefault =
    urlLoadedTokens &&
    urlLoadedTokens.filter((token: Token) => {
      return !(token.address in defaultTokens)
    })

  // for expert mode
  const [isExpertMode] = useExpertModeManager()

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance()

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade
  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount,
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
      }

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput],
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput],
  )

  // modal and loading
  const [{ tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const route = trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0)),
  )
  const noRoute = !route
  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(chainId, trade, allowedSlippage)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(trade, allowedSlippage, recipient)

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  const [singleHopOnly] = useUserSingleHopOnly()

  const handleSwap = useCallback(() => {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
      return
    }
    if (!swapCallback) {
      return
    }
    setSwapState({ attemptingTxn: true, tradeToConfirm, swapErrorMessage: undefined, txHash: undefined })
    swapCallback()
      .then((hash) => {
        setSwapState({ attemptingTxn: false, tradeToConfirm, swapErrorMessage: undefined, txHash: hash })
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [priceImpactWithoutFee, swapCallback, tradeToConfirm])

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({ tradeToConfirm, attemptingTxn, swapErrorMessage, txHash })
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash])

  const handleAcceptChanges = useCallback(() => {
    setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn })
  }, [attemptingTxn, swapErrorMessage, trade, txHash])

  // swap warning state
  const [swapWarningCurrency, setSwapWarningCurrency] = useState(null)
  const [onPresentSwapWarningModal] = useModal(<SwapWarningModal swapCurrency={swapWarningCurrency} />)

  const shouldShowSwapWarning = (swapCurrency) => {
    const isWarningToken = Object.entries(SwapWarningTokens).find((warningTokenConfig) => {
      const warningTokenData = warningTokenConfig[1]
      const warningTokenAddress = getAddress(warningTokenData.address)
      return swapCurrency.address === warningTokenAddress
    })
    return Boolean(isWarningToken)
  }

  useEffect(() => {
    if (swapWarningCurrency) {
      onPresentSwapWarningModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapWarningCurrency])

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
      const showSwapWarning = shouldShowSwapWarning(inputCurrency)
      if (showSwapWarning) {
        setSwapWarningCurrency(inputCurrency)
      } else {
        setSwapWarningCurrency(null)
      }
    },
    [onCurrencySelection],
  )

  const handleMaxInput = useCallback(
    (percentage: number) => {
      if (maxAmountInput) {
        const maxValue = parseFloat(maxAmountInput.toExact())
        onUserInput(Field.INPUT, (maxValue * percentage).toString())
      }
    },
    [maxAmountInput, onUserInput],
  )

  const handleOutputSelect = useCallback(
    (outputCurrency) => {
      onCurrencySelection(Field.OUTPUT, outputCurrency)
      const showSwapWarning = shouldShowSwapWarning(outputCurrency)
      if (showSwapWarning) {
        setSwapWarningCurrency(outputCurrency)
      } else {
        setSwapWarningCurrency(null)
      }
    },

    [onCurrencySelection],
  )

  const handleAmount = (value: any) => {
    handleMaxInput(value)
  }

  const swapIsUnsupported = useIsTransactionUnsupported(currencies?.INPUT, currencies?.OUTPUT)

  const inputTokenPrice = useBUSDPrice(currencies[Field.INPUT])
  const outputTokenPrice = useBUSDPrice(currencies[Field.OUTPUT])

  const [onPresentConfirmModal] = useModal(
    <ConfirmSwapModal
      trade={trade}
      originalTrade={tradeToConfirm}
      onAcceptChanges={handleAcceptChanges}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
      recipient={recipient}
      allowedSlippage={allowedSlippage}
      onConfirm={handleSwap}
      swapErrorMessage={swapErrorMessage}
      customOnDismiss={handleConfirmDismiss}
    />,
    true,
    true,
    'confirmSwapModal',
  )

  return (
    <>
      <Flex alignItems="center" my="16px">
        <ExpandableButton direction="left" />
        <Flex ml="auto">
          <GlobalSettings />
          <Transactions />
        </Flex>
      </Flex>
      <Box>
        <CurrencyInputPanel
          label={independentField === Field.OUTPUT && !showWrap && trade ? t('From (estimated)') : t('From')}
          value={formattedAmounts[Field.INPUT]}
          showMaxButton={false}
          currency={currencies[Field.INPUT]}
          onUserInput={handleTypeInput}
          // onChangeAmount={handleMaxInput}
          onCurrencySelect={handleInputSelect}
          otherCurrency={currencies[Field.OUTPUT]}
          id="swap-currency-input"
        />

        <Flex justifyContent="space-between" alignItems="center" py="12px">
          <Text color="textSecondary" fontSize="10px" letterSpacing="0.04em" width="140px">
            {inputTokenPrice && parsedAmounts[Field.INPUT]
              ? `~ ${inputTokenPrice.quote(parsedAmounts[Field.INPUT]).toSignificant(6)} USD`
              : ''}
          </Text>
          <ExpandableButton
            direction="vertical"
            onClick={() => {
              setApprovalSubmitted(false) // reset 2 step UI for approvals
              onSwitchTokens()
            }}
          />

          <Flex justifyContent="end" width="140px">
            <MaxButton onChange={handleAmount} />
          </Flex>
        </Flex>

        {recipient === null && !showWrap && isExpertMode ? (
          <Button variant="text" id="add-recipient-button" onClick={() => onChangeRecipient('')}>
            {t('+ Add a send (optional)')}
          </Button>
        ) : null}

        <CurrencyInputPanel
          value={formattedAmounts[Field.OUTPUT]}
          onUserInput={handleTypeOutput}
          label={independentField === Field.INPUT && !showWrap && trade ? t('To (estimated)') : t('To')}
          showMaxButton={false}
          currency={currencies[Field.OUTPUT]}
          onCurrencySelect={handleOutputSelect}
          otherCurrency={currencies[Field.INPUT]}
          id="swap-currency-output"
        />
        <Box py="12px">
          <Text color="textSecondary" fontSize="10px" letterSpacing="0.04em" minHeight="15px">
            {outputTokenPrice && parsedAmounts[Field.OUTPUT]
              ? `~ ${outputTokenPrice.quote(parsedAmounts[Field.OUTPUT]).toSignificant(6)} USD`
              : ''}
          </Text>
        </Box>
      </Box>

      <Box mb="40px">
        {swapIsUnsupported ? (
          <Button width="100%" disabled mb="4px" variant="primaryGradient">
            {t('Unsupported Asset')}
          </Button>
        ) : !account ? (
          <ConnectWalletButton variant="primaryGradient" width="100%" btnString={t('Connect Wallet')} />
        ) : showWrap ? (
          <Button width="100%" disabled={Boolean(wrapInputError)} onClick={onWrap}>
            {wrapInputError ?? (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null)}
          </Button>
        ) : noRoute && userHasSpecifiedInputOutput ? (
          <WarningPad>
            <Text fontSize="12px" fontWeight="600" color="failure">
              {t('Insufficient liquidity for this trade.')}
            </Text>
            {singleHopOnly && (
              <Text fontSize="12px" fontWeight="600" color="failure" mt="4px">
                {t('Try enabling multi-hop trades.')}
              </Text>
            )}
          </WarningPad>
        ) : showApproveFlow ? (
          <RowBetween>
            <Button
              variant="primaryGradient"
              onClick={approveCallback}
              disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
              width="48%"
            >
              {approval === ApprovalState.PENDING ? (
                <AutoRow gap="6px" justify="center">
                  {t('Enabling')} <CircleLoader stroke="white" />
                </AutoRow>
              ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                t('Enabled %asset%', { asset: currencies[Field.INPUT]?.symbol ?? '' })
              ) : (
                t('Enable %asset%', { asset: currencies[Field.INPUT]?.symbol ?? '' })
              )}
            </Button>
            <Button
              variant={isValid && priceImpactSeverity > 2 ? 'danger' : 'primaryGradient'}
              onClick={() => {
                if (isExpertMode) {
                  handleSwap()
                } else {
                  setSwapState({
                    tradeToConfirm: trade,
                    attemptingTxn: false,
                    swapErrorMessage: undefined,
                    txHash: undefined,
                  })
                  onPresentConfirmModal()
                }
              }}
              width="48%"
              id="swap-button"
              disabled={!isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)}
            >
              {priceImpactSeverity > 3 && !isExpertMode
                ? t('Price Impact High')
                : priceImpactSeverity > 2
                ? t('Swap Anyway')
                : t('Swap')}
            </Button>
          </RowBetween>
        ) : (
          <Button
            variant={isValid && priceImpactSeverity > 2 && !swapCallbackError ? 'danger' : 'primaryGradient'}
            onClick={() => {
              if (isExpertMode) {
                handleSwap()
              } else {
                setSwapState({
                  tradeToConfirm: trade,
                  attemptingTxn: false,
                  swapErrorMessage: undefined,
                  txHash: undefined,
                })
                onPresentConfirmModal()
              }
            }}
            id="swap-button"
            width="100%"
            disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
          >
            {swapInputError ||
              (priceImpactSeverity > 3 && !isExpertMode
                ? `Price Impact Too High`
                : priceImpactSeverity > 2
                ? t('Swap Anyway')
                : t('Swap'))}
          </Button>
        )}

        {showApproveFlow && (
          <Column style={{ marginTop: '1rem' }}>
            <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />
          </Column>
        )}
        {!swapIsUnsupported ? (
          <AdvancedSwapDetailsDropdown trade={trade} />
        ) : (
          <UnsupportedCurrencyFooter currencies={[currencies.INPUT, currencies.OUTPUT]} />
        )}
        {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
      </Box>
    </>
  )
}

export default CryptoTab
