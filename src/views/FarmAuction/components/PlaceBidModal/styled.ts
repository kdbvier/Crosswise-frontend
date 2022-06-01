import styled from 'styled-components'
import { Modal, Box } from '@crosswise/uikit'

export const StyledModal = styled(Modal)`
  min-width: 280px;
  max-width: 320px;
  & > div:nth-child(2) {
    padding: 0;
  }
`

export const ExistingInfo = styled(Box)`
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.dropdown};
`

export const InnerContent = styled(Box)`
  padding: 24px;
`
