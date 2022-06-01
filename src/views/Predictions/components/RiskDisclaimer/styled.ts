import { ModalHeader } from '@crosswise/uikit'
import styled from 'styled-components'

export const GradientModalHeader = styled(ModalHeader)`
  background: ${({ theme }) => theme.colors.gradients.bubblegum};
  padding-bottom: 24px;
  padding-top: 24px;
`
