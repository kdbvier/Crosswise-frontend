import React from 'react'
import _uniqueId from 'lodash/uniqueId'
import { Flex } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import { CountdownProps } from '../../../types'
import Step from '../Step'
import { Spacer } from './styled'

const ProgressStepper: React.FC<CountdownProps> = ({ steps, activeStepIndex }) => {
  const { t } = useTranslation()
  return (
    <Flex>
      {steps.map((step, index) => {
        const isPastSpacer = index < activeStepIndex
        const stepText = t(step.text).toUpperCase()

        return (
          <React.Fragment key={_uniqueId('ProgressStep-')}>
            <Step stepText={stepText} index={index} activeStepIndex={activeStepIndex} />
            {index + 1 < steps.length && <Spacer isPastSpacer={isPastSpacer} />}
          </React.Fragment>
        )
      })}
    </Flex>
  )
}

export default ProgressStepper
