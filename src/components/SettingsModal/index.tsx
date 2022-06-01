import React, { useState } from 'react'
import { Text, Flex, Toggle, Modal, InjectedModalProps } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import {
  Container,
  // FlexBox,
  Setting,
  StyledBtn,
} from './styled'

interface SettingModalProps extends InjectedModalProps {
  pairName: string
  values: {
    isAuto: boolean
    isVest: boolean
  }
  onHandleSetting?: any
}

const UnclaimedRewards: React.FC<SettingModalProps> = ({ onDismiss, pairName, values, onHandleSetting }) => {
  const { t } = useTranslation()
  const [isVesting, setIsVesting] = useState(values.isVest)
  const [isCompound, setIsCompound] = useState(values.isAuto)
  const [pendingTx, setPendingTx] = useState(false)
  const { toastSuccess, toastError } = useToast()

  const handleSetting = async () => {
    if (!onHandleSetting) return
    setPendingTx(true)
    try {
      await onHandleSetting({ autoCompound: isCompound, isVesting })
      toastSuccess(t('Success!'), t('Your collect options have been set in the farm'))
      onDismiss()
    } catch (e) {
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      console.error(e)
    } finally {
      setPendingTx(false)
    }
  }
  return (
    <Modal minWidth="300px" maxWidth="450px" width="100%" onDismiss={onDismiss}>
      <Container>
        <Text fontSize="24px">{`${pairName} Farm Setting`}</Text>
        <Setting>
          <Flex alignItems="center" margin="10px">
            <Toggle
              scale="lg"
              checked={isVesting}
              disabled={pendingTx}
              onChange={() => {
                setIsVesting(!isVesting)
              }}
            />
            <Text fontSize="20px" ml="10px">
              {t('Vesting')}
            </Text>
          </Flex>
          <Flex alignItems="center" margin="10px">
            <Toggle
              scale="lg"
              checked={isCompound}
              disabled={pendingTx}
              onChange={() => {
                setIsCompound(!isCompound)
              }}
            />
            <Text fontSize="20px" ml="10px">
              {t('Auto-compound')}
            </Text>
          </Flex>
        </Setting>
        {/* <FlexBox>
          <Text margin="10px"> {t('Expected APR')} </Text>
          <Text fontSize="30px" margin="10px">
            ~300%
          </Text>
        </FlexBox> */}
        <StyledBtn disabled={pendingTx} variant="primaryGradient" onClick={handleSetting}>
          {' '}
          {t('Done')}{' '}
        </StyledBtn>
      </Container>
    </Modal>
  )
}

export default UnclaimedRewards
