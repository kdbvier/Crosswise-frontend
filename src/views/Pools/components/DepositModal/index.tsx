import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Text, Flex, Modal, Link, RewardsIcon } from '@crosswise/uikit'
import useTheme from 'hooks/useTheme'
// import { ModalActions, ModalInput, ExpandButton } from 'components/Modal'
import { ModalActions, ExpandButton } from 'components/Modal'
import { Panel, TransparentInput } from 'components/ApyCalculatorModal/styled'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useToast from 'hooks/useToast'
// import { Farm } from 'state/types'
import { usePriceCrssBusd } from 'state/farms/hooks'
import { ModalNoPadContainer, ModalContainer, ModalHeader } from './styled'
import ApyButton from '../FarmCard/ApyButton'

interface DepositModalProps {
  max: BigNumber
  apr?: number
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  addLiquidityUrl?: string
}

const DepositModal: React.FC<DepositModalProps> = ({
  max,
  apr,
  onConfirm,
  onDismiss,
  tokenName = '',
  addLiquidityUrl,
}) => {
  const { theme } = useTheme()
  const [val, setVal] = useState('')
  const { toastSuccess, toastError } = useToast()
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const crssPriceUsd = usePriceCrssBusd()

  const valNumber = new BigNumber(val)
  const fullBalanceNumber = new BigNumber(fullBalance)

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal
      title={t('Stake LP tokens')}
      icon={<RewardsIcon color={theme.isDark ? 'contrast' : 'bluePalette.accent'} />}
      width="346px"
      onDismiss={onDismiss}
    >
      <ModalNoPadContainer>
        <ModalContainer>
          <Panel flexDirection="column">
            <Flex justifyContent="space-between" mb="8px">
              <Text fontSize="11px" fontWeight="600" color="primaryGray" textTransform="uppercase">
                {t('Stake')}
              </Text>
              <Text fontSize="11px" fontWeight="600" color="primaryGray" textTransform="uppercase">
                {t('Balance: ')}
                {fullBalance}
              </Text>
            </Flex>
            <TransparentInput type="number" placeholder="0.00" value={val} onChange={handleChange} />
            <Flex alignItems="center">
              <Button
                variant="primaryGradientOutline"
                scale="xs"
                padding="0px 12px"
                ml="auto"
                mr="12px"
                onClick={handleSelectMax}
              >
                {t('MAX')}
              </Button>
              <Text fontSize="11px" fontWeight="600" color="primaryGray" textTransform="uppercase">
                {tokenName}
              </Text>
            </Flex>
          </Panel>
          {/* <ModalInput
            value={val}
            onSelectMax={handleSelectMax}
            onChange={handleChange}
            max={fullBalance}
            symbol={tokenName}
            addLiquidityUrl={addLiquidityUrl}
            inputTitle={t('Stake')}
          /> */}
          <Flex alignItems="center" justifyContent="space-between" mt="32px" mb="8px">
            <Text fontSize="10px" fontWeight="600" color="primaryGray" textTransform="uppercase">
              {t('Annual ROI at current rates:')}
            </Text>
            <Flex alignItems="center">
              <Text fontSize="16px" color="primaryGray">
                $0.00
              </Text>
              <ApyButton
                lpLabel={tokenName}
                addLiquidityUrl={addLiquidityUrl}
                crssPrice={crssPriceUsd}
                apr={apr}
                // displayApr={displayApr}
              />
            </Flex>
          </Flex>
          <ModalActions>
            <Button
              width="100%"
              disabled={pendingTx || !valNumber.isFinite() || valNumber.eq(0) || valNumber.gt(fullBalanceNumber)}
              onClick={async () => {
                setPendingTx(true)
                try {
                  await onConfirm(val)
                  toastSuccess(t('Staked!'), t('Your funds have been staked in the farm'))
                  onDismiss()
                } catch (e) {
                  toastError(
                    t('Error'),
                    t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
                  )
                  console.error(e)
                } finally {
                  setPendingTx(false)
                }
              }}
              variant="primaryGradient"
            >
              {pendingTx ? t('Confirming') : t('Confirm')}
            </Button>
          </ModalActions>
        </ModalContainer>

        <Link href={addLiquidityUrl} target="_blank" style={{ alignSelf: 'center', width: '100%' }}>
          <ExpandButton width="100%" title={t('Get %symbol%', { symbol: tokenName })} />
        </Link>
      </ModalNoPadContainer>
    </Modal>
  )
}

export default DepositModal
