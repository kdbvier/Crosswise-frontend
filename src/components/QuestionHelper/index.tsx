import React from 'react'
import { HelpIcon, InfoIcon, useTooltip, Box } from '@crosswise/uikit'
import { Props } from './interfaces'
import { QuestionWrapper } from './styled'

const QuestionHelper: React.FC<Props> = ({ text, icon = 'help', ...props }) => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(text, { placement: 'right-end', trigger: 'hover' })

  return (
    <Box {...props}>
      {tooltipVisible && tooltip}
      <QuestionWrapper ref={targetRef}>
        {icon === 'help' && <HelpIcon width="16px" />}
        {icon === 'info' && <InfoIcon width="16px" />}
      </QuestionWrapper>
    </Box>
  )
}

export default QuestionHelper
