import styled from 'styled-components'
import { Flex, Button, Text } from '@crosswise/uikit'

export const ModalHeader = styled(Flex)`
  color: ${({ theme }) => theme.colors.bluePalette.main};
  padding: 8px 20px 14px 20px;
  border-bottom: 1px solid #c4c4c41a;
`

export const ModalNoPadContainer = styled.div`
  margin: 0px -25px -25px -25px;
`

export const ModalContainer = styled.div`
  padding: 32px 20px 0px 20px;
`
