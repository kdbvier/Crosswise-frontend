import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { Text, Input, Flex, Box } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { useUserSlippageTolerance, useUserTransactionTTL } from 'state/user/hooks'
import QuestionHelper from '../../QuestionHelper'
import { SlippageError, DeadlineError } from './enums'
import { Divider, SlippageButton } from './styled'
import Mark from './Svgs/Mark'

const SlippageTabs = () => {
  const { isDark } = useTheme()
  const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance()
  const [ttl, setTtl] = useUserTransactionTTL()
  const [slippageInput, setSlippageInput] = useState('')
  const [deadlineInput, setDeadlineInput] = useState('')

  const { t } = useTranslation()

  const slippageInputIsValid =
    slippageInput === '' || (userSlippageTolerance / 100).toFixed(2) === Number.parseFloat(slippageInput).toFixed(2)
  const deadlineInputIsValid = deadlineInput === '' || (ttl / 60).toString() === deadlineInput

  let slippageError: SlippageError | undefined
  if (slippageInput !== '' && !slippageInputIsValid) {
    slippageError = SlippageError.InvalidInput
  } else if (slippageInputIsValid && userSlippageTolerance < 50) {
    slippageError = SlippageError.RiskyLow
  } else if (slippageInputIsValid && userSlippageTolerance > 500) {
    slippageError = SlippageError.RiskyHigh
  } else {
    slippageError = undefined
  }

  let deadlineError: DeadlineError | undefined
  if (deadlineInput !== '' && !deadlineInputIsValid) {
    deadlineError = DeadlineError.InvalidInput
  } else {
    deadlineError = undefined
  }

  const parseCustomSlippage = (value: string) => {
    setSlippageInput(value)

    try {
      const valueAsIntFromRoundedFloat = Number.parseInt((Number.parseFloat(value) * 100).toString())
      if (!Number.isNaN(valueAsIntFromRoundedFloat) && valueAsIntFromRoundedFloat < 5000) {
        setUserslippageTolerance(valueAsIntFromRoundedFloat)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const parseCustomDeadline = (value: string) => {
    setDeadlineInput(value)

    try {
      const valueAsInt: number = Number.parseInt(value) * 60
      if (!Number.isNaN(valueAsInt) && valueAsInt > 0) {
        setTtl(valueAsInt)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" px="25px" py="20px">
        <Flex mb="12px" alignItems="center">
          <Mark color={isDark ? 'contrast' : 'primary'} />
          <Text
            fontSize="10px"
            fontWeight="600"
            color="primaryGray"
            letterSpacing="0.04em"
            textTransform="uppercase"
            ml="2"
          >
            {t('Slippage Tolerance')}
          </Text>

          <QuestionHelper
            text={t(
              'Setting a high slippage tolerance can help transactions succeed, but you may not get such a good price. Use with caution.',
            )}
            icon="info"
            ml="auto"
          />
        </Flex>
        <Flex justifyContent="space-between">
          <SlippageButton
            onClick={() => {
              setSlippageInput('')
              setUserslippageTolerance(10)
            }}
          >
            0.1%
          </SlippageButton>
          <SlippageButton
            onClick={() => {
              setSlippageInput('')
              setUserslippageTolerance(50)
            }}
          >
            0.5%
          </SlippageButton>
          <SlippageButton
            onClick={() => {
              setSlippageInput('')
              setUserslippageTolerance(100)
            }}
          >
            1.0%
          </SlippageButton>
          <Input
            scale="lg"
            style={{ textAlign: 'center', fontSize: '18px', padding: '0px' }}
            placeholder={`${(userSlippageTolerance / 100).toFixed(2)}%`}
            value={slippageInput}
            onBlur={() => {
              parseCustomSlippage(`${(userSlippageTolerance / 100).toFixed(2)}%`)
            }}
            onChange={(e) => parseCustomSlippage(e.target.value)}
            isWarning={!slippageInputIsValid}
            isSuccess={![10, 50, 100].includes(userSlippageTolerance)}
          />
        </Flex>
        {!!slippageError && (
          <Text fontSize="13px" color={slippageError === SlippageError.InvalidInput ? 'red' : '#F3841E'} mt="8px">
            {slippageError === SlippageError.InvalidInput
              ? t('Enter a valid slippage percentage')
              : slippageError === SlippageError.RiskyLow
              ? t('Your transaction may fail')
              : t('Your transaction may be frontrun')}
          </Text>
        )}
      </Flex>
      <Divider />
      <Flex flexDirection="column" px="25px" py="20px">
        <Flex mb="12px" alignItems="center">
          <Mark color={isDark ? 'contrast' : 'primary'} />
          <Text
            fontSize="10px"
            fontWeight="600"
            color="primaryGray"
            letterSpacing="0.04em"
            textTransform="uppercase"
            ml="2"
          >
            {t('TX deadline')}
          </Text>
        </Flex>
        <Flex>
          <Box width="180px" mt="4px">
            <Input
              scale="lg"
              color={deadlineError ? 'red' : undefined}
              onBlur={() => {
                parseCustomDeadline(`${(ttl / 60).toString()} Minutes`)
              }}
              placeholder={`${(ttl / 60).toString()} Minutes`}
              style={{ textAlign: 'center', fontSize: '18px' }}
              value={deadlineInput}
              onChange={(e) => parseCustomDeadline(e.target.value)}
            />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SlippageTabs
